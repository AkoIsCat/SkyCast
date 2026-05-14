export const formatWeatherDateTime = (dt: number) => {
  const date = new Date(dt * 1000);
  const baseOptions: Intl.DateTimeFormatOptions = { timeZone: 'Asia/Seoul' };

  // 1월 15일
  const dateString = new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
    ...baseOptions,
  }).format(date);

  // 18시
  const timeString = new Intl.DateTimeFormat('ko-KR', {
    hour: 'numeric',
    hour12: false,
    ...baseOptions,
  }).format(date);

  return {
    date: dateString,
    time: timeString,
  };
};
