import type { CoordsResult } from '@/entities/coords/model/types';

const DEFAULT_COORDS: [number, number] = [37.4979, 127.0276]; // 강남구

export const getCoords = (): Promise<CoordsResult> => {
  return new Promise((res) => {
    if (!navigator.geolocation) {
      res({ status: 'fallback', coords: DEFAULT_COORDS });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        res({
          status: 'success',
          coords: [position.coords.latitude, position.coords.longitude],
        });
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          res({ status: 'fallback', coords: DEFAULT_COORDS });
        } else {
          // 타임아웃/응답 실패 등 좌표 없음 상태로 분기
          res({ status: 'unavailable' });
        }
      },
      {
        timeout: 10000,
        maximumAge: Infinity,
      }
    );
  });
};
