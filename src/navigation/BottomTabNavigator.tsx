import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { COLORS, SPACING, RADIUS, SHADOWS } from "../constants";
import { responsiveFont, responsiveSize } from "../utils/responsiveFont";

// Vendor Screens
import VendorDashboardScreen from "../screens/vendor/VendorDashboardScreen";
import ManageToursScreen from "../screens/vendor/ManageToursScreen";
import VendorBookingsScreen from "../screens/vendor/BookingsScreen";

// Customer Screens
import EnhancedDashboardScreen from "../screens/customer/EnhancedDashboardScreen";
import ModernSearchScreen from "../screens/customer/ModernSearchScreen";
import MyBookingsScreen from "../screens/customer/MyBookingsScreen";
import FavoritesScreen from "../screens/customer/FavoritesScreen";
import ProfileScreen from "../screens/customer/ProfileScreen";

// Shared Screens
import ModernNotificationsScreen from "../screens/shared/ModernNotificationsScreen";

const Tab = createBottomTabNavigator();

interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
  iconName: string;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({
  focused,
  color,
  iconName,
}) => {
  return (
    <View style={[styles.tabIconContainer, focused && styles.focusedTabIcon]}>
      <Ionicons
        name={iconName as any}
        size={responsiveSize(focused ? 26 : 24)}
        color={color}
      />
      {focused && <View style={styles.focusedIndicator} />}
    </View>
  );
};

const TabBarLabel: React.FC<{ focused: boolean; children: string }> = ({
  focused,
  children,
}) => (
  <Text
    style={[
      styles.tabLabel,
      { color: focused ? COLORS.primary : COLORS.textSecondary },
      focused && styles.focusedTabLabel,
    ]}
    maxFontSizeMultiplier={1.2}
  >
    {children}
  </Text>
);

export function VendorBottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName: string;

          switch (route.name) {
            case "Dashboard":
              iconName = focused ? "analytics" : "analytics-outline";
              break;
            case "Tours":
              iconName = focused ? "map" : "map-outline";
              break;
            case "Bookings":
              iconName = focused ? "calendar" : "calendar-outline";
              break;
            case "Notifications":
              iconName = focused ? "notifications" : "notifications-outline";
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;
            default:
              iconName = "home-outline";
          }

          return (
            <TabBarIcon
              focused={focused}
              color={color}
              size={24}
              iconName={iconName}
            />
          );
        },
        tabBarLabel: ({ focused, children }) => (
          <TabBarLabel focused={focused}>{children}</TabBarLabel>
        ),
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView
              intensity={100}
              style={StyleSheet.absoluteFill}
              tint="light"
            />
          ) : (
            <View style={styles.androidTabBarBackground} />
          ),
        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={VendorDashboardScreen}
        options={{ tabBarLabel: "Dashboard" }}
      />
      <Tab.Screen
        name="Tours"
        component={ManageToursScreen}
        options={{ tabBarLabel: "Tours" }}
      />
      <Tab.Screen
        name="Bookings"
        component={VendorBookingsScreen}
        options={{ tabBarLabel: "Bookings" }}
      />
      <Tab.Screen
        name="Notifications"
        component={ModernNotificationsScreen}
        options={{ tabBarLabel: "Alerts" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: "Profile" }}
      />
    </Tab.Navigator>
  );
}

export function CustomerBottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName: string;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Search":
              iconName = focused ? "search" : "search-outline";
              break;
            case "Bookings":
              iconName = focused ? "calendar" : "calendar-outline";
              break;
            case "Favorites":
              iconName = focused ? "heart" : "heart-outline";
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;
            default:
              iconName = "home-outline";
          }

          return (
            <TabBarIcon
              focused={focused}
              color={color}
              size={24}
              iconName={iconName}
            />
          );
        },
        tabBarLabel: ({ focused, children }) => (
          <TabBarLabel focused={focused}>{children}</TabBarLabel>
        ),
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView
              intensity={100}
              style={StyleSheet.absoluteFill}
              tint="light"
            />
          ) : (
            <View style={styles.androidTabBarBackground} />
          ),
        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen name="Home" component={EnhancedDashboardScreen} />
      <Tab.Screen name="Search" component={ModernSearchScreen} />
      <Tab.Screen name="Bookings" component={MyBookingsScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: responsiveSize(85),
    paddingBottom:
      Platform.OS === "ios" ? responsiveSize(20) : responsiveSize(10),
    paddingTop: responsiveSize(10),
    paddingHorizontal: SPACING.base,
    borderTopWidth: 0,
    elevation: 20,
    ...SHADOWS.lg,
  },
  androidTabBarBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.surface,
  },
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: responsiveSize(50),
    height: responsiveSize(35),
    borderRadius: RADIUS.md,
    marginBottom: responsiveSize(2),
  },
  focusedTabIcon: {
    backgroundColor: `${COLORS.primary}15`,
  },
  focusedIndicator: {
    position: "absolute",
    bottom: -responsiveSize(8),
    width: responsiveSize(20),
    height: responsiveSize(3),
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
  },
  tabLabel: {
    fontSize: responsiveFont(11),
    fontWeight: "500",
    textAlign: "center",
  },
  focusedTabLabel: {
    fontWeight: "600",
  },
});
