import React, { useState } from 'react';
import { Sparkles, Flame, Plus, Check } from 'lucide-react';

interface Props {
  onQuickOrder?: () => void;
}

export const BorschHeroVisual: React.FC<Props> = ({ onQuickOrder }) => {
  const [viewMode, setViewMode] = useState<'photo' | 'recipe'>('photo');
  const [extraDill, setExtraDill] = useState(true);
  const [extraSmetana, setExtraSmetana] = useState(true);
  const [steaming, setSteaming] = useState(true);
  const [saloBoard, setSaloBoard] = useState(true);

  return (
    <div className="relative w-full max-w-xl mx-auto select-none">
      {/* Background ambient lighting */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-rose-950/60 via-amber-950/40 to-transparent rounded-3xl blur-2xl -z-10" />

      {/* Main Culinary Visual Canvas */}
      <div className="relative bg-gradient-to-b from-[#221317] to-[#120a0d] border border-rose-900/40 rounded-3xl p-5 md:p-7 shadow-2xl overflow-hidden">
        
        {/* Top badge and Mode Switcher */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-rose-950/80 border border-rose-800/50 rounded-full text-xs font-semibold text-rose-200">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Готовится в Баку сегодня</span>
          </div>

          <div className="flex items-center bg-black/40 p-1 rounded-xl border border-rose-900/50 text-[11px]">
            <button
              onClick={() => setViewMode('photo')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-medium ${
                viewMode === 'photo' ? 'bg-amber-500 text-black font-bold shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Фото борща
            </button>
            <button
              onClick={() => setViewMode('recipe')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-medium ${
                viewMode === 'recipe' ? 'bg-amber-500 text-black font-bold shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Схема подачи
            </button>
          </div>
        </div>

        {/* Realistic Artistic Plate Composition */}
        <div className="relative flex items-center justify-center my-2">
          
          {/* Steam animations */}
          {steaming && (
            <div className="absolute top-2 z-20 pointer-events-none flex gap-8 opacity-75">
              <div className="w-3 h-16 bg-gradient-to-t from-white/30 to-transparent blur-md rounded-full animate-pulse transform -translate-y-4" />
              <div className="w-4 h-20 bg-gradient-to-t from-white/40 to-transparent blur-md rounded-full animate-pulse delay-300 transform -translate-y-6" />
              <div className="w-3 h-14 bg-gradient-to-t from-white/30 to-transparent blur-md rounded-full animate-pulse delay-700 transform -translate-y-4" />
            </div>
          )}

          {viewMode === 'photo' ? (
            <div className="relative w-full h-[320px] sm:h-[360px] rounded-2xl overflow-hidden border border-rose-800/40 shadow-2xl group">
              <img
                src="/images/hero_borsch.jpg"
                alt="Настоящий авторский борщ от шефа Глеба Саюткина"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              {/* Badges on realistic photo */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-rose-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Подается с чесночными пампушками и сметаной</span>
                </div>
                <div className="bg-amber-500/90 text-zinc-950 font-bold px-2.5 py-1 rounded-lg text-[11px] shadow">
                  100% натурально
                </div>
              </div>
            </div>
          ) : (
            <svg viewBox="0 0 520 420" className="w-full h-auto drop-shadow-2xl">
            <defs>
              {/* Radial gradient for the rich ruby borsch broth */}
              <radialGradient id="borschBroth" cx="45%" cy="40%" r="55%">
                <stop offset="0%" stopColor="#c71b42" />
                <stop offset="50%" stopColor="#960d2b" />
                <stop offset="85%" stopColor="#5b0518" />
                <stop offset="100%" stopColor="#38010d" />
              </radialGradient>

              {/* Ceramic bowl rim gradient */}
              <linearGradient id="bowlRim" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3d2a2d" />
                <stop offset="35%" stopColor="#1e1316" />
                <stop offset="70%" stopColor="#52393e" />
                <stop offset="100%" stopColor="#120a0d" />
              </linearGradient>

              {/* Golden fat broth droplets */}
              <radialGradient id="fatDrop" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
              </radialGradient>

              {/* Smetana sour cream gradient */}
              <radialGradient id="smetanaSwirl" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="70%" stopColor="#fffbeb" />
                <stop offset="100%" stopColor="#f3e8d2" />
              </radialGradient>

              {/* Pampushka bread gradient */}
              <radialGradient id="pampushkaGold" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#fed7aa" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="85%" stopColor="#b45309" />
                <stop offset="100%" stopColor="#78350f" />
              </radialGradient>

              {/* Wooden board texture */}
              <linearGradient id="woodBoard" x1="0%" y1="0%" x2="100%" y2="80%">
                <stop offset="0%" stopColor="#45271a" />
                <stop offset="50%" stopColor="#2e1910" />
                <stop offset="100%" stopColor="#1f100a" />
              </linearGradient>
            </defs>

            {/* Rustic oak table background ring */}
            <ellipse cx="260" cy="225" rx="245" ry="175" fill="#1b1013" stroke="#361a20" strokeWidth="3" />

            {/* Side Wooden Board for Pampushki & Salo */}
            {saloBoard && (
              <g transform="translate(15, 60)">
                <rect x="0" y="20" width="130" height="230" rx="16" fill="url(#woodBoard)" stroke="#5c3523" strokeWidth="2" transform="rotate(-6 65 135)" />
                <circle cx="15" cy="35" r="5" fill="#1f100a" />
                
                {/* 3 Pampushki buns */}
                <g transform="rotate(-6 65 135)">
                  {/* Pampushka 1 */}
                  <ellipse cx="65" cy="70" rx="36" ry="30" fill="url(#pampushkaGold)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.6))" />
                  <ellipse cx="65" cy="62" rx="28" ry="18" fill="#ffedd5" opacity="0.3" />
                  {/* Garlic parsley glaze */}
                  <circle cx="60" cy="65" r="2.5" fill="#15803d" />
                  <circle cx="72" cy="70" r="2" fill="#166534" />
                  <circle cx="56" cy="75" r="2" fill="#15803d" />
                  <circle cx="68" cy="62" r="1.5" fill="#fef08a" />

                  {/* Pampushka 2 */}
                  <ellipse cx="65" cy="125" rx="35" ry="29" fill="url(#pampushkaGold)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.6))" />
                  <circle cx="62" cy="122" r="2.5" fill="#15803d" />
                  <circle cx="70" cy="128" r="2" fill="#166534" />
                  <circle cx="58" cy="132" r="2" fill="#fef08a" />

                  {/* Pampushka 3 */}
                  <ellipse cx="65" cy="180" rx="34" ry="28" fill="url(#pampushkaGold)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.6))" />
                  <circle cx="64" cy="177" r="2" fill="#15803d" />
                  <circle cx="71" cy="183" r="1.5" fill="#fef08a" />

                  {/* Label on board */}
                  <text x="65" y="235" textAnchor="middle" fill="#d97706" fontSize="10" fontWeight="bold" letterSpacing="1">
                    ПАМПУШКИ
                  </text>
                </g>
              </g>
            )}

            {/* Deep Artisan Ceramic Bowl - Outer rim */}
            <ellipse cx="320" cy="215" rx="180" ry="155" fill="url(#bowlRim)" stroke="#69434b" strokeWidth="4" filter="drop-shadow(0 15px 25px rgba(0,0,0,0.8))" />
            
            {/* Bowl Inner Lip */}
            <ellipse cx="320" cy="215" rx="165" ry="142" fill="#1f0f13" stroke="#481822" strokeWidth="2" />

            {/* Steaming Ruby Borsch Soup Surface */}
            <ellipse cx="320" cy="215" rx="155" ry="132" fill="url(#borschBroth)" />

            {/* Depth & vegetable textures in the soup */}
            {/* Tender beef chunks */}
            <path d="M 280 180 Q 295 170 310 185 Q 315 200 290 205 Q 275 195 280 180 Z" fill="#4a0f1b" stroke="#751a2d" strokeWidth="1" />
            <path d="M 370 230 Q 390 220 395 240 Q 385 255 365 245 Z" fill="#4a0f1b" stroke="#751a2d" strokeWidth="1" />
            
            {/* Sliced beet strips & cabbage under ruby broth */}
            <path d="M 230 200 Q 255 210 270 195" stroke="#be123c" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 260 250 Q 290 260 320 248" stroke="#be123c" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M 340 170 Q 365 160 380 175" stroke="#fbcfe8" strokeWidth="2.5" opacity="0.6" strokeLinecap="round" fill="none" />
            <path d="M 310 270 Q 340 280 370 265" stroke="#fda4af" strokeWidth="2" opacity="0.5" strokeLinecap="round" fill="none" />

            {/* Golden broth fat circles (наваристый бульон) */}
            <circle cx="250" cy="170" r="12" fill="url(#fatDrop)" />
            <circle cx="280" cy="260" r="16" fill="url(#fatDrop)" />
            <circle cx="390" cy="190" r="14" fill="url(#fatDrop)" />
            <circle cx="370" cy="270" r="10" fill="url(#fatDrop)" />
            <circle cx="230" cy="235" r="9" fill="url(#fatDrop)" />
            <circle cx="340" cy="140" r="11" fill="url(#fatDrop)" />

            {/* Dollop of Smetana (Sour Cream) in center */}
            {extraSmetana && (
              <g id="smetana-group" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.5))">
                <path d="M 320 185 C 345 185 365 200 360 220 C 355 240 330 248 310 245 C 290 240 285 220 295 200 C 305 185 320 185 320 185 Z" fill="url(#smetanaSwirl)" />
                {/* Spiral swirl texture */}
                <path d="M 325 195 Q 345 205 340 222 Q 330 235 315 233 Q 300 228 305 212 Q 312 200 325 208" stroke="#f5ede6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                {/* Pinch of fresh pepper */}
                <circle cx="320" cy="215" r="1.5" fill="#2d1519" />
                <circle cx="332" cy="210" r="1.2" fill="#2d1519" />
                <circle cx="312" cy="225" r="1.3" fill="#2d1519" />
              </g>
            )}

            {/* Fresh Dill Sprigs (Зелень укропа и зеленый лучок) */}
            {extraDill && (
              <g id="greens-group">
                {/* Spring onion slice */}
                <circle cx="300" cy="165" r="5" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
                <circle cx="300" cy="165" r="2.5" fill="#86efac" />
                <circle cx="365" cy="255" r="5" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
                <circle cx="365" cy="255" r="2.5" fill="#86efac" />
                <circle cx="245" cy="215" r="4" fill="#22c55e" stroke="#15803d" strokeWidth="1.2" />

                {/* Delicate dill needles */}
                <g stroke="#15803d" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M 325 175 L 320 160 M 325 170 L 333 162 M 323 165 L 315 158" />
                  <path d="M 350 205 L 368 198 M 358 202 L 364 212 M 362 200 L 372 204" />
                  <path d="M 285 225 L 272 232 M 280 227 L 278 220 M 275 230 L 268 228" />
                  <path d="M 335 242 L 348 252 M 340 245 L 346 238 M 344 249 L 354 246" />
                </g>
              </g>
            )}

            {/* Artisanal Wooden Spoon on the side */}
            <g transform="translate(420, 90) rotate(24)">
              <ellipse cx="25" cy="35" rx="22" ry="32" fill="#4a2a19" stroke="#713f12" strokeWidth="1.5" filter="drop-shadow(2px 6px 6px rgba(0,0,0,0.7))" />
              <rect x="21" y="60" width="8" height="150" rx="4" fill="#3b2014" stroke="#713f12" strokeWidth="1" />
              {/* Drop of ruby soup on spoon */}
              <ellipse cx="25" cy="35" rx="14" ry="20" fill="url(#borschBroth)" />
              <circle cx="25" cy="35" r="4" fill="#fff" opacity="0.8" />
            </g>
          </svg>
          )}
        </div>

        {/* Interactive Customization Garnish Bar */}
        <div className="mt-4 pt-4 border-t border-rose-900/40">
          <div className="flex items-center justify-between text-xs text-rose-300 mb-2">
            <span className="font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Интерактивная подача борща:
            </span>
            <span className="text-zinc-400">Нажмите, чтобы настроить порцию</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setExtraSmetana(!extraSmetana)}
              className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                extraSmetana 
                  ? 'bg-amber-500/20 text-amber-200 border border-amber-500/50' 
                  : 'bg-zinc-800/80 text-zinc-400 border border-zinc-700/50 hover:bg-zinc-800'
              }`}
            >
              {extraSmetana ? <Check className="w-3.5 h-3.5 text-amber-400" /> : <Plus className="w-3.5 h-3.5" />}
              Сметана 25%
            </button>

            <button
              onClick={() => setExtraDill(!extraDill)}
              className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                extraDill 
                  ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/50' 
                  : 'bg-zinc-800/80 text-zinc-400 border border-zinc-700/50 hover:bg-zinc-800'
              }`}
            >
              {extraDill ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Plus className="w-3.5 h-3.5" />}
              Свежий укроп и лук
            </button>

            <button
              onClick={() => setSaloBoard(!saloBoard)}
              className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                saloBoard 
                  ? 'bg-amber-600/20 text-amber-200 border border-amber-600/50' 
                  : 'bg-zinc-800/80 text-zinc-400 border border-zinc-700/50 hover:bg-zinc-800'
              }`}
            >
              {saloBoard ? <Check className="w-3.5 h-3.5 text-amber-400" /> : <Plus className="w-3.5 h-3.5" />}
              Чесночные пампушки
            </button>

            <button
              onClick={() => setSteaming(!steaming)}
              className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                steaming 
                  ? 'bg-rose-500/20 text-rose-200 border border-rose-500/50' 
                  : 'bg-zinc-800/80 text-zinc-400 border border-zinc-700/50 hover:bg-zinc-800'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              {steaming ? 'Пар из кастрюли (горячий)' : 'Остывает'}
            </button>
          </div>
        </div>

        {/* Caption & Quick CTA inside visual */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-rose-950/40 p-3.5 rounded-xl border border-rose-800/30">
          <div>
            <div className="text-sm font-semibold text-rose-100">
              Борщ от шефа Глеба Саюткина
            </div>
            <div className="text-xs text-rose-300/80">
              450 мл + 2 пампушки + сметана • 13 ₼
            </div>
          </div>
          {onQuickOrder && (
            <button
              onClick={onQuickOrder}
              className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-medium text-xs tracking-wide uppercase rounded-lg shadow-lg shadow-rose-900/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Заказать этот борщ
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
