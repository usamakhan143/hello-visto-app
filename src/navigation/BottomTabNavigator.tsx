import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
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
  if (focused) {
    return (
      <View style={styles.tabIconContainer}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryLight || COLORS.accent]}
          style={styles.focusedTabIcon}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons
            name={iconName as any}
            size={responsiveSize(24)}
            color={COLORS.white}
          />
        </LinearGradient>
        <View style={styles.focusedGlow} />
      </View>
    );
  }

  return (
    <View style={styles.tabIconContainer}>
      <View style={styles.inactiveTabIcon}>
        <Ionicons
          name={iconName as any}
          size={responsiveSize(22)}
          color={color}
        />
      </View>
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
      {
        color: focused ? COLORS.primary : COLORS.textSecondary,
        fontWeight: focused ? "700" : "500",
        opacity: focused ? 1 : 0.7,
      },
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
        tabBarBackground: () => (
          <View style={styles.tabBarBackground}>
            <BlurView
              intensity={Platform.OS === "ios" ? 80 : 0}
              style={StyleSheet.absoluteFill}
              tint="light"
            />
            <LinearGradient
              colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.95)"]}
              style={StyleSheet.absoluteFill}
            />
          </View>
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
        tabBarBackground: () => (
          <View style={styles.tabBarBackground}>
            <BlurView
              intensity={Platform.OS === "ios" ? 80 : 0}
              style={StyleSheet.absoluteFill}
              tint="light"
            />
            <LinearGradient
              colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.95)"]}
              style={StyleSheet.absoluteFill}
            />
          </View>
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
    height: responsiveSize(90),
    paddingBottom:
      Platform.OS === "ios" ? responsiveSize(30) : responsiveSize(15),
    paddingTop: responsiveSize(8),
    paddingHorizontal: SPACING.base,
    borderTopWidth: 0,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...SHADOWS.xl,
  },
  tabBarBackground: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    borderBottomWidth: 0,
  },
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
    height: responsiveSize(65),
    paddingTop: responsiveSize(12),
  },
  focusedTabIcon: {
    width: responsiveSize(40),
    height: responsiveSize(40),
    borderRadius: responsiveSize(20),
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.md,
  },
  focusedGlow: {
    position: "absolute",
    top: responsiveSize(11),
    left: -1,
    right: -1,
    width: responsiveSize(42),
    height: responsiveSize(42),
    borderRadius: responsiveSize(22),
    backgroundColor: COLORS.primary,
    opacity: 0.08,
    zIndex: -1,
  },
  inactiveTabIcon: {
    width: responsiveSize(36),
    height: responsiveSize(36),
    borderRadius: responsiveSize(18),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  tabLabel: {
    fontSize: responsiveFont(9),
    textAlign: "center",
    position: "absolute",
    bottom: responsiveSize(3),
    left: 0,
    right: 0,
  },
});
