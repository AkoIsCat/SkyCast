'use client';

import { WeatherIcon, Card, PencilIcon } from '../../../shared';
import { CurrentTmp } from '@/entities/weather/ui/CurrentTmp';
import type { FavoriteStateType } from '../model/types';
import { useFavoriteStore } from '@/features/favorite/model/favoriteStore';
import { useWeather } from '@/entities/weather/model/useWeather';
import { useWeatherDetail } from '@/entities/weather/model/useWeatherDetail';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const FavoriteCard = ({
  location,
  alias,
  lat,
  lon,
}: FavoriteStateType) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newAlias, setNewAlias] = useState(alias);

  const router = useRouter();
  const { updateLocationName } = useFavoriteStore();

  const {data : weather} = useWeather(lat, lon);
  const weatherDetail = useWeatherDetail(weather);


  const onClickEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const onSave = () => {
    updateLocationName(newAlias, location);
    setIsEditing(false);
  };

  return (
    <Card width="favoriteCard">
      <div
        className="flex justify-between cursor-pointer"
        onClick={() => {
          router.push(`/?location=${location}`);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <div className="flex flex-col gap-3 lg:gap-0">
          <div className="flex items-center gap-2">
            {isEditing ? (
              <input
                autoFocus
                value={newAlias}
                onChange={(e) => setNewAlias(e.target.value)}
                onBlur={onSave}
                onKeyDown={(e) => e.key === 'Enter' && onSave()}
                onClick={(e) => e.stopPropagation()}
                className="bg-gray-100 border rounded px-1 text-black w-30"
              />
            ) : (
              <>
                <p className="text-lg">{alias}</p>
                <PencilIcon onClick={onClickEdit} className='w-[15px] h-[15px]'/>
              </>
            )}
          </div>

          <CurrentTmp curTmp={Math.floor(weather?.current.temp ?? 0)} />
        </div>

        <WeatherIcon
          icon={weather?.current.weather[0]?.icon}
          description={weather?.current.weather[0]?.description}
          width="favorite"
        />
      </div>

      <div className="flex gap-2 text-xs">
        <span>최고 {weatherDetail?.maxTmp ?? '-'}° |</span>
        <span>최저 {weatherDetail?.minTmp ?? '-'}°</span>
      </div>
    </Card>
  );
};