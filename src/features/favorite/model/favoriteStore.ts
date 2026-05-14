import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { FavoriteState, FavoriteActios, FavoriteStateType } from './types';

export const useFavoriteStore = create<FavoriteState & FavoriteActios>()(
  persist(
    (set) => ({
      favoriteLocationList: [],

      addLocation: (data: FavoriteStateType) =>
        set((state) => ({
          favoriteLocationList:
            state.favoriteLocationList.length < 6
              ? [...state.favoriteLocationList, data]
              : state.favoriteLocationList,
        })),

      updateLocationName: (newAlias: string, location: string) => {
        set((state) => ({
          favoriteLocationList: state.favoriteLocationList.map(
            (item) =>
              item.location === location && newAlias.length > 0
                ? { ...item, alias: newAlias }
                : item // key 이름을 alias로 맞추는 것 확인 필요
          ),
        }));
      },

      deleteLocation: (location: string) => {
        set((state) => ({
          favoriteLocationList: state.favoriteLocationList.filter(
            (item) => item.location !== location
          ),
        }));
      },
    }),
    {
      name: 'favorite-storage', // localStorage에 저장될 key 이름
      storage: createJSONStorage(() => localStorage), // 사용할 저장소
    }
  )
);
