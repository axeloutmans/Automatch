import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], weight: ["300","400","500","600","700"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400","500","600","700","800","900"] });

export const metadata: Metadata = {
  title: { default: "AutoMatch — Vind jouw auto zonder eindeloos te zoeken", template: "%s | AutoMatch" },
  description: "Plaats één zoekopdracht en ontvang aanbiedingen van aangesloten autobedrijven. Gratis voor kopers.",
  keywords: "auto zoeken, auto kopen, auto dealers, lead platform, autozoekopdracht, occasion kopen",
  openGraph: {
    title: "AutoMatch — Vind jouw auto zonder eindeloos te zoeken",
    description: "Plaats één zoekopdracht en ontvang aanbiedingen van aangesloten autobedrijven.",
    type: "website",
    siteName: "AutoMatch",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${dmSans.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased" style={{ fontFamily: "var(--font-dm-sans), var(--font-inter), sans-serif" }}>
        {children}
        <Toaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  );
}
