import React from 'react';
import { ShoppingBag, Flame, Phone, MessageCircle, MapPin } from 'lucide-react';
import { CartItem } from '../types';

interface Props {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenOrder: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<Props> = ({ cart, onOpenCart, onOpenOrder, onNavigate }) => {
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#120a0d]/90 backdrop-blur-md border-b border-rose-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-700 via-rose-900 to-amber-900 flex items-center justify-center shadow-lg shadow-rose-950/50 border border-rose-700/50 group-hover:scale-105 transition-transform">
            <Flame className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-xl sm:text-2xl text-rose-50 tracking-wide">
                Борщ от Саюткина
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                Баку
              </span>
            </div>
            <p className="text-xs text-rose-300/80 -mt-0.5 font-sans">
              Шеф-повар Глеб Саюткин • Доставка и кейтеринг
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
          <button 
            onClick={() => onNavigate('menu')} 
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            Меню
          </button>
          <button 
            onClick={() => onNavigate('chef')} 
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            О шефе Глебе
          </button>
          <button 
            onClick={() => onNavigate('catering')} 
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            Кейтеринг
          </button>
          <button 
            onClick={() => onNavigate('delivery')} 
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            Доставка по Баку
          </button>
          <button 
            onClick={() => onNavigate('reviews')} 
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            Отзывы
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* Direct phone / WhatsApp (desktop) */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-rose-200 bg-rose-950/40 px-3 py-1.5 rounded-xl border border-rose-900/40">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <a href="tel:+994508441892" className="hover:text-amber-300 font-mono">
              +994 (50) 844-18-92
            </a>
          </div>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            aria-label="Открыть корзину"
            className="relative p-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-rose-200 border border-rose-900/40 transition-all flex items-center justify-center cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-amber-500 text-zinc-950 text-[11px] font-extrabold rounded-full flex items-center justify-center animate-bounce shadow-md">
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* Primary Quick Order Button */}
          <button
            onClick={onOpenOrder}
            className="px-4 sm:px-5 py-2.5 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-medium text-xs sm:text-sm rounded-xl shadow-lg shadow-rose-900/40 transition-all transform active:scale-95 flex items-center gap-2 cursor-pointer border border-rose-500/30"
          >
            <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span>Заказать борщ</span>
          </button>

        </div>

      </div>
    </header>
  );
};
