
export interface Vehicle {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  type: string;
  color: string;
  price: number;
  marketValue: number;
  mileage: number; // Changed to number for logic comparisons
  image: string;
  oneOwner: boolean;
  cleanCarfax: boolean;
  badges: string[];
  commonIssues?: string; // Technical insight
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

export interface Salesman {
  id: string;
  name: string;
  role: string;
  avatar: string;
  schedule: Record<string, string[]>; // e.g., 'Mon': ['1:00 PM', '2:00 PM']
}
