// app/consent/page.tsx
// This is a thin server-safe wrapper. The real component is in ConsentClient.tsx.
// We use dynamic import with ssr:false because wagmi hooks (useAccount, useWalletClient)
// cannot run during server-side prerendering — they need a live browser + wallet context.
import dynamic from 'next/dynamic';

const ConsentClient = dynamic(() => import('./ConsentClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <p className="text-zinc-500 text-sm">Loading wallet...</p>
    </div>
  ),
});

export default function ConsentPage() {
  return <ConsentClient />;
}