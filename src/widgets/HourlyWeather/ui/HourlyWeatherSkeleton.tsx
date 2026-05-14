'use client'
import Skeleton from 'react-loading-skeleton';
import { Card } from '../../../shared';

export const HourlyWeatherSkeleton = () => {
  return (
    <section className="lg:col-span-8 px-4 lg:pr-10">
      <Card width="hourlyDesktop">
        <div className="px-6 pb-4 pt-6">
          <Skeleton width={120} height={24} />
        </div>
        <div className="flex gap-6 px-6 overflow-hidden">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Skeleton width={40} height={20} />
                <Skeleton width={60} height={80} borderRadius={12} />
                <Skeleton width={50} height={20} />
              </div>
            ))}
        </div>
      </Card>
    </section>
  );
};
