'use client'
import { useQuery } from '@tanstack/react-query';
import { getWeather } from '@/entities/weather/api/getWeather';

export const useWeather = (lat: number, lon: number) => {
  return useQuery({
    queryKey: ['weather', lat, lon],
    queryFn: () => getWeather({ lat, lon }),
    enabled: !!lat && !!lon, // 좌표가 0이 아닐 때만 실행
    staleTime: 5 * 60 * 1000,
  });
};
