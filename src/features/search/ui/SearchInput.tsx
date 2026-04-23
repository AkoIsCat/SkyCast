'use client'
import { useMemo, useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { Input } from '../../../shared';
import type { SearchInputType } from '../../../shared/model/types';

export const SearchInput = ({
  value,
  setValue,
  setIsOpen,
}: SearchInputType) => {
  // 내부 로컬 상태. 사용자의 타이핑을 지연 없이 즉시 반영
  const [localValue, setLocalValue] = useState(value);

  // 리렌더링되어도 debounce가 유지되게 함
  const debouncedSetValue = useMemo(
    () =>
      debounce((newValue: string) => {
        setValue(newValue); // 실제 외부의 상태를 업데이트
      }, 300), // 300ms 지연
    [setValue]
  );

  // input의 값이 바뀔 때 실행되는 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value;
    setLocalValue(nextValue); // UI는 즉시 업데이트
    setIsOpen(nextValue.length > 0);
    debouncedSetValue(nextValue); // 필터링 로직은 0.3초 뒤에 실행
  };

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <Input
      value={localValue}
      onChange={handleChange}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
          setValue('');
        }
      }}
    />
  );
};
