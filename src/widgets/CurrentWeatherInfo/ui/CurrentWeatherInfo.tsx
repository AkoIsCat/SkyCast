import type { FavoriteStateType } from '@/features/favorite/model/types';
import { Card } from '../../../shared';
import { CurrentLocation } from '@/entities/address/ui/CurrentLocation';
import { CurrentWeather } from '../../../entities/weather/ui/CurrentWeather';
import type { CurrentWeatherInfoType } from '@/widgets/CurrentWeatherInfo/model/types';
import { ToggleFavoriteButton } from '../../../features/favorite/ui/ToggleFavoriteButton';


export const CurrentWeatherInfo = ({
  address,
  weatherIcon,
  curTmp,
  minTmp,
  maxTmp,
  currentLocation,
  lat,
  lon,
}: CurrentWeatherInfoType) => {
  const alias = `${address.district ?? ''} ${address.neighborhood ?? ''} ${
    address.village ?? ''
  }`;

  const favoriteData: FavoriteStateType = {
    location: currentLocation,
    alias,
    lat,
    lon,
  };

  return (
    <section className="lg:col-span-4 px-4 lg:px-10">
      <Card width="currentDesktop">
        <CurrentLocation
          district={address.district ?? ''}
          neighborhood={address.neighborhood ?? ''}
          village={address.village ?? ''}
          favoriteWeatherData={favoriteData}
          favoriteButtonSlot={
            <ToggleFavoriteButton favoriteWeatherData={favoriteData} />
          }
        />
        <CurrentWeather
          weatherIcon={{
            icon: weatherIcon.icon,
            description: weatherIcon.description,
            width: 'current',
          }}
          curTmp={curTmp}
          minTmp={minTmp}
          maxTmp={maxTmp}
        />
      </Card>
    </section>
  );
};
