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

export default function Home() {

    const { coords, coordsResult } = useCoords();
    const address = useAddress(coords);

    const router = useRouter(); // 1. useNavigate 대신 useRouter 사용
  const searchParams = useSearchParams(); // 2. 구조 분해 없이 그대로 호출
  
  // 3. searchParams.get()은 동일하게 작동합니다.
  const locationParam = searchParams?.get('location');
  
  const { currentLocation, setCurrentLocation } = useWeatherStore();
  
  // locationParam이 null일 수 있으므로 기본값 처리를 유지합니다.
  const coordsData = useAddressToCoords(locationParam || '');

  useEffect(() => {
    // 1. URL에 location 파라미터가 아예 없을 때 (초기 접속 시)
    if (!locationParam && address?.address_name) {
      router.push(`/?location=${encodeURIComponent(address.address_name)}`);
      setCurrentLocation(address.address_name);
    }

    // 2. URL에 location 파라미터가 존재할 때 (그 값을 스토어에 동기화)
    // location이 string 타입일 때만 실행되도록 보장합니다.
    if (typeof locationParam === 'string') {
      setCurrentLocation(locationParam);
    }
  }, [locationParam, address, router, setCurrentLocation]);

  // 3. 좌표 계산 로직 (숫자 형변환 및 기본값 처리)
  const lat = coordsData?.[0]
    ? Number(coordsData[0].y)
    : coords?.[0] ?? 0;
    
  const lon = coordsData?.[0]
    ? Number(coordsData[0].x)
    : coords?.[1] ?? 0;

  // 4. 날씨 데이터 및 가공 데이터
  const { data: weather } = useWeather(lat, lon);
  const weatherDetail = useWeatherDetail(weather); 
  const parsedAddress = useParsedAddress(currentLocation);
  
  const isLoading = !weather;

   const { data: llmData, isLoading: llmIsLoading, isError: llmIsError } = useWeatherRecommendation(
    weather,
    locationParam!
  );
  console.log(llmData)


  return (
     <main className="w-screen min-h-screen flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-8 lg:px-0 lg:items-start box-border bg-[#F7F7FA]">
      {/* 상단 영역 */}
      {/* 모바일에서는 세로 배치, 데스크탑에서는 가로 배치 */}
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
      {/* 현재 날씨 */}
      {coordsResult?.status !== 'unavailable' && (
        <>
          {!weatherDetail ? (
            <CurrentWeatherInfoSkeleton />
          ) : (
            <CurrentWeatherInfo
              weatherIcon={{ ...weatherDetail.condition, width: 'current' }}
              curTmp={Math.floor(weather?.current.temp)}
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
          <TodayClothesSection isLoading={true} />

          {/* 오늘의 추천 활동 */}
          <RecommendedActivitiesSection />
        </>
      )}
    </main>
  );
}
