import { useQuery } from '@tanstack/react-query';
import { fetchWeatherRecommendations } from './fetchWeatherRecommendations';

export const useWeatherRecommendation = (weatherData: any, location: string) => {
  return useQuery({
    queryKey: ['weatherAI', location],
    queryFn: () => fetchWeatherRecommendations(weatherData),
    enabled: !!weatherData,
    staleTime: 1000 * 60 * 60, // 1시간
  });
};