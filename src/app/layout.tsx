import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tobe Energy Data Room",
  description: "Investor data room and pipeline visualization",
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/customers", label: "Customers" },
  { href: "/technology", label: "Technology" },
  { href: "/business-model", label: "Business Model" },
  { href: "/team", label: "Team" },
  { href: "/pipeline", label: "Pipeline" },
  { href: "/hmi", label: "HMI" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0f] text-white antialiased">
        {/* NERV Nav Bar */}
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0f]/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
            <Link
              href="/"
              className="font-mono text-sm font-bold tracking-widest text-[#ff6b35] uppercase"
            >
              Tobe Energy
            </Link>
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-mono text-xs tracking-wide text-white/50 transition-colors hover:text-[#00d4ff]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
