import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revisoo - Passive Learning, Automated",
  description: "Revisoo runs a local script that generates rich AI study notes from your syllabus and publishes them daily. Set it up once, learn every day.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
