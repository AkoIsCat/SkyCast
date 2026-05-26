'use client'

import { Suspense } from 'react';
import HomeContent from '@/features/home/HomeContent';

export default function Home() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}