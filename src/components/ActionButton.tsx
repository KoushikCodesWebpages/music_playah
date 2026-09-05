'use client';

import { ReactNode } from 'react';

interface ActionButtonProps {
  onClick: () => void;
  icon: ReactNode;
  label: string;
  ariaLabel: string;
}

export default function ActionButton({ onClick, icon, label, ariaLabel }: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/70 text-black text-sm font-semibold tracking-wide backdrop-blur-md cursor-pointer transition-all duration-300 hover:bg-white/25 hover:border-white/40 hover:-translate-y-0.5 active:translate-y-0.5 shadow-lg max-md:text-xs max-md:px-4 max-md:py-2"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}