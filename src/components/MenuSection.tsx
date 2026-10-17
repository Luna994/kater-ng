import React, { useState } from 'react';
import { MENU_ITEMS } from '../data/menu';
import { MenuItem } from '../types';
import { FoodDishVisual } from './visuals/FoodDishVisual';
import { Plus, Check, Flame, Sparkles, Info, Clock, CheckSquare, Square } from 'lucide-react';

interface Props {
  onAddToCartWithOptions: (
    item: MenuItem,
    options: { extraSmetana: boolean; extraPampushki: boolean; extraSalo: boolean }
  ) => void;
  onQuickOrderDish: (
    item: MenuItem,
    options: { extraSmetana: boolean; extraPampushki: boolean; extraSalo: boolean }
  ) => void;
}

export const MenuSection: React.FC<Props> = ({ onAddToCartWithOptions, onQuickOrderDish }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [addedIds, setAddedIds] = useState<{ [id: string]: boolean }>({});
  const [expandedInfoId, setExpandedInfoId] = useState<string | null>(null);

  // Per-card add-on choices state
  const [cardOptions, setCardOptions] = useState<{
    [itemId: string]: { extraSmetana: boolean; extraPampushki: boolean; extraSalo: boolean };
  }>({
    'borsch-ukrainian-classic': { extraSmetana: true, extraPampushki: true, extraSalo: false },
    'borsch-lenten': { extraSmetana: false, extraPampushki: true, extraSalo: false },
    'borsch-green-spring': { extraSmetana: true, extraPampushki: false, extraSalo: false },
    'borsch-baku-lamb': { extraSmetana: true, extraPampushki: true, extraSalo: false },
  });

  const categories = [
    { id: 'all', label: 'Все позиции' },
    { id: 'borsch', label: 'Фирменные борщи' },
    { id: 'sets', label: 'Сеты для компаний' },
    { id: 'sides', label: 'Пампушки и сало' },
    { id: 'catering', label: 'Кейтеринг-котлы' },
  ];

  const filteredItems = activeCategory === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  const toggleOption = (itemId: string, optionKey: 'extraSmetana' | 'extraPampushki' | 'extraSalo') => {
    setCardOptions(prev => {
      const current = prev[itemId] || { extraSmetana: false, extraPampushki: false, extraSalo: false };
      return {
        ...prev,
        [itemId]: {
          ...current,
          [optionKey]: !current[optionKey]
        }
      };
    });
  };

  const calculateCardPrice = (item: MenuItem) => {
    const opts = cardOptions[item.id] || { extraSmetana: false, extraPampushki: false, extraSalo: false };
    let total = item.price;
    if (item.addonPrices) {
      if (opts.extraSmetana) total += item.addonPrices.smetana;
      if (opts.extraPampushki) total += item.addonPrices.pampushki;
      if (opts.extraSalo) total += item.addonPrices.salo;
    }
    return total;
  };

  const handleAdd = (item: MenuItem) => {
    const opts = cardOptions[item.id] || { extraSmetana: false, extraPampushki: false, extraSalo: false };
    onAddToCartWithOptions(item, opts);
    setAddedIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  return (
    <section id="menu" className="py-16 md:py-24 bg-[#10080a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-800/40 text-xs font-semibold text-rose-300 mb-3">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Фирменное борщевое меню шефа Саюткина</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Борщи от шефа Глеба в Баку
          </h2>
          <p className="mt-4 text-base text-zinc-300">
            Классический украинский, постный грибной или весенний зеленый — выберите любимый борщ и дополните его домашней сметаной, свежими пампушками из печи и фермерским салом.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-rose-700 to-amber-700 text-white shadow-lg shadow-rose-950/50'
                    : 'bg-[#1b0e12] text-zinc-400 hover:text-white hover:bg-[#251419] border border-rose-950/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map(item => {
            const isAdded = !!addedIds[item.id];
            const isExpanded = expandedInfoId === item.id;
            const currentOpts = cardOptions[item.id] || { extraSmetana: false, extraPampushki: false, extraSalo: false };
            const currentCardPrice = calculateCardPrice(item);

            return (
              <div
                key={item.id}
                className="group relative bg-[#170c10] border border-rose-950/80 hover:border-rose-800/60 rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-rose-950/30"
              >
                {/* Top badges */}
                <div className="absolute top-8 left-8 z-10 flex flex-col gap-1.5 pointer-events-none">
                  {item.isChefSpecial && (
                    <span className="px-2.5 py-1 rounded-md bg-amber-500/90 text-zinc-950 text-[10px] font-extrabold uppercase tracking-wider shadow">
                      Выбор шефа
                    </span>
                  )}
                  {item.isPopular && (
                    <span className="px-2.5 py-1 rounded-md bg-rose-600/90 text-white text-[10px] font-extrabold uppercase tracking-wider shadow">
                      Хит в Баку
                    </span>
                  )}
                  {item.isVegetarian && (
                    <span className="px-2.5 py-1 rounded-md bg-emerald-600/90 text-white text-[10px] font-extrabold uppercase tracking-wider shadow">
                      Постный
                    </span>
                  )}
                </div>

                {/* Dish Visual Illustration with Realistic Photo */}
                <div className="mb-4">
                  <FoodDishVisual 
                    type={item.imageType} 
                    size="md" 
                    imageUrl={item.imageUrl} 
                    alt={item.name} 
                  />
                </div>

                {/* Dish Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-white group-hover:text-amber-200 transition-colors">
                      {item.name}
                    </h3>
                  </div>

                  {/* Volume, calories and DELIVERY TIME */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-rose-300/80 font-mono mb-3">
                    <span>{item.volume}</span>
                    <span>•</span>
                    <span>{item.calories}</span>
                  </div>

                  {/* Delivery Time Badge for this specific soup */}
                  <div className="mb-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-950/80 border border-rose-900/50 text-[11px] font-semibold text-amber-300">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Время доставки: {item.deliveryTimeEstimate}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* REQUIRED ADD-ON OPTIONS SELECTOR (Сметана, Пампушки, Сало) */}
                  {item.addonPrices && (
                    <div className="mb-4 p-3.5 rounded-2xl bg-[#200e15] border border-rose-900/40 space-y-2">
                      <div className="text-[11px] font-semibold text-amber-200 uppercase tracking-wider flex items-center gap-1 mb-2">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Дополнительные опции к блюду:</span>
                      </div>

                      {/* 1. Добавить сметану */}
                      <button
                        type="button"
                        onClick={() => toggleOption(item.id, 'extraSmetana')}
                        className={`w-full py-1.5 px-2.5 rounded-xl flex items-center justify-between text-xs transition-colors cursor-pointer border ${
                          currentOpts.extraSmetana
                            ? 'bg-amber-500/20 border-amber-500/60 text-amber-200'
                            : 'bg-[#15090e] border-rose-950 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {currentOpts.extraSmetana ? (
                            <CheckSquare className="w-4 h-4 text-amber-400" />
                          ) : (
                            <Square className="w-4 h-4 text-zinc-600" />
                          )}
                          <span>Добавить фермерскую сметану 25%</span>
                        </div>
                        <span className="font-mono font-bold text-amber-300">
                          +{item.addonPrices.smetana} ₼
                        </span>
                      </button>

                      {/* 2. Добавить пампушки */}
                      <button
                        type="button"
                        onClick={() => toggleOption(item.id, 'extraPampushki')}
                        className={`w-full py-1.5 px-2.5 rounded-xl flex items-center justify-between text-xs transition-colors cursor-pointer border ${
                          currentOpts.extraPampushki
                            ? 'bg-amber-500/20 border-amber-500/60 text-amber-200'
                            : 'bg-[#15090e] border-rose-950 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {currentOpts.extraPampushki ? (
                            <CheckSquare className="w-4 h-4 text-amber-400" />
                          ) : (
                            <Square className="w-4 h-4 text-zinc-600" />
                          )}
                          <span>Добавить чесночные пампушки из печи</span>
                        </div>
                        <span className="font-mono font-bold text-amber-300">
                          +{item.addonPrices.pampushki} ₼
                        </span>
                      </button>

                      {/* 3. Добавить сало */}
                      <button
                        type="button"
                        onClick={() => toggleOption(item.id, 'extraSalo')}
                        className={`w-full py-1.5 px-2.5 rounded-xl flex items-center justify-between text-xs transition-colors cursor-pointer border ${
                          currentOpts.extraSalo
                            ? 'bg-amber-500/20 border-amber-500/60 text-amber-200'
                            : 'bg-[#15090e] border-rose-950 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {currentOpts.extraSalo ? (
                            <CheckSquare className="w-4 h-4 text-amber-400" />
                          ) : (
                            <Square className="w-4 h-4 text-zinc-600" />
                          )}
                          <span>Добавить домашнее сало с чесноком</span>
                        </div>
                        <span className="font-mono font-bold text-amber-300">
                          +{item.addonPrices.salo} ₼
                        </span>
                      </button>
                    </div>
                  )}

                  {/* Ingredients toggle */}
                  <button
                    onClick={() => setExpandedInfoId(isExpanded ? null : item.id)}
                    className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 mb-4 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>{isExpanded ? 'Скрыть ингредиенты' : 'Состав и секрет шефа'}</span>
                  </button>

                  {isExpanded && (
                    <div className="mb-4 p-3 bg-zinc-900/90 rounded-xl text-xs text-zinc-300 border border-zinc-800 space-y-2">
                      <div>
                        <strong className="text-white">Состав: </strong>
                        {item.ingredients.join(', ')}
                      </div>
                      {item.fullStory && (
                        <p className="italic text-rose-200/80 border-t border-zinc-800 pt-2">
                          «{item.fullStory}»
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Price & Action Buttons */}
                <div className="pt-4 border-t border-rose-950/80 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-baseline">
                      <span className="text-2xl sm:text-3xl font-serif font-bold text-white">
                        {currentCardPrice}
                      </span>
                      <span className="text-amber-400 font-bold ml-1 text-lg">₼</span>
                    </div>
                    <span className="text-[11px] text-zinc-400 block -mt-1">
                      {item.addonPrices && (currentOpts.extraSmetana || currentOpts.extraPampushki || currentOpts.extraSalo)
                        ? 'с выбранными опциями'
                        : item.category === 'catering'
                        ? 'за 5 литров'
                        : 'базовая цена порции'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAdd(item)}
                      className={`px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950'
                          : 'bg-gradient-to-r from-rose-700 to-amber-700 hover:from-rose-600 hover:to-amber-600 text-white shadow-md shadow-rose-950'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Добавлено!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Заказать</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
