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
    default: "KenoraTech — Something Big Is Coming",
    template: "%s | KenoraTech"
  },
  description:
    "Something big is coming from KenoraTech. The official launch is tomorrow at 8:00 AM.",
  keywords: [
    "Kenora Tech",
    "website development",
    "web applications",
    "technology agency",
    "UI UX design"
  ],
  openGraph: {
    title: "KenoraTech — Something Big Is Coming",
    description: "Something big is coming from KenoraTech. The official launch is tomorrow at 8:00 AM.",
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
