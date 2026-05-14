import { Card } from '../../../shared';

const clothingData = {
  summary: '일교차가 큰 날씨에 대비한 레이어드 룩',
  items: [
    { name: '가디건', style: '베이지 톤의 얇은 니트 가디건' },
    { name: '긴팔', style: '흰색 무지 면 티셔츠' },
    { name: '청바지', style: '여유로운 핏의 연청 데님' },
  ],
};

export const TodayClothesSection = ({
  isLoading,
}: {
  isLoading: boolean;
}) => {
  return (
    <section className="col-span-12 px-4 pb-4 lg:col-span-6 lg:px-10">
  <Card width="recommended">
    <div className="rounded-[28px] bg-white px-5 py-6 lg:px-8 lg:py-7">
      
      {/* 제목 */}
      <p className="text-xl font-bold text-gray-900 lg:text-[32px]">
        오늘의 옷차림
      </p>

      {/* 설명 */}
      <p className="mt-2 text-sm text-gray-500 lg:mt-3 lg:text-lg">
        {clothingData.summary}
      </p>

      {/* divider */}
      <div className="my-5 border-t border-dashed border-gray-200 lg:my-8" />

      {/* 아이템 영역 */}
      <div className="
        flex flex-col divide-y divide-gray-100
        lg:grid lg:grid-cols-3 lg:divide-y-0
      ">
        {clothingData.items.map((item, index) => <div key={item.name} className="flex items-center justify-between py-4 lg:block lg:px-6 lg:border-r lg:border-gray-100">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DCEDC8] text-xs font-bold text-black lg:h-10 lg:w-10 lg:text-lg">
              {index+1}
            </span>
            <span className="text-base font-semibold lg:text-[28px]">
              {item.name}
            </span>
          </div>

          <p className="text-sm text-gray-500 lg:mt-6 lg:text-lg">
            {item.style}
          </p>
        </div>)}

      </div>
    </div>
  </Card>
</section>
  );
};