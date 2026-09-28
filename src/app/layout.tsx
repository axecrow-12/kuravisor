import type { Metadata, Viewport } from "next";
import { Libre_Baskerville, Lato } from "next/font/google";
import "./globals.css";
import AppShell, { THEME_BOOT_SCRIPT } from "@/components/AppShell";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: {
    template: "%s | KuraVisor",
    default: "KuraVisor",
  },
  description: "KuraVisor: offline crop doctor and farm records for smallholder farmers",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#102210" },
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
      className={`${libreBaskerville.variable} ${lato.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body className="bg-slate-100 dark:bg-slate-950 font-display text-slate-900 dark:text-slate-100 antialiased">
        <div className="max-w-screen-sm mx-auto min-h-dvh bg-background-light dark:bg-background-dark shadow-xl">
          <AppShell>{children}</AppShell>
        </div>
      </body>
    </html>
  );
}
