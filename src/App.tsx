/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { ChefSection } from './components/ChefSection';
import { CateringCalculator } from './components/CateringCalculator';
import { DeliverySection } from './components/DeliverySection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { CartItem, MenuItem } from './types';
import { MENU_ITEMS } from './data/menu';
import { Flame, ShoppingBag } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sayutkin_borsch_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [preselectedDistrict, setPreselectedDistrict] = useState<string | undefined>(undefined);
  const [cateringBooking, setCateringBooking] = useState<{
    guests: number;
    soupType: string;
    totalPriceAzn: number;
  } | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sayutkin_borsch_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Cart operations
  const handleAddToCartWithOptions = (
    item: MenuItem,
    options: { extraSmetana: boolean; extraPampushki: boolean; extraSalo: boolean }
  ) => {
    let unitPrice = item.price;
    if (item.addonPrices) {
      if (options.extraSmetana) unitPrice += item.addonPrices.smetana;
      if (options.extraPampushki) unitPrice += item.addonPrices.pampushki;
      if (options.extraSalo) unitPrice += item.addonPrices.salo;
    }

    const lineId = `${item.id}-${options.extraSmetana ? 'sm' : 'no'}-${options.extraPampushki ? 'pm' : 'no'}-${options.extraSalo ? 'sl' : 'no'}`;

    setCart((prev) => {
      const existing = prev.find((ci) => ci.id === lineId);
      if (existing) {
        return prev.map((ci) =>
          ci.id === lineId ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [
        ...prev,
        {
          id: lineId,
          item,
          quantity: 1,
          extraSmetana: options.extraSmetana,
          extraPampushki: options.extraPampushki,
          extraSalo: options.extraSalo,
          unitPrice
        }
      ];
    });
  };

  const handleAddToCart = (item: MenuItem) => {
    handleAddToCartWithOptions(item, {
      extraSmetana: false,
      extraPampushki: false,
      extraSalo: false
    });
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((ci) =>
        ci.id === itemId ? { ...ci, quantity: newQty } : ci
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
    setCateringBooking(null);
  };

  const handleOpenOrder = () => {
    // If cart is empty, add the signature classic Ukrainian borsch so the user has an immediate delicious portion ready to order
    if (cart.length === 0 && !cateringBooking) {
      const classic = MENU_ITEMS[0];
      handleAddToCartWithOptions(classic, {
        extraSmetana: true,
        extraPampushki: true,
        extraSalo: false
      });
    }
    setIsOrderModalOpen(true);
  };

  const handleQuickOrderDish = (
    item: MenuItem,
    options: { extraSmetana: boolean; extraPampushki: boolean; extraSalo: boolean }
  ) => {
    handleAddToCartWithOptions(item, options);
    setIsOrderModalOpen(true);
  };

  const handleBookCatering = (cateringData: {
    guests: number;
    soupType: string;
    totalPriceAzn: number;
  }) => {
    setCateringBooking(cateringData);
    setIsOrderModalOpen(true);
  };

  const handleSelectZone = (zoneName: string) => {
    setPreselectedDistrict(zoneName);
    handleOpenOrder();
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartAzn = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0d0709] text-[#f5ede6] selection:bg-rose-900 selection:text-white flex flex-col">
      {/* Header */}
      <Header
        cart={cart}
        onOpenCart={() => setIsOrderModalOpen(true)}
        onOpenOrder={handleOpenOrder}
        onNavigate={scrollToSection}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero with prominent Order Button & Chef Gleb's borsch presentation */}
        <Hero
          onOpenOrder={handleOpenOrder}
          onNavigateToCatering={() => scrollToSection('catering')}
          onNavigateToMenu={() => scrollToSection('menu')}
        />

        {/* Menu Catalog */}
        <MenuSection
          onAddToCartWithOptions={handleAddToCartWithOptions}
          onQuickOrderDish={handleQuickOrderDish}
        />

        {/* Story of Chef & Owner Gleb Sayutkin */}
        <ChefSection />

        {/* Catering & Events Calculator */}
        <CateringCalculator onBookCatering={handleBookCatering} />

        {/* Baku Delivery Zones & Logistics */}
        <DeliverySection onSelectZoneForOrder={handleSelectZone} />

        {/* Customer Reviews in Baku */}
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} onOpenOrder={handleOpenOrder} />

      {/* Interactive Order Modal / Checkout */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onAddToCart={handleAddToCart}
        onClearCart={handleClearCart}
        preselectedDistrict={preselectedDistrict}
        cateringDetails={cateringBooking}
      />

      {/* Mobile Sticky Order Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-[#13080c]/95 backdrop-blur-lg border-t border-rose-950/80 flex items-center justify-between gap-3 shadow-2xl">
        <button
          onClick={() => setIsOrderModalOpen(true)}
          className="flex items-center gap-2 text-xs text-rose-200"
        >
          <div className="relative p-2 rounded-xl bg-zinc-900 border border-rose-900/40">
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-[10px] font-bold text-white flex items-center justify-center">
                {totalItemsCount}
              </span>
            )}
          </div>
          <div>
            <div className="font-semibold">{totalItemsCount > 0 ? `${totalCartAzn} ₼` : 'Корзина'}</div>
            <div className="text-[10px] text-zinc-400">
              {totalItemsCount > 0 ? `${totalItemsCount} поз.` : 'Выберите борщ'}
            </div>
          </div>
        </button>

        <button
          onClick={handleOpenOrder}
          className="flex-1 py-3 px-4 bg-gradient-to-r from-rose-600 to-amber-600 text-white font-semibold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
          <span>Заказать борщ</span>
        </button>
      </div>
    </div>
  );
}
