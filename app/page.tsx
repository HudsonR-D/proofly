'use client';

import Link from 'next/link';

export default function ProoflyLanding() {
  return (
    <div className="bg-slate-950 text-white min-h-screen">
      {/* Hero */}
      <section className="pt-24 pb-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 bg-slate-900 border border-teal-500/30 rounded-full px-6 py-2 mb-8">
            <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-teal-400">Built on Base • Powered by EAS</span>
          </div>

          <h1 className="text-7xl font-bold tracking-tighter leading-none mb-6">
            One signature.<br />
            <span className="text-teal-400">Reusable forever.</span>
          </h1>

          <p className="text-2xl text-slate-300 max-w-2xl mx-auto mb-12">
            Privacy-first on-chain consent for Colorado birth certificate requests.<br />
            Secure, verifiable, and controlled by you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/consent">
              <button className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-xl px-12 py-6 rounded-3xl transition-all active:scale-95">
                Start Consent Now →
              </button>
            </Link>
            <a href="https://hudsonrnd.com" className="border border-white/30 hover:border-white text-white font-medium text-xl px-12 py-6 rounded-3xl transition">
              Back to Hudson R&D
            </a>
          </div>
        </div>
      </section>

      {/* Trust bar + How it works + Benefits + Final CTA + Footer — same as before */}
      {/* (full code is the same one I gave last time — if you need it pasted again just say "paste full") */}
    </div>
  );
}