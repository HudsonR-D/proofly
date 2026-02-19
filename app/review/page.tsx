'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function Review() {
  const [paying, setPaying] = useState(false);

  const handleCheckout = async () => {
    setPaying(true);

    const stripe = await stripePromise;
    if (!stripe) {
      alert('Stripe failed to load. Please refresh and try again.');
      setPaying(false);
      return;
    }

    // @ts-expect-error - Stripe types sometimes miss redirectToCheckout in Next.js builds
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: 'price_YOUR_TEST_PRICE_ID_HERE', quantity: 1 }], 
      mode: 'payment',
      successUrl: window.location.origin + '/confirmation',
      cancelUrl: window.location.origin + '/review',
    });

    if (error) {
      alert(error.message || 'Payment error occurred');
    }
    setPaying(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-6">
      <Card className="w-full max-w-lg border-zinc-800 bg-zinc-900">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Review & Pay</CardTitle>
          <p className="text-center text-zinc-400">Complete your Colorado birth certificate request</p>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="text-center">
            <p className="text-4xl font-bold">$49</p>
            <p className="text-sm text-zinc-400">One-time processing fee</p>
          </div>

          <Button 
            onClick={handleCheckout} 
            disabled={paying} 
            size="lg" 
            className="w-full text-lg py-7 rounded-full bg-emerald-600 hover:bg-emerald-700"
          >
            {paying ? 'Processing...' : 'Pay $49 & Submit Request'}
          </Button>

          <p className="text-xs text-center text-zinc-500">
            Secure payment powered by Stripe • Your data is protected
          </p>
        </CardContent>
      </Card>
    </div>
  );
}