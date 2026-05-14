'use client'
import { useMemo } from 'react';
import type { WeatherData } from './types';

export const useWeatherDetail = (weatherData: WeatherData) => {
  return useMemo(() => {
    if (!weatherData) return null;

    const current = weatherData.current;
    const todayDaily = weatherData.daily[0];

    return {
      currentTemp: Math.floor(current.temp),
      minTmp: Math.floor(todayDaily.temp.min),
      maxTmp: Math.floor(todayDaily.temp.max),
      condition: {
        icon: current.weather[0]?.icon,
        description: current.weather[0]?.description,
      },
      hourly: weatherData.hourly,
    };
  }, [weatherData]);
};
