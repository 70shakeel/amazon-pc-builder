import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BuildProvider } from "@/context/BuildProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PC Builder Germany",
  description: "Build your dream PC with parts from Amazon.de",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BuildProvider>
            {children}
        </BuildProvider>
      </body>
    </html>
  );
}
