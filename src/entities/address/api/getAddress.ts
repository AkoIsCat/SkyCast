export const getAddress = (
  coords: [number, number]
): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (
      typeof window === 'undefined' ||
      !window.kakao?.maps
    ) {
      reject(new Error('Kakao Maps SDK not loaded'));
      return;
    }

    window.kakao.maps.load(() => {
      const geocoder =
        new window.kakao.maps.services.Geocoder();

      geocoder.coord2RegionCode(
        coords[1],
        coords[0],
        (result: any, status: any) => {
          console.log('카카오 result:', result);
          console.log('카카오 status:', status);

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
    });
  });
};