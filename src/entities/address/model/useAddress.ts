import { useQuery } from '@tanstack/react-query';
import { getAddress } from '@/entities/address/api/getAddress';

export const useAddress = (coords: [number, number] | undefined) => {
  console.log(process.env.NEXT_PUBLIC_KAKAO_REST_KEY, '카카오 키');
  const { data } = useQuery({
    queryKey: ['address', coords],
    queryFn: () => {
      if (!coords) throw new Error('Coords is required');
      return getAddress(coords);
    },
    enabled: !!coords,
    select: (data) => data[0],
  });
  return data;
};
