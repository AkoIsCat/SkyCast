import { useQuery } from '@tanstack/react-query';
import { getAddress } from '@/entities/address/api/getAddress';

export const useAddress = (coords: [number, number] | undefined) => {
  console.log(
    process.env.NEXT_PUBLIC_KAKAO_REST_KEY,
    '카카오 키'
  );

  const query = useQuery({
    queryKey: ['address', coords],

    queryFn: async () => {
      if (!coords) {
        throw new Error('Coords is required');
      }

      console.log('좌표 전달:', coords);

      try {
        const response = await getAddress(coords);

        console.log('카카오 API 응답:', response);
        console.log('응답 길이:', response?.length);

        return response;
      } catch (error) {
        console.error('카카오 API 에러:', error);
        throw error;
      }
    },

    enabled: !!coords,

    select: (data) => {
      console.log('select 이전 데이터:', data);

      return data?.[0] ?? null;
    },

    retry: false,
  });

  console.log('최종 data:', query.data);
  console.log('query error:', query.error);
  console.log('query status:', query.status);

  return query.data;
};