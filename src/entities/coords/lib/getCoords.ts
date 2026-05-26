import type { CoordsResult } from '@/entities/coords/model/types';

const DEFAULT_COORDS: [number, number] = [37.4979, 127.0276];

export const getCoords = (): Promise<CoordsResult> => {
  return new Promise((res) => {
    // ✅ 서버 환경 방어
    if (typeof window === 'undefined') {
      res({ status: 'fallback', coords: DEFAULT_COORDS });
      return;
    }

    // ✅ navigator 방어
    if (!window.navigator?.geolocation) {
      res({ status: 'fallback', coords: DEFAULT_COORDS });
      return;
    }

    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        res({
          status: 'success',
          coords: [
            position.coords.latitude,
            position.coords.longitude,
          ],
        });
      },
      (error) => {
        console.log('geolocation error', error);

        if (error.code === error.PERMISSION_DENIED) {
          res({ status: 'fallback', coords: DEFAULT_COORDS });
        } else {
          res({ status: 'unavailable' });
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
};