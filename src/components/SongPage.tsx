'use client';

import { useState } from 'react';
import ActionButton from './ActionButton';
import LyricsPopup, { LyricsData } from './LyricsPopup';
import { SongConfig } from '@/config/songs';

interface SongTemplateProps {
  config: SongConfig;
}

export default function SongTemplate({ config }: SongTemplateProps) {
  const [shareText, setShareText] = useState<string>('Share');
  const [isLyricsOpen, setIsLyricsOpen] = useState<boolean>(false);
  const [lyricsData, setLyricsData] = useState<LyricsData | null>(null);
  const [loadingLyrics, setLoadingLyrics] = useState<boolean>(false);

  // --- Updated Share Logic with "Shared!" Pop-up Feedback ---
  const handleShare = async (): Promise<void> => {
    const pageUrl = window.location.href;

    const triggerFeedback = (message: string = 'Shared!') => {
      setShareText(message);
      setTimeout(() => setShareText('Share'), 2000);
    };

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${config.songTitle} by ${config.artistName}`,
          url: pageUrl,
        });
        // Feedback after successful native share sheet completion
        triggerFeedback('Shared!');
      } catch {
        /* User cancelled native share sheet */
      }
    } else {
      try {
        await navigator.clipboard.writeText(pageUrl);
        // Fallback feedback for clipboard copy
        triggerFeedback('Copied!');
      } catch (err) {
        console.error('Failed to copy link: ', err);
      }
    }
  };

  // --- Lyrics Fetch Logic ---
  const handleToggleLyrics = async (): Promise<void> => {
    if (!isLyricsOpen && !lyricsData) {
      setLoadingLyrics(true);
      try {
        const response = await fetch(config.lyricsFile);
        const data: LyricsData = await response.json();
        setLyricsData(data);
      } catch (error) {
        console.error('Failed to load lyrics:', error);
      } finally {
        setLoadingLyrics(false);
      }
    }
    setIsLyricsOpen((prev) => !prev);
  };

  return (
    <div className="relative w-full h-screen h-[100svh] overflow-hidden bg-black font-sans antialiased select-none">
      {/* Dynamic Desktop & Mobile Backgrounds */}
      <div
        className="absolute inset-0 z-[1] w-full h-full bg-cover bg-center bg-no-repeat max-md:hidden"
        style={{ backgroundImage: `url('${config.desktopBg}')` }}
      />
      <div
        className="absolute inset-0 z-[1] w-full h-full bg-cover bg-top bg-no-repeat md:hidden"
        style={{ backgroundImage: `url('${config.mobileBg}')` }}
      />

      {/* Main Single-Page Container */}
      <main className="relative z-[2] w-full h-full h-[100svh] flex flex-col justify-between items-center p-5 max-md:justify-start max-md:pt-[43svh] max-md:pb-[18svh] max-md:gap-3">
        {/* Embed Player */}
        <div className="w-full max-w-[560px] h-auto p-[6px] rounded-[16px] bg-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.25)] max-md:w-[86%] max-md:max-w-[350px] max-md:h-[140px] max-md:p-0 max-md:border max-md:border-[#e8e0d0] max-md:rounded-[14px]">
          <iframe
            src={config.embedUrl}
            title={`${config.songTitle} — ${config.artistName}`}
            className="block w-full aspect-[560/202] border-0 rounded-[10px] max-md:h-full max-md:aspect-auto max-md:rounded-[14px]"
            allowFullScreen
          />
        </div>

        {/* Controls and Quote */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center justify-center gap-3 mb-2 max-md:order-2 max-md:mb-0">
            {/* Glassmorphic Share Button */}
            <ActionButton
              onClick={handleShare}
              label={shareText}
              ariaLabel="Share website link"
              icon={
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              }
            />

            {/* Glassmorphic Lyrics Button */}
            <ActionButton
              onClick={handleToggleLyrics}
              label="Open Lyrics"
              ariaLabel="Open lyrics modal"
              icon={
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              }
            />
          </div>

          {/* Quote Card */}
          <div className="flex items-center justify-center gap-1.5 max-w-[580px] text-center bg-white px-6 py-3 rounded-2xl shadow-xl max-md:order-1 max-md:w-[84%] max-md:max-w-[300px] max-md:mt-2 max-md:px-3.5 max-md:py-2 max-md:border max-md:border-[#e8e0d0]">
            <span className="font-serif text-[clamp(20px,2.5vw,30px)] text-[#38312d] leading-none max-md:text-base">“</span>
            <span className="font-serif italic text-[clamp(13px,1.5vw,19px)] text-[#2d2825] max-md:text-[11px] max-md:leading-tight">
              {config.quoteText}
            </span>
            <span className="font-serif text-[clamp(20px,2.5vw,30px)] text-[#38312d] leading-none max-md:text-base">”</span>
          </div>
        </div>
      </main>

      {/* Global Lyrics Bottom Sheet */}
      <LyricsPopup
        isOpen={isLyricsOpen}
        onClose={() => setIsLyricsOpen(false)}
        lyricsData={lyricsData}
        loading={loadingLyrics}
      />
    </div>
  );
}