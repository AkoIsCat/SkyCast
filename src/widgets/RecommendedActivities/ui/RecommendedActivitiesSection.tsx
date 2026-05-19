import { Card } from '../../../shared';

type ActiveData = {
  main: {
    title: string;
    reason: string;
    tip: string;
  },
  sub: string;
}

interface RecommendedActivitiesProps {
  activeData?: ActiveData | null;
  isLoading: boolean; // 💡 로딩 상태 추가
}

export const RecommendedActivitiesSection = ({ activeData, isLoading }: RecommendedActivitiesProps) => {
  return (
    <section className="col-span-12 px-4 pb-4 lg:col-span-6 lg:pl-4 lg:pr-10">
      <Card width="recommended">
        <div className="rounded-[28px] bg-white px-5 py-6 lg:px-8 lg:py-7 min-h-85 flex flex-col">
          
          {/* 헤더 - 로딩 중이어도 틀 유지를 위해 고정 노출 */}
          <div className="flex items-center gap-3 lg:gap-4">
            <p className="text-xl font-bold text-gray-900 lg:text-[32px]">
              오늘의 추천 활동
            </p>
          </div>

          {/* content */}
          {isLoading ? (
            // 💡 테일윈드 로딩 스피너 영역
            <div className="flex-1 flex flex-col items-center justify-center py-12 gap-3">
              <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-400 text-sm font-medium animate-pulse">추천 활동 분석 중...</p>
            </div>
          ) : (
            // 💡 기존 데이터 출력 영역
            <div className="mt-6 flex flex-col gap-6 lg:mt-8 lg:grid lg:grid-cols-[1fr_200px] lg:gap-8 flex-1">
              {/* 메인 추천 */}
              <div className="lg:pr-8 lg:border-r lg:border-dashed lg:border-gray-200">
                <span className="inline-block rounded-full bg-[#DCEDC8] px-3 py-1 text-xs font-semibold text-green-700 lg:text-sm">
                  메인 추천
                </span>
                <p className="mt-3 text-xl font-bold text-gray-900 lg:mt-5 lg:text-[36px]">
                  {activeData?.main.title}
                </p>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed lg:mt-5 lg:text-lg">
                  {activeData?.main.reason}
                </p>
                <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#DCEDC8] px-3 py-2 lg:mt-8 lg:gap-3 lg:px-5 lg:py-4">
                  <span className="rounded-md bg-[#F1F8E9] px-2 py-1 text-xs font-bold text-green-800 lg:px-3 lg:py-1">
                    TIP
                  </span>
                  <p className="text-xs text-gray-700 lg:text-base">
                    {activeData?.main.tip}
                  </p>
                </div>
              </div>

              {/* 추가 추천 */}
              <div className="flex flex-col gap-2 lg:justify-start">
                <span className="inline-block w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 lg:text-sm">
                  추천 서브 활동
                </span>
                <p className="text-lg font-bold text-gray-900 lg:mt-6 lg:text-2xl">
                  {activeData?.sub}
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </section>
  );
};