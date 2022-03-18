import { Vendor } from '@components/vendor-list';

export const vendors: Vendor[] = [
  {
    id: '1',
    name: 'Pasta Express',
    imagePath: '/assets/pasta-express.jpg',
    cuisine: ['italian'],
  },
  {
    id: '2',
    name: 'Soi Aroy',
    imagePath: '/assets/soi-aroy.jpeg',
    cuisine: ['thai'],
  },
  {
    id: '3',
    name: 'Koufu',
    imagePath: '/assets/koufu.jpeg',
    cuisine: ['mixed'],
  },
  {
    id: '4',
    name: 'Subway',
    imagePath: '/assets/subway.jpg',
    cuisine: ['western'],
  },
  {
    id: '5',
    name: 'Kenboru',
    imagePath: '/assets/kenboru.jpeg',
    cuisine: ['japanese'],
  },
];

export const vendorMenu = [
  {
    name: 'Pasta Express',
    menu: [
      {
        item: 'Aglio Olio',
        price: 5.8,
      },
      {
        item: 'Carbonara',
        price: 5.2,
      },
    ],
  },
  {
    name: 'Soi Aroy',
    menu: [
      {
        item: 'Thai Omelette w Minced Pork',
        price: 6.0,
      },
      {
        item: 'Collagen Chicken Broth',
        price: 6.0,
      },
    ],
  },
  {
    name: 'Koufu',
    menu: [
      {
        item: 'Chicken Rice',
        price: 4.2,
      },
      {
        item: 'Nasi Briyani',
        price: 4.6,
      },
    ],
  },
  {
    name: 'Subway',
    menu: [
      {
        item: 'Chocolate Chip Cookie',
        price: 1.5,
      },
      {
        item: 'Teriyaki Chicken Subway',
        price: 6.3,
      },
    ],
  },
  {
    name: 'Kenboru',
    menu: [
      {
        item: 'Smoked Duck Breast Rice Bowl',
        price: 6.9,
      },
      {
        item: 'Honey Glazed Tofu Rice Bowl',
        price: 4.9,
      },
    ],
  },
];

export interface MenuItem {
  item: string;
  price: number;
}

export function getAllVendorIds() {
  return vendors.map((vendor) => {
    return {
      params: {
        vendor: vendor.id,
      },
    };
  });
}

export function getVendorData(id: string) {
  return vendors.find((vendor) => vendor.id === id);
}
