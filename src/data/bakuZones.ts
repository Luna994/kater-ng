import { DeliveryZone } from '../types';

export const BAKU_ZONES: DeliveryZone[] = [
  {
    id: 'sabayil',
    name: 'Сабаил (Центр, Торговая, Бульвар, Ичери Шехер)',
    nameAz: 'Səbail (Mərkəz, Tarqovı, Bulvar, İçərişəhər)',
    timeMinutes: 35,
    minOrderAzn: 15,
    deliveryFeeAzn: 0,
    popularSpots: 'Площадь Фонтанов, Port Baku, Приморский бульвар'
  },
  {
    id: 'nasimi',
    name: 'Насими (ул. Низами, 28 Мая, Тбилисский просп.)',
    nameAz: 'Nəsimi (Nizami küç., 28 May, Tbilisi pr.)',
    timeMinutes: 40,
    minOrderAzn: 15,
    deliveryFeeAzn: 0,
    popularSpots: 'Mall 28, Ж/Д вокзал, Цирк'
  },
  {
    id: 'khatai',
    name: 'Хатаи & Белый Город (White City, проспект Бабека)',
    nameAz: 'Xətai & Ağ Şəhər (White City, Babək pr.)',
    timeMinutes: 40,
    minOrderAzn: 20,
    deliveryFeeAzn: 0,
    popularSpots: 'Baku White City Office building, Park Azure'
  },
  {
    id: 'yasamal',
    name: 'Ясамал (Эльмляр, БГУ, пр. Гусейна Джавида)',
    nameAz: 'Yasamal (Elmlər, BDU, H. Cavid pr.)',
    timeMinutes: 45,
    minOrderAzn: 20,
    deliveryFeeAzn: 2,
    popularSpots: 'Метро Эльмляр Академиясы, Flame Towers'
  },
  {
    id: 'narimanov',
    name: 'Нариманов (Центр Гейдара Алиева, Метропарк)',
    nameAz: 'Nərimanov (Heydər Əliyev Mərkəzi, Metropark)',
    timeMinutes: 45,
    minOrderAzn: 20,
    deliveryFeeAzn: 2,
    popularSpots: 'пр. Гейдара Алиева, Континент'
  },
  {
    id: 'badamdar',
    name: 'Бадамдар & Сабаил (поселок Бадамдар)',
    nameAz: 'Badamdar qəsəbəsi',
    timeMinutes: 50,
    minOrderAzn: 30,
    deliveryFeeAzn: 3,
    popularSpots: 'Oxford School, Бадамдар шоссе'
  }
];

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  city: string;
  avatarInitials: string;
  rating: number;
  text: string;
  dishOrdered: string;
  date: string;
}

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Фархад Мамедов',
    role: 'Руководитель IT-департамента, White City',
    city: 'Баку',
    avatarInitials: 'ФМ',
    rating: 5,
    text: 'Заказывали 10-литровый котел борща на празднование релиза в офисе. Глеб лично курировал доставку — привезли в медном горячем котле, пампушки были еще теплыми и пахли чесноком на весь этаж! Коллеги были в полном восторге. Теперь мы постоянные клиенты!',
    dishOrdered: 'Кейтеринг-котел «Царский пир»',
    date: 'Вчера'
  },
  {
    id: 'rev-2',
    author: 'Елена Васильева',
    role: 'Дизайнер интерьеров',
    city: 'Баку (Сабаил)',
    avatarInitials: 'ЕВ',
    rating: 5,
    text: 'Живу в Баку третий год и очень скучала по настоящему густому рубиновому борщу. Борщ от Глеба Саюткина — это просто гастрономическое откровение! Мясо тает, бульон наваристый без жирности, а бакинская версия с ягненком и алычой — гениальный твист.',
    dishOrdered: 'Борщ «Бакинский» с ягненком и алычой',
    date: '3 дня назад'
  },
  {
    id: 'rev-3',
    author: 'Рауф Алиев',
    role: 'Основатель digital-агентства',
    city: 'Баку (Насими)',
    avatarInitials: 'РА',
    rating: 5,
    text: 'Быстрая доставка за 35 минут прямо к обеденному столу. Борщ кипяток, сметана густая ложка стоит, пампушки пуховые. Сало с чесноком и бородинским хлебом — обязательно берите к заказу!',
    dishOrdered: 'Борщ «Полтавский» + сет сала',
    date: 'Неделю назад'
  }
];
