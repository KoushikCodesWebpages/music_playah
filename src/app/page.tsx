import Link from 'next/link';
import { SONGS_CATALOG } from '@/config/songs';

export default function HomePage() {
  const songList = Object.values(SONGS_CATALOG);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center">
        {/* Status Indicator */}
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          System Active
        </div>

        <h1 className="text-2xl font-bold tracking-tight mb-2">Music App Template</h1>
        <p className="text-slate-400 text-sm mb-6">
          The application is running smoothly with dynamic App Router layout configured.
        </p>

        {/* Catalog List */}
        <div className="w-full text-left bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Configured Songs ({songList.length})
          </p>
          <div className="flex flex-col gap-2">
            {songList.map((song) => (
              <Link
                key={song.id}
                href={`/${song.id}`}
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/80 transition-all text-sm group"
              >
                <div>
                  <span className="font-medium text-slate-200 group-hover:text-white transition-colors">
                    {song.songTitle}
                  </span>
                  <span className="text-xs text-slate-500 block">{song.artistName}</span>
                </div>
                <span className="text-xs text-slate-400 group-hover:text-white transition-colors">
                  /{song.id} &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-500">
          To add new songs, edit <code className="text-slate-300">src/config/songs.ts</code> and place your assets in <code className="text-slate-300">public/</code>.
        </p>
      </div>
    </div>
  );
}