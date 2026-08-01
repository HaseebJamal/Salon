export interface Salon {
  id: number;
  name: string;
  category: string;
  categorySlug: string;
  address: string;
  city: string;
  phone: string;
  instagram?: string;
  reviewCount: number;
  featured: boolean;
  image?: string;
}

export const salons: Salon[] = [
  { 
    id: 1, 
    name: "Mr Fresh Hair Salon", 
    category: "Hair Salon", 
    categorySlug: "hair-salon", 
    address: "Circular Road, near Care Pharmacy, Municipal Colony", 
    city: "Jaranwala", 
    phone: "03027606466", 
    reviewCount: 42, 
    featured: true 
  },
  { 
    id: 2, 
    name: "Fancy Beauty Parlour", 
    category: "Beauty Parlour", 
    categorySlug: "beauty-parlour", 
    address: "8CWC+2HQ, Jhumra Road, Raja Sehroz Marrquee", 
    city: "Jaranwala", 
    phone: "03217289628", 
    instagram: "https://www.instagram.com/fancy_beauty_salon1", 
    reviewCount: 42, 
    featured: true 
  },
  { 
    id: 3, 
    name: "Rabia Beauty Parlor", 
    category: "Beauty Parlour", 
    categorySlug: "beauty-parlour", 
    address: "8CVG+W95, 127 GB Road, Al-Madina Colony", 
    city: "Jaranwala", 
    phone: "03217218145", 
    reviewCount: 14, 
    featured: false 
  },
  { 
    id: 4, 
    name: "Teejee's Signature Salon", 
    category: "Signature Salon", 
    categorySlug: "hair-salon", 
    address: "1 Jaranwala Rd, Al Najaf Colony", 
    city: "Faisalabad", 
    phone: "03457851171", 
    reviewCount: 33, 
    featured: true 
  },
  { 
    id: 5, 
    name: "Aura And Ash Salon", 
    category: "Beauty Salon", 
    categorySlug: "beauty-parlour", 
    address: "1 Jaranwala Rd, Al Najaf Colony", 
    city: "Faisalabad", 
    phone: "03221517717", 
    instagram: "https://www.instagram.com/auraandashsalonfaisalabad", 
    reviewCount: 45, 
    featured: true 
  },
  { 
    id: 6, 
    name: "Sarfraz Hair Saloon", 
    category: "Hair Salon", 
    categorySlug: "hair-salon", 
    address: "Jaranwala", 
    city: "Jaranwala", 
    phone: "03024142610", 
    reviewCount: 22, 
    featured: false 
  },
  { 
    id: 7, 
    name: "Dionne Makeup Studio & Spa", 
    category: "Makeup Studio & Spa", 
    categorySlug: "makeup-studio", 
    address: "Shop 138-144, Upper Ground Floor, Koh e Noor City Main Jaranwala Road, Kohinoor City", 
    city: "Faisalabad", 
    phone: "03318889265", 
    reviewCount: 0, 
    featured: true 
  },
];
