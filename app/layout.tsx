import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/app-shell";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://kenoratech.com"),
  title: { default: "KenoraTech", template: "%s | KenoraTech" },
  description: "KenoraTech builds high-performance websites, web applications, e-commerce experiences, UI/UX systems, and digital products for growing businesses.",
  applicationName: "KenoraTech",
  category: "Technology",
  alternates: { canonical: "/" },
  keywords: ["KenoraTech", "website development", "web application development", "e-commerce development", "UI UX design", "digital products", "technology agency India"],
  openGraph: {
    title: "KenoraTech",
    description: "KenoraTech builds high-performance websites, web applications, e-commerce experiences, UI/UX systems, and digital products for growing businesses.",
    url: "https://kenoratech.com", siteName: "Kenora Tech", type: "website"
  },
  twitter: { card: "summary", title: "KenoraTech", description: "High-performance websites, web applications, UI/UX systems, and digital products." },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = { "@context": "https://schema.org", "@type": "Organization", name: "KenoraTech", url: "https://kenoratech.com", description: "KenoraTech builds high-performance websites, web applications, UI/UX systems, e-commerce experiences, and digital products." };
  return <html lang="en" suppressHydrationWarning><body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><ThemeProvider attribute="class" defaultTheme="system" enableSystem><AppShell>{children}</AppShell></ThemeProvider></body></html>;
}
