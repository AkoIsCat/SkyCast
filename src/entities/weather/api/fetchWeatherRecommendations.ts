const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_KEY;
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export const fetchWeatherRecommendations = async (weatherData: any) => {
  const refinedWeather = {
    temperature: weatherData.current?.temp,
    feelsLike: weatherData.current?.feels_like,
    condition: weatherData.current?.weather?.[0]?.description,
    humidity: weatherData.current?.humidity
  };

  // 💡 가볍고 명확하게 프롬프트 수정 (제약 조건은 스키마가 처리하므로 삭제)
  const prompt = `
    현재 날씨 데이터: ${JSON.stringify(refinedWeather)}
    위 데이터를 분석하여 오늘 날씨에 맞는 '오늘의 옷차림'과 '오늘의 추천 활동'을 추천해줘. 반드시 한국어로 작성해줘.
  `;

  const response = await fetch(`${BASE_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        // 💡 [핵심] 제미나이에게 정확한 JSON 구조를 '스키마'로 주입하여 503 에러 방지
        responseSchema: {
          type: "OBJECT",
          properties: {
            clothing: {
              type: "OBJECT",
              properties: {
                summary: { type: "STRING", description: "날씨에 대한 짧은 요약 문구" },
                items: {
                  type: "ARRAY",
                  description: "상의, 하의, 아우터 등 겹치지 않는 스타일링 제안 3가지",
                  items: {
                    type: "OBJECT",
                    properties: {
                      name: { type: "STRING", description: "옷 종류 (예: 가디건)" },
                      style: { type: "STRING", description: "상세 스타일링 제안" }
                    },
                    required: ["name", "style"]
                  }
                }
              },
              required: ["summary", "items"]
            },
            activity: {
              type: "OBJECT",
              properties: {
                main: {
                  type: "OBJECT",
                  properties: {
                    title: { type: "STRING", description: "메인 활동 제목" },
                    reason: { type: "STRING", description: "추천 근거" },
                    tip: { type: "STRING", description: "주의사항 또는 팁" }
                  },
                  required: ["title", "reason", "tip"]
                },
                sub: { type: "STRING", description: "서브 활동 명칭 하나" }
              },
              required: ["main", "sub"]
            }
          },
          required: ["clothing", "activity"]
        }
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  const data = await response.json();
  const content = data.candidates[0].content.parts[0].text;
  return JSON.parse(content);
};