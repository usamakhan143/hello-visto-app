import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import {
  COLORS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SPACING,
  RADIUS,
} from "../../constants";

interface MyBookingsScreenProps {
  navigation: any;
}

const mockBookings = [
  {
    id: "1",
    tourTitle: "Swiss Alps Adventure",
    startDate: "2024-03-15",
    endDate: "2024-03-22",
    guests: 2,
    status: "confirmed",
    totalAmount: 2746,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    bookingReference: "VA-001234",
  },
  {
    id: "2",
    tourTitle: "Maldives Paradise",
    startDate: "2024-04-10",
    endDate: "2024-04-15",
    guests: 2,
    status: "pending",
    totalAmount: 4547,
    image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=400",
    bookingReference: "VA-001235",
  },
  {
    id: "3",
    tourTitle: "Tokyo Cultural Tour",
    startDate: "2024-02-20",
    endDate: "2024-02-25",
    guests: 1,
    status: "completed",
    totalAmount: 1847,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400",
    bookingReference: "VA-001230",
  },
];

const statusConfig = {
  confirmed: {
    color: COLORS.success,
    icon: "checkmark-circle",
    label: "Confirmed",
  },
  pending: { color: COLORS.warning, icon: "time", label: "Pending" },
  completed: {
    color: COLORS.info,
    icon: "checkmark-done-circle",
    label: "Completed",
  },
  cancelled: { color: COLORS.error, icon: "close-circle", label: "Cancelled" },
};

export default function MyBookingsScreen({
  navigation,
}: MyBookingsScreenProps) {
  const [bookings, setBookings] = useState(mockBookings);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const filteredBookings =
    selectedTab === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === selectedTab);

  const tabs = [
    { id: "all", label: "All Bookings" },
    { id: "confirmed", label: "Upcoming" },
    { id: "completed", label: "Completed" },
  ];

  const renderTab = (tab: any) => (
    <TouchableOpacity
      key={tab.id}
      style={[styles.tab, selectedTab === tab.id && styles.activeTab]}
      onPress={() => setSelectedTab(tab.id)}
    >
      <Text
        style={[styles.tabText, selectedTab === tab.id && styles.activeTabText]}
      >
        {tab.label}
      </Text>
    </TouchableOpacity>
  );

  const renderBooking = ({ item }: { item: any }) => {
    const statusInfo = statusConfig[item.status as keyof typeof statusConfig];

    return (
      <Card variant="elevated" style={styles.bookingCard}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("BookingDetails", { booking: item })
          }
          activeOpacity={0.8}
        >
          {/* Header */}
          <View style={styles.bookingHeader}>
            <View style={styles.bookingInfo}>
              <Text style={styles.bookingTitle}>{item.tourTitle}</Text>
              <Text style={styles.bookingReference}>
                #{item.bookingReference}
              </Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: `${statusInfo.color}15` },
              ]}
            >
              <Ionicons
                name={statusInfo.icon}
                size={16}
                color={statusInfo.color}
              />
              <Text style={[styles.statusText, { color: statusInfo.color }]}>
                {statusInfo.label}
              </Text>
            </View>
          </View>

          {/* Details */}
          <View style={styles.bookingDetails}>
            <View style={styles.detailRow}>
              <Ionicons
                name="calendar-outline"
                size={16}
                color={COLORS.textSecondary}
              />
              <Text style={styles.detailText}>
                {new Date(item.startDate).toLocaleDateString()} -{" "}
                {new Date(item.endDate).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons
                name="people-outline"
                size={16}
                color={COLORS.textSecondary}
              />
              <Text style={styles.detailText}>{item.guests} guests</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons
                name="card-outline"
                size={16}
                color={COLORS.textSecondary}
              />
              <Text style={styles.detailText}>${item.totalAmount}</Text>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.bookingActions}>
            {item.status === "confirmed" && (
              <>
                <Button
                  title="View Details"
                  variant="outline"
                  size="sm"
                  onPress={() =>
                    navigation.navigate("BookingDetails", { booking: item })
                  }
                  style={styles.actionButton}
                />
                <Button
                  title="Manage"
                  variant="primary"
                  size="sm"
                  onPress={() =>
                    navigation.navigate("ManageBooking", { booking: item })
                  }
                  style={styles.actionButton}
                />
              </>
            )}
            {item.status === "completed" && (
              <>
                <Button
                  title="View Details"
                  variant="outline"
                  size="sm"
                  onPress={() =>
                    navigation.navigate("BookingDetails", { booking: item })
                  }
                  style={styles.actionButton}
                />
                <Button
                  title="Leave Review"
                  variant="primary"
                  size="sm"
                  onPress={() =>
                    navigation.navigate("GiveReviews", {
                      tour: {
                        id: item.id,
                        title: item.tourTitle,
                        image: item.image,
                        completedDate: item.endDate,
                      },
                    })
                  }
                  style={styles.actionButton}
                />
              </>
            )}
            {item.status === "pending" && (
              <Button
                title="View Details"
                variant="outline"
                size="sm"
                onPress={() =>
                  navigation.navigate("BookingDetails", { booking: item })
                }
                style={styles.fullWidthButton}
              />
            )}
          </View>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons
            name="search-outline"
            size={24}
            color={COLORS.textPrimary}
          />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>{tabs.map(renderTab)}</View>

      {/* Bookings List */}
      <FlatList
        data={filteredBookings}
        renderItem={renderBooking}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons
                name="calendar-outline"
                size={64}
                color={COLORS.gray400}
              />
            </View>
            <Text style={styles.emptyTitle}>No bookings found</Text>
            <Text style={styles.emptyMessage}>
              Start exploring amazing destinations and book your first tour!
            </Text>
            <Button
              title="Explore Tours"
              variant="primary"
              size="md"
              onPress={() => navigation.navigate("CustomerMain")}
              icon="compass-outline"
              style={styles.exploreButton}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.base,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.base,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHTS.medium,
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  listContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  bookingCard: {
    marginBottom: SPACING.base,
  },
  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SPACING.base,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  bookingReference: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    fontFamily: "monospace",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.md,
    gap: SPACING.xs,
  },
  statusText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  bookingDetails: {
    gap: SPACING.sm,
    marginBottom: SPACING.base,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  detailText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  bookingActions: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  actionButton: {
    flex: 1,
  },
  fullWidthButton: {
    flex: 1,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING["3xl"],
    paddingHorizontal: SPACING.xl,
  },
  emptyIcon: {
    marginBottom: SPACING.lg,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  emptyMessage: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: FONT_SIZES.sm * 1.5,
    marginBottom: SPACING.lg,
  },
  exploreButton: {
    paddingHorizontal: SPACING.xl,
  },
});
