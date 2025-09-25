export const metadata = {
  title: "VLC Stream Player",
  description: "Simple VLC-like network stream player in Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
