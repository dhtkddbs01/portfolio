import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { profile } from "@/data/profile";

// 이력서 · 경력 기술서 · 포트폴리오 PDF와 같은 서체 — Noto Sans KR 하나로 (2026-11-20 사용자 결정).
// next/font/google 이 빌드 때 받아 자체 호스팅한다. 400 = 본문, 500 = 강조, 700 = 제목 · 숫자, 300 = 부제.
const noto = Noto_Sans_KR({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-noto",
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
      className={`${noto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Nav />
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
