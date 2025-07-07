import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  userType: "customer" | "vendor";
  phoneNumber?: string;
  profileImage?: string;
  createdAt: Date;
  businessName?: string; // For vendors
  businessDescription?: string; // For vendors
}

// Sign up with email and password
export const signUpWithEmail = async (
  email: string,
  password: string,
  displayName: string,
  userType: "customer" | "vendor",
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    // Update user profile
    await updateProfile(user, { displayName });

    // Create user document in Firestore
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      displayName,
      userType,
      createdAt: new Date(),
    };

    await setDoc(doc(db, "users", user.uid), userProfile);

    return { user, userProfile };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    // Get user profile from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userProfile = userDoc.data() as UserProfile;

    return { user, userProfile };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Reset password
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get user profile
export const getUserProfile = async (
  uid: string,
): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Update user profile
export const updateUserProfile = async (
  uid: string,
  updates: Partial<UserProfile>,
) => {
  try {
    await setDoc(doc(db, "users", uid), updates, { merge: true });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
