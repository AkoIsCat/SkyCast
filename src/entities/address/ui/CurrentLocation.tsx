import { LocationIcon } from '../../../shared';
import type { CurrentLocationProps } from '@/entities/address/model/types';

export const CurrentLocation = ({
  district,
  neighborhood,
  village,
  favoriteButtonSlot,
}: CurrentLocationProps) => {
  return (
    <div className="flex items-center text-xl">
      <div className="flex gap-2 items-center">
        <LocationIcon className="w-5 h-5 lg:w-6 lg:h-6" />
        <p>{district || '위치정보 로딩 중...'}</p>
        <p>{neighborhood}</p>
        <p>{village}</p>
      </div>
      {favoriteButtonSlot}
    </div>
  );
};
