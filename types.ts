
export interface Vehicle {
  id: string;
  year: number;
  make: string;
  model: string;
  price: number;
  marketValue: number;
  mileage: string;
  image: string;
  oneOwner: boolean;
  cleanCarfax: boolean;
  photosCount: number;
  badges: string[];
  maintenanceRecords?: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface UTMParams {
  source: string;
  medium: string;
  campaign?: string;
}

export type LoyaltyTier = 'Standard' | 'Silver VIP' | 'Gold VIP' | 'Platinum VIP';

export interface UserProfile {
  name: string;
  carsPurchased: number;
  referrals: number;
  points: number;
  garageIds: string[];
  tier: LoyaltyTier;
}
