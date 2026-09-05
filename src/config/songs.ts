export interface SongConfig {
  id: string;
  songTitle: string;
  artistName: string;
  embedUrl: string;
  quoteText: string;
  lyricsFile: string;
  desktopBg: string;
  mobileBg: string;
  ogImage: string; // 👈 Dedicated social preview image
}

export const SONGS_CATALOG: Record<string, SongConfig> = {
  'dream-girl': {
    id: 'dream-girl',
    songTitle: 'My Dream Girl',
    artistName: 'Musicplayah',
    embedUrl: 'https://www.bandlab.com/embed/?id=44bf093e-5c95-449a-a106-7cbd09644d77',
    quoteText: 'Sometimes, ending is what makes a story complete.',
    lyricsFile: '/lyrics/dream_girl.json',
    desktopBg: '/backgrounds/desktop_dream_girl.jpg',
    mobileBg: '/backgrounds/mobile_dream_girl.jpg',
    ogImage: '/backgrounds/og_dream_girl.jpg', // 👈 1200x630 image (<300KB)
  },
  'easy-hard': {
    id: 'easy-hard',
    songTitle: 'The Easy Hard',
    artistName: 'Musicplayah',
    embedUrl: 'https://www.bandlab.com/embed/?id=68238bdd-1519-420c-93dc-1e86975aec92',
    quoteText: 'All the easy hard a boy can face while chasing someone who could become a part of his life. 😅😅',
    lyricsFile: '/lyrics/easy_hard.json',
    desktopBg: '/backgrounds/desktop_easy_hard.jpg',
    mobileBg: '/backgrounds/mobile_easy_hard.jpg',
    ogImage: '/backgrounds/og_easy_hard.jpg', // 👈 1200x630 image (<300KB)
  },
};