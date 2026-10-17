import React, { useState } from 'react';
import { CartItem, MenuItem, OrderFormState, PlacedOrder } from '../types';
import { BAKU_ZONES } from '../data/bakuZones';
import { MENU_ITEMS } from '../data/menu';
import { 
  X, Trash2, Plus, Minus, Flame, Sparkles, Clock, 
  MapPin, CheckCircle2, Phone, CreditCard, Banknote, Building2,
  Send, ChefHat, ArrowLeft, HeartHandshake
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onAddToCart: (item: MenuItem) => void;
  onClearCart: () => void;
  preselectedDistrict?: string;
  cateringDetails?: {
    guests: number;
    soupType: string;
    totalPriceAzn: number;
  } | null;
}

export const OrderModal: React.FC<Props> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onAddToCart,
  onClearCart,
  preselectedDistrict,
  cateringDetails
}) => {
  const [step, setStep] = useState<'cart' | 'details' | 'success'>('cart');
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  // Form State
  const [formData, setFormData] = useState<OrderFormState>({
    fullName: '',
    phone: '+994 ',
    district: preselectedDistrict || BAKU_ZONES[0].name,
    address: '',
    deliveryTimeType: 'asap',
    scheduledTime: '13:30',
    paymentMethod: 'cash',
    personsCount: 2,
    comment: '',
    spiceLevelPreference: 'regular',
    garlicPreference: 'extra'
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  // Selected district info for delivery fee
  const selectedZone = BAKU_ZONES.find(z => formData.district.includes(z.name.split('(')[0])) || BAKU_ZONES[0];
  const deliveryFee = selectedZone.deliveryFeeAzn;

  // Calculate items total
  const itemsSubtotal = cart.reduce((sum, ci) => sum + (ci.unitPrice * ci.quantity), 0);
  const cateringSubtotal = cateringDetails ? cateringDetails.totalPriceAzn : 0;
  const subtotal = itemsSubtotal + cateringSubtotal;
  const grandTotal = subtotal + (subtotal > 0 ? deliveryFee : 0);

  const handleNextStep = () => {
    if (cart.length === 0 && !cateringDetails) {
      alert('Пожалуйста, добавьте хотя бы одно блюдо в заказ!');
      return;
    }
    setStep('details');
  };

  const handleValidateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Укажите ваше имя';
    }
    if (formData.phone.trim().length < 10) {
      errors.phone = 'Укажите номер телефона в формате +994...';
    }
    if (!formData.address.trim()) {
      errors.address = 'Укажите улицу, дом, квартиру/офис';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Generate Order
    const randomNum = Math.floor(100 + Math.random() * 900);
    const newOrder: PlacedOrder = {
      orderId: `BAKU-BOR-${randomNum}`,
      createdAt: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      items: [...cart],
      totalPrice: subtotal,
      deliveryFee,
      grandTotal,
      customerDetails: { ...formData },
      status: 'cooking',
      estimatedDeliveryTime: formData.deliveryTimeType === 'asap' ? `${selectedZone.timeMinutes} мин` : formData.scheduledTime
    };

    setPlacedOrder(newOrder);
    setStep('success');
    onClearCart();
  };

  // Quick extras to add
  const extraPampushkiItem = MENU_ITEMS.find(i => i.id === 'side-pampushki');
  const extraSaloItem = MENU_ITEMS.find(i => i.id === 'side-salo');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#2c0814] border border-rose-700/70 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Header bar */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#3d0e1e] via-[#320917] to-[#280612] border-b border-rose-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center border border-rose-700/40">
              <ChefHat className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-white">
                {step === 'cart' && 'Ваш заказ борща'}
                {step === 'details' && 'Оформление доставки в Баку'}
                {step === 'success' && 'Заказ успешно принят шефом!'}
              </h3>
              <p className="text-xs text-rose-300/80">
                {step === 'cart' && 'Кухня шефа Глеба Саюткина • Баку'}
                {step === 'details' && 'Укажите адрес и пожелания к температуре и чесноку'}
                {step === 'success' && `Номер заказа: #${placedOrder?.orderId}`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="p-2 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: CART VIEW */}
        {step === 'cart' && (
          <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            
            {/* Catering Banner if active */}
            {cateringDetails && (
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-600/40 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                    Кейтеринг на мероприятие
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {cateringDetails.soupType} на {cateringDetails.guests} гостей
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-amber-300 font-mono">
                    {cateringDetails.totalPriceAzn} ₼
                  </span>
                </div>
              </div>
            )}

            {/* Cart Items List */}
            {cart.length === 0 && !cateringDetails ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-rose-950/60 border border-rose-900/40 flex items-center justify-center text-rose-400">
                  <Flame className="w-8 h-8 opacity-60" />
                </div>
                <h4 className="text-lg font-serif font-bold text-zinc-200">
                  Ваша тарелка пока пуста
                </h4>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Выберите порцию рубинового борща от шефа Глеба или пышные пампушки с чесноком в меню!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((cartItem) => (
                  <div
                    key={cartItem.id}
                    className="p-3.5 sm:p-4 rounded-2xl bg-[#1d0e14] border border-rose-950/80 flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white truncate">
                        {cartItem.item.name}
                      </h4>

                      {/* Display active add-on options */}
                      {(cartItem.extraSmetana || cartItem.extraPampushki || cartItem.extraSalo) && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {cartItem.extraSmetana && (
                            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-medium border border-amber-500/30">
                              + Сметана (+{cartItem.item.addonPrices?.smetana || 2} ₼)
                            </span>
                          )}
                          {cartItem.extraPampushki && (
                            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-medium border border-amber-500/30">
                              + Пампушки (+{cartItem.item.addonPrices?.pampushki || 3} ₼)
                            </span>
                          )}
                          {cartItem.extraSalo && (
                            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-medium border border-amber-500/30">
                              + Сало (+{cartItem.item.addonPrices?.salo || 4} ₼)
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-xs text-rose-300/80 font-mono mt-1">
                        <span>{cartItem.unitPrice} ₼ × {cartItem.quantity} = {cartItem.unitPrice * cartItem.quantity} ₼</span>
                        <span>•</span>
                        <span className="text-[11px] text-zinc-400">⏱ {cartItem.item.deliveryTimeEstimate}</span>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity - 1)}
                        className="w-7 h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center font-mono font-bold text-sm text-white">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity + 1)}
                        className="w-7 h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => onRemoveItem(cartItem.id)}
                      className="p-2 text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Удалить"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Quick add-on recommendations */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-zinc-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Шеф Глеб рекомендует добавить к борщу:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {extraPampushkiItem && (
                  <button
                    onClick={() => onAddToCart(extraPampushkiItem)}
                    className="p-3 rounded-xl bg-[#221016] hover:bg-[#2b141c] border border-rose-900/40 text-left flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="text-xs font-medium text-rose-100">
                        + Пампушки из печи (6 шт)
                      </div>
                      <div className="text-[11px] text-amber-300 font-mono">
                        {extraPampushkiItem.price} ₼
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded bg-rose-600/30 text-rose-300 text-xs font-bold">
                      +
                    </span>
                  </button>
                )}

                {extraSaloItem && (
                  <button
                    onClick={() => onAddToCart(extraSaloItem)}
                    className="p-3 rounded-xl bg-[#221016] hover:bg-[#2b141c] border border-rose-900/40 text-left flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="text-xs font-medium text-rose-100">
                        + Домашнее сало с чесноком
                      </div>
                      <div className="text-[11px] text-amber-300 font-mono">
                        {extraSaloItem.price} ₼
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded bg-rose-600/30 text-rose-300 text-xs font-bold">
                      +
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Total breakdown */}
            {(cart.length > 0 || cateringDetails) && (
              <div className="p-4 rounded-2xl bg-[#1c0d13] border border-rose-950/80 space-y-2 text-xs">
                <div className="flex justify-between text-zinc-300">
                  <span>Сумма заказа:</span>
                  <span className="font-mono">{subtotal} ₼</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>Доставка по Баку ({selectedZone.name.split('(')[0]}):</span>
                  <span className="font-mono text-emerald-400">
                    {deliveryFee === 0 ? 'Бесплатно' : `${deliveryFee} ₼`}
                  </span>
                </div>
                <div className="pt-2 border-t border-rose-900/40 flex justify-between items-center text-sm font-bold text-white">
                  <span>Итого к оплате:</span>
                  <span className="text-xl font-serif text-amber-300">
                    {grandTotal} ₼
                  </span>
                </div>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-medium cursor-pointer"
              >
                Вернуться к меню
              </button>

              <button
                onClick={handleNextStep}
                disabled={cart.length === 0 && !cateringDetails}
                className="flex-1 py-3.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 disabled:opacity-40 text-white font-semibold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Перейти к доставке</span>
                <span className="font-mono">({grandTotal} ₼)</span>
              </button>
            </div>

          </div>
        )}

        {/* STEP 2: DELIVERY DETAILS FORM */}
        {step === 'details' && (
          <form onSubmit={handleValidateAndSubmit} className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            
            {/* Back button */}
            <button
              type="button"
              onClick={() => setStep('cart')}
              className="text-xs text-rose-300 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Назад к списку блюд</span>
            </button>

            {/* Contact inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-rose-200 block mb-1">
                  Ваше имя: *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Например: Лейла или Расим"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c0d13] border border-rose-900/60 text-white text-xs focus:outline-none focus:border-amber-500"
                />
                {formErrors.fullName && (
                  <span className="text-[11px] text-rose-400 mt-0.5 block">{formErrors.fullName}</span>
                )}
              </div>

              <div>
                <label className="text-xs font-medium text-rose-200 block mb-1">
                  Телефон в Баку: *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+994 50 123 45 67"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c0d13] border border-rose-900/60 text-white text-xs font-mono focus:outline-none focus:border-amber-500"
                />
                {formErrors.phone && (
                  <span className="text-[11px] text-rose-400 mt-0.5 block">{formErrors.phone}</span>
                )}
              </div>
            </div>

            {/* Baku District Selector */}
            <div>
              <label className="text-xs font-medium text-rose-200 block mb-1">
                Район доставки в Баку:
              </label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c0d13] border border-rose-900/60 text-white text-xs focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                {BAKU_ZONES.map(z => (
                  <option key={z.id} value={z.name} className="bg-[#120a0d] text-white">
                    {z.name} (≈ {z.timeMinutes} мин • {z.deliveryFeeAzn === 0 ? 'Бесплатная доставка' : `${z.deliveryFeeAzn} ₼`})
                  </option>
                ))}
              </select>
            </div>

            {/* Full Street Address */}
            <div>
              <label className="text-xs font-medium text-rose-200 block mb-1">
                Точный адрес (улица, дом, подъезд, этаж, кв./офис): *
              </label>
              <input
                type="text"
                required
                placeholder="ул. Низами 14, кв. 18 (или БЦ White City, 4 этаж)"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c0d13] border border-rose-900/60 text-white text-xs focus:outline-none focus:border-amber-500"
              />
              {formErrors.address && (
                <span className="text-[11px] text-rose-400 mt-0.5 block">{formErrors.address}</span>
              )}
            </div>

            {/* Delivery Time Option */}
            <div>
              <label className="text-xs font-medium text-rose-200 block mb-1">
                Время доставки:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, deliveryTimeType: 'asap' })}
                  className={`p-2.5 rounded-xl text-xs font-medium border text-left cursor-pointer transition-all ${
                    formData.deliveryTimeType === 'asap'
                      ? 'bg-rose-950 border-amber-500 text-amber-200'
                      : 'bg-[#1c0d13] border-rose-950 text-zinc-400'
                  }`}
                >
                  <div className="font-semibold">🔥 Как можно быстрее</div>
                  <div className="text-[11px] text-zinc-400">≈ {selectedZone.timeMinutes} мин (горячим)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, deliveryTimeType: 'scheduled' })}
                  className={`p-2.5 rounded-xl text-xs font-medium border text-left cursor-pointer transition-all ${
                    formData.deliveryTimeType === 'scheduled'
                      ? 'bg-rose-950 border-amber-500 text-amber-200'
                      : 'bg-[#1c0d13] border-rose-950 text-zinc-400'
                  }`}
                >
                  <div className="font-semibold">⏰ К точному времени</div>
                  <div className="text-[11px] text-zinc-400">Сегодня к назначенному часу</div>
                </button>
              </div>

              {formData.deliveryTimeType === 'scheduled' && (
                <div className="mt-2.5">
                  <input
                    type="time"
                    value={formData.scheduledTime}
                    onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#1c0d13] border border-rose-900/60 text-white text-xs font-mono"
                  />
                </div>
              )}
            </div>

            {/* Garlic & Taste Preference */}
            <div>
              <label className="text-xs font-medium text-rose-200 block mb-1">
                Пожелание шефу Глебу по чесноку в пампушках:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'extra', label: '🧄 Побольше чеснока' },
                  { id: 'standard', label: '👌 Классический баланс' },
                  { id: 'light', label: '🌿 Деликатно, без запаха' },
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, garlicPreference: item.id as any })}
                    className={`py-2 px-2 rounded-xl text-[11px] font-medium border text-center cursor-pointer transition-all ${
                      formData.garlicPreference === item.id
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                        : 'bg-[#1c0d13] border-rose-950 text-zinc-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="text-xs font-medium text-rose-200 block mb-1">
                Способ оплаты:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'cash', label: 'Наличными курьеру', icon: Banknote },
                  { id: 'card', label: 'Картой курьеру', icon: CreditCard },
                  { id: 'm10', label: 'm10 / BirBank', icon: Sparkles },
                  { id: 'corporate', label: 'Для компаний', icon: Building2 },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: item.id as any })}
                      className={`p-2.5 rounded-xl text-[11px] font-medium border flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                        formData.paymentMethod === item.id
                          ? 'bg-rose-950 border-amber-500 text-white'
                          : 'bg-[#1c0d13] border-rose-950 text-zinc-400'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-amber-400" />
                      <span className="text-center leading-tight">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Comments for Chef */}
            <div>
              <label className="text-xs font-medium text-rose-200 block mb-1">
                Комментарий к заказу:
              </label>
              <textarea
                rows={2}
                placeholder="Например: положите сметану в отдельный контейнер, домофон не работает..."
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#1c0d13] border border-rose-900/60 text-white text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-rose-600 via-rose-700 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-rose-950 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>Подтвердить и отправить заказ шефу ({grandTotal} ₼)</span>
              </button>
              <div className="text-center text-[11px] text-zinc-400 mt-2">
                Шеф Глеб Саюткин получит заказ мгновенно на планшет кухни в Баку
              </div>
            </div>

          </form>
        )}

        {/* STEP 3: ORDER SUCCESS & TRACKER */}
        {step === 'success' && placedOrder && (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
                {placedOrder.orderId}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-3">
                Спасибо, {placedOrder.customerDetails.fullName}!
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-md mx-auto">
                Шеф Глеб Саюткин уже приступил к сборке вашего горячего заказа.
              </p>
            </div>

            {/* Live Status Tracker */}
            <div className="bg-[#1b0d13] border border-rose-900/40 rounded-2xl p-4 sm:p-5 text-left max-w-md mx-auto">
              <div className="text-xs font-semibold text-rose-200 mb-3 flex items-center justify-between">
                <span>Статус заказа:</span>
                <span className="text-amber-400 font-mono">Примерно {placedOrder.estimatedDeliveryTime}</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <span className="text-white font-medium">Заказ принят шефом Саюткиным</span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold text-xs animate-spin">
                    ⚙
                  </div>
                  <span className="text-amber-200 font-medium">Борщ упаковывается в термобокс (80°C)</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center text-xs">
                    3
                  </div>
                  <span>Выезд курьера по адресу: {placedOrder.customerDetails.address}</span>
                </div>
              </div>
            </div>

            {/* Order Receipt Details */}
            <div className="bg-[#150a0f] p-4 rounded-xl text-xs text-zinc-300 max-w-md mx-auto text-left space-y-1 font-mono">
              <div className="flex justify-between">
                <span>Итого к оплате:</span>
                <span className="text-amber-300 font-bold">{placedOrder.grandTotal} ₼</span>
              </div>
              <div className="flex justify-between">
                <span>Способ оплаты:</span>
                <span className="text-white capitalize">{placedOrder.customerDetails.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span>Чеснок:</span>
                <span className="text-white">
                  {placedOrder.customerDetails.garlicPreference === 'extra' ? 'Побольше' : 'Стандарт'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/994508441892?text=${encodeURIComponent(`Здравствуйте, шеф Глеб! Я оформил заказ ${placedOrder.orderId} на сайте. Адрес: ${placedOrder.customerDetails.address}`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Написать на кухню в WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium rounded-xl cursor-pointer"
              >
                Закрыть окно
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
