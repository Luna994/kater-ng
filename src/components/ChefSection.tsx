import React from 'react';
import { ChefGlebVisual } from './visuals/ChefGlebVisual';
import { Flame, CheckCircle2, Heart, Sparkles, Utensils, BookOpen, Compass, ShieldCheck } from 'lucide-react';

export const ChefSection: React.FC = () => {
  return (
    <section id="chef" className="py-16 md:py-24 bg-[#0d0709] relative overflow-hidden border-t border-rose-950/60">
      {/* Decorative ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-rose-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-300 mb-3">
            <Utensils className="w-3.5 h-3.5 text-amber-400" />
            <span>О создателе проекта в Баку</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Глеб Саюткин: мастерство, страсть и настоящий борщ
          </h2>
          <p className="mt-4 text-base text-zinc-300">
            История шеф-повара, превратившего главное домашнее блюдо в высокое искусство кейтеринга.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Chef Portrait & Visual */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <ChefGlebVisual />
          </div>

          {/* Right Column: Bio, Path, Craft and Philosophy */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            
            {/* 1. Краткая биография */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-rose-300 text-sm font-semibold">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Краткая биография</span>
              </div>
              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
                <strong>Глеб Саюткин</strong> — шеф-повар, гастрономический энтузиаст и основатель первой в Баку специализированной службы доставки и кейтеринга авторского борща. Выросший в атмосфере больших семейных обедов, где горячий суп был центром притяжения дома, Глеб с юных лет посвятил себя кулинарному делу. Переехав в Баку — город с уникальной культурой щедрых застолий и непревзойденными локальными продуктами, — он решил объединить богатство вековых славянских традиций с каспийским гостеприимством.
              </p>
            </div>

            {/* 2. Кулинарный путь */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-rose-300 text-sm font-semibold">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Кулинарный путь</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Путь Глеба начался с изучения первоисточников и региональных рецептов: от полтавского борща на мозговой косточке до старокиевского с копченостями и весеннего щавелевого. Работая на профессиональных кухнях и организуя выездные банкеты, Глеб пришел к выводу: <em>в эпоху фастфуда людям больше всего не хватает честной, настоящей, согревающей еды</em>. Он оттачивал формулу идеального бульона сотни часов, экспериментируя с температурами томления, специями и нарезкой овощей, пока не добился совершенного эталона.
              </p>
            </div>

            {/* 3. Особое внимание к приготовлению борща */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-rose-300 text-sm font-semibold">
                <Flame className="w-4 h-4 text-rose-400" />
                <span>Особое внимание к приготовлению борща</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300">
                <div className="bg-[#180d12] p-3.5 rounded-xl border border-rose-950/80">
                  <strong className="text-amber-200 block mb-1">Томление бульона 8 часов</strong>
                  Медленное томление при температуре 88°C без бурного кипения. Бульон остается прозрачным, бархатистым и насыщенным природным коллагеном.
                </div>
                <div className="bg-[#180d12] p-3.5 rounded-xl border border-rose-950/80">
                  <strong className="text-amber-200 block mb-1">Рубиновый секрет свеклы</strong>
                  Свекла запекается отдельно в фольге с лимонным соком и сливочным маслом. Она сохраняет природную сладость, хруст и глубокий бархатный цвет.
                </div>
                <div className="bg-[#180d12] p-3.5 rounded-xl border border-rose-950/80">
                  <strong className="text-amber-200 block mb-1">Бакинские овощи и зелень</strong>
                  Только отборные сладкие бакинские томаты, горный чеснок, свежий щавель и молодой укроп с местных фермерских рынков.
                </div>
                <div className="bg-[#180d12] p-3.5 rounded-xl border border-rose-950/80">
                  <strong className="text-amber-200 block mb-1">Пампушки с пылу с жару</strong>
                  Никакого вчерашнего хлеба. Пампушки выпекаются каждые 30 минут и поливаются чесночным соусом прямо перед отправкой курьера.
                </div>
              </div>
            </div>

            {/* 4. Философия питания Глеба */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-950/50 via-[#200e15] to-amber-950/30 border border-rose-900/40 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>Философия питания шефа Саюткина</span>
              </div>
              <p className="text-xs sm:text-sm text-rose-100 italic font-serif leading-relaxed">
                «Я убежден, что еда — это акт заботы и проявление уважения к гостю. Моя философия проста: готовить только из тех продуктов, которыми я накормил бы своих самых близких. Никаких бульонных кубиков, консервантов или искусственных красителей. Борщ должен согревать душу, дарить ощущение дома и объединять за одним столом коллег, семьи и друзей в любой точке Баку.»
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
