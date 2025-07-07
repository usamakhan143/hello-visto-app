import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithCredential,
  User,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { auth, db, storage } from "../config/firebase";

// User Types
export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  userType: "customer" | "vendor" | "admin";
  phone?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Authentication Service
export class AuthService {
  static async signUp(
    email: string,
    password: string,
    userData: Partial<UserData>,
  ) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // Update user profile
      await updateProfile(user, {
        displayName: userData.displayName,
        photoURL: userData.photoURL,
      });

      // Save additional user data to Firestore
      const userDoc = {
        uid: user.uid,
        email: user.email,
        displayName: userData.displayName || "",
        photoURL: userData.photoURL || "",
        userType: userData.userType || "customer",
        phone: userData.phone || "",
        address: userData.address || "",
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      await setDoc(doc(db, "users", user.uid), userDoc);

      // Debug: Log what's being saved
      console.log("SignUp - Saving user data:", userDoc);

      return { user, userData: userDoc };
    } catch (error: any) {
      console.error("SignUp Error:", error);
      throw new Error(error.message || "Failed to create account");
    }
  }

  static async signIn(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;

      // Debug: Log what's being retrieved
      console.log("SignIn - Retrieved user data:", userData);
      console.log("SignIn - UserType:", userData?.userType);

      return { user, userData };
    } catch (error: any) {
      console.error("SignIn Error:", error);
      throw new Error(error.message || "Failed to sign in");
    }
  }

  static async signOut() {
    try {
      await signOut(auth);
      return true;
    } catch (error: any) {
      console.error("SignOut Error:", error);
      throw new Error(error.message || "Failed to sign out");
    }
  }

  static async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error: any) {
      console.error("Reset Password Error:", error);
      throw new Error(error.message || "Failed to send reset email");
    }
  }

  static async getCurrentUser() {
    return auth.currentUser;
  }

  static async updateUserProfile(userId: string, data: Partial<UserData>) {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        ...data,
        updatedAt: Timestamp.now(),
      });

      // Update Firebase Auth profile if needed
      if (auth.currentUser && (data.displayName || data.photoURL)) {
        await updateProfile(auth.currentUser, {
          displayName: data.displayName || auth.currentUser.displayName,
          photoURL: data.photoURL || auth.currentUser.photoURL,
        });
      }

      return true;
    } catch (error: any) {
      console.error("Update Profile Error:", error);
      throw new Error(error.message || "Failed to update profile");
    }
  }
}

// Firestore Service
export class FirestoreService {
  static async create(collectionName: string, data: any, docId?: string) {
    try {
      const docData = {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      if (docId) {
        await setDoc(doc(db, collectionName, docId), docData);
        return docId;
      } else {
        const docRef = await addDoc(collection(db, collectionName), docData);
        return docRef.id;
      }
    } catch (error: any) {
      console.error("Create Error:", error);
      throw new Error(error.message || "Failed to create document");
    }
  }

  static async read(collectionName: string, docId: string) {
    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        return null;
      }
    } catch (error: any) {
      console.error("Read Error:", error);
      throw new Error(error.message || "Failed to read document");
    }
  }

  static async update(collectionName: string, docId: string, data: any) {
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now(),
      });
      return true;
    } catch (error: any) {
      console.error("Update Error:", error);
      throw new Error(error.message || "Failed to update document");
    }
  }

  static async delete(collectionName: string, docId: string) {
    try {
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
      return true;
    } catch (error: any) {
      console.error("Delete Error:", error);
      throw new Error(error.message || "Failed to delete document");
    }
  }

  static async query(
    collectionName: string,
    filters: {
      field?: string;
      operator?: any;
      value?: any;
      orderBy?: string;
      orderDirection?: "asc" | "desc";
      limit?: number;
    }[] = [],
  ) {
    try {
      let q = collection(db, collectionName);

      // Apply filters
      filters.forEach((filter) => {
        if (filter.field && filter.operator && filter.value !== undefined) {
          q = query(q, where(filter.field, filter.operator, filter.value));
        }
        if (filter.orderBy) {
          q = query(q, orderBy(filter.orderBy, filter.orderDirection || "asc"));
        }
        if (filter.limit) {
          q = query(q, limit(filter.limit));
        }
      });

      const querySnapshot = await getDocs(q);
      const results: any[] = [];

      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });

      return results;
    } catch (error: any) {
      console.error("Query Error:", error);
      throw new Error(error.message || "Failed to query documents");
    }
  }

  static async getCollection(collectionName: string) {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const results: any[] = [];

      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });

      return results;
    } catch (error: any) {
      console.error("Get Collection Error:", error);
      throw new Error(error.message || "Failed to get collection");
    }
  }
}

