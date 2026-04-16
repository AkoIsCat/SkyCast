import type { WeatherIconType } from '../../../shared';

export type WeatherProps = {
  lat: number;
  lon: number;
};

export type Coords = [number, number] | undefined;

export type TodayTmpType = {
  type: 'max' | 'min';
  maxTmp?: number;
  minTmp?: number;
};

export type CurrentTmpType = {
  curTmp: number;
};

type CurrentWeatherDataType = {
  dt: number;
  dt_txt: string;
  temp: number;
  weather: {
    icon: string;
    description: string;
  }[];
};

type DailyANDHourlyWeatherType = {
  dt: number;
  dt_txt: string;
  temp: {
    min: number;
    max: number;
  };
  main: {
    temp: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
};

export type WeatherData = {
  dt: number;
  temp: number;
  weather: {
    icon: string;
    description: string;
  }[];
  current: CurrentWeatherDataType;
  daily: DailyANDHourlyWeatherType[];
  hourly: DailyANDHourlyWeatherType[];
  // ... 기타 필드
};

export type WeatherState = {
  currentLocation: string;
};

export type WeatherAction = {
  setCurrentLocation: (location: string) => void;
};

export type CurrentWeatherType = {
  weatherIcon: WeatherIconType;
  curTmp: number;
  maxTmp: number;
  minTmp: number;
};
