import type { WeatherData } from '@/entities/weather/model/types';
import { Card } from '../../../shared';
import { HourlyWeatherList } from './HourlyWeatherList';

export const HourlyWeatherSection = ({ data }: { data: WeatherData[] }) => {
  return (
    <section className="lg:col-span-8 px-4 lg:pr-10">
      <Card width="hourlyDesktop">
        <div className="px-6 pb-4 pt-6 text-xl">시간대 별 날씨</div>
        <HourlyWeatherList data={data} />
      </Card>
    </section>
  );
};
