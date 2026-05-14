import { WeatherIcon } from '../../../shared';
import type { CurrentWeatherType } from '@/entities/weather/model/types';
import { CurrentTmp,  } from '@/entities/weather/ui/CurrentTmp';
import { TodayTmp } from '@/entities/weather/ui/TodayTmp';

export const CurrentWeather = ({
  weatherIcon,
  curTmp,
  maxTmp,
  minTmp,
}: CurrentWeatherType) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-2/3 flex justify-around items-center my-12">
        <div>
          <WeatherIcon
            icon={weatherIcon.icon}
            description={weatherIcon.description}
            width="current"
          />
        </div>
        <CurrentTmp curTmp={curTmp} />
      </div>
      <div className="flex gap-2 lg:w-full lg:gap-7">
        <TodayTmp type="max" minTmp={maxTmp} />
        <TodayTmp type="min" minTmp={minTmp} />
      </div>
    </div>
  );
};
