'use client'
import { useQuery } from '@tanstack/react-query';
import { getAddressToCoords } from '@/entities/address/api/getAddressToCoords';

interface AddressSearchResult {
  address_name: string;
  address_type: 'REGION' | 'ROAD' | 'REGION_ADDR' | 'ROAD_ADDR';
  x: string; // 경도
  y: string; // 위도
  address: any;
  road_address: any;
}

export const useAddressToCoords = (location: string) => {
  const { data } = useQuery<AddressSearchResult[]>({
    queryKey: ['search', location],
    queryFn: () => getAddressToCoords(location),
    enabled: !!location,
  });
  
  return data;
};
