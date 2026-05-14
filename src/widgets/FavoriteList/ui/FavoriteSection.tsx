import { Card } from '../../../shared';
import { FavoriteList } from './FavoriteList';

export const FavoriteSection = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <section className="lg:col-span-12 px-4 pb-4 lg:px-10">
      <Card width="favoriteItem">
        <p className="pb-4 text-xl">즐겨찾기</p>
        <div className="flex flex-wrap gap-4">
          <FavoriteList isLoading={isLoading} />
        </div>
      </Card>
    </section>
  );
};
