import { create } from 'zustand';
import type { WeatherState, WeatherAction } from '@/entities/weather/model/types';

export const useWeatherStore = create<WeatherState & WeatherAction>((set) => ({
  currentLocation: '',
  setCurrentLocation: (location: string) =>
    set(() => ({ currentLocation: location })),
}));
