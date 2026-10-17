import React, { useState } from 'react';
import { Award, Flame, Star, Heart, Sparkles, ChefHat } from 'lucide-react';

export const ChefGlebVisual: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Decorative ambient background lighting */}
      <div className="absolute -inset-4 bg-gradient-to-r from-amber-600/30 via-rose-600/25 to-amber-700/30 rounded-3xl blur-2xl -z-10" />

      <div className="relative bg-gradient-to-b from-[#241318] to-[#12090c] border border-amber-900/50 rounded-3xl p-6 shadow-2xl overflow-hidden">
        
        {/* Top Chef Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-semibold text-amber-300">
            <ChefHat className="w-3.5 h-3.5 text-amber-400" />
            <span>Шеф-повар & Основатель</span>
          </div>
          <span className="text-xs text-rose-300/80 font-serif italic">Кухня в Баку</span>
        </div>

        {/* Photo Container: Chef Gleb decorating dish with microgreens */}
        <div className="relative flex justify-center py-2">
          <div className="relative w-72 h-96 rounded-2xl overflow-hidden border-2 border-amber-500/50 shadow-2xl group bg-[#180d11]">
            
            {/* Real photo uploaded by user with fallback */}
            {!imgError ? (
              <img
                src="/Шеф-повар украшает блюдо микрозеленью.png"
                alt="Шеф-повар Глеб Саюткин украшает блюдо микрозеленью"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('chef_gleb.png')) {
                    target.src = '/chef_gleb.png';
                  } else if (!target.src.includes('chef_gleb_kitchen.jpg')) {
                    target.src = '/images/chef_gleb_kitchen.jpg';
                  } else {
                    setImgError(true);
                  }
                }}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              /* Custom Artistic Portrait of Chef Gleb decorating dish in kitchen */
              <svg viewBox="0 0 300 400" className="w-full h-full">
                <defs>
                  <linearGradient id="kitchenBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2c221e" />
                    <stop offset="50%" stopColor="#1e1614" />
                    <stop offset="100%" stopColor="#120c0a" />
                  </linearGradient>
                  <linearGradient id="jacketBlack" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#222020" />
                    <stop offset="100%" stopColor="#111112" />
                  </linearGradient>
                  <linearGradient id="skinToneGleb" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f8d6be" />
                    <stop offset="100%" stopColor="#e3af8e" />
                  </linearGradient>
                  <linearGradient id="warmLight" cx="50%" cy="20%" r="60%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Professional Kitchen Backdrop */}
                <rect width="300" height="400" fill="url(#kitchenBg)" />
                {/* Overhead warm kitchen lamp lights */}
                <circle cx="60" cy="50" r="45" fill="url(#warmLight)" />
                <path d="M 45 0 L 75 0 L 85 45 L 35 45 Z" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
                <circle cx="60" cy="45" r="8" fill="#fef08a" />

                {/* Stainless steel shelving & pots in background */}
                <rect x="150" y="60" width="150" height="8" rx="2" fill="#71717a" opacity="0.6" />
                <rect x="170" y="35" width="30" height="25" rx="3" fill="#52525b" opacity="0.7" />
                {/* Pots of fresh herbs on kitchen shelf */}
                <rect x="230" y="42" width="22" height="18" rx="2" fill="#3f3f46" />
                <circle cx="241" cy="38" r="10" fill="#15803d" />

                {/* Chef Gleb Body in Black Jacket with Gold piping */}
                <path d="M 50 400 C 60 260 90 220 160 220 C 230 220 260 260 270 400 Z" fill="url(#jacketBlack)" />
                {/* Gold piping trim */}
                <path d="M 160 220 L 160 380" stroke="#f59e0b" strokeWidth="2" />
                <line x1="120" y1="230" x2="160" y2="230" stroke="#f59e0b" strokeWidth="1.5" />

                {/* Dark denim apron over jacket */}
                <path d="M 95 260 L 225 260 L 240 400 L 80 400 Z" fill="#1e2430" stroke="#2d3748" strokeWidth="1" />
                {/* Brass snaps/buckles */}
                <circle cx="108" cy="275" r="3.5" fill="#d97706" />
                <circle cx="212" cy="275" r="3.5" fill="#d97706" />
                <circle cx="160" cy="285" r="3" fill="#d97706" />
                <circle cx="160" cy="325" r="3" fill="#d97706" />

                {/* Neck */}
                <rect x="142" y="165" width="36" height="58" rx="6" fill="url(#skinToneGleb)" />

                {/* Head / Face */}
                <ellipse cx="160" cy="145" rx="44" ry="52" fill="url(#skinToneGleb)" />

                {/* Wavy stylish brown hair parted with bangs */}
                <path d="M 112 135 C 105 85 140 70 160 70 C 185 70 215 85 208 135 C 200 98 185 88 160 88 C 135 88 120 102 112 135 Z" fill="#8d5b35" />
                <path d="M 125 90 Q 148 115 142 128 Q 135 105 125 90 Z" fill="#784825" />
                <path d="M 160 85 Q 175 108 170 125 Q 162 102 160 85 Z" fill="#784825" />
                <path d="M 180 90 Q 195 110 190 125" fill="#784825" />

                {/* Thin rectangular wire-frame glasses */}
                <rect x="122" y="126" width="30" height="22" rx="4" fill="none" stroke="#94a3b8" strokeWidth="2" />
                <rect x="168" y="126" width="30" height="22" rx="4" fill="none" stroke="#94a3b8" strokeWidth="2" />
                <line x1="152" y1="135" x2="168" y2="135" stroke="#94a3b8" strokeWidth="2" />
                <line x1="122" y1="135" x2="114" y2="132" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="198" y1="135" x2="206" y2="132" stroke="#94a3b8" strokeWidth="1.5" />

                {/* Eyes with friendly warm gaze */}
                <ellipse cx="137" cy="136" rx="4.5" ry="3.5" fill="#2d1519" />
                <circle cx="138" cy="135" r="1.2" fill="#fff" />
                <ellipse cx="183" cy="136" rx="4.5" ry="3.5" fill="#2d1519" />
                <circle cx="184" cy="135" r="1.2" fill="#fff" />

                {/* Neat groomed mustache and beard stubble */}
                <path d="M 144 162 Q 160 168 176 162 Q 160 172 144 162 Z" fill="#6d4327" />
                <path d="M 152 178 Q 160 184 168 178 Q 160 188 152 178 Z" fill="#6d4327" />
                {/* Kind smile */}
                <path d="M 148 166 Q 160 170 172 166" stroke="#a36341" strokeWidth="2" fill="none" strokeLinecap="round" />
                {/* Nose */}
                <path d="M 160 137 L 157 153 L 163 153" stroke="#be8360" strokeWidth="2" strokeLinecap="round" fill="none" />

                {/* Hand garnishing dish with microgreens */}
                {/* Left arm reaching forward to plate */}
                <path d="M 70 330 Q 95 310 130 330 L 115 365 Z" fill="url(#skinToneGleb)" />
                {/* Delicate fingers holding microgreen sprig */}
                <circle cx="135" cy="328" r="6" fill="url(#skinToneGleb)" />
                <circle cx="140" cy="325" r="5" fill="url(#skinToneGleb)" />
                {/* Green microgreens in fingers */}
                <path d="M 138 328 Q 145 345 150 355" stroke="#22c55e" strokeWidth="2" fill="none" />
                <circle cx="148" cy="350" r="4" fill="#4ade80" />
                <circle cx="152" cy="353" r="3.5" fill="#22c55e" />
                <circle cx="142" cy="346" r="3" fill="#86efac" />

                {/* Gourmet Black Plate with plated dish */}
                <ellipse cx="160" cy="380" rx="100" ry="25" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
                <ellipse cx="160" cy="378" rx="85" ry="18" fill="#27272a" />
                {/* Food on plate (seared gourmet portion with sauce swirl and microgreens) */}
                <ellipse cx="160" cy="376" rx="30" ry="10" fill="#fef08a" />
                <ellipse cx="162" cy="374" rx="22" ry="7" fill="#b45309" />
                {/* Sauce drops */}
                <circle cx="130" cy="378" r="3" fill="#881337" />
                <circle cx="190" cy="375" r="2.5" fill="#881337" />
              </svg>
            )}

            {/* Bottom photo overlay label */}
            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white font-serif">
                  Глеб Саюткин
                </div>
                <div className="text-[11px] text-amber-300">
                  Шеф за работой на кухне в Баку
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

          </div>
        </div>

        {/* Info card underneath */}
        <div className="mt-4 text-center">
          <h3 className="text-xl font-serif font-bold text-amber-100">
            Глеб Саюткин
          </h3>
          <p className="text-xs text-rose-300 font-medium mt-0.5">
            Хозяин и шеф-повар авторского кейтеринга в Баку
          </p>

          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-rose-900/40 text-left">
            <div className="bg-rose-950/40 p-2.5 rounded-xl border border-rose-900/30">
              <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                <Flame className="w-3.5 h-3.5" />
                <span>8 часов</span>
              </div>
              <div className="text-[11px] text-zinc-400 mt-0.5">Томление основы</div>
            </div>

            <div className="bg-rose-950/40 p-2.5 rounded-xl border border-rose-900/30">
              <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                <Heart className="w-3.5 h-3.5" />
                <span>100%</span>
              </div>
              <div className="text-[11px] text-zinc-400 mt-0.5">Честные продукты</div>
            </div>

            <div className="bg-rose-950/40 p-2.5 rounded-xl border border-rose-900/30">
              <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>4.9 / 5</span>
              </div>
              <div className="text-[11px] text-zinc-400 mt-0.5">Рейтинг в Баку</div>
            </div>
          </div>

          <div className="mt-4 p-3.5 bg-rose-950/30 rounded-xl border border-rose-900/30 text-xs text-rose-200/90 italic font-serif leading-relaxed">
            «Каждую порцию борща и горячих пампушек я собираю лично, вкладывая душу и внимание к мельчайшим деталям.»
          </div>
        </div>

      </div>
    </div>
  );
};
