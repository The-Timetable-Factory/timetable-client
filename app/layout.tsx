import type { Metadata } from "next";
import DarkModeToggle from "./ui/navbar/dark-mode-toggle";
import "./globals.css";
import UltimateProvider from "./ultimate-provider";
import Navbar from "./ui/navbar/navbar";
import Footer from "./ui/footer/footer";

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: "Timetable Factory",
  description: "Stylish Timetable Wallpapers for Iphone. Organize Your Class Schedule on Your Lock Screen.",
  keywords: "free college timetable builder, free timetable builder, free college schedule maker, schedule maker wallpaper, best schedule maker app, cute schedule maker, ipad schedule maker, schedule maker to print, schedule maker for college, schedule maker for school",
  openGraph: {
    title: "The Timetable Factory",
    type: "website",
    description: "Stylish Timetable Wallpapers for Iphone. Organize Your Class Schedule on Your Lock Screen.",
    images: '/app/opengraph-image.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <UltimateProvider>
        <body>
          <Navbar />
          {children}
        </body>
        <Footer />
      </UltimateProvider>
    </html>
  );
}
