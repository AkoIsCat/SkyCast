import { useQuery } from '@tanstack/react-query';
import { fetchWeatherRecommendations } from './fetchWeatherRecommendations';

export const useWeatherRecommendation = (weatherData: any, location: string, isWeatherLoading: boolean) => {
  const roundedTemp = weatherData?.current?.temp ? Math.floor(weatherData.current.temp) : null;
  const weatherMain = weatherData?.current?.weather?.[0]?.main ?? '';

  return useQuery({
    queryKey: ['weatherAI', location, roundedTemp, weatherMain],
    queryFn: () => fetchWeatherRecommendations(weatherData),
    
    // 💡 잠금장치 대폭 강화
    enabled: 
      !isWeatherLoading &&          // 1. 날씨 로딩이 완전히 끝났고
      !!weatherData?.current?.temp && // 2. 온도가 실제로 존재하며
      !!location &&                 // 3. 주소 파라미터가 비어있지 않고
      weatherData.current.temp !== 0, // 4. 의미 없는 기본값(0도)이 아닐 때만 실행
      
    staleTime: 1000 * 60 * 60, // 1시간 캐싱
    refetchOnWindowFocus: false, // ✨ 마우스 커서 활성화/탭 전환 시 재요청 금지 (필수)
    retry: false, // 에러 발생 시 반복 재시도 금지
  });
};