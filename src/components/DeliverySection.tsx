import React, { useState } from 'react';
import { BAKU_ZONES } from '../data/bakuZones';
import { DeliveryZone } from '../types';
import { MapPin, Clock, Flame, ShieldAlert, CheckCircle2, Navigation, Phone } from 'lucide-react';

interface Props {
  onSelectZoneForOrder?: (zoneName: string) => void;
}

export const DeliverySection: React.FC<Props> = ({ onSelectZoneForOrder }) => {
  const [selectedZone, setSelectedZone] = useState<DeliveryZone>(BAKU_ZONES[0]);

  return (
    <section id="delivery" className="py-16 md:py-24 bg-gradient-to-b from-[#1e040b] via-[#280713] to-[#20050e] relative border-y border-rose-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-800/40 text-xs font-semibold text-rose-300 mb-3">
            <Navigation className="w-3.5 h-3.5 text-amber-400" />
            <span>Логистика и доставка по Баку</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Привезем горячим к вашему столу
          </h2>
          <p className="mt-4 text-base text-zinc-300">
            Мы упаковываем борщ в специальные многослойные термобоксы с вакуумной крышкой. Даже через 60 минут температура борща не опускается ниже 78°C!
          </p>
        </div>

        {/* Zones and Logistics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Baku District Selector */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-sm font-semibold text-zinc-300 mb-2 flex items-center justify-between">
              <span>Выберите ваш район в Баку:</span>
              <span className="text-xs text-rose-300/80">Зоны покрытия 100%</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BAKU_ZONES.map((zone) => {
                const isSelected = selectedZone.id === zone.id;
                return (
                  <div
                    key={zone.id}
                    onClick={() => setSelectedZone(zone)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-br from-rose-950/90 to-[#221016] border-amber-500/80 shadow-lg shadow-rose-950'
                        : 'bg-[#160c10] border-rose-950/80 hover:border-rose-900/60'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="font-semibold text-sm text-white flex items-center gap-1.5">
                        <MapPin className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-rose-500'}`} />
                        <span>{zone.name.split('(')[0]}</span>
                      </div>
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                        zone.deliveryFeeAzn === 0 
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/40' 
                          : 'bg-zinc-800 text-zinc-300'
                      }`}>
                        {zone.deliveryFeeAzn === 0 ? '0 ₼ доставка' : `${zone.deliveryFeeAzn} ₼`}
                      </span>
                    </div>

                    <div className="text-xs text-zinc-400 mt-1 line-clamp-1">
                      {zone.popularSpots}
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-rose-950/60">
                      <div className="flex items-center gap-1 text-amber-300 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        <span>≈ {zone.timeMinutes} мин</span>
                      </div>
                      <span className="text-[11px] text-zinc-400">
                        Мин. заказ: {zone.minOrderAzn} ₼
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Zone Details Callout */}
            <div className="p-4 rounded-2xl bg-[#1b0d13] border border-rose-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
              <div>
                <div className="text-xs text-zinc-400">Выбранный район:</div>
                <div className="text-base font-bold text-amber-200">
                  {selectedZone.name}
                </div>
                <div className="text-xs text-zinc-300 mt-0.5 font-mono">
                  {selectedZone.nameAz}
                </div>
              </div>

              {onSelectZoneForOrder && (
                <button
                  onClick={() => onSelectZoneForOrder(selectedZone.name)}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl transition-all shadow cursor-pointer shrink-0"
                >
                  Заказать в этот район
                </button>
              )}
            </div>

          </div>

          {/* Right Column: Thermal Guarantee & Standards */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#1c0f14] to-[#12080c] border border-rose-900/40 rounded-3xl p-6 sm:p-7 space-y-5">
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center text-white shadow-lg">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Гарантия горячей подачи
                </h3>
                <p className="text-xs text-rose-300">
                  Технологии термо-доставки Глеба Саюткина
                </p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs text-zinc-300">
              <div className="flex items-start gap-3 bg-[#13090c] p-3 rounded-xl border border-rose-950">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Термобоксы из вспененного EPP</strong>
                  Сохраняют внутреннее тепло с потерей не более 1°C за каждые 20 минут в пути по бакинским пробкам.
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#13090c] p-3 rounded-xl border border-rose-950">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Герметичная запайка каждого контейнера</strong>
                  Ни капли не прольется. Чистая, ресторанная распаковка на вашем рабочем или домашнем столе.
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#13090c] p-3 rounded-xl border border-rose-950">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Пампушки в крафтовых конвертах</strong>
                  Чесночные булочки остаются с хрустящей корочкой и не отсыревают от пара.
                </div>
              </div>
            </div>

            {/* Direct hotline */}
            <div className="pt-3 border-t border-rose-950/80 flex items-center justify-between text-xs">
              <span className="text-zinc-400">Служба доставки в Баку:</span>
              <a href="tel:+994508441892" className="text-amber-400 font-mono font-bold hover:underline">
                +994 (50) 844-18-92
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
