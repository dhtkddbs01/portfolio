import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker 배포용 독립 실행 번들 (경량 이미지)
  output: "standalone",
};

export default nextConfig;
