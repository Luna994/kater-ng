import React, { useState } from 'react';

interface Props {
  type: 'classic' | 'baku-lamb' | 'smoked' | 'mushroom' | 'green' | 'pampushki' | 'salo' | 'party-pot';
  size?: 'sm' | 'md' | 'lg';
  imageUrl?: string;
  alt?: string;
}

export const FoodDishVisual: React.FC<Props> = ({ type, size = 'md', imageUrl, alt = 'Блюдо' }) => {
  const [hasError, setHasError] = useState(false);
  const heightClass = size === 'sm' ? 'h-36' : size === 'lg' ? 'h-64' : 'h-52';

  return (
    <div className={`relative w-full ${heightClass} bg-gradient-to-br from-[#241318] via-[#1a0d11] to-[#12080a] rounded-2xl overflow-hidden flex items-center justify-center border border-rose-950/60 group`}>
      {/* If realistic photo is available and hasn't errored */}
      {imageUrl && !hasError ? (
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={
             imageUrl
               ? `${import.meta.env.BASE_URL}${imageUrl.replace(/^\/+/, '')}`
              : undefined
            }
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Elegant culinary gradient overlay for contrast and warm lighting */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
        </div>
      ) : (
        /* Fallback SVG Food Art */
        <>
          <div className="absolute inset-0 bg-radial from-rose-900/20 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

          {type === 'classic' && (
            <svg viewBox="0 0 200 160" className="w-4/5 h-4/5 drop-shadow-xl transform group-hover:scale-105 transition-transform duration-300">
              <ellipse cx="100" cy="110" rx="85" ry="35" fill="#14080b" opacity="0.6" />
              <ellipse cx="100" cy="85" rx="75" ry="55" fill="#381c22" stroke="#5a2e38" strokeWidth="2" />
              <ellipse cx="100" cy="83" rx="65" ry="46" fill="#9f1239" />
              <circle cx="100" cy="83" r="14" fill="#fffbeb" />
              <circle cx="98" cy="82" r="10" fill="#ffffff" />
              <circle cx="90" cy="74" r="3" fill="#22c55e" />
              <circle cx="112" cy="88" r="3" fill="#16a34a" />
              <line x1="95" y1="80" x2="105" y2="72" stroke="#15803d" strokeWidth="2" />
              <ellipse cx="38" cy="65" rx="16" ry="14" fill="#d97706" />
              <ellipse cx="38" cy="62" rx="12" ry="8" fill="#fde68a" opacity="0.4" />
            </svg>
          )}

          {type === 'green' && (
            <svg viewBox="0 0 200 160" className="w-4/5 h-4/5 drop-shadow-xl transform group-hover:scale-105 transition-transform duration-300">
              <ellipse cx="100" cy="110" rx="85" ry="35" fill="#14080b" opacity="0.6" />
              <ellipse cx="100" cy="85" rx="75" ry="55" fill="#142618" stroke="#1e4d2b" strokeWidth="2" />
              <ellipse cx="100" cy="83" rx="65" ry="46" fill="#166534" />
              <path d="M 70 78 Q 85 68 95 82 Q 80 92 70 78 Z" fill="#15803d" stroke="#16a34a" strokeWidth="1" />
              <path d="M 105 70 Q 120 62 125 78 Q 115 88 105 70 Z" fill="#15803d" stroke="#16a34a" strokeWidth="1" />
              <ellipse cx="100" cy="86" rx="16" ry="12" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
              <circle cx="100" cy="86" r="7.5" fill="#eab308" stroke="#ca8a04" strokeWidth="0.8" />
              <circle cx="75" cy="88" r="4" fill="#86efac" stroke="#166534" strokeWidth="1.5" />
              <circle cx="125" cy="85" r="4" fill="#86efac" stroke="#166534" strokeWidth="1.5" />
            </svg>
          )}

          {type === 'baku-lamb' && (
            <svg viewBox="0 0 200 160" className="w-4/5 h-4/5 drop-shadow-xl transform group-hover:scale-105 transition-transform duration-300">
              <ellipse cx="100" cy="110" rx="85" ry="35" fill="#14080b" opacity="0.6" />
              <ellipse cx="100" cy="85" rx="75" ry="55" fill="#2f1a18" stroke="#78350f" strokeWidth="2" />
              <ellipse cx="100" cy="83" rx="65" ry="46" fill="#881337" />
              <rect x="85" y="72" width="16" height="14" rx="4" fill="#450a0a" />
              <circle cx="100" cy="83" r="12" fill="#fffbeb" />
              <circle cx="115" cy="75" r="3.5" fill="#e11d48" />
              <circle cx="122" cy="82" r="3" fill="#e11d48" />
              <circle cx="78" cy="88" r="3" fill="#e11d48" />
            </svg>
          )}

          {type === 'smoked' && (
            <svg viewBox="0 0 200 160" className="w-4/5 h-4/5 drop-shadow-xl transform group-hover:scale-105 transition-transform duration-300">
              <ellipse cx="100" cy="110" rx="85" ry="35" fill="#14080b" opacity="0.6" />
              <ellipse cx="100" cy="85" rx="75" ry="55" fill="#2b1812" stroke="#451a03" strokeWidth="2" />
              <ellipse cx="100" cy="83" rx="65" ry="46" fill="#701a2b" />
              <path d="M 70 75 Q 85 68 110 80" stroke="#fef3c7" strokeWidth="5" strokeLinecap="round" />
              <ellipse cx="100" cy="83" r="11" fill="#fffbeb" />
            </svg>
          )}

          {type === 'mushroom' && (
            <svg viewBox="0 0 200 160" className="w-4/5 h-4/5 drop-shadow-xl transform group-hover:scale-105 transition-transform duration-300">
              <ellipse cx="100" cy="110" rx="85" ry="35" fill="#14080b" opacity="0.6" />
              <ellipse cx="100" cy="85" rx="75" ry="55" fill="#262118" stroke="#3f3222" strokeWidth="2" />
              <ellipse cx="100" cy="83" rx="65" ry="46" fill="#831843" />
              <path d="M 85 75 Q 100 60 115 75 Z" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
              <rect x="96" y="75" width="8" height="12" rx="2" fill="#fef3c7" />
              <ellipse cx="80" cy="90" rx="5" ry="3.5" fill="#991b1b" />
            </svg>
          )}

          {type === 'pampushki' && (
            <svg viewBox="0 0 200 160" className="w-4/5 h-4/5 drop-shadow-xl transform group-hover:scale-105 transition-transform duration-300">
              <ellipse cx="100" cy="115" rx="80" ry="25" fill="#451a03" stroke="#78350f" strokeWidth="2" />
              <circle cx="75" cy="75" r="24" fill="#d97706" />
              <circle cx="125" cy="75" r="24" fill="#d97706" />
              <circle cx="100" cy="90" r="26" fill="#b45309" />
              <circle cx="98" cy="82" r="3" fill="#15803d" />
            </svg>
          )}

          {type === 'salo' && (
            <svg viewBox="0 0 200 160" className="w-4/5 h-4/5 drop-shadow-xl transform group-hover:scale-105 transition-transform duration-300">
              <rect x="25" y="45" width="150" height="75" rx="8" fill="#2d1a12" stroke="#5c3523" strokeWidth="2" />
              <rect x="40" y="55" width="45" height="50" rx="4" fill="#1c110a" stroke="#451a03" strokeWidth="1.5" />
              <rect x="95" y="55" width="30" height="14" rx="3" fill="#fffbeb" stroke="#fecdd3" strokeWidth="1" />
              <line x1="95" y1="62" x2="125" y2="62" stroke="#e11d48" strokeWidth="2" />
            </svg>
          )}

          {type === 'party-pot' && (
            <svg viewBox="0 0 200 160" className="w-4/5 h-4/5 drop-shadow-xl transform group-hover:scale-105 transition-transform duration-300">
              <ellipse cx="100" cy="120" rx="75" ry="25" fill="#180e06" opacity="0.6" />
              <path d="M 40 70 Q 30 115 100 120 Q 170 115 160 70 Z" fill="#78350f" stroke="#b45309" strokeWidth="2.5" />
              <ellipse cx="100" cy="70" rx="60" ry="22" fill="#9f1239" stroke="#d97706" strokeWidth="2" />
            </svg>
          )}
        </>
      )}
    </div>
  );
};
