'use client';

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// 공유 및 기능 컴포넌트 (FSD 아키텍처 기준)
import { Logo } from "@/shared";
import { Card } from "@/shared";
import { SearchBar } from "@/features/search/ui/SearchBar";
import { CurrentWeatherInfoSkeleton } from "@/widgets/CurrentWeatherInfo/ui/CurrentWeatherInfoSkeleton";
import { CurrentWeatherInfo } from "@/widgets/CurrentWeatherInfo/ui/CurrentWeatherInfo";
import { HourlyWeatherSkeleton } from "@/widgets/HourlyWeather/ui/HourlyWeatherSkeleton";
import { HourlyWeatherSection } from "@/widgets/HourlyWeather/ui/HourlyWeatherSection";
import { FavoriteSection } from "@/widgets/FavoriteList/ui/FavoriteSection";
import { TodayClothesSection } from "@/widgets/TodayClothes/ui/TodayClothesSection";
import { RecommendedActivitiesSection } from "@/widgets/RecommendedActivities/ui/RecommendedActivitiesSection";

// 전역 상태 및 커스텀 훅
import { useCoords } from "@/entities/coords/model/useCoords";
import { useAddress } from "@/entities/address/model/useAddress";
import { useWeatherStore } from "@/entities/weather/model/useWeatherStore";
import { useWeather } from "@/entities/weather/model/useWeather";
import { useParsedAddress } from "@/entities/address/model/useParsedAddress";
import { useWeatherDetail } from "@/entities/weather/model/useWeatherDetail";
import { useAddressToCoords } from "@/entities/address/model/useAddressToCoords";
import { useWeatherRecommendation } from "@/entities/weather/api/useWeatherRecommendation";

export default function HomeContent() {
  // 1. 좌표 및 카카오 주소 정보 가져오기 (로딩 상태 포함)
  const { coords, coordsResult } = useCoords();
  const { data: address, isLoading: isAddressLoading } = useAddress(coords);

  const router = useRouter(); 
  const searchParams = useSearchParams(); 
  const locationParam = searchParams?.get('location');
  
  // 2. Zustand 스토어 및 검색된 주소 기반 좌표 변환
  const { currentLocation, setCurrentLocation } = useWeatherStore();
  const coordsData = useAddressToCoords(locationParam || '');

  // 3. URL 파라미터와 카카오 주소 데이터 동기화 (무한 루프 방지 잠금장치)
  useEffect(() => {
    // URL에 파라미터가 없고 카카오 지도 API로 현재 위치 주소가 완전히 로드되었을 때
    if (!locationParam && address?.address_name) {
      router.push(`/?location=${encodeURIComponent(address.address_name)}`);
      setCurrentLocation(address.address_name);
      return; 
    }

    // URL 파라미터 값이 존재하고, 그 값이 현재 스토어의 값과 다를 때만 스토어 갱신
    if (typeof locationParam === 'string' && locationParam !== currentLocation) {
      setCurrentLocation(locationParam);
    }
  }, [locationParam, address?.address_name, currentLocation, router, setCurrentLocation]); 

  // 4. 검색된 좌표가 있으면 그것을 쓰고, 없으면 현재 내 GPS 좌표를 기본값으로 사용
  const rawLat = coordsData?.[0] ? Number(coordsData[0].y) : coords?.[0] ?? 0;
  const rawLon = coordsData?.[0] ? Number(coordsData[0].x) : coords?.[1] ?? 0;

  // 💡 [추가] 소수점 3자리까지만 남기고 반올림 (약 100m 이내의 미세한 움직임으로 인한 재요청 방지)
  const lat = Number(rawLat.toFixed(3));
  const lon = Number(rawLon.toFixed(3));

  // 5. 날씨 데이터 패칭 및 정보 가공
  const { data: weather } = useWeather(lat, lon);
  const weatherDetail = useWeatherDetail(weather); 
  const parsedAddress = useParsedAddress(currentLocation);
  
  const isWeatherLoading = !weather;

  // 6. 제미나이 AI 추천 데이터 패칭
const { data: llmData, isLoading: llmIsLoading } = useWeatherRecommendation(
  weather,
  locationParam ?? '',
  isWeatherLoading
);

  return (
    <main className="w-screen min-h-screen flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-8 lg:px-0 lg:items-start box-border bg-[#F7F7FA]">
      {/* 상단 영역 (로고 및 검색바) */}
      <div className="flex flex-col gap-2 lg:col-span-12 lg:grid lg:grid-cols-12 lg:items-center lg:border-b lg:border-[#E9E9E9] lg:pb-6 bg-[#FFFFFF]">
        <header className="lg:col-span-3 px-4 pt-3 lg:px-10">
          <Logo />
        </header>
        <section className="border-y border-[#E9E9E9] py-3 lg:col-span-6 lg:border-none lg:py-0 lg:pt-4 isolate z-50">
          <SearchBar />
        </section>
      </div>
      
      {/* 위치 권한 차단 등의 예외 처리 */}
      {coordsResult?.status === 'unavailable' && (
        <div className="w-125 lg:ml-162.5">
          <Card width="favoriteItem">
            <p>해당 장소의 정보가 제공되지 않습니다.</p>
          </Card>
        </div>
      )}
      
      {/* 정상 상태 레이아웃 */}
      {coordsResult?.status !== 'unavailable' && (
        <>
          {/* 📍 [개선] 날씨 세부 데이터가 없거나 '카카오 주소를 불러오는 중'일 때 스켈레톤 노출하여 깜빡임 방지 */}
          {!weatherDetail || isAddressLoading ? (
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
          {isWeatherLoading ? (
            <HourlyWeatherSkeleton />
          ) : (
            <HourlyWeatherSection data={weather?.hourly} />
          )}

          {/* 즐겨찾기 섹션 */}
          <FavoriteSection isLoading={isWeatherLoading} />

          {/* 오늘의 옷차림 추천 */}
          <TodayClothesSection clothData={llmData?.clothing} isLoading={llmIsLoading} />

          {/* 오늘의 추천 활동 */}
          <RecommendedActivitiesSection activeData={llmData?.activity} isLoading={llmIsLoading} />
        </>
      )}
    </main>
  );
}