
import { Vehicle, Salesman, Review } from './types';

export const COLORS = {
  background: '#0F172A', // Slate 900
  text: '#FFFFFF',
  primary: '#E11D48', // Lexdan Red
  secondary: '#1E293B', // Slate 800
  accent: '#38BDF8', // Cyan/Holographic Blue
};

export const BRANDS = [
  { 
    id: 'toyota', 
    name: 'TOYOTA', 
    logo: '/toyota-logo.png', 
    image: '/prologue.png', 
    model: '4RUNNER TRD PRO', 
    color: '#eb0a1e' 
  },
  { 
    id: 'honda', 
    name: 'HONDA', 
    logo: '/honda-logo.png', 
    image: 'https://images.unsplash.com/photo-1631114407817-293883a45c79?auto=format&fit=crop&q=80&w=1200', 
    model: 'CR-V HYBRID', 
    color: '#003478' 
  },
  { 
    id: 'lexus', 
    name: 'LEXUS', 
    logo: '/lexus-logo.png', 
    image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&q=80&w=1200', 
    model: 'RX 500H', 
    color: '#333333' 
  },
  { 
    id: 'mazda', 
    name: 'MAZDA', 
    logo: '/mazda-logo.png', 
    image: 'https://images.unsplash.com/photo-1518987048-93e29699e79a?auto=format&fit=crop&q=80&w=1200', 
    model: 'CX-90 PHEV', 
    color: '#7a0019' 
  }
];

export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: '1',
    year: 2024,
    make: 'Honda',
    model: 'Prologue',
    trim: 'Touring AWD',
    type: 'SUV',
    color: 'North Shore Pearl',
    price: 31998,
    marketValue: 34500,
    mileage: 1028,
    image: 'https://images.unsplash.com/photo-1619767886558-efdf259cde1a?auto=format&fit=crop&q=80&w=800',
    oneOwner: true,
    cleanCarfax: true,
    badges: ['Low APR', 'Electric', 'Panoramic Roof'],
    commonIssues: 'Check charging port door alignment (Factory Bulletin 24-001).'
  },
  {
    id: '2',
    year: 2023,
    make: 'Honda',
    model: 'Ridgeline',
    trim: 'RTL',
    type: 'Truck',
    color: 'Crystal Black',
    price: 30990,
    marketValue: 33000,
    mileage: 56474,
    image: 'https://images.unsplash.com/photo-1591439657448-9f4b9ce426b8?auto=format&fit=crop&q=80&w=800',
    oneOwner: true,
    cleanCarfax: true,
    badges: ['AWD', 'New Tires'],
    commonIssues: 'Transmission fluid service recommended at 60k miles.'
  },
  {
    id: '3',
    year: 2021,
    make: 'Toyota',
    model: '4Runner',
    trim: 'TRD Off Road',
    type: 'SUV',
    color: 'Army Green',
    price: 31870,
    marketValue: 34000,
    mileage: 112247,
    image: 'https://images.unsplash.com/photo-1606016159991-fee4b28c1951?auto=format&fit=crop&q=80&w=800',
    oneOwner: true,
    cleanCarfax: true,
    badges: ['TRD Package', 'Navigation'],
    commonIssues: 'Fuel pump recall (20-21 models) - Verify replacement done.'
  },
  {
    id: '4',
    year: 2018,
    make: 'Lexus',
    model: 'RX 350 L',
    trim: 'Luxury',
    type: 'SUV',
    color: 'Eminent White',
    price: 26970,
    marketValue: 29500,
    mileage: 116298,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800',
    oneOwner: false,
    cleanCarfax: true,
    badges: ['3rd Row', 'AWD', 'No Accidents'],
    commonIssues: 'Check for timing cover oil leak (common on 3.5L V6).'
  },
  {
    id: '5',
    year: 2023,
    make: 'Toyota',
    model: 'RAV4 Hybrid',
    trim: 'XSE',
    type: 'SUV',
    color: 'Cavalry Blue',
    price: 34500,
    marketValue: 36000,
    mileage: 12450,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=1600',
    oneOwner: true,
    cleanCarfax: true,
    badges: ['Hybrid', 'JBL Audio', 'Low APR'],
    commonIssues: 'High voltage cable corrosion check recommended.'
  },
  {
    id: '6',
    year: 2018,
    make: 'Toyota',
    model: 'Tundra',
    trim: 'TRD Sport',
    type: 'Truck',
    color: 'Magnetic Gray',
    price: 37897,
    marketValue: 40000,
    mileage: 96474,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800',
    oneOwner: true,
    cleanCarfax: true,
    badges: ['CrewMax', 'Navigation', 'No Accidents'],
    commonIssues: 'Cam tower oil leak inspection passed.'
  }
];

export const MOCK_SALESMEN: Salesman[] = [
  { 
    id: 's1', 
    name: 'Dan', 
    role: 'General Manager', 
    avatar: 'https://i.pravatar.cc/150?u=dan',
    schedule: {
      'Mon': ['1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'],
      'Tue': ['10:00 AM', '11:00 AM', '12:00 PM'],
      'Wed': ['1:00 PM', '3:00 PM']
    }
  },
  { 
    id: 's2', 
    name: 'James', 
    role: 'Senior Sales', 
    avatar: 'https://i.pravatar.cc/150?u=james',
    schedule: {
      'Mon': ['9:00 AM', '11:00 AM'],
      'Wed': ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM'],
      'Fri': ['1:00 PM', '4:00 PM']
    }
  },
  { 
    id: 's3', 
    name: 'Andy', 
    role: 'Truck Specialist', 
    avatar: 'https://i.pravatar.cc/150?u=andy',
    schedule: {
      'Tue': ['1:00 PM', '2:00 PM', '3:00 PM'],
      'Thu': ['9:00 AM', '11:00 AM', '4:00 PM'],
      'Sat': ['10:00 AM', '12:00 PM', '2:00 PM']
    }
  },
  { 
    id: 's4', 
    name: 'Lee', 
    role: 'Finance Manager', 
    avatar: 'https://i.pravatar.cc/150?u=lee',
    schedule: {
      'Mon': ['10:00 AM', '2:00 PM'],
      'Thu': ['1:00 PM', '3:00 PM', '5:00 PM'],
      'Fri': ['9:00 AM', '11:00 AM']
    }
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Sarah Jenkins',
    rating: 5,
    text: "Buying my Lexus was the easiest car experience I've ever had. No pressure, family-owned vibe truly shows.",
    date: '2 weeks ago'
  },
  {
    id: 'r2',
    author: 'John Peterson',
    rating: 5,
    text: "Maplewood's best kept secret. The truck I bought was immaculate.",
    date: '1 month ago'
  }
];
