'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAddress } from '@/entities/address/api/getAddress';

export const useAddress = (coords: [number, number] | undefined) => {
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.kakao?.maps) {
      setIsKakaoLoaded(true);
      return;
    }
    const interval = setInterval(() => {
      if (window.kakao?.maps) {
        setIsKakaoLoaded(true);
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const query = useQuery({
    queryKey: ['address', coords],
    queryFn: () => {
      if (!coords) throw new Error('Coords is required');
      return getAddress(coords);
    },
    enabled: !!coords && isKakaoLoaded,
    select: (data) => data?.[0] ?? null,
    retry: false,
  });

  return {
    data: query.data,
    // SDK가 아직 안 불려왔거나, 리액트 쿼리가 로딩 중일 때 전체를 '로딩 상태'로 정의
    isLoading: !isKakaoLoaded || query.isLoading
  };
};