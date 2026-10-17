import React from 'react';
import { Flame, Clock, Award, ShieldCheck, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { BorschHeroVisual } from './visuals/BorschHeroVisual';

interface Props {
  onOpenOrder: () => void;
  onNavigateToCatering: () => void;
  onNavigateToMenu: () => void;
}

export const Hero: React.FC<Props> = ({ onOpenOrder, onNavigateToCatering, onNavigateToMenu }) => {
  return (
    <section id="hero" className="relative pt-6 pb-16 lg:py-20 overflow-hidden">
      {/* Decorative background radial lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-rose-900/25 to-amber-900/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Order Action */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/70 border border-rose-800/40 text-rose-200 text-xs sm:text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>Баку • Доставка горячим за 35-50 минут</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              Настоящий авторский борщ в Баку от шефа{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-amber-500">
                Глеба Саюткина
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-rose-100/80 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Томим 8 часов на сахарной мозговой косточке и отборной говядине. Подаем с пылу с жару в герметичных термобоксах с воздушными чесночными пампушками и фермерской сметаной.
            </p>

            {/* Quick Benefits Bullet List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto lg:mx-0 pt-1">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Flame className="w-3.5 h-3.5" />
                </div>
                <span>Приезжает горячим (80°C+)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span>Пампушки из печи к каждой порции</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <span>Фермерское мясо и бакинские томаты</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span>Кейтеринг от 10 до 200 гостей</span>
              </div>
            </div>

            {/* ORDER BUTTON ON MAIN PAGE & Action Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenOrder}
                className="px-7 py-4 bg-gradient-to-r from-rose-600 via-rose-700 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-semibold text-base rounded-2xl shadow-xl shadow-rose-900/50 hover:shadow-rose-900/70 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer border border-rose-400/30 group"
              >
                <Flame className="w-5 h-5 text-amber-300 fill-amber-300 animate-pulse" />
                <span>Заказать борщ с доставкой</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onNavigateToCatering}
                className="px-6 py-4 bg-[#1a0e13] hover:bg-[#25141b] text-rose-200 hover:text-white font-medium text-sm rounded-2xl border border-rose-900/60 hover:border-amber-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Кейтеринг на мероприятие</span>
              </button>
            </div>

            {/* Social Proof Bar */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-xs text-zinc-400">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-rose-800 border-2 border-[#0d0a0b] flex items-center justify-center text-white font-bold text-xs">
                  ГС
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-700 border-2 border-[#0d0a0b] flex items-center justify-center text-white font-bold text-xs">
                  ФМ
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-800 border-2 border-[#0d0a0b] flex items-center justify-center text-white font-bold text-xs">
                  ЕВ
                </div>
              </div>
              <div>
                <div className="font-semibold text-zinc-200">Более 1,800 порций доставлено в Баку</div>
                <div className="text-zinc-500">Средняя оценка 4.9 • 98% повторных заказов</div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual of the Borsch from Chef Gleb */}
          <div className="lg:col-span-6">
            <BorschHeroVisual onQuickOrder={onOpenOrder} />
          </div>

        </div>
      </div>
    </section>
  );
};
