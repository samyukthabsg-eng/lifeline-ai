import type { Metadata } from "next";
import "./globals.css";
import DisclaimerBanner from "@/components/DisclaimerBanner";

export const metadata: Metadata = {
  title: "LifeLine AI - Emergency Response Agent",
  description: "Intelligent emergency response guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <DisclaimerBanner />
        <main className="flex-grow flex flex-col pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
