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
  setDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { ReviewFirebaseService, FirestoreService } from "./firebase";

export interface Review {
  id?: string;
  tourId: string;
  tourTitle: string;
  customerId: string;
  customerName: string;
  customerImage?: string;
  vendorId: string;
  rating: number; // 1-5
  comment: string;
  images?: string[];
  isVerified: boolean; // true if customer actually booked the tour
  bookingId?: string;
  helpfulCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Wishlist {
  id?: string;
  customerId: string;
  tourId: string;
  tourTitle: string;
  tourImage: string;
  tourPrice: number;
  vendorName: string;
  createdAt: Date;
}

// Create new review
export const createReview = async (
  reviewData: Omit<Review, "id" | "createdAt" | "updatedAt" | "helpfulCount">,
) => {
  try {
    const review: Omit<Review, "id"> = {
      ...reviewData,
      helpfulCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await addDoc(collection(db, "reviews"), review);

    // Update tour rating
    await updateTourRating(reviewData.tourId);

    return docRef.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get reviews by tour
export const getTourReviews = async (tourId: string) => {
  try {
    const q = query(
      collection(db, "reviews"),
      where("tourId", "==", tourId),
      orderBy("createdAt", "desc"),
    );

    const querySnapshot = await getDocs(q);
    const reviews: Review[] = [];

    querySnapshot.forEach((doc) => {
      reviews.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      } as Review);
    });

    return reviews;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get reviews by customer
export const getCustomerReviews = async (customerId: string) => {
  try {
    const q = query(
      collection(db, "reviews"),
      where("customerId", "==", customerId),
      orderBy("createdAt", "desc"),
    );

    const querySnapshot = await getDocs(q);
    const reviews: Review[] = [];

    querySnapshot.forEach((doc) => {
      reviews.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      } as Review);
    });

    return reviews;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get reviews by vendor
export const getVendorReviews = async (vendorId: string) => {
  try {
    const q = query(
      collection(db, "reviews"),
      where("vendorId", "==", vendorId),
      orderBy("createdAt", "desc"),
    );

    const querySnapshot = await getDocs(q);
    const reviews: Review[] = [];

    querySnapshot.forEach((doc) => {
      reviews.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      } as Review);
    });

    return reviews;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Update tour rating based on reviews
const updateTourRating = async (tourId: string) => {
  try {
    const reviews = await getTourReviews(tourId);

    if (reviews.length === 0) return;

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    const tourRef = doc(db, "tours", tourId);
    await updateDoc(tourRef, {
      rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      reviewCount: reviews.length,
      updatedAt: new Date(),
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Mark review as helpful
export const markReviewHelpful = async (reviewId: string) => {
  try {
    const reviewRef = doc(db, "reviews", reviewId);
    const reviewDoc = await getDoc(reviewRef);

    if (reviewDoc.exists()) {
      const currentCount = reviewDoc.data().helpfulCount || 0;
      await updateDoc(reviewRef, {
        helpfulCount: currentCount + 1,
        updatedAt: new Date(),
      });
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Delete review
export const deleteReview = async (reviewId: string, tourId: string) => {
  try {
    await deleteDoc(doc(db, "reviews", reviewId));

    // Update tour rating after deletion
    await updateTourRating(tourId);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// WISHLIST FUNCTIONS

// Add to wishlist
export const addToWishlist = async (
  wishlistData: Omit<Wishlist, "id" | "createdAt">,
) => {
  try {
    // Use composite key to prevent duplicates
    const wishlistId = `${wishlistData.customerId}_${wishlistData.tourId}`;

    const wishlist: Omit<Wishlist, "id"> = {
      ...wishlistData,
      createdAt: new Date(),
    };

    await setDoc(doc(db, "wishlists", wishlistId), wishlist);
    return wishlistId;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Remove from wishlist
export const removeFromWishlist = async (
  customerId: string,
  tourId: string,
) => {
  try {
    const wishlistId = `${customerId}_${tourId}`;
    await deleteDoc(doc(db, "wishlists", wishlistId));
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get customer wishlist
export const getCustomerWishlist = async (customerId: string) => {
  try {
    const q = query(
      collection(db, "wishlists"),
      where("customerId", "==", customerId),
      orderBy("createdAt", "desc"),
    );

    const querySnapshot = await getDocs(q);
    const wishlist: Wishlist[] = [];

    querySnapshot.forEach((doc) => {
      wishlist.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      } as Wishlist);
    });

    return wishlist;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Check if tour is in wishlist
export const isInWishlist = async (
  customerId: string,
  tourId: string,
): Promise<boolean> => {
  try {
    const wishlistId = `${customerId}_${tourId}`;
    const wishlistDoc = await getDoc(doc(db, "wishlists", wishlistId));
    return wishlistDoc.exists();
  } catch (error: any) {
    return false;
  }
};
