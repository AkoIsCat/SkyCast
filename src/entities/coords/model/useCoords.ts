'use client'

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCoords } from '@/entities/coords/lib/getCoords';
import type { CoordsResult } from '@/entities/coords/model/types';

export const useCoords = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const query = useQuery<CoordsResult>({
    queryKey: ['coords'],
    queryFn: getCoords,
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: mounted, // ✅ 클라이언트 mount 후 실행
  });

  const coords =
    query.data?.status === 'success' ||
    query.data?.status === 'fallback'
      ? query.data.coords
      : undefined;

  return {
    coords,
    coordsResult: query.data,
  };
};