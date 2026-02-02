import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  productionBrowserSourceMaps: true,
  compiler: {
    // Remove console.log in production but keep errors and warnings
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.reschool.world",
        port: "",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "api.reschool.world",
        port: "",
        pathname: "//storage/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://kit.fontawesome.com https://www.googletagmanager.com https://connect.facebook.net https://www.google-analytics.com https://analytics.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; img-src 'self' data: https://api.reschool.world https://www.facebook.com https://www.google-analytics.com https://www.googletagmanager.com https://analytics.google.com; font-src 'self' https://fonts.gstatic.com https://ka-f.fontawesome.com; connect-src 'self' https://api.reschool.world https://www.google-analytics.com https://www.googletagmanager.com https://connect.facebook.net https://analytics.google.com https://ka-f.fontawesome.com; frame-src 'self' https://www.facebook.com;",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "credentialless",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-site",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
