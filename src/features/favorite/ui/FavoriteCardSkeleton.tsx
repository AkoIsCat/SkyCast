import Skeleton from 'react-loading-skeleton';
import { Card } from '../../../shared';

export const FavoriteCardSkeleton = () => {
  return (
    <Card width="favoriteCard">
      <div className="flex justify-between">
        <div className="flex flex-col gap-3">
          {/* 별칭과 편집 아이콘 영역 */}
          <div className="flex items-center gap-2">
            <Skeleton width={80} height={20} />
            <Skeleton circle width={16} height={16} />
          </div>
          {/* 현재 온도 */}
          <Skeleton width={60} height={48} />
        </div>
        
        {/* 날씨 아이콘 */}
        <Skeleton width={60} height={60} borderRadius={8} />
      </div>

      {/* 하단 최저/최고 온도 */}
      <div className="flex gap-2 mt-2">
        <Skeleton width={100} height={16} />
      </div>
    </Card>
  );
};