import { FavoriteCard } from '@/features/favorite/ui/FavoriteCard';
import { useFavoriteStore } from '@/features/favorite/model/favoriteStore';
import { Card } from '../../../shared';
import { FavoriteCardSkeleton } from '@/features/favorite/ui/FavoriteCardSkeleton';

export const FavoriteList = ({ isLoading }: { isLoading: boolean }) => {
  const { favoriteLocationList } = useFavoriteStore();

  // 로딩 중일 때 3개 정도의 스켈레톤 표시
  if (isLoading) {
    return (
      <>
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <FavoriteCardSkeleton key={i} />
          ))}
      </>
    );
  }

  if (favoriteLocationList.length === 0) {
    return (
      <Card width="mobile">자주 확인하는 지역을 즐겨찾기에 추가해보세요!</Card>
    );
  }

  return favoriteLocationList.map((item) => (
    <FavoriteCard
      key={item.location}
      location={item.location}
      alias={item.alias}
      lat={item.lat}
      lon={item.lon}
    />
  ));
};
