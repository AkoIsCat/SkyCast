import type { CardProps, CardWidth, CardShadow } from '../model/types';

export const Card = ({
  children,
  width = 'mobile',
  shadow = 'default',
}: CardProps) => {
  // width 동적 css
  const widthClass: Record<CardWidth, string> = {
    // 모바일: 1열 100%
    mobile: 'w-full min-w-0 p-5 lg:p-6',

    // 데스크탑: 12컬럼 그리드 기준 (4/8/12)
    currentDesktop: 'w-full lg:col-span-4 min-w-0 p-5 lg:p-6 lg:min-h-80',
    hourlyDesktop: 'w-full lg:col-span-8 min-w-0 p-0 lg:p-0 lg:min-h-80',
    favoriteDesktop: 'w-full lg:col-span-12 min-w-0 p-5 lg:p-6',

    // 즐겨찾기 지역 카드
    favoriteItem: 'w-full p-5 lg:p-6',
    // 즐겨찾기 카드 아이템
    favoriteCard:
      'w-full lg:w-[calc(16%-0.5rem)] p-5 lg:p-6  cursor-pointer min-h-20',

    // 시간대별 기온 카드
    hourlyItem: 'w-[80px] lg:w-[90px] min-w-0 min-h-30',

    // 최고 / 최저 기온 카드
    tempStatItem:
      'w-[125px] lg:w-[calc(50%-0.5rem)] h-[30px] min-w-0 flex justify-center items-center gap-3 p-5 lg:p-6',
  };

  // 그림자 동적 css
  const shadowClass: Record<CardShadow, string> = {
    default:
      'shadow-[0_18px_60px_rgba(15,23,42,0.08),0_2px_10px_rgba(15,23,42,0.06)]',
    hourlyItem: 'shadow-[0_2px_6px_rgba(15,23,42,0.08)]',
  };

  return (
    <div
      className={`${widthClass[width]} ${shadowClass[shadow]} rounded-3xl border border-black/5 bg-white/70 backdrop-blur-md shadow-[0_18px_60px_rgba(15,23,42,0.08),0_2px_10px_rgba(15,23,42,0.06)] ring-1 ring-white/40`}
    >
      {children}
    </div>
  );
};
