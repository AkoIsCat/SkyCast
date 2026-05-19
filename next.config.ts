import type { NextConfig } from 'next';
// next.config.mjs 기준 (CommonJS를 쓰신다면 require 문법으로 변경)
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  // ❌ 기존 위치: 여기에 skipWaiting이 있으면 에러가 납니다.
  
  // ⭕ 해결책: Workbox 전용 옵션 객체 내부로 이동
  workboxOptions: {
    skipWaiting: true,
  },
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
   turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  webpack(config) {
    return config;
  },
};

export default withPWA(nextConfig);