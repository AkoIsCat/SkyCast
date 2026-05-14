import type { FavoriteStateType } from '@/features/favorite/model/types';

export type AddressType = {
  district: string;
  neighborhood: string;
  village: string;
};

export type CurrentLocationProps = AddressType & {
  favoriteWeatherData: FavoriteStateType;
  favoriteButtonSlot: React.ReactNode;
};
