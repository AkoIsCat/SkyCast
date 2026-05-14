import { Card } from '../../../shared';

const data = {
  activity: {
    main: {
      title: '산책하기 좋아요',
      reason: '현재 기온 27도로 야외 활동에 적합하며, 바람이 선선해 쾌적한 산책이 가능합니다.',
      tip: '자외선 지수가 높으니 선크림을 꼭 바르세요!',
    },
    sub: '자전거 타기',
  },
};

export const RecommendedActivitiesSection = () => {
  return (
    <section className="col-span-12 px-4 pb-4 lg:col-span-6 lg:px-1">
  <Card width="recommended">
    <div className="rounded-[28px] bg-white px-5 py-6 lg:px-8 lg:py-7">
      
      {/* 헤더 */}
      <div className="flex items-center gap-3 lg:gap-4">

        <p className="text-xl font-bold text-gray-900 lg:text-[32px]">
          오늘의 추천 활동
        </p>
      </div>

      {/* content */}
      <div className="mt-6 flex flex-col gap-6 lg:mt-8 lg:grid lg:grid-cols-[1fr_200px] lg:gap-8">
        
        {/* 메인 추천 */}
        <div className="lg:pr-8 lg:border-r lg:border-dashed lg:border-gray-200">
          
          {/* badge */}
          <span className="inline-block rounded-full bg-[#DCEDC8] px-3 py-1 text-xs font-semibold text-green-700 lg:text-sm">
            메인 추천
          </span>

          {/* title */}
          <p className="mt-3 text-xl font-bold text-gray-900 lg:mt-5 lg:text-[36px]">
            산책하기 좋아요
          </p>

          {/* desc */}
          <p className="mt-3 text-sm text-gray-500 leading-relaxed lg:mt-5 lg:text-lg">
            현재 기온 27도로 야외 활동에 적합하며,
            바람이 선선해 쾌적한 산책이 가능합니다.
          </p>

          {/* tip */}
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#DCEDC8] px-3 py-2 lg:mt-8 lg:gap-3 lg:px-5 lg:py-4">
            <span className="rounded-md bg-[#F1F8E9] px-2 py-1 text-xs font-bold text-green-800 lg:px-3 lg:py-1">
              TIP
            </span>

            <p className="text-xs text-gray-700 lg:text-base">
              자외선 지수가 높으니 선크림을 꼭 바르세요!
            </p>
          </div>
        </div>

        {/* 추가 추천 */}
        <div className="flex flex-col gap-2 lg:justify-start">
          <span className="inline-block w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 lg:text-sm">
            추가 추천
          </span>

          <p className="text-lg font-bold text-gray-900 lg:mt-6 lg:text-2xl">
            자전거 타기
          </p>
        </div>

      </div>
    </div>
  </Card>
</section>
  );
};