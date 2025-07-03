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
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import {
  COLORS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SPACING,
  RADIUS,
} from "../../constants";

interface NotificationsScreenProps {
  navigation: any;
}

const mockNotifications = [
  {
    id: "1",
    title: "Booking Confirmed",
    message:
      "Your Swiss Alps Adventure booking has been confirmed for March 15th.",
    type: "booking",
    time: "2 hours ago",
    read: false,
    icon: "checkmark-circle",
    color: COLORS.success,
  },
  {
    id: "2",
    title: "New Tour Available",
    message:
      "Discover the amazing Maldives Paradise tour with exclusive discounts.",
    type: "promotion",
    time: "1 day ago",
    read: true,
    icon: "gift",
    color: COLORS.primary,
  },
  {
    id: "3",
    title: "Payment Received",
    message: "Payment of $1,299 has been successfully processed.",
    type: "payment",
    time: "2 days ago",
    read: true,
    icon: "card",
    color: COLORS.info,
  },
];

export default function ModernNotificationsScreen({
  navigation,
}: NotificationsScreenProps) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true })),
    );
  };

  const renderNotification = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => markAsRead(item.id)}>
      <Card
        variant="elevated"
        style={[styles.notificationCard, !item.read && styles.unreadCard]}
      >
        <View style={styles.notificationContent}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${item.color}15` },
            ]}
          >
            <Ionicons name={item.icon} size={24} color={item.color} />
          </View>

          <View style={styles.textContent}>
            <View style={styles.notificationHeader}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              {!item.read && <View style={styles.unreadDot} />}
            </View>
            <Text style={styles.notificationMessage}>{item.message}</Text>
            <Text style={styles.notificationTime}>{item.time}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

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
        <Text style={styles.headerTitle}>Notifications</Text>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllAsRead}>
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Notifications Count */}
      {unreadCount > 0 && (
        <Card variant="flat" style={styles.countCard}>
          <Text style={styles.countText}>
            You have {unreadCount} unread notification
            {unreadCount > 1 ? "s" : ""}
          </Text>
        </Card>
      )}

      {/* Notifications List */}
      <FlatList
        data={notifications}
        renderItem={renderNotification}
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
                name="notifications-outline"
                size={64}
                color={COLORS.gray400}
              />
            </View>
            <Text style={styles.emptyTitle}>No notifications yet</Text>
            <Text style={styles.emptyMessage}>
              We'll notify you when there are updates about your bookings and
              new offers.
            </Text>
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
  markAllText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  countCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.base,
    backgroundColor: `${COLORS.primary}10`,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  countText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  listContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  notificationCard: {
    marginBottom: SPACING.base,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  notificationContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.base,
  },
  textContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  notificationTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.textPrimary,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
    marginLeft: SPACING.xs,
  },
  notificationMessage: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: FONT_SIZES.sm * 1.4,
    marginBottom: SPACING.xs,
  },
  notificationTime: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textTertiary,
    fontWeight: FONT_WEIGHTS.medium,
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
  },
});
