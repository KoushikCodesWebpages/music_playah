import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'From Music Playah',
  description: 'Only MusicPlayah, get out!',
  icons: {
    icon: '/music.png', // 👈 Fixed (was '/')
    shortcut: '/music.png',
    apple: '/music.png',
  },
  openGraph: {
    title: 'From Music Playah',
    description: 'Only MusicPlayah, get out!',
    images: [
      {
        url: '/music.png', // 👈 Controls the link preview image in WhatsApp/Discord
      },
    ],
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