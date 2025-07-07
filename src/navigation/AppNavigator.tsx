import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import { ActivityIndicator, View } from "react-native";

// Auth Screens
import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import OnboardingScreen from "../screens/auth/OnboardingScreen";

// Customer Screens
import CustomerHomeScreen from "../screens/customer/HomeScreen";
import TourDetailsScreen from "../screens/customer/TourDetailsScreen";
import BookingScreen from "../screens/customer/BookingScreen";
import CustomerProfileScreen from "../screens/customer/ProfileScreen";
import SearchScreen from "../screens/customer/SearchScreen";

// Vendor Screens
import VendorDashboardScreen from "../screens/vendor/DashboardScreen";
import ManageToursScreen from "../screens/vendor/ManageToursScreen";
import AddTourScreen from "../screens/vendor/AddTourScreen";
import VendorBookingsScreen from "../screens/vendor/BookingsScreen";
import SubscriptionScreen from "../screens/vendor/SubscriptionScreen";

// Admin Screens
import AdminDashboardScreen from "../screens/admin/DashboardScreen";
import ManageVendorsScreen from "../screens/admin/ManageVendorsScreen";
import CommissionsScreen from "../screens/admin/CommissionsScreen";

// Shared Screens
import NotificationsScreen from "../screens/shared/NotificationsScreen";
import ReviewsScreen from "../screens/shared/ReviewsScreen";

import { COLORS } from "../constants";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Customer Tab Navigator
function CustomerTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Bookings") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={CustomerHomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Bookings" component={BookingScreen} />
      <Tab.Screen name="Profile" component={CustomerProfileScreen} />
    </Tab.Navigator>
  );
}

// Vendor Tab Navigator
function VendorTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "Dashboard") {
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          } else if (route.name === "Tours") {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === "Bookings") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={VendorDashboardScreen} />
      <Tab.Screen name="Tours" component={ManageToursScreen} />
      <Tab.Screen name="Bookings" component={VendorBookingsScreen} />
      <Tab.Screen name="Profile" component={CustomerProfileScreen} />
    </Tab.Navigator>
  );
}

// Admin Tab Navigator
function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "Dashboard") {
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          } else if (route.name === "Vendors") {
            iconName = focused ? "business" : "business-outline";
          } else if (route.name === "Commissions") {
            iconName = focused ? "card" : "card-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={AdminDashboardScreen} />
      <Tab.Screen name="Vendors" component={ManageVendorsScreen} />
      <Tab.Screen name="Commissions" component={CommissionsScreen} />
      <Tab.Screen name="Settings" component={CustomerProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user, userProfile, loading } = useAuth();

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ) : (
          // Authenticated stack based on user role
          <>
            {userProfile?.userType === "customer" && (
              <Stack.Screen name="CustomerMain" component={CustomerTabs} />
            )}
            {userProfile?.userType === "vendor" && (
              <Stack.Screen name="VendorMain" component={VendorTabs} />
            )}
            {userProfile?.userType === "admin" && (
              <Stack.Screen name="AdminMain" component={AdminTabs} />
            )}

            <Stack.Screen name="TourDetails" component={TourDetailsScreen} />
            <Stack.Screen name="AddTour" component={AddTourScreen} />
            <Stack.Screen name="Subscription" component={SubscriptionScreen} />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
            />
            <Stack.Screen name="Reviews" component={ReviewsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
