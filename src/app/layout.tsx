import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lalit Mohan - Full Stack & ML Engineer",
  description: "Portfolio of Lalit Mohan, a Full Stack & ML Engineer building intelligent systems that bridge robust software architecture and machine intelligence.",
  keywords: ["Full Stack Developer", "Machine Learning Engineer", "React", "Next.js", "Python", "AI", "Software Engineer"],
  authors: [{ name: "Lalit Mohan", url: "mailto:lalitmohan.engineer@gmail.com" }],
  creator: "Lalit Mohan",
  openGraph: {
    title: "Lalit Mohan - Full Stack & ML Engineer",
    description: "Portfolio showcasing intelligent systems and scalable software solutions",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lalit Mohan - Full Stack & ML Engineer",
    description: "Building intelligent systems that bridge software architecture and machine intelligence",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
