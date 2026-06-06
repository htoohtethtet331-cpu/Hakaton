export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  role: 'buyer' | 'seller';
  preferredCategories: string[];
  preference: 'new' | 'used' | 'both';
  profilePhoto: string;
  walletBalance: number;
  matePoints: number;
  activeCoupons: number;
}

export interface MarketplaceProduct {
  id: string;
  title: string;
  sellerName: string;
  price: number;
  rating?: number;
  isNew: boolean;
  image: string;
  hasShipping?: boolean;
  isBestseller?: boolean;
  category: 'Tech' | 'Fashion' | 'Home' | 'Photography' | 'Footwear';
  condition: 'Brand New' | 'Second-Hand';
}

export interface BuyerOrder {
  id: string;
  productTitle: string;
  orderNumber: string;
  arrivesString: string;
  status: 'In Transit' | 'Processing' | 'Delivered' | 'Returned';
  price: number;
  image: string;
}

export type AppScreen =
  | 'Welcome'
  | 'Login'
  | 'Register'
  | 'Onboarding'
  | 'MarketplaceHub'
  | 'Feed'
  | 'BuyerDashboard'
  | 'SellerDashboard'
  | 'SuperAdmin';
