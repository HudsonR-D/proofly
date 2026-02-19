import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Proofly — Colorado Birth Certificate",
  description: "Privacy-first on-chain consent for vital records",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-white font-sans antialiased">
        {/* Shared Navbar — matches homepage exactly */}
        <nav className="sticky top-0 bg-slate-950/90 backdrop-blur-md z-50 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Hudson R&D" className="h-9 w-auto" /> {/* copy your logo.png to proofly/public */}
              <span className="text-2xl font-semibold tracking-tight">Hudson R&D</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="https://hudsonrnd.com/#tech" className="hover:text-teal-400 transition">Technology</a>
              <a href="https://hudsonrnd.com/#applications" className="hover:text-teal-400 transition">Applications</a>
              <a href="https://hudsonrnd.com" className="text-teal-400 font-semibold">Proofly</a>
              <a href="https://hudsonrnd.com/#about" className="hover:text-teal-400 transition">About</a>
            </div>
            <a href="https://hudsonrnd.com/#contact" className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold px-6 py-3 rounded-2xl text-sm transition">Partner / Inquire</a>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}