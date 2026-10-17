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
