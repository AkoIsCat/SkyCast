'use client'
import Skeleton from 'react-loading-skeleton';
import { Card } from '../../../shared';

export const CurrentWeatherInfoSkeleton = () => {
  return (
    <section className="lg:col-span-4 px-4 lg:px-10">
      <Card width="currentDesktop">
        <div className="flex flex-col gap-6">
          {/* 위치 정보 줄 */}
          <div className="flex items-center gap-2">
            <Skeleton circle width={24} height={24} />
            <Skeleton width={150} height={24} />
          </div>

          {/* 중앙 날씨 아이콘과 온도 */}
          <div className="flex flex-col items-center gap-4 py-4">
            <Skeleton width={100} height={100} />
            <Skeleton width={80} height={60} />
          </div>

          {/* 하단 최저/최고 온도 버튼 모양 */}
          <div className="flex gap-4 w-full">
            <Skeleton
              containerClassName="flex-1"
              height={40}
              borderRadius={20}
            />
            <Skeleton
              containerClassName="flex-1"
              height={40}
              borderRadius={20}
            />
          </div>
        </div>
      </Card>
    </section>
  );
};
