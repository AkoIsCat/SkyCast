import { Card } from '../../../shared';

type ClothData = {
  summary: string;
  items: { name: string; style: string; }[];
}

interface TodayClothesProps {
  clothData?: ClothData | null;
  isLoading: boolean; // 💡 로딩 상태 추가
}

export const TodayClothesSection = ({ clothData, isLoading }: TodayClothesProps) => {
  return (
    <section className="col-span-12 px-4 pb-4 lg:col-span-6 lg:px-10">
      <Card width="recommended">
        <div className="rounded-[28px] bg-white px-5 py-6 lg:px-8 lg:py-7 min-h-[340px] flex flex-col">
          
          {/* 제목 */}
          <p className="text-xl font-bold text-gray-900 lg:text-[32px]">
            오늘의 옷차림
          </p>

          {isLoading ? (
            // 💡 테일윈드 로딩 스피너 영역
            <div className="flex-1 flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-400 text-sm font-medium animate-pulse">알맞은 코디 매칭 중...</p>
            </div>
          ) : (
            // 💡 기존 데이터 출력 영역
            <div className="flex-1 flex flex-col">
              {/* 설명 */}
              <p className="mt-2 text-sm text-gray-500 lg:mt-3 lg:text-lg">
                {clothData?.summary}
              </p>

              {/* divider */}
              <div className="my-5 border-t border-dashed border-gray-200 lg:my-8" />

              {/* 아이템 영역 */}
              <div className="flex flex-col divide-y divide-gray-100 lg:grid lg:grid-cols-3 lg:divide-y-0">
                {clothData?.items.map((item, index) => (
                  // 💡 모바일에서는 flex-col, items-start로 변경하여 아래로 떨어지게 만듭니다.
                  <div 
                    key={item.name} 
                    className="flex flex-col items-start gap-2 py-4 lg:flex-row lg:items-center lg:justify-between lg:block lg:px-6 lg:border-r lg:border-gray-100 last:border-none"
                  >
                    {/* 1, 이름 영역 (모바일에서도 가로로 한 줄 유지) */}
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DCEDC8] text-xs font-bold text-black lg:h-10 lg:w-10 lg:text-lg">
                        {index + 1}
                      </span>
                      <span className="text-base font-semibold lg:text-[28px]">
                        {item.name}
                      </span>
                    </div>
                    
                    {/* 스타일 설명 영역 (모바일에서는 자연스럽게 아래 줄로 배치됨) */}
                    {/* pl-10을 주면 모바일에서 숫자 아이콘 두께만큼 들여쓰기가 되어 더 깔끔해집니다. 원치 않으시면 pl-0으로 바꾸셔도 됩니다. */}
                    <p className="pl-10 text-sm text-gray-500 lg:pl-0 lg:mt-6 lg:text-lg">
                      {item.style}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </section>
  );
};