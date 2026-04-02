import type { PropsWithChildren, SetStateAction } from 'react';

export type CardWidth =
  | 'mobile' // 모바일 전체폭 카드
  | 'currentDesktop' // 데스크탑: 현재날씨(좌측)
  | 'hourlyDesktop' // 데스크탑: 시간대별날씨(우측)
  | 'favoriteDesktop' // 데스크탑: 즐겨찾기(하단)
  | 'favoriteItem' // 즐겨찾기 항목 아이템
  | 'hourlyItem' // 시간대 별 기온 아이템
  | 'tempStatItem' // 최고/최저 기온 아이템
  | 'favoriteCard'; // 즐겨찾기 카드 아이템

export type CardShadow = 'hourlyItem' | 'default';

export type CardProps = PropsWithChildren<{
  width?: CardWidth;
  shadow?: 'hourlyItem' | 'default';
}>;

export type WeatherIconType = {
  description: string;
  icon: string;
  width: 'hourly' | 'favorite' | 'current';
};

export type InputType = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export interface SearchInputType {
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  isValidSearch: boolean;
}
