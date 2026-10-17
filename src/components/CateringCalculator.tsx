import React, { useState } from 'react';
import { Users, Flame, Check, Sparkles, Calendar, Coffee, UtensilsCrossed } from 'lucide-react';

interface Props {
  onBookCatering: (cateringSummary: {
    guests: number;
    soupType: string;
    withChefService: boolean;
    extraPampushki: boolean;
    saloPlatter: boolean;
    teaStation: boolean;
    totalPriceAzn: number;
  }) => void;
}

export const CateringCalculator: React.FC<Props> = ({ onBookCatering }) => {
  const [guests, setGuests] = useState<number>(20);
  const [soupType, setSoupType] = useState<string>('classic');
  const [withChefService, setWithChefService] = useState<boolean>(true);
  const [extraPampushki, setExtraPampushki] = useState<boolean>(true);
  const [saloPlatter, setSaloPlatter] = useState<boolean>(true);
  const [teaStation, setTeaStation] = useState<boolean>(false);

  // Pricing formula in AZN
  const basePricePerPerson = soupType === 'baku-lamb' ? 14 : soupType === 'smoked' ? 13 : 12;
  let foodTotal = guests * basePricePerPerson;
  
  if (extraPampushki) {
    foodTotal += guests * 2; // 2 AZN per guest for extra pampushki basket
  }
  if (saloPlatter) {
    foodTotal += guests * 3.5; // 3.5 AZN per guest for premium salo platter
  }
  if (teaStation) {
    foodTotal += guests * 2; // 2 AZN per guest for mountain herb tea
  }

  // Chef Gleb presence & hot equipment setup
  const serviceFee = withChefService ? 70 : 25; // 70 AZN for chef service & equipment, 25 for thermal delivery only
  const grandTotal = Math.round(foodTotal + serviceFee);
  const pricePerGuest = (grandTotal / guests).toFixed(1);

  const soupLabels: { [key: string]: string } = {
    'classic': 'Борщ «Полтавский» с говядиной',
    'baku-lamb': 'Борщ «Бакинский» с ягненком и алычой',
    'smoked': 'Борщ «Старокиевский» с копченостями',
    'mix': 'Микс (два вида борща в разных котлах)'
  };

  const handleBooking = () => {
    onBookCatering({
      guests,
      soupType: soupLabels[soupType],
      withChefService,
      extraPampushki,
      saloPlatter,
      teaStation,
      totalPriceAzn: grandTotal
    });
  };

  return (
    <section id="catering" className="py-16 md:py-24 bg-gradient-to-b from-[#20050e] via-[#2c0814] to-[#1e040b] relative border-y border-rose-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-300 mb-3">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Кейтеринг для офисов, тимбилдингов и торжеств в Баку</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Калькулятор кейтеринга от Глеба Саюткина
          </h2>
          <p className="mt-4 text-base text-zinc-300">
            Горячие медные котлы, аромат чесночных пампушек прямо из печи, персональная подача и безупречный сервис в любой точке Баку и Апшерона.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="bg-[#330a17] border border-rose-700/60 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 7 cols: Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Guests Count Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-rose-100 flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-400" />
                    <span>Количество персон:</span>
                  </label>
                  <span className="text-xl font-bold text-amber-300 font-mono bg-rose-950/60 px-3 py-1 rounded-xl border border-rose-800/40">
                    {guests} гостей
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="120"
                  step="5"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full h-2.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[11px] text-zinc-400 mt-1">
                  <span>10 (небольшой отдел)</span>
                  <span>50 (корпоратив)</span>
                  <span>120+ (большой банкет)</span>
                </div>
              </div>

              {/* Soup Selection */}
              <div>
                <label className="text-sm font-semibold text-rose-100 block mb-2">
                  Основной вид борща:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setSoupType('classic')}
                    className={`p-3 rounded-xl text-xs text-left border transition-all cursor-pointer ${
                      soupType === 'classic'
                        ? 'bg-rose-950/80 border-amber-500 text-white shadow-md'
                        : 'bg-[#150a0f] border-rose-950 text-zinc-300 hover:border-rose-900'
                    }`}
                  >
                    <div className="font-semibold text-rose-200">Полтавский классик</div>
                    <div className="text-[11px] text-zinc-400">На мраморной говядине</div>
                  </button>

                  <button
                    onClick={() => setSoupType('baku-lamb')}
                    className={`p-3 rounded-xl text-xs text-left border transition-all cursor-pointer ${
                      soupType === 'baku-lamb'
                        ? 'bg-rose-950/80 border-amber-500 text-white shadow-md'
                        : 'bg-[#150a0f] border-rose-950 text-zinc-300 hover:border-rose-900'
                    }`}
                  >
                    <div className="font-semibold text-amber-200">Бакинский с ягненком</div>
                    <div className="text-[11px] text-zinc-400">С кизиловой алычой и кинзой</div>
                  </button>

                  <button
                    onClick={() => setSoupType('smoked')}
                    className={`p-3 rounded-xl text-xs text-left border transition-all cursor-pointer ${
                      soupType === 'smoked'
                        ? 'bg-rose-950/80 border-amber-500 text-white shadow-md'
                        : 'bg-[#150a0f] border-rose-950 text-zinc-300 hover:border-rose-900'
                    }`}
                  >
                    <div className="font-semibold text-rose-200">Старокиевский с копченостями</div>
                    <div className="text-[11px] text-zinc-400">На ольховых ребрышках</div>
                  </button>

                  <button
                    onClick={() => setSoupType('mix')}
                    className={`p-3 rounded-xl text-xs text-left border transition-all cursor-pointer ${
                      soupType === 'mix'
                        ? 'bg-rose-950/80 border-amber-500 text-white shadow-md'
                        : 'bg-[#150a0f] border-rose-950 text-zinc-300 hover:border-rose-900'
                    }`}
                  >
                    <div className="font-semibold text-rose-200">Микс 50/50</div>
                    <div className="text-[11px] text-zinc-400">Два разных котла</div>
                  </button>
                </div>
              </div>

              {/* Service & Add-ons */}
              <div className="space-y-2.5">
                <label className="text-sm font-semibold text-rose-100 block mb-1">
                  Формат и дополнения к столу:
                </label>

                <div
                  onClick={() => setWithChefService(!withChefService)}
                  className={`p-3 rounded-xl flex items-center justify-between border cursor-pointer transition-all ${
                    withChefService
                      ? 'bg-amber-950/30 border-amber-500/60 text-white'
                      : 'bg-[#150a0f] border-rose-950 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                      withChefService ? 'bg-amber-500 border-amber-400 text-black' : 'border-zinc-700'
                    }`}>
                      {withChefService && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-rose-100">
                        Выездной сервис с шефом Глебом Саюткиным (+70 ₼)
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        Медные подогреваемые котлы, половники, персональный розлив и подача
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setSaloPlatter(!saloPlatter)}
                  className={`p-3 rounded-xl flex items-center justify-between border cursor-pointer transition-all ${
                    saloPlatter
                      ? 'bg-amber-950/30 border-amber-500/60 text-white'
                      : 'bg-[#150a0f] border-rose-950 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                      saloPlatter ? 'bg-amber-500 border-amber-400 text-black' : 'border-zinc-700'
                    }`}>
                      {saloPlatter && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-rose-100">
                        Ассорти фермерского сала с бородинским хлебом (+3.5 ₼/чел)
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        Сало трёх видов, чесночный крем, горчица, зеленый лук
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setExtraPampushki(!extraPampushki)}
                  className={`p-3 rounded-xl flex items-center justify-between border cursor-pointer transition-all ${
                    extraPampushki
                      ? 'bg-amber-950/30 border-amber-500/60 text-white'
                      : 'bg-[#150a0f] border-rose-950 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                      extraPampushki ? 'bg-amber-500 border-amber-400 text-black' : 'border-zinc-700'
                    }`}>
                      {extraPampushki && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-rose-100">
                        Двойная порция чесночных пампушек из печи (+2 ₼/чел)
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        По 4 горячие пампушки на каждого гостя вместо 2-х
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Right 5 cols: Live Price Card & CTA */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#241119] to-[#160a0f] border border-rose-800/40 rounded-2xl p-6 text-center space-y-5 shadow-xl">
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950 text-rose-200 text-xs font-medium border border-rose-900">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Горячий расчет под ключ</span>
              </div>

              <div>
                <div className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                  Итоговая стоимость кейтеринга:
                </div>
                <div className="mt-1 flex items-center justify-center gap-1.5 text-4xl sm:text-5xl font-serif font-extrabold text-white">
                  <span>{grandTotal}</span>
                  <span className="text-amber-400">₼</span>
                </div>
                <div className="text-xs text-rose-300 mt-1">
                  Всего ≈ <strong className="text-amber-200">{pricePerGuest} ₼</strong> на 1 гостя
                </div>
              </div>

              {/* What is included in the catering box */}
              <div className="bg-[#190b11] p-3.5 rounded-xl border border-rose-950 text-left text-xs text-zinc-300 space-y-1.5">
                <div className="font-semibold text-rose-200 mb-1 flex items-center gap-1">
                  <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
                  Включено в ваш кейтеринг:
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span>{guests * 450 / 1000} литров горячего борща ({soupLabels[soupType]})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span>{guests * (extraPampushki ? 4 : 2)} свежих чесночных пампушек</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span>{Math.round(guests * 50 / 100) / 10} кг деревенской сметаны 25%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span>Доставка в термобоксах к точному часу по Баку</span>
                </div>
              </div>

              <button
                onClick={handleBooking}
                className="w-full py-4 bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-rose-950 transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-amber-400/30"
              >
                <Calendar className="w-4 h-4" />
                <span>Забронировать кейтеринг</span>
              </button>

              <div className="text-[11px] text-zinc-400">
                Оплата: безналичный расчет для компаний (счёт-фактура) или наличные курьеру.
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
