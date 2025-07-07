import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { BookingFirebaseService, FirestoreService } from "./firebase";

export interface Booking {
  id?: string;
  tourId: string;
  tourTitle: string;
  tourImage: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  vendorId: string;
  vendorName: string;
  numberOfGuests: number;
  totalAmount: number;
  bookingDate: Date;
  tourDate: Date;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus: "pending" | "paid" | "refunded";
  paymentMethod?: string;
  specialRequests?: string;
  contactNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create new booking
export const createBooking = async (
  bookingData: Omit<Booking, "id" | "createdAt" | "updatedAt">,
) => {
  try {
    const booking: Omit<Booking, "id"> = {
      ...bookingData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await addDoc(collection(db, "bookings"), booking);
    return docRef.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get bookings by customer
export const getCustomerBookings = async (customerId: string) => {
  try {
    const q = query(
      collection(db, "bookings"),
      where("customerId", "==", customerId),
      orderBy("createdAt", "desc"),
    );

    const querySnapshot = await getDocs(q);
    const bookings: Booking[] = [];

    querySnapshot.forEach((doc) => {
      bookings.push({
        id: doc.id,
        ...doc.data(),
        bookingDate: doc.data().bookingDate.toDate(),
        tourDate: doc.data().tourDate.toDate(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      } as Booking);
    });

    return bookings;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get bookings by vendor
export const getVendorBookings = async (vendorId: string) => {
  try {
    const q = query(
      collection(db, "bookings"),
      where("vendorId", "==", vendorId),
      orderBy("createdAt", "desc"),
    );

    const querySnapshot = await getDocs(q);
    const bookings: Booking[] = [];

    querySnapshot.forEach((doc) => {
      bookings.push({
        id: doc.id,
        ...doc.data(),
        bookingDate: doc.data().bookingDate.toDate(),
        tourDate: doc.data().tourDate.toDate(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      } as Booking);
    });

    return bookings;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get single booking
export const getBooking = async (
  bookingId: string,
): Promise<Booking | null> => {
  try {
    const docRef = doc(db, "bookings", bookingId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        bookingDate: data.bookingDate.toDate(),
        tourDate: data.tourDate.toDate(),
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      } as Booking;
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Update booking status
export const updateBookingStatus = async (
  bookingId: string,
  status: Booking["status"],
  paymentStatus?: Booking["paymentStatus"],
) => {
  try {
    const updates: any = {
      status,
      updatedAt: new Date(),
    };

    if (paymentStatus) {
      updates.paymentStatus = paymentStatus;
    }

    const docRef = doc(db, "bookings", bookingId);
    await updateDoc(docRef, updates);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Cancel booking
export const cancelBooking = async (bookingId: string, reason?: string) => {
  try {
    const updates: any = {
      status: "cancelled",
      updatedAt: new Date(),
    };

    if (reason) {
      updates.cancellationReason = reason;
    }

    const docRef = doc(db, "bookings", bookingId);
    await updateDoc(docRef, updates);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get booking statistics for vendor
export const getVendorBookingStats = async (vendorId: string) => {
  try {
    const q = query(
      collection(db, "bookings"),
      where("vendorId", "==", vendorId),
    );

    const querySnapshot = await getDocs(q);

    let totalBookings = 0;
    let totalRevenue = 0;
    let confirmedBookings = 0;
    let pendingBookings = 0;
    let cancelledBookings = 0;

    querySnapshot.forEach((doc) => {
      const booking = doc.data() as Booking;
      totalBookings++;

      if (booking.status === "confirmed" || booking.status === "completed") {
        totalRevenue += booking.totalAmount;
        confirmedBookings++;
      } else if (booking.status === "pending") {
        pendingBookings++;
      } else if (booking.status === "cancelled") {
        cancelledBookings++;
      }
    });

    return {
      totalBookings,
      totalRevenue,
      confirmedBookings,
      pendingBookings,
      cancelledBookings,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
