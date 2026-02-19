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
  // ... (your existing state & handleSign stay exactly the same — only UI changed)

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

            {/* success block stays the same but with teal styling */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}