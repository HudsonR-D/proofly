// app/consent/page.tsx - Dynamic wrapper (fixes prerender)
import dynamic from 'next/dynamic';

const ConsentClient = dynamic(() => import('./ConsentClient'), { ssr: false });

export default function ConsentPage() {
  return <ConsentClient />;
}