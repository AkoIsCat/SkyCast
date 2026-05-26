export const getAddress = (
  coords: [number, number]
): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Window is undefined'));
      return;
    }

    if (!window.kakao?.maps) {
      reject(new Error('Kakao Maps SDK not loaded'));
      return;
    }

    window.kakao.maps.load(() => {
      try {
        if (!window.kakao.maps.services) {
          reject(
            new Error(
              'Kakao services library not loaded'
            )
          );
          return;
        }

        const geocoder =
          new window.kakao.maps.services.Geocoder();

        geocoder.coord2RegionCode(
          coords[1],
          coords[0],
          (result: any, status: any) => {
            console.log(
              '카카오 result:',
              result
            );

            console.log(
              '카카오 status:',
              status
            );

            if (
              status ===
              window.kakao.maps.services.Status.OK
            ) {
              resolve(result);
            } else {
              reject(
                new Error(
                  `주소 변환 실패: ${status}`
                )
              );
            }
          }
        );
      } catch (error) {
        console.error(
          'Geocoder 생성 실패:',
          error
        );

        reject(error);
      }
    });
  });
};