import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClientProviders,
  ReactQueryDevtoolsWrapper,
} from "./providers/ClientProviders";
import ServerProviders from "./providers/ServerProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Technical Test",
  description: "This page created for technical interview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en" suppressHydrationWarning >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ServerProviders>
          <ClientProviders>
            {children}
            <ReactQueryDevtoolsWrapper />
          </ClientProviders>
        </ServerProviders>
      </body>
    </html>
  );
}
