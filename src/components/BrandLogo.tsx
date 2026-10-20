import React, { useState } from 'react';

export const OFFICIAL_LOGO_URL = 'https://cdn.jsdelivr.net/gh/luckymohittiwari52-oss/quiz-assets@main/images/imag28.png';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'compact' | 'white';
  showSubtitle?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'full',
  showSubtitle = false,
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);

  // Height constraints based on size
  const heightClasses = {
    sm: 'h-9 sm:h-10',
    md: 'h-12 sm:h-14',
    lg: 'h-18 sm:h-22',
    xl: 'h-24 sm:h-32',
  }[size];

  return (
    <div
      className={`inline-flex flex-col items-center justify-center select-none ${className}`}
      id="official-book-com-logo"
    >
      {!imageError ? (
        <img
          src={OFFICIAL_LOGO_URL}
          alt="Book.Com - Educational Books Supplier Lucknow"
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className={`${heightClasses} w-auto max-w-full object-contain drop-shadow-2xs transition-transform duration-300 hover:scale-[1.03]`}
        />
      ) : (
        /* Crisp vector fallback in case of network issue */
        <div className="flex items-center gap-2 font-serif font-black text-red-600 text-2xl tracking-tight">
          <span>Book.Com</span>
        </div>
      )}

      {showSubtitle && (
        <span className="mt-1.5 inline-block bg-[#E52E2D] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
          Educational Books Supplier
        </span>
      )}
    </div>
  );
};
