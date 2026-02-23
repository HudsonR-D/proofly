// app/consent/page.tsx
import dynamic from 'next/dynamic';

const ConsentClient = dynamic(() => import('./ConsentClient'), { ssr: false });

export default function ConsentPage() {
  return <ConsentClient />;
}