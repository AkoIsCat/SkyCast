const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_KEY;
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export const fetchWeatherRecommendations = async (weatherData: any) => {

  const refinedWeather = {
    temperature: weatherData.current?.temp,               // 기온
    feelsLike: weatherData.current?.feels_like,           // 체감온도
    condition: weatherData.current?.weather?.[0]?.description, // 날씨 상태
    humidity: weatherData.current?.humidity                // 습도
  };

  const prompt = `
    현재 날씨 데이터: ${JSON.stringify(refinedWeather)}

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
    1. 옷차림 아이템은 날씨에 따라 개수를 조절하되 상의, 하의, 아우터 등 부위가 겹치지 않게 추천할 것. 무조건 3부위 추천.
    2. 이모지나 특수 기호를 절대 사용하지 말 것. 오직 텍스트만 사용할 것.
  `;

  const response = await fetch(`${BASE_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  const data = await response.json();

  // 문자열로 들어온 JSON을 객체로 변환
  const content = data.candidates[0].content.parts[0].text;
  return JSON.parse(content);
};