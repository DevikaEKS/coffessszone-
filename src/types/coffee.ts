export type CoffeeCategory = 'all' | 'espresso' | 'filter' | 'signature' | 'bakery' | 'beans';

export interface MenuItem {
  id: string;
  name: string;
  japaneseName?: string;
  category: 'espresso' | 'filter' | 'signature' | 'bakery' | 'beans';
  description: string;
  price: number;
  origin?: string;
  farm?: string;
  process?: 'Washed' | 'Natural' | 'Honey' | 'Anaerobic Slow Dry' | 'Washed & Natural' | 'Mountain Water Washed' | string;
  altitude?: string;
  roastLevel?: 'Light' | 'Medium-Light' | 'Medium' | 'Omni-Roast' | string;
  tastingNotes?: string[];
  isVegan?: boolean;
  isGlutenFree?: boolean;
  image?: string;
  isFeatured?: boolean;
  badge?: string; // e.g. "Micro-Lot" or "Staff Pick" (used as clean unboxed text)
  availableGrinds?: string[];
  availableMilks?: string[];
}

export interface CartItem {
  cartId: string;
  item: MenuItem;
  quantity: number;
  selectedMilk?: string;
  selectedGrind?: string;
  selectedTemp?: 'Hot' | 'Iced';
  specialInstructions?: string;
  unitPrice: number;
}

export interface ReservationData {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  zone: 'Slow Bar Tasting Counter' | 'Sunlit Solarium' | 'Cedar Library Nook';
  specialOccasion?: string;
  flightOption?: string;
}

export interface QuizState {
  brewMethod: string;
  flavorProfile: string;
  caffeineTiming: string;
}
