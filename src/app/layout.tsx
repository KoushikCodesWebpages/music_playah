import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'My Dream Girl by Musicplayah',
  description: 'My Dream Girl — an original song by Musicplayah.',
  icons: {
    icon: '/music.png',
    shortcut: '/music.png',
    apple: '/music.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}