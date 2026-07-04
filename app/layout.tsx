import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme-provider";
import { WhatsAppButton } from "@/components/whatsapp-button";

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
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
