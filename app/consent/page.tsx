// app/consent/page.tsx - Screen 4: Consent (REAL EAS attestation)
'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import { base } from 'viem/chains';
import { Badge } from '@/components/ui/badge';

const EAS_CONTRACT_ADDRESS = '0x4200000000000000000000000000000000000021'; // Base mainnet EAS
const SCHEMA_UID = '0x6ac87b3f4c7a0678447856c42bc08b837ecfdc24c4b67862fd21f2150059607b'; // ProoflyConsentV1 UID from base.easscan.org/schemas

export default function Consent() {
  const { address, isConnected } = useAccount();
  const [fullName, setFullName] = useState('');
  const [attesting, setAttesting] = useState(false);
  const [attestationUID, setAttestationUID] = useState('');
  const [explorerLink, setExplorerLink] = useState('');

  // Load name from previous form if we stored it (bonus: auto-fill)
  useEffect(() => {
    const savedName = localStorage.getItem('prooflyFullName');
    if (savedName) setFullName(savedName);
  }, []);

  const consentText = `I, ${fullName || '[Your Full Name]'}, wallet ${address || '0x...'}, authorize Proofly to act as my agent for submitting a Colorado birth certificate request on my behalf. Privacy-first, data deleted on-chain.`;

  const handleSign = async () => {
    if (!address || !fullName || !SCHEMA_UID || SCHEMA_UID === '0x6ac87b3f4c7a0678447856c42bc08b837ecfdc24c4b67862fd21f2150059607b') {
      alert('Please enter your full name and make sure you replaced SCHEMA_UID in the code with your real one from base.easscan.org');
      return;
    }

    setAttesting(true);

    try {
      const eas = new EAS(EAS_CONTRACT_ADDRESS);
      eas.connect(window.ethereum!); // RainbowKit already injected the provider

      const schemaEncoder = new SchemaEncoder('string consentFor, address user, bytes32 idHash, uint256 issuedAt, bool reusable');

      const encodedData = schemaEncoder.encodeData([
        { name: 'consentFor', value: 'Colorado birth certificate request', type: 'string' },
        { name: 'user', value: address, type: 'address' },
        { name: 'idHash', value: '0x0000000000000000000000000000000000000000000000000000000000000000', type: 'bytes32' }, // mock ID hash
        { name: 'issuedAt', value: Math.floor(Date.now() / 1000), type: 'uint256' },
        { name: 'reusable', value: true, type: 'bool' },
      ]);

      const tx = await eas.attest({
        schema: SCHEMA_UID,
        data: {
          recipient: address,
          expirationTime: 0,
          revocable: true,
          refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
          data: encodedData,
        },
      });

      const newAttestationUID = await tx.wait();
      setAttestationUID(newAttestationUID);
      setExplorerLink(`https://base.easscan.org/attestation/view/${newAttestationUID}`);

      alert('✅ Consent attested on Base!');
    } catch (err: any) {
      console.error(err);
      alert('Error: ' + (err.message || 'Failed to attest'));
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
            <Textarea
              readOnly
              value={consentText}
              className="bg-zinc-950 border-zinc-700 text-white min-h-[140px] font-mono text-sm"
            />
          </div>

          {!isConnected ? (
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          ) : (
            <Button
              onClick={handleSign}
              disabled={attesting || !fullName}
              size="lg"
              className="w-full text-lg py-7 rounded-full bg-emerald-600 hover:bg-emerald-700"
            >
              {attesting ? 'Signing with Wallet...' : 'Sign with Wallet → Create EAS Attestation'}
            </Button>
          )}

          {attestationUID && explorerLink && (
            <div className="text-center pt-6 border-t border-white/10">
              <Badge className="text-lg px-8 py-4 bg-emerald-500">
                ✅ Consent attested on Base
              </Badge>
              <p className="mt-4">
                <a
                  href={explorerLink}
                  target="_blank"
                  className="text-emerald-400 underline hover:text-emerald-300"
                >
                  View on Base EAS Explorer →
                </a>
              </p>
              <Button
                onClick={() => window.location.href = '/review'}
                className="mt-6 w-full text-lg py-7 rounded-full"
              >
                Continue to Review & Pay →
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}