'use client'
import { useMemo } from 'react';

export const useParsedAddress = (fullAddress: string) => {
  return useMemo(() => {
    const parts = fullAddress.split(' ');
    return {
      district: parts[1] ?? '',
      neighborhood: parts[2] ?? '',
      village: parts[3] ?? '',
    };
  }, [fullAddress]);
};
