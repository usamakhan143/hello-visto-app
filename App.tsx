import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, ActivityIndicator } from "react-native";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import SplashScreen from "./src/screens/shared/SplashScreen";
import PremiumOnboardingScreen from "./src/screens/auth/PremiumOnboardingScreen";
import ModernLoginScreen from "./src/screens/auth/ModernLoginScreen";
import ModernSignUpScreen from "./src/screens/auth/ModernSignUpScreen";
import ForgotPasswordScreen from "./src/screens/auth/ForgotPasswordScreen";
import GiveReviewsScreen from "./src/screens/customer/GiveReviewsScreen";
import ReviewsScreen from "./src/screens/shared/ReviewsScreen";
import VendorProfileScreen from "./src/screens/shared/VendorProfileScreen";
import AddTourScreen from "./src/screens/vendor/AddTourScreen";
import EnhancedDashboardScreen from "./src/screens/customer/EnhancedDashboardScreen";
import {
  VendorBottomTabs,
  CustomerBottomTabs,
} from "./src/navigation/BottomTabNavigator";
import ModernSearchScreen from "./src/screens/customer/ModernSearchScreen";
import TourDetailsScreen from "./src/screens/customer/TourDetailsScreen";
import BookingScreen from "./src/screens/customer/BookingScreen";
import MyBookingsScreen from "./src/screens/customer/MyBookingsScreen";
import ProfileScreen from "./src/screens/customer/ProfileScreen";
import ModernNotificationsScreen from "./src/screens/shared/ModernNotificationsScreen";
import { loadFonts } from "./src/utils/loadFonts";
import { COLORS } from "./src/constants";

const Stack = createStackNavigator();

function AppNavigator() {
  const { user, userProfile, loading } = useAuth();

  // Debug: Log current auth state
  console.log("App - User:", user?.email);
  console.log("App - UserProfile:", userProfile);
  console.log("App - UserType:", userProfile?.userType);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadAppFonts = async () => {
      try {
        await loadFonts();
        setFontsLoaded(true);
      } catch (error) {
        console.warn("Error loading fonts:", error);
        setFontsLoaded(true); // Continue with system fonts
      }
    };

    loadAppFonts();
  }, []);

  if (!fontsLoaded || loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.background,
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          // Unauthenticated stack
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen
              name="Onboarding"
              component={PremiumOnboardingScreen}
            />
            <Stack.Screen name="Login" component={ModernLoginScreen} />
            <Stack.Screen name="SignUp" component={ModernSignUpScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
          </>
        ) : (
          // Authenticated stack based on user role
          <>
            {userProfile?.userType === "vendor" && (
              <>
                {console.log("App - Rendering VendorMain")}
                <Stack.Screen name="VendorMain" component={VendorBottomTabs} />
              </>
            )}
            {(userProfile?.userType === "customer" ||
              !userProfile?.userType) && (
              <>
                {console.log("App - Rendering CustomerMain")}
                <Stack.Screen
                  name="CustomerMain"
                  component={CustomerBottomTabs}
                />
              </>
            )}

            {/* Modal Screens */}
            <Stack.Screen
              name="Search"
              component={ModernSearchScreen}
              options={{
                presentation: "modal",
                animationTypeForReplace: "push",
              }}
            />
            <Stack.Screen
              name="TourDetails"
              component={TourDetailsScreen}
              options={{
                presentation: "card",
              }}
            />
            <Stack.Screen name="Booking" component={BookingScreen} />
            <Stack.Screen name="MyBookings" component={MyBookingsScreen} />
            <Stack.Screen name="GiveReviews" component={GiveReviewsScreen} />
            <Stack.Screen name="Reviews" component={ReviewsScreen} />
            <Stack.Screen
              name="VendorProfile"
              component={VendorProfileScreen}
              options={{
                cardStyle: { backgroundColor: "transparent" },
                cardOverlay: () => null,
                presentation: "transparentModal",
              }}
            />
            <Stack.Screen name="AddTour" component={AddTourScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen
              name="Notifications"
              component={ModernNotificationsScreen}
              options={{
                presentation: "modal",
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
