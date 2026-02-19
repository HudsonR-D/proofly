'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function Review() {
  const [paying, setPaying] = useState(false);

  const handleCheckout = async () => {
    // your existing function stays the same
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-12">
      <div className="max-w-lg mx-auto px-6">
        <Card className="border-slate-800 bg-slate-900 rounded-3xl">
          <CardHeader className="text-center pt-12">
            <CardTitle className="text-5xl font-bold tracking-tight">Review & Pay</CardTitle>
            <p className="text-slate-400 mt-3">Complete your Colorado birth certificate request</p>
          </CardHeader>
          <CardContent className="px-10 py-12 space-y-8">
            <div className="text-center">
              <p className="text-6xl font-bold text-teal-400">$49</p>
              <p className="text-slate-400">One-time processing fee</p>
            </div>

            <Button 
              onClick={handleCheckout} 
              disabled={paying} 
              className="w-full text-xl py-8 rounded-3xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold"
            >
              {paying ? 'Processing payment…' : 'Pay $49 & Submit Request'}
            </Button>

            <p className="text-xs text-center text-slate-500">Secure • Stripe • Your data stays private</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}