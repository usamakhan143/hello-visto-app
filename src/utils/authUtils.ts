import { Alert } from "react-native";
import { AuthService } from "../services/firebase";

// Helper function to handle logout with confirmation
export const handleLogout = async (navigation: any) => {
  Alert.alert("Logout", "Are you sure you want to logout?", [
    {
      text: "Cancel",
      style: "cancel",
    },
    {
      text: "Logout",
      style: "destructive",
      onPress: async () => {
        try {
          await AuthService.signOut();
          // AuthContext will automatically handle navigation to auth screens
        } catch (error: any) {
          Alert.alert("Error", error.message || "Failed to logout");
        }
      },
    },
  ]);
};

// Helper function to check if user has required role
export const checkUserRole = (
  userRole: string | undefined,
  requiredRole: string,
): boolean => {
  return userRole === requiredRole;
};

// Helper function to get user display name
export const getUserDisplayName = (user: any): string => {
  return user?.displayName || user?.email?.split("@")[0] || "User";
};

// Helper function to format Firebase auth errors
export const formatAuthError = (error: any): string => {
  const errorCode = error?.code || "";

  switch (errorCode) {
    case "auth/invalid-email":
      return "Please enter a valid email address";
    case "auth/user-disabled":
      return "This account has been disabled";
    case "auth/user-not-found":
      return "No account found with this email";
    case "auth/wrong-password":
      return "Incorrect password";
    case "auth/email-already-in-use":
      return "An account with this email already exists";
    case "auth/weak-password":
      return "Password should be at least 6 characters";
    case "auth/network-request-failed":
      return "Network error. Please check your connection";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later";
    default:
      return error?.message || "An error occurred. Please try again";
  }
};
