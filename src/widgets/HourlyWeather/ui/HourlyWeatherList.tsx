import { HourlyWeather } from '@/entities/weather/ui/HourlyWeather';
import type { WeatherData } from '@/entities/weather/model/types';
import { useHorizontalScroll } from '@/shared/model/useHorizontalScroll';

export const HourlyWeatherList = ({ data }: { data: WeatherData[] }) => {
  const scrollRef = useHorizontalScroll();
  return (
    <div
      ref={scrollRef}
      className="flex overflow-x-auto gap-5 lg:gap-10 px-6 pb-8"
    >
      {data?.map((item) => (
        <HourlyWeather key={item.dt} data={item} />
      ))}
    </div>
  );
};
