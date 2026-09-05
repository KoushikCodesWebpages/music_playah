'use client';

import { useState, useRef } from 'react';

export interface LyricsData {
  title?: string;
  artist?: string;
  lyrics: string[];
}

interface LyricsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  lyricsData: LyricsData | null;
  loading: boolean;
}

export default function LyricsPopup({ isOpen, onClose, lyricsData, loading }: LyricsPopupProps) {
  const [dragY, setDragY] = useState(0);
  const startY = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);

  // --- Unified Pointer Handlers (Works for Mouse, Touch, & Trackpad) ---
  const handlePointerDown = (e: React.PointerEvent) => {
    startY.current = e.clientY;
    isDragging.current = true;
    // Capture pointer events even if mouse leaves the handle target
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || startY.current === null) return;
    const currentY = e.clientY;
    const deltaY = currentY - startY.current;

    // Only allow dragging downward
    if (deltaY > 0) {
      setDragY(deltaY);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    // Release pointer capture
    if ((e.target as HTMLElement).hasPointerCapture(e.pointerId)) {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    }

    // Dismiss if dragged down more than 80px
    if (dragY > 80) {
      onClose();
    }
    setDragY(0);
    startY.current = null;
  };

  return (
    <>
      {/* Darkened Backdrop Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Slide-Up Bottom Sheet */}
      <div
        style={{
          transform: isOpen
            ? `translateY(${dragY}px)`
            : 'translateY(100%)',
        }}
        className={`fixed inset-x-0 bottom-0 z-50 flex max-h-[80vh] w-full max-w-2xl mx-auto flex-col rounded-t-3xl border-t border-white/20 bg-neutral-900/95 p-6 text-white backdrop-blur-xl shadow-2xl ${
          dragY === 0 ? 'transition-transform duration-300 ease-out' : ''
        }`}
      >
        {/* --- Dedicated Pointer-Swipe Header Zone --- */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="flex flex-col items-center mb-4 touch-none cursor-grab active:cursor-grabbing select-none"
        >
          {/* Drag Pill Indicator */}
          <div className="w-12 h-1.5 rounded-full bg-white/50 mb-3 hover:bg-white/70 transition-colors" />

          <div className="flex items-center justify-between w-full border-b border-white/10 pb-3">
            <div>
              <span className="text-xs font-semibold tracking-widest text-white/50 uppercase">
                Lyrics
              </span>
              {lyricsData?.title && (
                <h3 className="text-lg font-bold text-white">{lyricsData.title}</h3>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              onPointerDown={(e) => e.stopPropagation()} // Prevent close button click from triggering drag
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-sm font-semibold cursor-pointer"
              aria-label="Close lyrics"
            >
              ✕
            </button>
          </div>
        </div>

        {/* --- Scrollable Content Body --- */}
        <div className="overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-white/20">
          {loading ? (
            <div className="flex items-center justify-center py-12 text-white/50 text-sm">
              Loading lyrics...
            </div>
          ) : lyricsData?.lyrics ? (
            lyricsData.lyrics.map((line, index) => {
              if (!line.trim()) return <div key={index} className="h-3" />;
              if (line.startsWith('[')) {
                return (
                  <p key={index} className="pt-3 text-xs font-bold text-amber-400 uppercase tracking-widest">
                    {line}
                  </p>
                );
              }
              return (
                <p key={index} className="text-base font-medium text-white/90 leading-relaxed">
                  {line}
                </p>
              );
            })
          ) : (
            <div className="flex items-center justify-center py-12 text-white/50 text-sm">
              No lyrics found.
            </div>
          )}
        </div>
      </div>
    </>
  );
}