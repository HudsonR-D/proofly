import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Proofly - Colorado Birth Certificate",
  description: "Privacy-first, on-chain consent birth certificate requests",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-white font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}