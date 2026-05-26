'use client'
import { Logo } from "@/shared";
import { SearchBar } from "@/features/search/ui/SearchBar";
import { Card } from "@/shared";
import { CurrentWeatherInfoSkeleton } from "@/widgets/CurrentWeatherInfo/ui/CurrentWeatherInfoSkeleton";
import { CurrentWeatherInfo } from "@/widgets/CurrentWeatherInfo/ui/CurrentWeatherInfo";
import { HourlyWeatherSkeleton } from "@/widgets/HourlyWeather/ui/HourlyWeatherSkeleton";
import { HourlyWeatherSection } from "@/widgets/HourlyWeather/ui/HourlyWeatherSection";
import { FavoriteSection } from "@/widgets/FavoriteList/ui/FavoriteSection";

import { useCoords } from "@/entities/coords/model/useCoords";
import { useAddress } from "@/entities/address/model/useAddress";
import { useWeatherStore } from "@/entities/weather/model/useWeatherStore";
import { useWeather } from "@/entities/weather/model/useWeather";
import { useParsedAddress } from "@/entities/address/model/useParsedAddress";
import { useWeatherDetail } from "@/entities/weather/model/useWeatherDetail";
import { useAddressToCoords } from "@/entities/address/model/useAddressToCoords";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { TodayClothesSection } from "@/widgets/TodayClothes/ui/TodayClothesSection";
import { RecommendedActivitiesSection } from "@/widgets/RecommendedActivities/ui/RecommendedActivitiesSection";
import { useWeatherRecommendation } from "@/entities/weather/api/useWeatherRecommendation";


export default function HomeContent() {
  const { coords, coordsResult } = useCoords();
  const address = useAddress(coords);

  const router = useRouter(); 
  const searchParams = useSearchParams(); 
  
  const locationParam = searchParams?.get('location');
  
  // 💡 무한 루프 방지를 위해 현재 스토어에 저장된 값(currentLocation)도 함께 가져옵니다.
  const { currentLocation, setCurrentLocation } = useWeatherStore();
  
  const coordsData = useAddressToCoords(locationParam || '');

  // 💡 [수정] URL 파라미터 동기화 로직 최적화
  useEffect(() => {
    // 1. URL에 파라미터가 없고 현재 내 위치 주소가 로드되었을 때 (최초 1번만 진입)
    if (!locationParam && address?.address_name) {
      router.push(`/?location=${encodeURIComponent(address.address_name)}`);
      setCurrentLocation(address.address_name);
      return; // 실행 후 즉시 종료해서 아래 로직 타지 않게 방어
    }

    // 2. URL 파라미터가 존재하고, '그 값이 현재 스토어의 값과 다를 때만' 스토어를 갱신합니다. (★핵심 잠금장치)
    if (typeof locationParam === 'string' && locationParam !== currentLocation) {
      setCurrentLocation(locationParam);
    }
  }, [locationParam, address?.address_name, currentLocation, router, setCurrentLocation]); 
  // 💡 의존성 배열에서 객체 전체인 'address' 대신 원시값인 'address.address_name'만 바라보게 하여 참조값 버그를 파괴합니다.

  const lat = coordsData?.[0]
    ? Number(coordsData[0].y)
    : coords?.[0] ?? 0;
    
  const lon = coordsData?.[0]
    ? Number(coordsData[0].x)
    : coords?.[1] ?? 0;

  const { data: weather } = useWeather(lat, lon);
  const weatherDetail = useWeatherDetail(weather); 
  const parsedAddress = useParsedAddress(currentLocation);
  
  const isLoading = !weather;

  // 💡 제미나이 호출 훅 (위에서 무한 렌더링을 잡았기 때문에 이제 딱 1번만 예쁘게 작동합니다)
const { data: llmData, isLoading: llmIsLoading } =
  useWeatherRecommendation(
    weather,
    locationParam ?? ''
  );

  return (
     <main className="w-screen min-h-screen flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-8 lg:px-0 lg:items-start box-border bg-[#F7F7FA]">
      {/* 상단 영역 */}
      <div className="flex flex-col gap-2 lg:col-span-12 lg:grid lg:grid-cols-12 lg:items-center lg:border-b lg:border-[#E9E9E9] lg:pb-6 bg-[#FFFFFF]">
        <header className="lg:col-span-3 px-4 pt-3 lg:px-10">
          <Logo />
        </header>
        {/* 검색바 */}
        <section className="border-y border-[#E9E9E9] py-3 lg:col-span-6 lg:border-none lg:py-0 lg:pt-4 isolate z-50">
          <SearchBar />
        </section>
      </div>
      
      {coordsResult?.status === 'unavailable' && (
        <div className="w-125 lg:ml-162.5">
          <Card width="favoriteItem">
            <p>해당 장소의 정보가 제공되지 않습니다.</p>
          </Card>
        </div>
      )}
      
      {coordsResult?.status !== 'unavailable' && (
        <>
          {!weatherDetail ? (
            <CurrentWeatherInfoSkeleton />
          ) : (
            <CurrentWeatherInfo
              weatherIcon={{ ...weatherDetail.condition, width: 'current' }}
              curTmp={Math.floor(weather?.current?.temp ?? 0)}
              minTmp={weatherDetail?.minTmp ?? 0}
              maxTmp={weatherDetail?.maxTmp ?? 0}
              currentLocation={currentLocation}
              address={parsedAddress}
              lat={lat}
              lon={lon}
            />
          )}

          {/* 시간대별 날씨 */}
          {isLoading ? (
            <HourlyWeatherSkeleton />
          ) : (
            <HourlyWeatherSection data={weather?.hourly} />
          )}

          {/* 즐겨찾기 */}
          <FavoriteSection isLoading={isLoading} />

          {/* 오늘의 옷차림 */}
          <TodayClothesSection clothData={llmData?.clothing} isLoading={llmIsLoading} />

          {/* 오늘의 추천 활동 */}
          <RecommendedActivitiesSection activeData={llmData?.activity} isLoading={llmIsLoading} />
        </>
      )}
    </main>
  );
}