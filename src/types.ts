export interface MenuItem {
  id: string;
  name: string;
  category: 'borsch' | 'sets' | 'sides' | 'catering';
  description: string;
  fullStory?: string;
  price: number; // in AZN (₼)
  volume: string; // e.g. "450 мл"
  calories: string;
  deliveryTimeEstimate: string; // e.g. "35–45 мин"
  spiciness: number; // 0 to 3
  isChefSpecial?: boolean;
  isPopular?: boolean;
  isVegetarian?: boolean;
  ingredients: string[];
  servedWith: string[];
  imageType: 'classic' | 'baku-lamb' | 'smoked' | 'mushroom' | 'green' | 'pampushki' | 'salo' | 'party-pot';
  imageUrl?: string;
  addonPrices?: {
    smetana: number;
    pampushki: number;
    salo: number;
  };
}

export interface CartItem {
  id: string; // unique cart line id
  item: MenuItem;
  quantity: number;
  selectedVolume?: string;
  customNotes?: string;
  extraSmetana?: boolean;
  extraPampushki?: boolean;
  extraSalo?: boolean;
  unitPrice: number; // base price + selected addons
}

export interface DeliveryZone {
  id: string;
  name: string;
  nameAz: string;
  timeMinutes: number;
  minOrderAzn: number;
  deliveryFeeAzn: number;
  popularSpots: string;
}

export interface OrderFormState {
  fullName: string;
  phone: string;
  district: string;
  address: string;
  deliveryTimeType: 'asap' | 'scheduled';
  scheduledTime: string;
  paymentMethod: 'cash' | 'card' | 'm10' | 'corporate';
  personsCount: number;
  comment: string;
  spiceLevelPreference: 'mild' | 'regular' | 'fiery';
  garlicPreference: 'extra' | 'standard' | 'light';
}

export interface PlacedOrder {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  totalPrice: number;
  deliveryFee: number;
  grandTotal: number;
  customerDetails: OrderFormState;
  status: 'received' | 'cooking' | 'packing' | 'courier' | 'delivered';
  estimatedDeliveryTime: string;
}
