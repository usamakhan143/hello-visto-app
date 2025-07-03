import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/common/Header";
import Button from "../../components/common/Button";
import { COLORS, SIZES, FONTS } from "../../constants";

const { width } = Dimensions.get("window");

interface VendorDashboardScreenProps {
  navigation: any;
}

export default function VendorDashboardScreen({
  navigation,
}: VendorDashboardScreenProps) {
  const stats = [
    {
      title: "Total Tours",
      value: "12",
      icon: "map-outline",
      color: COLORS.primary,
    },
    {
      title: "Active Bookings",
      value: "34",
      icon: "calendar-outline",
      color: COLORS.secondary,
    },
    {
      title: "This Month Revenue",
      value: "$2,450",
      icon: "card-outline",
      color: COLORS.success,
    },
    {
      title: "Average Rating",
      value: "4.8",
      icon: "star-outline",
      color: COLORS.warning,
    },
  ];

  const recentBookings = [
    {
      id: "1",
      tourName: "Bali Cultural Adventure",
      customerName: "John Smith",
      date: "2024-01-15",
      amount: "$299",
      status: "confirmed",
    },
    {
      id: "2",
      tourName: "Tokyo Food Tour",
      customerName: "Sarah Johnson",
      date: "2024-01-16",
      amount: "$189",
      status: "pending",
    },
  ];

  const renderStatCard = (stat: any, index: number) => (
    <TouchableOpacity key={index} style={styles.statCard}>
      <LinearGradient
        colors={[stat.color, `${stat.color}90`]}
        style={styles.statGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons name={stat.icon} size={24} color={COLORS.surface} />
        <Text style={styles.statValue}>{stat.value}</Text>
        <Text style={styles.statTitle}>{stat.title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderBookingItem = (booking: any) => (
    <View key={booking.id} style={styles.bookingItem}>
      <View style={styles.bookingInfo}>
        <Text style={styles.bookingTour}>{booking.tourName}</Text>
        <Text style={styles.bookingCustomer}>by {booking.customerName}</Text>
        <Text style={styles.bookingDate}>{booking.date}</Text>
      </View>
      <View style={styles.bookingRight}>
        <Text style={styles.bookingAmount}>{booking.amount}</Text>
        <View
          style={[
            styles.statusBadge,
            booking.status === "confirmed"
              ? styles.confirmedBadge
              : styles.pendingBadge,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              booking.status === "confirmed"
                ? styles.confirmedText
                : styles.pendingText,
            ]}
          >
            {booking.status}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Vendor Dashboard"
        rightIcon="notifications-outline"
        onRightPress={() => navigation.navigate("Notifications")}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.accent]}
          style={styles.welcomeSection}
        >
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.businessName}>Amazing Tours Co.</Text>
          <Text style={styles.subscriptionInfo}>
            Premium Plan • 38/50 tours used
          </Text>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate("AddTour")}
            >
              <Ionicons name="add-circle" size={32} color={COLORS.primary} />
              <Text style={styles.actionText}>Add Tour</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate("Tours")}
            >
              <Ionicons name="list-circle" size={32} color={COLORS.secondary} />
              <Text style={styles.actionText}>Manage Tours</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate("Subscription")}
            >
              <Ionicons name="card" size={32} color={COLORS.warning} />
              <Text style={styles.actionText}>Subscription</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Analytics</Text>
          <View style={styles.statsGrid}>{stats.map(renderStatCard)}</View>
        </View>

        {/* Recent Bookings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Bookings</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Bookings")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bookingsList}>
            {recentBookings.map(renderBookingItem)}
          </View>
        </View>

        {/* Subscription Status */}
        <View style={styles.section}>
          <View style={styles.subscriptionCard}>
            <View style={styles.subscriptionHeader}>
              <Ionicons name="star" size={24} color={COLORS.warning} />
              <Text style={styles.subscriptionTitle}>Premium Plan</Text>
            </View>
            <Text style={styles.subscriptionDescription}>
              You have 12 tours remaining in your current plan.
            </Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progress, { width: "76%" }]} />
              </View>
              <Text style={styles.progressText}>38/50 tours</Text>
            </View>
            <Button
              title="Upgrade Plan"
              variant="outline"
              size="small"
              onPress={() => navigation.navigate("Subscription")}
              style={styles.upgradeButton}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  welcomeSection: {
    padding: SIZES.padding * 2,
    marginHorizontal: SIZES.padding,
    marginVertical: SIZES.padding,
    borderRadius: SIZES.radius * 2,
  },
  welcomeText: {
    fontSize: 16,
    color: COLORS.surface,
    opacity: 0.9,
  },
  businessName: {
    fontSize: 24,
    // fontFamily: FONTS.bold,
    fontWeight: "700",
    color: COLORS.surface,
    marginVertical: 4,
  },
  subscriptionInfo: {
    fontSize: 14,
    color: COLORS.surface,
    opacity: 0.8,
  },
  section: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.padding,
  },
  sectionTitle: {
    fontSize: 20,
    // fontFamily: FONTS.bold,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  seeAllText: {
    fontSize: 14,
    color: COLORS.primary,
    // fontFamily: FONTS.medium,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionButton: {
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    elevation: 2,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    minWidth: 80,
  },
  actionText: {
    fontSize: 12,
    color: COLORS.text,
    marginTop: 8,
    textAlign: "center",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    width: (width - SIZES.padding * 3) / 2,
    marginBottom: SIZES.padding,
    borderRadius: SIZES.radius * 2,
    overflow: "hidden",
    elevation: 4,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statGradient: {
    padding: SIZES.padding * 1.5,
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    // fontFamily: FONTS.bold,
    fontWeight: "700",
    color: COLORS.surface,
    marginVertical: 8,
  },
  statTitle: {
    fontSize: 12,
    color: COLORS.surface,
    textAlign: "center",
  },
  bookingsList: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    overflow: "hidden",
  },
  bookingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingTour: {
    fontSize: 16,
    // fontFamily: FONTS.medium,
    fontWeight: "600",
    color: COLORS.text,
  },
  bookingCustomer: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginVertical: 2,
  },
  bookingDate: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  bookingRight: {
    alignItems: "flex-end",
  },
  bookingAmount: {
    fontSize: 16,
    // fontFamily: FONTS.bold,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  confirmedBadge: {
    backgroundColor: `${COLORS.success}20`,
  },
  pendingBadge: {
    backgroundColor: `${COLORS.warning}20`,
  },
  statusText: {
    fontSize: 10,
    // fontFamily: FONTS.medium,
    textTransform: "uppercase",
  },
  confirmedText: {
    color: COLORS.success,
  },
  pendingText: {
    color: COLORS.warning,
  },
  subscriptionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius * 2,
    padding: SIZES.padding * 1.5,
    elevation: 2,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  subscriptionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.padding,
  },
  subscriptionTitle: {
    fontSize: 18,
    // fontFamily: FONTS.bold,
    fontWeight: "600",
    color: COLORS.text,
    marginLeft: 8,
  },
  subscriptionDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SIZES.padding,
  },
  progressContainer: {
    marginBottom: SIZES.padding,
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    marginBottom: 4,
  },
  progress: {
    height: "100%",
    backgroundColor: COLORS.warning,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: "right",
  },
  upgradeButton: {
    alignSelf: "flex-start",
  },
});
