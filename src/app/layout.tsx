import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { profile } from "@/data/profile";

// 이력서 · 경력 기술서 · 포트폴리오 PDF와 같은 서체 (GmarketSans — 라이선스 확인 2026-11-18).
// 원본 TTF를 woff2로만 바꿔 자체 호스팅(글자 수는 그대로). Light = 부제, Medium = 본문, Bold = 제목 · 숫자.
const gmarket = localFont({
  src: [
    { path: "./fonts/GmarketSansLight.woff2", weight: "300", style: "normal" },
    { path: "./fonts/GmarketSansMedium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/GmarketSansBold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-gmarket",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: `${profile.name} · ${profile.role}`,
  description: profile.tagline,
  openGraph: {
    title: `${profile.name} · ${profile.role}`,
    description: profile.tagline,
    url: profile.site,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${gmarket.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Nav />
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
