import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CommandPalette } from "@/components/command-palette";
import { EasterEgg } from "@/components/easter-egg";
import { Critters } from "@/components/critters";
import { Sky } from "@/components/sky";
import { ScrollVine } from "@/components/scroll-vine";
import { CursorSprouts } from "@/components/cursor-sprouts";
import { siteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Emily Bedolla — Software / AI Engineer",
  description:
    "Emily Bedolla builds with technology and cares about whether it helps people and the planet — exploring AI research, AI for good, and responsible-AI policy.",
  openGraph: {
    title: "Emily Bedolla — Software / AI Engineer",
    description:
      "Building technology that helps people and the planet. AI research, AI for good, and responsible-AI policy.",
    type: "website",
  },
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Sky />
          <Navbar />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
          <CommandPalette />
          <EasterEgg />
          <Critters />
          <ScrollVine />
          <CursorSprouts />
        </ThemeProvider>
      </body>
    </html>
  );
}
