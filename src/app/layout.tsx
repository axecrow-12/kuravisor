import type { Metadata } from "next";
import { Libre_Baskerville, Lato } from "next/font/google";
import "./globals.css";

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
  description: "KuraVisor - Your Farming Helper",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${libreBaskerville.variable} ${lato.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-100 dark:bg-slate-950 font-display text-slate-900 dark:text-slate-100 antialiased">
        <div className="max-w-screen-sm mx-auto min-h-screen bg-background-light dark:bg-background-dark shadow-xl">
          {children}
        </div>
      </body>
    </html>
  );
}
