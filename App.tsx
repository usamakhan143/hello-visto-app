import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, ActivityIndicator } from "react-native";
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

const Stack = createStackNavigator();

export default function App() {
  // In a real app, this would come from authentication context
  const [userRole] = useState<"vendor" | "customer">("customer"); // Default to customer for demo
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

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={PremiumOnboardingScreen} />
        <Stack.Screen name="Login" component={ModernLoginScreen} />
        <Stack.Screen name="SignUp" component={ModernSignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

        {/* Main App Screens with Bottom Navigation */}
        <Stack.Screen name="VendorMain" component={VendorBottomTabs} />
        <Stack.Screen name="CustomerMain" component={CustomerBottomTabs} />

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
        <Stack.Screen name="VendorProfile" component={VendorProfileScreen} />
        <Stack.Screen name="AddTour" component={AddTourScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen
          name="Notifications"
          component={ModernNotificationsScreen}
          options={{
            presentation: "modal",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
