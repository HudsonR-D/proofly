// app/page.tsx - Screen 1: Landing (with header + Connect Wallet)
'use client';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-black text-white">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-bold text-2xl tracking-tighter">Proofly</div>
          <ConnectButton />
        </div>
      </nav>

      {/* Hero */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <div className="max-w-2xl text-center">
          <h1 className="text-6xl font-bold mb-6 tracking-tight">
            Get your Colorado birth certificate<br />mailed to you.
          </h1>
          <p className="text-2xl text-zinc-400 mb-10">
            Privacy first. On-chain consent.
          </p>

          <Button size="lg" className="text-lg px-12 py-7 rounded-full" asChild>
            <a href="/request">Start Request</a>
          </Button>

          <div className="mt-12 flex flex-wrap gap-3 justify-center">
            <Badge variant="secondary" className="px-4 py-2 text-sm">No data stored</Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">Ethereum attested</Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">Built for EthDenver</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}