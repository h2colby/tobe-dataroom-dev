import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Tobe Energy Data Room",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Admin pages use fixed positioning to cover the main layout
  return <>{children}</>;
}
