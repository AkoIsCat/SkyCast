import { useQuery } from '@tanstack/react-query';
import { getAddress } from '@/entities/address/api/getAddress';

export const useAddress = (coords: [number, number] | undefined) => {
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
