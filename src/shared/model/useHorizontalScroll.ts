'use client'
import { useRef, useEffect } from 'react';

export const useHorizontalScroll = () => {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // 수직 휠 입력이 없으면 무시
      if (e.deltaY === 0) return;

      // 브라우저의 기본 세로 스크롤 방지
      e.preventDefault();

      // 수직 휠 움직임만큼 가로로 스크롤 이동
      el.scrollTo({
        left: el.scrollLeft + e.deltaY * 0.3, // 숫자를 곱해 속도 조절 가능
        behavior: 'smooth', // 부드러운 이동
      });
    };

    // 'passive: false'를 설정해야 e.preventDefault()가 작동합니다.
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return elRef;
};
