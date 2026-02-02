import type { Metadata } from "next";
import "./globals.css";
import "../styles/index.css";
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import StoreProvider from "./StoreProvider";
import MainLayout from "./MainLayout";

export const metadata: Metadata = {
  title: "რესქული - re:school შენ შეგიძლია!",
  description:
    "რესქული - ჩვენი მიზანია, ტექნოლოგიების მომხმარებლები მათ შემქმნელებად ვაქციოთ.",
  keywords:
    "პროგრამირების სწავლა, პროგრამირება, ტექი, განათლება, თანამედროვე, პროფესიები,რესქული, სად ვისწავლო პროგრამირება?,პროგრამირების კურსები უფასოდ, პროგრამირების კურსები ბავშვებისთვის, სად ვისწავლო პროგრამირება, პროგრამირება დამწყებებისთვის, პროგრამირების უფასო კურსები, პროგრამირების კურსები თბილისში, პროგრამირება უნივერსიტეტი, ვებ პროგრამირების კურსი",
  icons: {
    icon: "/favicon.ico",
    apple: "/logo-dark.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website", // Next.js metadata uses specific string literals, 'Organization' maps poorly in standard helpers, but we can try to use 'website' or just customize via 'other' if needed. 'website' is compliant.
    url: "https://reschool.world/",
    title: "re:school",
    description:
      "სივრცე, სადაც რეალურ პროექტებში მონაწილეობით შეისწავლება მსოფლიოში ყველაზე მოთხოვნადი ციფრული პროფესიები.",
    images: ["https://reschool.world/img/logo.png"],
  },
  other: {
    "facebook-domain-verification": "zuw2cdlm36cz6o8f9n97my8itqk8vq",
    "theme-color": "#000000",
  },
};
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://api.reschool.world" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://www.facebook.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Poppins:10F0,200,300,400,500,600,700,800,900&amp;display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@100;200;300;400;500;600;700;800;900&amp;display=swap"
        />

        {/* FontAwesome */}
        <Script
          src="https://kit.fontawesome.com/2bb2f62248.js"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-TV09J2FXYS"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TV09J2FXYS');
          `}
        </Script>

        {/* Facebook Pixel */}
        <Script id="facebook-pixel" strategy="lazyOnload">
          {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1029053977728547');
              fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1029053977728547&ev=PageView&noscript=1"
            alt="fb pixel"
          />
        </noscript>
        {/* Standardize Swiper slide styles */}
        <style>
          {`
            .swiper-slide {
              height: auto; /* Ensure slides adjust to content */
            }
            .swiper-pagination {
              position: relative; /* Ensure pagination is visible and not hidden by overflow */
              margin-top: 20px; /* Add some space above pagination */
            }
          `}
        </style>
      </head>
      <body>
        <StoreProvider>
          <MainLayout>{children}</MainLayout>
        </StoreProvider>
      </body>
    </html>
  );
}
