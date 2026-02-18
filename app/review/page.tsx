// app/review/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!); // add this import at top: import { loadStripe } from '@stripe/stripe-js';

export default function Review() {
  const [paying, setPaying] = useState(false);

  const handleStripe = async () => {
    setPaying(true);
    const stripe = await stripePromise;
    if (!stripe) return alert('Stripe not loaded');

    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: 'price_YOUR_TEST_PRICE_ID_HERE', quantity: 1 }], // create test price in Stripe dashboard
      mode: 'payment',
      successUrl: window.location.origin + '/confirmation',
      cancelUrl: window.location.origin + '/review',
    });

    if (error) alert(error.message);
    setPaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-black text-white flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl bg-zinc-900 border-white/20">
        <CardHeader><CardTitle className="text-3xl text-center">Review & Pay</CardTitle></CardHeader>
        <CardContent className="space-y-8">
          <div className="border border-white/20 bg-zinc-950 rounded-2xl p-8 text-center">
            <div className="w-48 h-64 mx-auto bg-white/10 rounded-xl flex items-center justify-center text-6xl">📄</div>
            <p className="mt-4">PDF Packet Ready for CDPHE</p>
          </div>

          <div className="bg-zinc-950 p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex justify-between"><span>Gov fee</span><span>$25</span></div>
            <div className="flex justify-between"><span>Proofly fee</span><span>$19</span></div>
            <div className="border-t border-white/10 pt-4 flex justify-between text-xl font-bold"><span>Total</span><span>$44</span></div>
          </div>

          <Button onClick={handleStripe} disabled={paying} className="w-full text-lg py-8 rounded-full">Pay $44 with Stripe</Button>
          <Button onClick={() => window.location.href = '/confirmation'} variant="outline" className="w-full text-lg py-8 rounded-full">Pay with USDC (mock)</Button>
        </CardContent>
      </Card>
    </div>
  );
}