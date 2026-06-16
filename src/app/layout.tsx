import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { StoreHydrator } from "@/components/StoreHydrator";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://onylogy.studio"),
  title: {
    default: "Onylogy Design Tools — Color & Typography for WordPress Creators",
    template: "%s · Onylogy Design Tools",
  },
  description:
    "Free, modern design-system tools: palette generation, semantic color systems, typography scales, clamp generators, accessibility checks, and exports for Tailwind, CSS, SCSS, JSON, and Kadence.",
  keywords: [
    "color palette generator",
    "typography scale",
    "clamp generator",
    "WordPress design tools",
    "Kadence palette",
    "Tailwind color generator",
    "WCAG contrast checker",
    "font pairings",
  ],
  authors: [{ name: "Onylogy Design Tools" }],
  openGraph: {
    type: "website",
    title: "Onylogy Design Tools — Color & Typography for WordPress Creators",
    description:
      "Build palettes, font systems, and exportable design tokens with real-time UI previews.",
    siteName: "Onylogy Design Tools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Onylogy Design Tools",
    description:
      "Color and typography workflows for WordPress, Kadence, Gutenberg, and Tailwind creators.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0b0d" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-full flex-col bg-bg text-fg">
        <ThemeProvider>
          <TooltipProvider delayDuration={200}>
            <StoreHydrator />
            <SiteHeader />
            <main className="flex flex-1 flex-col">{children}</main>
            <SiteFooter />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
