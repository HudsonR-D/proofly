'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { EAS, SchemaEncoder, NO_EXPIRATION } from '@ethereum-attestation-service/eas-sdk';

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

  const handleSign = async () => {
    if (!address || !fullName.trim()) {
      alert('Connect wallet and enter your full name');
      return;
    }
    if (!walletClient) {
      alert('Wallet not ready. Reconnect and try again.');
      return;
    }

    setAttesting(true);

    try {
      const eas = new EAS(EAS_CONTRACT_ADDRESS);
      eas.connect(walletClient as any);

      const schemaEncoder = new SchemaEncoder('string consentFor, address user, bytes32 idHash, uint256 issuedAt, bool reusable');

      const encodedData = schemaEncoder.encodeData([
        { name: 'consentFor', value: 'Colorado birth certificate request', type: 'string' },
        { name: 'user', value: address, type: 'address' },
        { name: 'idHash', value: '0x0000000000000000000000000000000000000000000000000000000000000000', type: 'bytes32' },
        { name: 'issuedAt', value: BigInt(Math.floor(Date.now() / 1000)), type: 'uint256' },
        { name: 'reusable', value: true, type: 'bool' },
      ]);

      const tx = await eas.attest({
        schema: SCHEMA_UID,
        data: {
          recipient: address,
          expirationTime: NO_EXPIRATION,
          revocable: true,
          refUID: '0x' + '0'.repeat(64),
          data: encodedData,
        },
      });

      const newUID = await tx.wait();
      setAttestationUID(newUID);
      setExplorerLink(`https://base.easscan.org/attestation/view/${newUID}`);

      alert('✅ Consent attested on Base!');
    } catch (err: any) {
      console.error('EAS Error:', err);
      alert('Attest error: ' + (err?.message || String(err)));
    } finally {
      setAttesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-12">
      <div className="max-w-lg mx-auto px-6">
        <Card className="border-slate-800 bg-slate-900 rounded-3xl overflow-hidden">
          <CardHeader className="text-center pt-12 pb-8">
            <CardTitle className="text-5xl font-bold tracking-tight">Reusable Consent</CardTitle>
            <p className="text-slate-400 text-xl mt-3">One signature. Reusable forever.</p>
          </CardHeader>
          <CardContent className="px-10 pb-12 space-y-8">
            <div>
              <label className="text-sm text-slate-400 block mb-3">Full Legal Name</label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-slate-950 border-slate-700 text-white text-lg py-7 rounded-2xl placeholder:text-slate-500"
                placeholder="Enter your full legal name"
              />
            </div>

            {!isConnected ? (
              <div className="flex justify-center"><ConnectButton /></div>
            ) : (
              <Button 
                onClick={handleSign} 
                disabled={attesting || !fullName.trim()} 
                size="lg" 
                className="w-full text-lg py-7 rounded-3xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold"
              >
                {attesting ? 'Signing on Base…' : 'Sign with Wallet → Create EAS Attestation'}
              </Button>
            )}

            {attestationUID && explorerLink && (
              <div className="text-center pt-6 border-t border-white/10">
                <div className="inline-block bg-emerald-500 text-white px-8 py-4 rounded-full text-lg font-medium">Consent attested on Base</div>
                <p className="mt-4">
                  <a href={explorerLink} target="_blank" className="text-emerald-400 underline hover:text-emerald-300">View on Base EAS Explorer →</a>
                </p>
                <Button onClick={() => window.location.href = '/review'} className="mt-6 w-full text-lg py-7 rounded-3xl bg-teal-500 hover:bg-teal-400">
                  Continue to Review & Pay →
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}