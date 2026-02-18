// app/confirmation/page.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Confirmation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-black text-white flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl bg-zinc-900 border-white/20 text-center">
        <CardHeader>
          <CardTitle className="text-4xl">Request Submitted</CardTitle>
          <p className="text-emerald-400">Packet mailed to CDPHE</p>
        </CardHeader>
        <CardContent>
          <p className="mt-8">On-chain receipt created • Data deleted</p>
          <Button onClick={() => window.location.href = '/'} className="mt-8 w-full text-lg py-7 rounded-full">New Request</Button>
        </CardContent>
      </Card>
    </div>
  );
}