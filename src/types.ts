export interface Destination {
  id: string;
  name: string; // e.g., "Jepang"
  continent: "Asia" | "Eropa";
  cities: string[]; // e.g., ["Tokyo", "Kyoto", "Osaka"]
  touristSpots: string[]; // e.g., ["Shibuya Crossing", "Museum Ghibli"]
  pricePerPerson: number; // e.g., 35000000 (Rupiah)
  description: string;
  thumbnail: string;
  benefits: string[]; // List of executive benefits
}

export interface Hotel {
  id: string;
  name: string;
  country: string;
  city: string;
  stars: number;
  pricePerNight: number;
  description: string;
  image: string;
  amenities: string[];
}

export interface BookingFormState {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  selectedCountryId: string;
  selectedHotelId: string;
  startDate: string;
  numberOfPeople: number;
  numberOfNights: number;
  includeTour: boolean;
  includeHotel: boolean;
  isBusinessTrip: boolean;
  notes: string;
  paymentMethod?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface ItineraryRequest {
  destination: string;
  durationDays: number;
  focus: "Bisnis" | "Leisure" | "MICE (Meeting & Exhibition)" | "Eksplorasi Budaya";
  notes?: string;
}
