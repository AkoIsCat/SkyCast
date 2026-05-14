export const getAddress = (data: [number, number]) => {
  const [lat, lon] = data;

  return new Promise<kakao.maps.services.RegionCode[]>((res, rej) => {
    const { kakao } = window;

    // 1. kakao 객체 자체가 없는 경우 처리
    if (!kakao || !kakao.maps) {
      rej(new Error('Kakao Maps SDK script not loaded'));
      return;
    }

    // 2. load() 메소드를 통해 라이브러리까지 준비 완료된 후 실행
    kakao.maps.load(() => {
      // 이제 services가 존재함이 보장됩니다.
      if (!kakao.maps.services) {
        rej(new Error('Kakao Maps Services library not loaded'));
        return;
      }

      const geocoder = new kakao.maps.services.Geocoder();

      const callback = (
        result: kakao.maps.services.RegionCode[],
        status: kakao.maps.services.Status
      ) => {
        if (status === kakao.maps.services.Status.OK) {
          res(result);
        } else {
          rej(new Error('coord2RegionCode failed'));
        }
      };

      geocoder.coord2RegionCode(lon, lat, callback);
    });
  });
};
