import React, { useState } from 'react';
import { 
  ShoppingBag, Flame, Phone, MessageCircle, MapPin, 
  Menu, X, Utensils, Users, Navigation, Star, ArrowRight, Clock
} from 'lucide-react';
import { CartItem } from '../types';

interface Props {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenOrder: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<Props> = ({ cart, onOpenCart, onOpenOrder, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  const handleOrderClick = () => {
    setMobileMenuOpen(false);
    onOpenOrder();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#2b0813]/95 backdrop-blur-md border-b border-rose-800/60 shadow-lg shadow-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-600 via-rose-800 to-amber-700 flex items-center justify-center shadow-lg shadow-rose-950/60 border border-rose-600/60 group-hover:scale-105 transition-transform">
            <Flame className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-xl sm:text-2xl text-rose-50 tracking-wide">
                Борщ от Саюткина
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Баку
              </span>
            </div>
            <p className="text-xs text-rose-300/90 -mt-0.5 font-sans">
              Шеф Глеб Саюткин • Доставка и кейтеринг
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-rose-100/90">
          <button 
            onClick={() => handleNavClick('menu')} 
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            Меню
          </button>
          <button 
            onClick={() => handleNavClick('chef')} 
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            О шефе Глебе
          </button>
          <button 
            onClick={() => handleNavClick('catering')} 
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            Кейтеринг
          </button>
          <button 
            onClick={() => handleNavClick('delivery')} 
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            Доставка по Баку
          </button>
          <button 
            onClick={() => handleNavClick('reviews')} 
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            Отзывы
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Direct phone (desktop) */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-rose-200 bg-rose-900/40 px-3 py-1.5 rounded-xl border border-rose-700/50">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <a href="tel:+994508441892" className="hover:text-amber-300 font-mono">
              +994 (50) 844-18-92
            </a>
          </div>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            aria-label="Открыть корзину"
            className="relative p-2.5 rounded-xl bg-[#3b0d1b] hover:bg-[#4a1224] text-rose-200 border border-rose-700/60 transition-all flex items-center justify-center cursor-pointer shadow"
          >
            <ShoppingBag className="w-5 h-5 text-amber-300" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-amber-500 text-zinc-950 text-[11px] font-extrabold rounded-full flex items-center justify-center animate-bounce shadow-md">
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* Quick Order Button (desktop) */}
          <button
            onClick={onOpenOrder}
            className="hidden sm:flex px-4 sm:px-5 py-2.5 bg-gradient-to-r from-rose-600 via-rose-700 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-medium text-xs sm:text-sm rounded-xl shadow-lg shadow-rose-950/60 transition-all transform active:scale-95 items-center gap-2 cursor-pointer border border-rose-500/40"
          >
            <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span>Заказать борщ</span>
          </button>

          {/* MODERN MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Меню навигации"
            aria-expanded={mobileMenuOpen}
            className="md:hidden relative w-11 h-11 rounded-2xl bg-gradient-to-br from-[#3d0e1d] to-[#290713] border border-rose-700/70 hover:border-amber-500/80 text-rose-100 flex items-center justify-center transition-all duration-300 shadow-lg shadow-rose-950 active:scale-95 cursor-pointer"
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-amber-300 animate-in spin-in-90 duration-200" />
              ) : (
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span className="w-5 h-0.5 bg-amber-300 rounded-full transition-all" />
                  <span className="w-3.5 h-0.5 bg-rose-200 rounded-full transition-all" />
                  <span className="w-5 h-0.5 bg-amber-300 rounded-full transition-all" />
                </div>
              )}
            </div>
          </button>

        </div>

      </div>

      {/* MODERN MOBILE MENU DRAWER / ACCORDION */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#24060f]/98 backdrop-blur-2xl border-b border-rose-800/80 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="max-w-7xl mx-auto px-4 py-5 space-y-4">
            
            {/* Quick Baku delivery badge */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#360c1b] border border-rose-700/50 text-xs">
              <div className="flex items-center gap-2 text-rose-200">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Доставка по Баку: 35–45 мин</span>
              </div>
              <span className="text-[11px] font-bold text-amber-300 font-mono bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800">
                горячим 80°C
              </span>
            </div>

            {/* Navigation links with icons */}
            <nav className="grid grid-cols-1 gap-1 text-sm font-medium">
              <button
                onClick={() => handleNavClick('menu')}
                className="w-full p-3 rounded-xl flex items-center justify-between text-left text-rose-100 hover:text-white hover:bg-[#380e1c] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-900/50 text-amber-300 flex items-center justify-center border border-rose-800/60">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <span>Меню борщей и закусок</span>
                </div>
                <ArrowRight className="w-4 h-4 text-rose-400/80" />
              </button>

              <button
                onClick={() => handleNavClick('chef')}
                className="w-full p-3 rounded-xl flex items-center justify-between text-left text-rose-100 hover:text-white hover:bg-[#380e1c] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-900/50 text-amber-300 flex items-center justify-center border border-rose-800/60">
                    <Flame className="w-4 h-4" />
                  </div>
                  <span>О шефе Глебе Саюткине</span>
                </div>
                <ArrowRight className="w-4 h-4 text-rose-400/80" />
              </button>

              <button
                onClick={() => handleNavClick('catering')}
                className="w-full p-3 rounded-xl flex items-center justify-between text-left text-rose-100 hover:text-white hover:bg-[#380e1c] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-900/50 text-amber-300 flex items-center justify-center border border-rose-800/60">
                    <Users className="w-4 h-4" />
                  </div>
                  <span>Кейтеринг на мероприятия</span>
                </div>
                <ArrowRight className="w-4 h-4 text-rose-400/80" />
              </button>

              <button
                onClick={() => handleNavClick('delivery')}
                className="w-full p-3 rounded-xl flex items-center justify-between text-left text-rose-100 hover:text-white hover:bg-[#380e1c] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-900/50 text-amber-300 flex items-center justify-center border border-rose-800/60">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <span>Зоны доставки по Баку</span>
                </div>
                <ArrowRight className="w-4 h-4 text-rose-400/80" />
              </button>

              <button
                onClick={() => handleNavClick('reviews')}
                className="w-full p-3 rounded-xl flex items-center justify-between text-left text-rose-100 hover:text-white hover:bg-[#380e1c] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-900/50 text-amber-300 flex items-center justify-center border border-rose-800/60">
                    <Star className="w-4 h-4" />
                  </div>
                  <span>Отзывы клиентов</span>
                </div>
                <ArrowRight className="w-4 h-4 text-rose-400/80" />
              </button>
            </nav>

            {/* Quick Contact buttons in Baku */}
            <div className="pt-2 border-t border-rose-800/60 grid grid-cols-2 gap-2 text-xs">
              <a
                href="tel:+994508441892"
                className="p-2.5 rounded-xl bg-[#360c1b] border border-rose-700/60 text-white flex items-center justify-center gap-2 font-mono font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Позвонить</span>
              </a>

              <a
                href="https://wa.me/994508441892"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-200 flex items-center justify-center gap-2 font-medium"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Primary Action Button */}
            <div className="pt-1">
              <button
                onClick={handleOrderClick}
                className="w-full py-3.5 bg-gradient-to-r from-rose-600 via-rose-700 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-rose-950 flex items-center justify-center gap-2 cursor-pointer border border-rose-400/40"
              >
                <Flame className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
                <span>Оформить заказ онлайн</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </header>
  );
};