// Storage Service
export class StorageService {
  static async uploadImage(uri: string, path: string, fileName?: string) {
    try {
      // Convert URI to blob for upload
      const response = await fetch(uri);
      const blob = await response.blob();

      const timestamp = Date.now();
      const finalFileName = fileName || `image_${timestamp}`;
      const storageRef = ref(storage, `${path}/${finalFileName}`);

      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      return {
        url: downloadURL,
        path: `${path}/${finalFileName}`,
        fileName: finalFileName,
      };
    } catch (error: any) {
      console.error("Upload Image Error:", error);
      throw new Error(error.message || "Failed to upload image");
    }
  }

  static async deleteImage(path: string) {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
      return true;
    } catch (error: any) {
      console.error("Delete Image Error:", error);
      throw new Error(error.message || "Failed to delete image");
    }
  }

  static async uploadMultipleImages(uris: string[], basePath: string) {
    try {
      const uploadPromises = uris.map((uri, index) =>
        this.uploadImage(uri, basePath, `image_${Date.now()}_${index}`),
      );

      const results = await Promise.all(uploadPromises);
      return results;
    } catch (error: any) {
      console.error("Upload Multiple Images Error:", error);
      throw new Error(error.message || "Failed to upload images");
    }
  }
}

// Specialized Services for App Features

// Tour Service
export class TourFirebaseService {
  static async createTour(tourData: any) {
    try {
      const tourId = await FirestoreService.create("tours", {
        ...tourData,
        status: "active",
        createdBy: auth.currentUser?.uid,
      });
      return tourId;
    } catch (error) {
      console.error("Create Tour Error:", error);
      throw error;
    }
  }

  static async getTours(filters?: any) {
    try {
      const tours = await FirestoreService.query("tours", [
        { field: "status", operator: "==", value: "active" },
        { orderBy: "createdAt", orderDirection: "desc" },
        ...(filters || []),
      ]);
      return tours;
    } catch (error) {
      console.error("Get Tours Error:", error);
      throw error;
    }
  }

  static async getUserTours(userId: string) {
    try {
      const tours = await FirestoreService.query("tours", [
        { field: "createdBy", operator: "==", value: userId },
        { orderBy: "createdAt", orderDirection: "desc" },
      ]);
      return tours;
    } catch (error) {
      console.error("Get User Tours Error:", error);
      throw error;
    }
  }
}

// Booking Service
export class BookingFirebaseService {
  static async createBooking(bookingData: any) {
    try {
      const bookingId = await FirestoreService.create("bookings", {
        ...bookingData,
        status: "pending",
        userId: auth.currentUser?.uid,
      });
      return bookingId;
    } catch (error) {
      console.error("Create Booking Error:", error);
      throw error;
    }
  }

  static async getUserBookings(userId: string) {
    try {
      const bookings = await FirestoreService.query("bookings", [
        { field: "userId", operator: "==", value: userId },
        { orderBy: "createdAt", orderDirection: "desc" },
      ]);
      return bookings;
    } catch (error) {
      console.error("Get User Bookings Error:", error);
      throw error;
    }
  }

  static async updateBookingStatus(bookingId: string, status: string) {
    try {
      await FirestoreService.update("bookings", bookingId, { status });
      return true;
    } catch (error) {
      console.error("Update Booking Status Error:", error);
      throw error;
    }
  }
}

// Review Service
export class ReviewFirebaseService {
  static async createReview(reviewData: any) {
    try {
      const reviewId = await FirestoreService.create("reviews", {
        ...reviewData,
        userId: auth.currentUser?.uid,
      });
      return reviewId;
    } catch (error) {
      console.error("Create Review Error:", error);
      throw error;
    }
  }

  static async getTourReviews(tourId: string) {
    try {
      const reviews = await FirestoreService.query("reviews", [
        { field: "tourId", operator: "==", value: tourId },
        { orderBy: "createdAt", orderDirection: "desc" },
      ]);
      return reviews;
    } catch (error) {
      console.error("Get Tour Reviews Error:", error);
      throw error;
    }
  }
}
