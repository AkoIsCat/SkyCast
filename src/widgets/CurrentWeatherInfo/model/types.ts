import type { AddressType } from '@/entities/address/model/types';
import type { WeatherIconType } from '../../../shared';

export type CurrentWeatherInfoType = {
  currentLocation: string;
  address: AddressType;
  weatherIcon: WeatherIconType;
  curTmp: number;
  minTmp: number;
  maxTmp: number;
  lat: number;
  lon: number;
};
