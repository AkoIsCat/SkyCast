interface AddressSearchResult {
  address_name: string;
  address_type: 'REGION' | 'ROAD' | 'REGION_ADDR' | 'ROAD_ADDR';
  x: string; // 경도
  y: string; // 위도
  address: any;
  road_address: any;
}

// @/entities/address/api/getAddressToCoords.ts
export const getAddressToCoords = (location: string): Promise<AddressSearchResult[]> => {
  const { kakao } = window;
  return new Promise((res, rej) => {
    kakao.maps.load(() => {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(location, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          res(result); // 여기서의 result 타입이 AddressSearchResult[] 입니다.
        } else {
          rej(new Error('주소 검색 결과가 없습니다.'));
        }
      });
    });
  });
};
