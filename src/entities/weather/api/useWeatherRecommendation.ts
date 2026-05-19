import { useQuery } from '@tanstack/react-query';
import { fetchWeatherRecommendations } from './fetchWeatherRecommendations';

export const useWeatherRecommendation = (weatherData: any, location: string) => {
  return useQuery({
    queryKey: ['weatherAI', location, weatherData?.current?.temp],
    queryFn: () => fetchWeatherRecommendations(weatherData),
    // 💡 날씨의 '온도(temp)' 값이 확실하게 존재할 때만 딱 1번 실행되도록 엄격하게 제한
    enabled: !!weatherData?.current?.temp && !!location,
    staleTime: 1000 * 60 * 60, 
    retry: 1, 
  });
};