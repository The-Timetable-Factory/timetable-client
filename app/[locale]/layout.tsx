import type { Viewport, Metadata } from "next";
import "./globals.css";
import UltimateProvider from "../ultimate-provider";
import Navbar from "../ui/navbar/navbar";
import Footer from "../ui/footer/footer";
import { SessionProvider } from "next-auth/react"
// import { auth } from "@/auth"
import initTranslations from '../i18n';
import i18nConfig from '@/i18nConfig';
import { dir } from 'i18next';

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  themeColor: "#DAD6CE"
};


export const metadata: Metadata = {
  metadataBase: new URL('https://www.thetimetablefactory.com/'),
  openGraph: {
    siteName: "The Timetable Factory| College Timetable Wallpaper Builder",
    type: "website",
    locale: "en_US",
    title: "The Timetable Factory",
    description: "Timetable Wallpapers, Class Schedule Wallpaper for IOS device. Organize Your Class Schedule on Your Lock Screen.",
    images: '/app/opengraph-image.png',
    url: 'http://localhost:3000',
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow"
  }, // I don't know what this does,
  applicationName: "Timetable Factory| College Timetable Wallpaper Builder",
  appleWebApp: {
    title: "Timetable Factory| College Timetable Wallpaper Builder",
    statusBarStyle: "default", // I don't know what this does
    capable: true // I don't know what this does
  },
  title: "Timetable Factory",
  description: "Timetable Wallpapers, Class Schedule Wallpaper for IOS device. Organize Your Class Schedule on Your Lock Screen.",
  keywords: ["class schedule wallpaper",
    "free college timetable builder",
    "free timetable builder",
    "free college schedule maker",
    "schedule maker wallpaper",
    "best schedule maker app",
    "cute schedule maker",
    "ipad schedule maker",
    "schedule maker to print",
    "schedule maker for college",
    "schedule maker for school"],
  twitter: {
    card: "summary_large_image",
    site: "@timetablefactory",
    creator: "@timetablefactory",
    title: "The Timetable Factory",
    description: "Timetable Wallpapers, Class Schedule Wallpaper for IOS device. Organize Your Class Schedule on Your Lock Screen.",
    images: '/app/twitter-image.png',
  },
  icons: {
    icon: '/app/favicon.ico',
  }
};

const jsonLd = {
  "@context": "https://schema.org/",
  "@type": "WebSite",
  "name": "Timetable Factory | College Timetable Wallpaper",
  "url": "https://www.thetimetablefactory.com/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "{search_term_string}",
    "query-input": "required name=search_term_string"
  },
  inLanguage: "en-US",
  isFamilyFriendly: "true"
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => { locale })
}

const i18nNamespaces = ['common', 'footer', 'navbar']

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // const session = await auth()
  // const { t, resources } = await initTranslations(locale, i18nNamespaces)
  return (

    <html lang={locale} dir={dir(locale)} suppressHydrationWarning>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* <SessionProvider session={session}> */}

      <UltimateProvider>
        <body>
          <main>

            <Navbar locale={locale} />
            {children}
          </main>
          <Footer />
        </body>
      </UltimateProvider>
      {/* </SessionProvider> */}
    </html>
  );
}
