import { SONGS_CATALOG } from '@/config/songs';
import SongTemplate from '@/components/SongPage';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return Object.keys(SONGS_CATALOG).map((id) => ({ id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const song = SONGS_CATALOG[id];

  if (!song) return { title: 'Song Not Found' };

  // Automate host detection from incoming HTTP headers
  const headersList = await headers();
  const host = headersList.get('host') || 'clqit.netlify.app';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const currentDomain = `${protocol}://${host}`;

  return {
    metadataBase: new URL(currentDomain),
    title: `${song.songTitle} - ${song.artistName}`,
    description: song.quoteText,
    openGraph: {
      title: `${song.songTitle} - ${song.artistName}`,
      description: song.quoteText,
      url: currentDomain,
      siteName: 'CLQIT Music',
      type: 'music.song',
      images: [
        {
          url: song.desktopBg, // Automatically turns into https://[subdomain]/backgrounds/...
          width: 1200,
          height: 630,
          alt: `${song.songTitle} Cover`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${song.songTitle} — ${song.artistName}`,
      description: song.quoteText,
      images: [song.desktopBg],
    },
  };
}

export default async function AutomaticSongPage({ params }: PageProps) {
  const { id } = await params;
  const songConfig = SONGS_CATALOG[id];

  if (!songConfig) notFound();

  return <SongTemplate config={songConfig} />;
}