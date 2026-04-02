'use client';
// 이벤트, 상태가 있으면 무조건 클라이언트 컴포넌트 지정 필요.

import type { InputType } from '../model/types';

export const Input = ({
  value,
  onChange,
  onKeyDown,
}: InputType) => {
  return (
    <input
      type="text"
      className={[
        'w-full h-12 lg:h-14',
        'px-5 pl-12',
        'text-sm lg:text-base text-slate-800 placeholder:text-slate-400',
        'outline-none transition',
        'bg-white',
        'border border-black/5 ring-1 ring-white/40',
        'rounded-3xl',
      ].join(' ')}
      placeholder="지역을 검색하세요..."
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};