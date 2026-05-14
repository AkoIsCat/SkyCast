import { Card } from '../../../shared';
import { WeatherIcon } from '../../../shared';
import { formatWeatherDateTime } from '@/entities/weather/lib/formatWeatherDateTime';
import type { WeatherData } from '../model/types';

export const HourlyWeather = ({ data }: { data: WeatherData }) => {
  const days = formatWeatherDateTime(data.dt);

  return (
    <div className="flex flex-col justify-center items-center">
      <p>{days.time}</p>
      <Card width="hourlyItem" shadow="hourlyItem">
        <div className="flex flex-col justify-center items-center">
          <WeatherIcon
            icon={data.weather[0].icon}
            description={data.weather[0].description}
            width="hourly"
          />
          <p className="text-2xl mb-5">{Math.floor(data.temp)}°</p>
        </div>
      </Card>
      <p>{days.date}</p>
    </div>
  );
};
