import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Retro TV Nostalgia - 90s Doordarshan Advertisements",
  description:
    "An interactive 90s Indian television watching experience inspired by saloon.wtf, featuring nostalgic TV commercials on a vintage CRT wooden cabinet with remote control.",
  keywords: ["Retro TV", "Doordarshan", "90s Ads", "Nostalgia", "CRT TV", "Saloon.wtf alternative", "Indian Commercials"],
  openGraph: {
    title: "Retro TV Nostalgia - 90s TV Ads",
    description: "Flip through classic Indian TV commercials on a retro CRT television set.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-emerald-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
