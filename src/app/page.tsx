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

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_KEY, // 명시적으로 넣는 게 안전
});

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

  async function llmStart() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `
    현재 날씨 데이터: ${JSON.stringify(weather)}

    위 데이터를 분석하여 '오늘의 옷차림'과 '오늘의 추천 활동'을 추천해줘.
    반드시 한국어로 응답하고, 아래의 JSON 구조를 엄격히 지켜줘.

    {
      "clothing": {
        "summary": "날씨에 대한 짧은 요약 문구",
        "items": [
          { "name": "옷 종류(예: 가디건)", "style": "상세 스타일링 제안" }
        ]
      },
      "activity": {
        "main": {
          "title": "메인 활동 제목",
          "reason": "추천 근거",
          "tip": "주의사항 또는 팁"
        },
        "sub": "서브 활동 명칭 하나"
      }
    }

    * 조건:
    1. 옷차림 아이템은 날씨에 따라 개수를 조절하되 상의, 하의, 아우터 등 부위가 겹치지 않게 추천할 것.
    2. 이모지나 특수 기호를 절대 사용하지 말 것. 오직 텍스트만 사용할 것.
  `,
  });

  console.log(response.text); // 최신 SDK 기준
}

llmStart();

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
