import type { Metadata } from "next";
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
        {children}
      </body>
    </html>
  );
}
