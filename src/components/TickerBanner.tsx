import React from 'react';
import { TOP_ANNOUNCEMENTS, BUSINESS_INFO } from '../data/businessInfo';
import { Sparkles, PhoneCall, Truck, ShieldCheck, Tag } from 'lucide-react';

interface TickerBannerProps {
  onQuickInquire?: () => void;
}

export const TickerBanner: React.FC<TickerBannerProps> = ({ onQuickInquire }) => {
  return (
    <div
      id="top-moving-announcement-banner"
      className="relative bg-gradient-to-r from-red-700 via-red-600 to-indigo-900 text-white overflow-hidden border-b border-red-800 shadow-sm z-30"
    >
      <div className="flex items-center">
        {/* Left Live Ticker Label Badge */}
        <div className="flex-shrink-0 bg-red-900/90 text-white px-3 sm:px-4 py-2 font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5 z-10 shadow-md border-r border-red-700">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="hidden sm:inline">Wholesale Updates</span>
          <span className="sm:hidden">Updates</span>
        </div>

        {/* Marquee Container */}
        <div className="flex-1 overflow-hidden relative py-2">
          <div className="animate-marquee flex items-center gap-8 whitespace-nowrap text-xs sm:text-sm font-medium">
            {TOP_ANNOUNCEMENTS.concat(TOP_ANNOUNCEMENTS).map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 bg-white/15 px-2.5 py-0.5 rounded-full text-xs font-semibold text-amber-200 border border-white/20">
                  {item.type === 'urgent' && <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
                  {item.type === 'dispatch' && <Truck className="w-3.5 h-3.5 text-sky-300" />}
                  {item.type === 'offer' && <Tag className="w-3.5 h-3.5 text-emerald-300" />}
                  {item.type === 'info' && <ShieldCheck className="w-3.5 h-3.5 text-indigo-300" />}
                  {item.highlight}
                </span>
                <span className="text-white/95">{item.text}</span>
                <span className="text-white/40 font-bold px-2">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Quick Call / WhatsApp CTA */}
        <div className="hidden lg:flex items-center gap-2 bg-indigo-950/80 px-4 py-2 text-xs font-semibold border-l border-indigo-800 z-10">
          <PhoneCall className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Aminabad Hub:</span>
          <a
            href={`tel:${BUSINESS_INFO.phones[0]}`}
            className="text-amber-300 hover:text-white font-bold underline decoration-dotted"
          >
            +91 {BUSINESS_INFO.phones[0]}
          </a>
        </div>
      </div>
    </div>
  );
};
