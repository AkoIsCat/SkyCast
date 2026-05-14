import type { WeatherProps } from '../model/types';

export const getWeather = async ({ lat, lon }: WeatherProps) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${
      process.env.NEXT_PUBLIC_OPENWEATHERMAP_KEY
    }&units=metric`
  );

  if (!response.ok) {
    throw new Error('날씨 정보를 가져오는데 실패했습니다.');
  }

  return response.json();
};
