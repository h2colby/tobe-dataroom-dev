export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Join pages use fixed positioning to cover the main layout
  return <>{children}</>;
}
