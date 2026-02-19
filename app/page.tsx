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

      {/* Trust bar */}
      <div className="border-b border-slate-800 py-6">
        <div className="max-w-5xl mx-auto px-6 flex justify-center items-center gap-12 text-sm text-slate-400">
          <div>✅ On-chain • Immutable</div>
          <div>✅ Reusable consent</div>
          <div>✅ Zero-knowledge ready</div>
          <div>✅ Colorado vital records</div>
        </div>
      </div>

      {/* How it works */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-5xl font-semibold text-center mb-16">Three steps. One signature.</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 hover:border-teal-500/50 transition">
              <div className="text-teal-400 text-6xl mb-6">1️⃣</div>
              <h3 className="text-2xl font-semibold mb-4">Connect Wallet</h3>
              <p className="text-slate-400">Base network — no KYC, no middleman.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 hover:border-teal-500/50 transition">
              <div className="text-teal-400 text-6xl mb-6">2️⃣</div>
              <h3 className="text-2xl font-semibold mb-4">Sign Consent</h3>
              <p className="text-slate-400">Create a reusable EAS attestation on-chain.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 hover:border-teal-500/50 transition">
              <div className="text-teal-400 text-6xl mb-6">3️⃣</div>
              <h3 className="text-2xl font-semibold mb-4">Submit Request</h3>
              <p className="text-slate-400">Pay $49 processing fee → your request is sent.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-5xl font-semibold text-center mb-16">Why Proofly?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-10">
              <div className="text-teal-400 mb-4">🔒 Privacy First</div>
              <p className="text-lg">You control the data. Consent lives on-chain but only you decide when to share the attestation.</p>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-10">
              <div className="text-teal-400 mb-4">♾️ Reusable Forever</div>
              <p className="text-lg">One signature works for every future request — no re-signing, no re-paying gas.</p>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-10">
              <div className="text-teal-400 mb-4">⚡ Instant & Verifiable</div>
              <p className="text-lg">Publicly verifiable on Base EASScan. Governments and services can check authenticity instantly.</p>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-10">
              <div className="text-teal-400 mb-4">🚀 Built by Hudson R&D</div>
              <p className="text-lg">Part of our mission to bring real-world utility to on-chain identity and data rights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center border-t border-slate-800">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-5xl font-semibold mb-6">Ready to take control?</h2>
          <p className="text-xl text-slate-400 mb-10">Start your reusable consent in under 60 seconds.</p>
          <Link href="/consent">
            <button className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-2xl px-16 py-8 rounded-3xl transition-all active:scale-95">
              Begin Consent Flow →
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-6 text-center text-slate-400 text-sm">
          Proofly is a product of Hudson R&D • © 2026<br />
          <a href="https://hudsonrnd.com" className="hover:text-white underline">hudsonrnd.com</a> • 
          <a href="https://x.com/HudsonRnD" className="hover:text-white underline ml-4">X @HudsonRnD</a>
        </div>
      </footer>
    </div>
  );
}