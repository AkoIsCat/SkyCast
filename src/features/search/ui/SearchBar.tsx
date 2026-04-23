'use client'

import { SearchIcon } from '../../../shared';
import { SearchSuggestionList } from './SearchSuggestionList';
import { useState, useRef, useEffect } from 'react';
import { korea_districts } from '@/entities/address';
import { SearchInput } from './SearchInput';
import { useMemo } from 'react';

export const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const itemRef = useRef<HTMLDivElement>(null);

  const isValidSearch = searchValue.trim().length > 0;
  const filterLocation = useMemo(
    () => korea_districts.filter((item: string) => item.includes(searchValue)),
    [searchValue]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 클릭된 요소가 itemRef 내부가 아니라면 닫음
      if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // 전역 document에 이벤트 리스너 등록
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // 컴포넌트 언마운트 시 리스너 제거
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={itemRef} className="relative flex items-center z-0 px-4">
      <div className="absolute z-10 left-7">
        <SearchIcon className="w-7 h-7 lg:w-7 lg:h-7" />
      </div>
      <div className="relative w-full">
        <SearchInput
          value={searchValue}
          setValue={setSearchValue}
          setIsOpen={setIsOpen}
          isValidSearch={isOpen}
        />
        {isValidSearch && isOpen && (
          <div className="absolute left-0 right-0 top-full z-20">
            <SearchSuggestionList
              data={filterLocation}
              setIsOpen={setIsOpen}
              setSearchValue={setSearchValue}
            />
          </div>
        )}
      </div>
    </div>
  );
};
