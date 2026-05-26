'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAddress } from '@/entities/address/api/getAddress';

export const useAddress = (coords: [number, number] | undefined) => {
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. 이미 로드되어 있는 경우
    if (window.kakao?.maps) {
      setIsKakaoLoaded(true);
      return;
    }

    // 2. 배포 환경에서 스크립트 로드가 늦어지는 경우를 대비한 폴링(Polling) 안전장치
    const interval = setInterval(() => {
      if (window.kakao?.maps) {
        setIsKakaoLoaded(true);
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const { data } = useQuery({
    queryKey: ['address', coords],
    queryFn: () => {
      if (!coords) throw new Error('Coords is required');
      return getAddress(coords);
    },
    // ✅ 좌표가 있고, '카카오 SDK가 완전히 로드되었을 때만' 쿼리를 활성화합니다.
    enabled: !!coords && isKakaoLoaded,
    select: (data) => data?.[0] ?? null,
  });

  return data;
};