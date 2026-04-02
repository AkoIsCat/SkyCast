export const getWeatherIcon = (iconCode: string) => {
  const iconMap: { [key: string]: string } = {
    // 낮/밤 구분 아이콘
    '01d': '/asset/clear_sky.svg', // 낮: 맑음
    '01n': '/asset/clear_sky_n.svg', // 밤: 맑음
    '02d': '/asset/few_clouds.svg', // 낮: 구름 조금
    '02n': '/asset/few_clouds_n.svg', // 밤: 구름 조금
    '04d': '/asset/broken_clouds.svg', // 흐림
    '04n': '/asset/broken_clouds.svg', // 흐림
    '09d': '/asset/shower_rain.svg', // 소나기
    '09n': '/asset/shower_rain.svg', // 소나기
    '10d': '/asset/rain.svg', // 비
    '10n': '/asset/rain.svg', // 비
    '11d': '/asset/thunderstorm.svg', // 뇌우
    '11n': '/asset/thunderstorm.svg', // 뇌우
    '13d': '/asset/snow.svg', // 눈
    '13n': '/asset/snow.svg', // 눈
    '50d': '/asset/mist.svg', // 안개
    '50n': '/asset/mist.svg', // 안개
  };

  // 매핑된 아이콘이 있으면 반환
  if (iconMap[iconCode]) return iconMap[iconCode];

  // 매핑되지 않은 코드는 기본 OpenWeatherMap 경로를 동적으로 생성하여 반환
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};
