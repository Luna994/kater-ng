import React from 'react';
import { REVIEWS } from '../data/bakuZones';
import { Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-[#0d0709] relative border-t border-rose-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-300 mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Отзывы гурманов Баку</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Что говорят о борще шефа Саюткина
          </h2>
          <p className="mt-4 text-base text-zinc-300">
            Нас заказывают домой для душевного ужина, в ведущие офисы города и на праздничные мероприятия.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.map(rev => (
            <div
              key={rev.id}
              className="bg-[#170c10] border border-rose-950/80 hover:border-rose-900/60 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all"
            >
              <div>
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Подтвержденный заказ
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic mb-6">
                  «{rev.text}»
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-rose-950/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-800 to-amber-700 flex items-center justify-center text-white font-bold text-xs shrink-0">
                    {rev.avatarInitials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-white">
                      {rev.author}
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {rev.role} • {rev.city}
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-[11px] text-rose-300/80 font-mono flex items-center justify-between">
                  <span>Заказ: {rev.dishOrdered}</span>
                  <span className="text-zinc-400">{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
