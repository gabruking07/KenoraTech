import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/app-shell";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kenoratech.com"),
  title: {
    default: "Kenora Tech | Modern Websites & Digital Products",
    template: "%s | Kenora Tech"
  },
  description:
    "Kenora Tech builds modern websites, web applications, e-commerce platforms, UI/UX systems, SEO foundations and maintenance plans for growing businesses.",
  keywords: [
    "Kenora Tech",
    "website development",
    "web applications",
    "technology agency",
    "UI UX design",
    "SEO optimization"
  ],
  openGraph: {
    title: "Kenora Tech",
    description: "Transforming ideas into digital products for ambitious businesses.",
    url: "https://kenoratech.com",
    siteName: "Kenora Tech",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
