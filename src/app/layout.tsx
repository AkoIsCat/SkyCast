import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Noto_Sans_KR } from "next/font/google";
import "./styles/globals.css";

import ReactQueryProvider from "./ReactQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSans = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto',
});


// 💡 1. PWA를 위한 테마 컬러 및 뷰포트 설정
export const viewport: Viewport = {
  themeColor: "#F7F7FA",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // 모바일 앱처럼 보이기 위해 확대/축소 제한 (선택사항)
};

// 💡 2. 기존 Metadata에 manifest 파일 연결 및 모바일 웹앱 태그 추가
export const metadata: Metadata = {
  title: "SkyCast",
  description: "날씨 기반 매칭 서비스",
  manifest: "/manifest.json", // 👈 메인 매니페스트 연결
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "날씨코디",
  },
  icons: {
    icon: "/favicon.png",
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="ko"
      className={`${notoSans.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReactQueryProvider>
        {children}
        </ReactQueryProvider>
        <Script
  src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&libraries=services`}
  strategy="beforeInteractive"
/>
      </body>
    </html>
  );
}
