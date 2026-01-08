
import React from 'react';
import { Vehicle, Review } from './types';

export const COLORS = {
  primary: '#002B5B', // Deep Lexdan Blue
  secondary: '#64748B', // Slate
  accent: '#3B82F6', // Modern Blue
  white: '#FFFFFF',
  background: '#F8FAFC',
};

export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: '1',
    year: 2024,
    make: 'Honda',
    model: 'Prologue AWD Touring',
    price: 31998,
    marketValue: 34500,
    mileage: '1,028',
    image: 'https://images.unsplash.com/photo-1619767886558-efdf259cde1a?auto=format&fit=crop&q=80&w=800',
    oneOwner: true,
    cleanCarfax: true,
    photosCount: 34,
    badges: ['Electric', 'Panoramic Moonroof', 'Leather'],
    maintenanceRecords: ['PDI Completed']
  },
  {
    id: '2',
    year: 2023,
    make: 'Honda',
    model: 'Ridgeline RTL',
    price: 30990,
    marketValue: 33000,
    mileage: '56,474',
    image: 'https://images.unsplash.com/photo-1591439657448-9f4b9ce426b8?auto=format&fit=crop&q=80&w=800',
    oneOwner: true,
    cleanCarfax: true,
    photosCount: 34,
    badges: ['AWD', 'New Continental Tires', 'Leather'],
    maintenanceRecords: ['Oil Change', 'New Tires Installed']
  },
  {
    id: '3',
    year: 2021,
    make: 'Toyota',
    model: '4Runner TRD Off Road',
    price: 31870,
    marketValue: 34000,
    mileage: '112,247',
    image: 'https://images.unsplash.com/photo-1606016159991-fee4b28c1951?auto=format&fit=crop&q=80&w=800',
    oneOwner: true,
    cleanCarfax: true,
    photosCount: 31,
    badges: ['TRD Off-Road', 'Premium Audio', 'Navigation'],
    maintenanceRecords: ['100k Service Done']
  },
  {
    id: '4',
    year: 2018,
    make: 'Lexus',
    model: 'RX 350 L Luxury',
    price: 26970,
    marketValue: 29500,
    mileage: '116,298',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800',
    oneOwner: false,
    cleanCarfax: true,
    photosCount: 39,
    badges: ['Luxury Pkg', '3rd Row', 'AWD'],
    maintenanceRecords: ['Brake Service', 'New Rotors']
  },
  {
    id: '5',
    year: 2023,
    make: 'Toyota',
    model: 'RAV4 Hybrid XSE',
    price: 34500,
    marketValue: 36000,
    mileage: '12,450',
    // Updated to high-res image
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=1600',
    oneOwner: true,
    cleanCarfax: true,
    photosCount: 22,
    badges: ['Hybrid', 'Sport Tuned', 'JBL Audio'],
    maintenanceRecords: ['Factory Warranty']
  },
  {
    id: '6',
    year: 2018,
    make: 'Toyota',
    model: 'Tundra TRD Sport',
    price: 37897,
    marketValue: 40000,
    mileage: '96,474',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800',
    oneOwner: true,
    cleanCarfax: true,
    photosCount: 31,
    badges: ['CrewMax', 'Navigation', 'Gray Leather'],
    maintenanceRecords: ['Full Reconditioning']
  },
  {
    id: '7',
    year: 2021,
    make: 'Honda',
    model: 'CR-V EXL AWD',
    price: 26997,
    marketValue: 28500,
    mileage: '25,360',
    // Updated to high-res image
    image: 'https://images.unsplash.com/photo-1621348880650-f864194c7764?auto=format&fit=crop&q=80&w=1600',
    oneOwner: true,
    cleanCarfax: true,
    photosCount: 33,
    badges: ['One Owner', 'New Tires', 'Leather'],
    maintenanceRecords: ['Fresh Oil Change', 'New Filters']
  },
  {
    id: '8',
    year: 2014,
    make: 'Volkswagen',
    model: 'Jetta SE PZEV',
    price: 9997,
    marketValue: 11000,
    mileage: '70,478',
    image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=800',
    oneOwner: false,
    cleanCarfax: true,
    photosCount: 29,
    badges: ['New Tires', 'Heated Seats'],
    maintenanceRecords: ['Tire Replacement']
  }
];

export const MOCK_SALESMEN = [
  { id: 's1', name: 'David Miller', role: 'Senior Consultant', avatar: 'https://i.pravatar.cc/150?u=s1' },
  { id: 's2', name: 'Sarah Chen', role: 'Finance Director', avatar: 'https://i.pravatar.cc/150?u=s2' },
  { id: 's3', name: 'Mike Ross', role: 'Truck Expert', avatar: 'https://i.pravatar.cc/150?u=s3' }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Sarah Jenkins',
    rating: 5,
    text: "Buying my Lexus was the easiest car experience I've ever had. No pressure, family-owned vibe truly shows. Highly recommend Lexdan!",
    date: '2 weeks ago'
  },
  {
    id: 'r2',
    author: 'John Peterson',
    rating: 5,
    text: "Maplewood's best kept secret. The truck I bought was immaculate. Dennis is great to work with.",
    date: '1 month ago'
  }
];
