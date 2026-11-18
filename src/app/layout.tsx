import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CooPERA · Fair prices for the farmers who grow our food",
  description:
    "CooPERA helps cooperatives sell with their farmers, not just lend to them. It lines up the buyer, the truck and the price before harvest.",
  icons: { icon: "/logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#F5F3EC",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSans.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
