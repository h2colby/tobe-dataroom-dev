import type { Metadata } from "next";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { DataRoomChat } from "@/components/DataRoomChat";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tobe Energy Data Room",
  description: "Investor data room and pipeline visualization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0f] text-white antialiased">
        {/* Scanline overlay */}
        <div
          className="pointer-events-none fixed inset-0 z-[100]"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
          }}
        />

        {/* Grid background */}
        <div
          className="pointer-events-none fixed inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,107,53,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,53,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Top header bar */}
        <header className="relative z-10 flex h-[52px] shrink-0 items-center justify-between border-b border-[#ff6b35]/20 bg-[#0a0a0f] px-6 font-mono">
          <Link
            href="/"
            className="text-sm font-bold tracking-[0.15em] text-[#ff6b35] glow-orange"
            style={{ transform: "scaleX(0.85)" }}
          >
            TOBE ENERGY
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-[0.65rem] tracking-[0.1em] text-[#6a6a7a]">
              SESSION:{" "}
              <span className="text-[#00ff88] glow-green">INV-2026-0318</span>
            </span>
            <span className="text-[0.65rem] tracking-[0.1em] text-[#6a6a7a]">
              STATUS:{" "}
              <span className="text-[#00ff88] glow-green">● ACTIVE</span>
            </span>
            <span className="text-[0.65rem] tracking-[0.1em] text-[#6a6a7a]">
              CLASSIFICATION:{" "}
              <span className="text-[#ff6b35] glow-orange">INVESTOR</span>
            </span>
          </div>
        </header>

        {/* Sidebar + Content */}
        <div className="relative z-10 flex" style={{ height: "calc(100vh - 52px)" }}>
          <Sidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
        <DataRoomChat />
      </body>
    </html>
  );
}
