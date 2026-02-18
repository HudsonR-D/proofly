// app/id-upload/page.tsx - Screen 3: ID Upload + zk Proof
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

export default function IDUpload() {
  const [files, setFiles] = useState<{ dl: File | null; selfie: File | null }>({
    dl: null,
    selfie: null,
  });
  const [verifying, setVerifying] = useState(false);
  const [zkProof, setZkProof] = useState('');

  const handleFileChange = (type: 'dl' | 'selfie') => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFiles(prev => ({ ...prev, [type]: e.target.files![0] }));
    }
  };

  const handleVerify = () => {
    if (!files.dl || !files.selfie) {
      alert('Please upload both files');
      return;
    }

    setVerifying(true);
    setZkProof('');

    // Mock zk-proof delay (real one comes in Step 5)
    setTimeout(() => {
      setVerifying(false);
      setZkProof('zk Proof: You are 18+ and Colorado resident ✓');
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-black text-white flex items-center justify-center p-6">
      <Card className="w-full max-w-xl bg-zinc-900 border-white/20">
        <CardHeader>
          <CardTitle className="text-3xl text-center">ID Verification</CardTitle>
          <p className="text-center text-zinc-400">Driver’s license + selfie • No raw images saved</p>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Driver's License */}
          <div>
            <Label className="text-zinc-300 mb-2 block">Driver’s License (front)</Label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange('dl')}
              className="block w-full text-sm text-zinc-400 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white file:text-black hover:file:bg-zinc-200"
            />
            {files.dl && <p className="text-xs text-emerald-400 mt-1">✓ {files.dl.name}</p>}
          </div>

          {/* Selfie */}
          <div>
            <Label className="text-zinc-300 mb-2 block">Selfie (holding ID)</Label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange('selfie')}
              className="block w-full text-sm text-zinc-400 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-white file:text-black hover:file:bg-zinc-200"
            />
            {files.selfie && <p className="text-xs text-emerald-400 mt-1">✓ {files.selfie.name}</p>}
          </div>

          <Button
            onClick={handleVerify}
            disabled={verifying || !files.dl || !files.selfie}
            size="lg"
            className="w-full text-lg py-7 rounded-full bg-white text-black hover:bg-zinc-200"
          >
            {verifying ? 'Verifying with zk...' : 'Upload & Verify ID'}
          </Button>

          {/* Verifying state */}
          {verifying && (
            <div className="space-y-3">
              <Skeleton className="h-4 w-3/4 mx-auto bg-zinc-700" />
              <Skeleton className="h-4 w-1/2 mx-auto bg-zinc-700" />
              <p className="text-center text-sm text-zinc-400">Running zero-knowledge proof...</p>
            </div>
          )}

          {/* zk Proof result */}
          {zkProof && (
            <div className="text-center pt-4 border-t border-white/10">
              <Badge variant="default" className="text-lg px-6 py-3 bg-emerald-500 hover:bg-emerald-600">
                {zkProof}
              </Badge>
              <p className="mt-4 text-xs text-zinc-500">Only the zk-proof is stored on-chain. Raw images are deleted immediately.</p>
            </div>
          )}

          {zkProof && (
            <Button
              onClick={() => window.location.href = '/consent'}
              size="lg"
              className="w-full text-lg py-7 rounded-full mt-6"
            >
              Continue to Consent →
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}