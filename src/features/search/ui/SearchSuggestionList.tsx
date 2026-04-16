'use client';

import { SearchSuggestionItem } from '@/entities/search/ui/SearchSuggestionItem';
import { useWeatherStore } from '@/entities/weather/model/useWeatherStore';
import { useRouter } from 'next/navigation';
import type { SearchSuggestionListType } from '@/features/search/model/types';

export const SearchSuggestionList = ({
  data,
  setIsOpen,
  setSearchValue,
}: SearchSuggestionListType) => {
  const { setCurrentLocation } = useWeatherStore();
  const router = useRouter();

  const onClickItem = (location: string) => {
    setCurrentLocation(location);
    router.push(`/?location=${location}`);
    setIsOpen(false);
    setSearchValue('');
  };

  return (
    <ul
      className="
      bg-white
      absolute left-0 right-0 top-full
      rounded-b-2xl
      shadow-[0_8px_16px_-4px_rgba(0,0,0,0.12)]
      py-2
      z-50
      overflow-y-auto
      max-h-96
      rounded-3xl
    "
    >
      {data.length > 0 &&
        data.map((item) => (
          <SearchSuggestionItem
            key={item}
            location={item}
            onClick={onClickItem}
          />
        ))}

      {data.length === 0 && (
        <SearchSuggestionItem location={''} onClick={() => {}} />
      )}
    </ul>
  );
};