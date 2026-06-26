import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import InteractiveBackground from "@/components/InteractiveBackground";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "Ozodbek Salohiddinov - Gen AI Expert & Prompt Engineer",
  description: "Sun'iy intellekt bo'yicha ekspert, Prompt muhandisi va AI mentor portfoliosi. Biznes va ijodiy loyihalar uchun professional AI yechimlari.",
  keywords: ["Ozodbek Salohiddinov", "Gen AI Expert", "Prompt Engineer", "AI Mentor", "Artificial Intelligence", "Uzbekistan AI"],
  authors: [{ name: "Ozodbek Salohiddinov" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${outfit.variable}`}>
      <head>
        {/* FontAwesome CDN for premium icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          precedence="default"
        />
      </head>
      <body>
        <LanguageProvider>
          <InteractiveBackground />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
