import Providers from "@/lib/providers";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Messaging app",
  description: "Better than whatsapp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="max-w-5xl mx-auto px-4">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
