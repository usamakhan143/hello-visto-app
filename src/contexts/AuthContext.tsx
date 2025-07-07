import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { getUserProfile, UserProfile } from "../services/authService";
import { AuthService, FirestoreService } from "../services/firebase";

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isVendor: boolean;
  isCustomer: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  isVendor: false,
  isCustomer: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setUser(user);

        if (user) {
          // Get user profile from Firestore using new service
          try {
            const profile = await getUserProfile(user.uid);
            console.log("AuthContext - Profile from authService:", profile);
            setUserProfile(profile);
          } catch (error) {
            console.error("Error fetching user profile:", error);
            // Fallback to FirestoreService if authService fails
            try {
              const userData = await FirestoreService.read("users", user.uid);
              console.log(
                "AuthContext - Profile from FirestoreService:",
                userData,
              );
              if (userData) {
                setUserProfile(userData as UserProfile);
              }
            } catch (fallbackError) {
              console.error("Fallback profile fetch failed:", fallbackError);
              setUserProfile(null);
            }
          }
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const isVendor = userProfile?.userType === "vendor";
  const isCustomer = userProfile?.userType === "customer";

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    isVendor,
    isCustomer,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
