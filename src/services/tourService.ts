import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../config/firebase";
import {
  TourFirebaseService,
  FirestoreService,
  StorageService,
} from "./firebase";

export interface Tour {
  id?: string;
  vendorId: string;
  vendorName: string;
  vendorLogo?: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  discountPrice?: number;
  duration: number; // in days
  maxGuests: number;
  minAge?: number;
  destination: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  category: string;
  tags: string[];
  includes: string[];
  excludes: string[];
  images: string[];
  highlights: string[];
  cancellationPolicy?: string;
  difficulty?: string;
  rating: number;
  reviewCount: number;
  totalBookings: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Create new tour
export const createTour = async (
  tourData: Omit<
    Tour,
    | "id"
    | "createdAt"
    | "updatedAt"
    | "rating"
    | "reviewCount"
    | "totalBookings"
  >,
) => {
  try {
    const tour: Omit<Tour, "id"> = {
      ...tourData,
      rating: 0,
      reviewCount: 0,
      totalBookings: 0,
      isActive: true,
      isFeatured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await addDoc(collection(db, "tours"), tour);
    return docRef.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get all tours
export const getTours = async (filters?: {
  category?: string;
  destination?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
}) => {
  try {
    let q = collection(db, "tours");

    if (filters) {
      const conditions = [];

      if (filters.category) {
        conditions.push(where("category", "==", filters.category));
      }
      if (filters.destination) {
        conditions.push(where("destination", "==", filters.destination));
      }
      if (filters.featured !== undefined) {
        conditions.push(where("isFeatured", "==", filters.featured));
      }

      if (conditions.length > 0) {
        q = query(q, ...conditions, orderBy("createdAt", "desc"));
      } else {
        q = query(q, orderBy("createdAt", "desc"));
      }
    } else {
      q = query(q, orderBy("createdAt", "desc"));
    }

    const querySnapshot = await getDocs(q);
    const tours: Tour[] = [];

    querySnapshot.forEach((doc) => {
      tours.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      } as Tour);
    });

    return tours;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get tours by vendor
export const getToursByVendor = async (vendorId: string) => {
  try {
    const q = query(
      collection(db, "tours"),
      where("vendorId", "==", vendorId),
      orderBy("createdAt", "desc"),
    );

    const querySnapshot = await getDocs(q);
    const tours: Tour[] = [];

    querySnapshot.forEach((doc) => {
      tours.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      } as Tour);
    });

    return tours;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get single tour
export const getTour = async (tourId: string): Promise<Tour | null> => {
  try {
    const docRef = doc(db, "tours", tourId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      } as Tour;
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Update tour
export const updateTour = async (tourId: string, updates: Partial<Tour>) => {
  try {
    const docRef = doc(db, "tours", tourId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date(),
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Delete tour
export const deleteTour = async (tourId: string) => {
  try {
    await deleteDoc(doc(db, "tours", tourId));
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Upload tour images
export const uploadTourImages = async (tourId: string, imageUris: string[]) => {
  try {
    const uploadPromises = imageUris.map(async (uri, index) => {
      const response = await fetch(uri);
      const blob = await response.blob();
      const imageRef = ref(
        storage,
        `tours/${tourId}/image_${index}_${Date.now()}.jpg`,
      );
      await uploadBytes(imageRef, blob);
      return await getDownloadURL(imageRef);
    });

    const downloadUrls = await Promise.all(uploadPromises);
    return downloadUrls;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Search tours
export const searchTours = async (searchTerm: string) => {
  try {
    // Note: This is a basic search. For better search, consider using Algolia or similar
    const q = query(
      collection(db, "tours"),
      where("isActive", "==", true),
      orderBy("title"),
    );

    const querySnapshot = await getDocs(q);
    const tours: Tour[] = [];

    querySnapshot.forEach((doc) => {
      const tour = {
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      } as Tour;

      // Basic text search in title, description, destination
      const searchFields = [
        tour.title,
        tour.description,
        tour.destination,
        tour.category,
        ...tour.tags,
      ]
        .join(" ")
        .toLowerCase();

      if (searchFields.includes(searchTerm.toLowerCase())) {
        tours.push(tour);
      }
    });

    return tours;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
