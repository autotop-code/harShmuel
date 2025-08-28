
export interface Accommodation {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  amenities?: string[];
  maxGuests?: number;
  bedrooms?: number;
  bathrooms?: number; 
}