import React from 'react';
import { Flame, Phone, MapPin, Clock, MessageCircle, Heart, ArrowUp } from 'lucide-react';

interface Props {
  onNavigate: (sectionId: string) => void;
  onOpenOrder: () => void;
}

export const Footer: React.FC<Props> = ({ onNavigate, onOpenOrder }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1a040a] border-t border-rose-800/80 pt-16 pb-12 text-rose-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-rose-950/60">
          
          {/* Col 1: Brand story (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-700 to-amber-900 flex items-center justify-center text-amber-300">
                <Flame className="w-5 h-5" />
              </div>
              <span className="font-serif font-bold text-xl text-white">
                Борщ от Глеба Саюткина
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              Служба кейтеринга и быстрой доставки настоящего авторского борща в Баку. Томление 8 часов, свежие чесночные пампушки и бакинские фермерские продукты.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={onOpenOrder}
                className="px-4 py-2 bg-rose-600/80 hover:bg-rose-500 text-white font-medium text-xs rounded-xl transition-all cursor-pointer"
              >
                Оформить заказ онлайн
              </button>
            </div>
          </div>

          {/* Col 2: Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold text-rose-200 uppercase tracking-wider">
              Навигация
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('menu')} className="hover:text-amber-300 cursor-pointer">
                  Меню и цены
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('chef')} className="hover:text-amber-300 cursor-pointer">
                  О шефе Глебе Саюткине
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catering')} className="hover:text-amber-300 cursor-pointer">
                  Кейтеринг для офисов и праздников
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('delivery')} className="hover:text-amber-300 cursor-pointer">
                  Зоны доставки по Баку
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reviews')} className="hover:text-amber-300 cursor-pointer">
                  Отзывы гостей
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contacts in Baku (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-semibold text-rose-200 uppercase tracking-wider">
              Контакты в Баку
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Баку, ул. Низами (Торговая) / цех Сабаил</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Доставка: ежедневно с 10:00 до 23:00</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+994508441892" className="hover:text-white font-mono font-bold text-amber-300">
                  +994 (50) 844-18-92
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href="https://wa.me/994508441892" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  WhatsApp: +994 50 844-18-92
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span>© 2026 Борщ от Глеба Саюткина • Баку, Азербайджан. Сделано с</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>для ценителей душевной кухни.</span>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Наверх"
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>Наверх</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
