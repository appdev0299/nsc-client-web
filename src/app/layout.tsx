// This is a minimal root layout that just passes through to [locale]
// The actual layout with <html> and <body> is in [locale]/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
