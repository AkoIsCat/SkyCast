'use client'
import type { SuggestionItemType } from '@/entities/search/model/types';

export const SearchSuggestionItem = ({
  location,
  onClick,
}: SuggestionItemType) => {
  return (
    <li
      className="hover:bg-[#f1e7df] px-10 h-10 flex items-center hover:cursor-pointer"
      onClick={() => onClick(location)}
    >
      {location.length > 0 ? location : '검색 결과 없음'}
    </li>
  );
};
