// app/consent/page.tsx - Vercel + local FINAL
'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import { Badge } from '@/components/ui/badge';

const EAS_CONTRACT_ADDRESS = '0x4200000000000000000000000000000000000021';
const SCHEMA_UID = '0x6ac87b3f4c7a0678447856c42bc08b837ecfdc24c4b67862fd21f2150059607b';

export default function Consent() {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  const [fullName, setFullName] = useState('');
  const [attesting, setAttesting] = useState(false);
  const [attestationUID, setAttestationUID] = useState('');
  const [explorerLink, setExplorerLink] = useState('');

  useEffect(() => {
    const savedName = localStorage.getItem('prooflyFullName');
    if (savedName) setFullName(savedName);
  }, []);

  const consentText = `I, ${fullName || '[Your Full Name]'}, wallet ${address || '0x...'}, authorize Proofly to act as my agent for submitting a Colorado birth certificate request on my behalf. Privacy-first, data deleted on-chain.`;

  const handleSign = async () => {
    if (!address || !fullName.trim()) {
      alert('Connect wallet and enter your full name');
      return;
    }
    if (!walletClient) {
      alert('Wallet not ready — reconnect and try again');
      return;
    }

    setAttesting(true);

    try {
      const eas = new EAS(EAS_CONTRACT_ADDRESS);
      eas.connect(walletClient);

      const schemaEncoder = new SchemaEncoder('string consentFor, address user, bytes32 idHash, uint256 issuedAt, bool reusable');

      const encodedData = schemaEncoder.encodeData([
        { name: 'consentFor', value: 'Colorado birth certificate request', type: 'string' },
        { name: 'user', value: address, type: 'address' },
        { name: 'idHash', value: '0x0000000000000000000000000000000000000000000000000000000000000000', type: 'bytes32' },
        { name: 'issuedAt', value: BigInt(Math.floor(Date.now() / 1000)), type: 'uint256' },
        { name: 'reusable', value: true, type: 'bool' },
      ]);

      const attestation = await eas.attest({
        schema: SCHEMA_UID,
        data: {
          recipient: address,
          expirationTime: BigInt(0),
          revocable: true,
          refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
          data: encodedData,
        },
      });

      const newUID = attestation.uid;
      setAttestationUID(newUID);
      setExplorerLink(`https://base.easscan.org/attestation/view/${newUID}`);

      alert('✅ Consent attested on Base!');
    } catch (err: any) {
      console.error(err);
      alert('Attest error: ' + (err.message || 'Check console'));
    } finally {
      setAttesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-black text-white flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl bg-zinc-900 border-white/20">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Reusable Consent Authorization</CardTitle>
          <p className="text-center text-zinc-400">One-time on-chain signature • reusable forever</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-zinc-300 block mb-2">Your Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500"
              placeholder="Enter your full legal name"
            />
          </div>

          <div>
            <label className="text-zinc-300 block mb-2">Consent Letter Preview</label>
            <Textarea readOnly value={consentText} className="bg-zinc-950 border-zinc-700 text-white min-h-[140px] font-mono text-sm" />
          </div>

          {!isConnected ? (
            <div className="flex justify-center"><ConnectButton /></div>
          ) : (
            <Button onClick={handleSign} disabled={attesting || !fullName.trim()} size="lg" className="w-full text-lg py-7 rounded-full bg-emerald-600 hover:bg-emerald-700">
              {attesting ? 'Signing...' : 'Sign with Wallet → Create EAS Attestation'}
            </Button>
          )}

          {attestationUID && explorerLink && (
            <div className="text-center pt-6 border-t border-white/10">
              <Badge className="text-lg px-8 py-4 bg-emerald-500">✅ Consent attested on Base</Badge>
              <p className="mt-4">
                <a href={explorerLink} target="_blank" className="text-emerald-400 underline hover:text-emerald-300">View on Base EAS Explorer →</a>
              </p>
              <Button onClick={() => window.location.href = '/review'} className="mt-6 w-full text-lg py-7 rounded-full">
                Continue to Review & Pay →
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}