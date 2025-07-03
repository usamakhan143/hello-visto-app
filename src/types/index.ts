export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "vendor" | "customer";
  avatar?: string;
  phone?: string;
  createdAt: Date;
}

export interface Vendor {
  id: string;
  userId: string;
  businessName: string;
  description: string;
  logo?: string;
  address: string;
  phone: string;
  rating: number;
  totalReviews: number;
  isActive: boolean;
  subscriptionId?: string;
  createdAt: Date;
}

export interface Subscription {
  id: string;
  vendorId: string;
  planType: "basic" | "premium" | "enterprise";
  tourLimit: number;
  currentTours: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  price: number;
}

export interface Tour {
  id: string;
  vendorId: string;
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  duration: number; // in days
  maxGuests: number;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  startDate: Date;
  endDate: Date;
  includes: string[];
  excludes: string[];
  itinerary: ItineraryItem[];
  rating: number;
  totalReviews: number;
  isActive: boolean;
  isApproved: boolean;
  cancellationPolicy: string;
  createdAt: Date;
}

export interface ItineraryItem {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface Booking {
  id: string;
  tourId: string;
  customerId: string;
  vendorId: string;
  guests: number;
  totalAmount: number;
  commissionAmount: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus: "pending" | "paid" | "refunded";
  bookingDate: Date;
  tourStartDate: Date;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
  };
  guestDetails: GuestDetail[];
  createdAt: Date;
}

export interface GuestDetail {
  name: string;
  age: number;
  idType: string;
  idNumber: string;
}

export interface Review {
  id: string;
  tourId: string;
  customerId: string;
  vendorId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: Date;
}

export interface Commission {
  id: string;
  bookingId: string;
  vendorId: string;
  amount: number;
  percentage: number;
  status: "pending" | "paid";
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "booking" | "payment" | "general" | "promotion";
  isRead: boolean;
  data?: any;
  createdAt: Date;
}
