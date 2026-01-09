export const MOCK_VEHICLES = [
  {
    id: 'v1',
    year: 2024,
    make: 'Toyota',
    model: '4Runner',
    trim: 'TRD Pro',
    type: 'SUV',
    color: 'Solar Octane',
    originalPrice: 56900,
    discount: 2000,
    salePrice: 54900,
    image: '/inventory/4runner-1.png',
    badges: ['One Owner', 'Low APR'],
    quickFacts: { accidents: 'No', owners: '1', status: 'Lease' },
    commonIssues: '17-24 4Runners: Seat Recall info available'
  },
  {
    id: 'v2',
    year: 2023,
    make: 'Honda',
    model: 'CR-V',
    trim: 'Sport Hybrid',
    type: 'SUV',
    color: 'Canyon River Blue',
    originalPrice: 39500,
    discount: 1500,
    salePrice: 38000,
    image: '/inventory/crv-1.png',
    badges: ['Certified', 'New Tires'],
    quickFacts: { accidents: 'No', owners: '1', status: 'Clean Title' },
    commonIssues: 'No active recalls for this VIN'
  },
  // ADD THE REMAINING 38 CARS HERE FOLLOWING THIS EXACT PATTERN
];
];
