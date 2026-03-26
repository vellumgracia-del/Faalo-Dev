import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Faalo-dev | Portfolio",
  description:
    "Portfolio of Faalo — Computer Science Student, Problem Solver, Code Explorer, and Innovator. Expanding skills and discovering new ways to innovate.",
  keywords: [
    "faalo",
    "developer",
    "portfolio",
    "web development",
    "react",
    "next.js",
  ],
  authors: [{ name: "Faalo" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
