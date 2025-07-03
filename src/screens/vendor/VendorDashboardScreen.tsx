import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl,
  StatusBar,
  Animated,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Logo from "../../components/common/Logo";
import {
  COLORS,
  FONTS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SPACING,
  RADIUS,
  SHADOWS,
  ACCESSIBLE_TEXT_PROPS,
} from "../../constants";
import {
  responsiveFont,
  responsiveSize,
  responsiveSpacing,
  accessibleFont,
} from "../../utils/responsiveFont";

const { width } = Dimensions.get("window");

interface VendorDashboardProps {
  navigation: any;
}

export default function VendorDashboardScreen({
  navigation,
}: VendorDashboardProps) {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case "1":
        navigation.navigate("AddTour");
        break;
      case "2":
        navigation.navigate("Bookings");
        break;
      case "3":
        // View Analytics - could show modal or navigate to analytics screen
        break;
      case "4":
        // Customer Chat - navigate to chat screen
        break;
      case "5":
        navigation.navigate("Reviews");
        break;
      default:
        break;
    }
  };

  const analyticsData = {
    totalRevenue: 45600,
    totalBookings: 127,
    activeTours: 8,
    avgRating: 4.8,
    weeklyGrowth: 12.5,
    monthlyBookings: [
      { month: "Jan", bookings: 45 },
      { month: "Feb", bookings: 52 },
      { month: "Mar", bookings: 38 },
      { month: "Apr", bookings: 67 },
      { month: "May", bookings: 58 },
      { month: "Jun", bookings: 72 },
    ],
  };

  const recentBookings = [
    {
      id: "1",
      tourName: "Swiss Alps Luxury Retreat",
      customerName: "Sarah Johnson",
      amount: 2899,
      status: "confirmed",
      date: "2024-01-15",
      customerImage:
        "https://images.unsplash.com/photo-1494790108755-2616b612b524?w=50&h=50&fit=crop&crop=face",
    },
    {
      id: "2",
      tourName: "Tokyo Cultural Experience",
      customerName: "Mike Chen",
      amount: 1899,
      status: "pending",
      date: "2024-01-14",
      customerImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    },
    {
      id: "3",
      tourName: "Maldives Paradise",
      customerName: "Emily Davis",
      amount: 4199,
      status: "confirmed",
      date: "2024-01-13",
      customerImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    },
  ];

  const quickActions = [
    {
      id: "1",
      title: "Add New Tour",
      icon: "add-circle",
      color: COLORS.primary,
      gradient: COLORS.primaryGradient,
      description: "Create amazing experiences",
    },
    {
      id: "2",
      title: "Manage Bookings",
      icon: "calendar",
      color: COLORS.secondary,
      gradient: [COLORS.secondary, COLORS.secondaryLight],
      description: "Handle reservations",
    },
    {
      id: "3",
      title: "View Analytics",
      icon: "analytics",
      color: COLORS.accent,
      gradient: [COLORS.accent, COLORS.accentLight],
      description: "Track performance",
    },
    {
      id: "4",
      title: "Customer Chat",
      icon: "chatbubbles",
      color: COLORS.success,
      gradient: [COLORS.success, COLORS.successLight],
      description: "Connect with travelers",
    },
    {
      id: "5",
      title: "My Reviews",
      icon: "star",
      color: COLORS.warning,
      gradient: [COLORS.warning, COLORS.warningLight],
      description: "Manage customer reviews",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return COLORS.success;
      case "pending":
        return COLORS.warning;
      case "cancelled":
        return COLORS.error;
      default:
        return COLORS.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return "checkmark-circle";
      case "pending":
        return "time";
      case "cancelled":
        return "close-circle";
      default:
        return "help-circle";
    }
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.8],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />

      <Animated.View
        style={[styles.floatingHeader, { opacity: headerOpacity }]}
      >
        <LinearGradient
          colors={COLORS.primaryGradient}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <SafeAreaView style={styles.headerContent}>
            <View style={styles.headerTop}>
              <View style={styles.vendorInfo}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                    }}
                    style={styles.vendorAvatar}
                  />
                  <View style={styles.onlineIndicator} />
                </View>
                <View style={styles.vendorDetails}>
                  <Text
                    style={styles.vendorGreeting}
                    {...ACCESSIBLE_TEXT_PROPS.sm}
                  >
                    Welcome back
                  </Text>
                  <Text style={styles.vendorName} {...ACCESSIBLE_TEXT_PROPS.xl}>
                    Ahmed's Tours
                  </Text>
                  <View style={styles.vendorBadge}>
                    <Ionicons name="diamond" size={12} color={COLORS.warning} />
                    <Text
                      style={styles.vendorLevel}
                      {...ACCESSIBLE_TEXT_PROPS.xs}
                    >
                      Premium Vendor
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.headerActions}>
                <TouchableOpacity style={styles.headerButton}>
                  <Ionicons
                    name="notifications"
                    size={responsiveSize(24)}
                    color={COLORS.white}
                  />
                  <View style={styles.notificationDot} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerButton}>
                  <Ionicons
                    name="settings"
                    size={responsiveSize(24)}
                    color={COLORS.white}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.logoSection}>
              <Logo size="medium" showText={true} variant="white" />
            </View>
          </SafeAreaView>
        </LinearGradient>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        style={{ opacity: fadeAnim }}
      >
        <View style={styles.spacer} />

        {/* Premium Analytics Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle} {...ACCESSIBLE_TEXT_PROPS.xl}>
            Performance Overview
          </Text>

          <View style={styles.periodSelector}>
            {["week", "month", "year"].map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.periodButton,
                  selectedPeriod === period && styles.selectedPeriodButton,
                ]}
                onPress={() => setSelectedPeriod(period)}
              >
                <Text
                  style={[
                    styles.periodText,
                    selectedPeriod === period && styles.selectedPeriodText,
                  ]}
                  {...ACCESSIBLE_TEXT_PROPS.sm}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.analyticsGrid}>
            <Card variant="elevated" style={styles.premiumAnalyticsCard}>
              <LinearGradient
                colors={[COLORS.success, COLORS.successLight]}
                style={styles.analyticsGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.cardHeader}>
                  <Ionicons
                    name="trending-up"
                    size={responsiveSize(32)}
                    color={COLORS.white}
                  />
                  <View style={styles.trendBadge}>
                    <Text
                      style={styles.trendText}
                      {...ACCESSIBLE_TEXT_PROPS.xs}
                    >
                      +{analyticsData.weeklyGrowth}%
                    </Text>
                  </View>
                </View>
                <Text
                  style={styles.analyticsValue}
                  {...ACCESSIBLE_TEXT_PROPS["2xl"]}
                >
                  ${analyticsData.totalRevenue.toLocaleString()}
                </Text>
                <Text
                  style={styles.analyticsLabel}
                  {...ACCESSIBLE_TEXT_PROPS.sm}
                >
                  Total Revenue
                </Text>
                <Text
                  style={styles.analyticsSubtext}
                  {...ACCESSIBLE_TEXT_PROPS.xs}
                >
                  This month: $12,450
                </Text>
              </LinearGradient>
            </Card>

            <Card variant="elevated" style={styles.premiumAnalyticsCard}>
              <LinearGradient
                colors={COLORS.primaryGradient}
                style={styles.analyticsGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.cardHeader}>
                  <Ionicons
                    name="calendar"
                    size={responsiveSize(32)}
                    color={COLORS.white}
                  />
                  <View style={styles.trendBadge}>
                    <Text
                      style={styles.trendText}
                      {...ACCESSIBLE_TEXT_PROPS.xs}
                    >
                      +8
                    </Text>
                  </View>
                </View>
                <Text
                  style={styles.analyticsValue}
                  {...ACCESSIBLE_TEXT_PROPS["2xl"]}
                >
                  {analyticsData.totalBookings}
                </Text>
                <Text
                  style={styles.analyticsLabel}
                  {...ACCESSIBLE_TEXT_PROPS.sm}
                >
                  Total Bookings
                </Text>
                <Text
                  style={styles.analyticsSubtext}
                  {...ACCESSIBLE_TEXT_PROPS.xs}
                >
                  This week: 23 bookings
                </Text>
              </LinearGradient>
            </Card>

            <Card variant="elevated" style={styles.premiumAnalyticsCard}>
              <LinearGradient
                colors={[COLORS.secondary, COLORS.secondaryLight]}
                style={styles.analyticsGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.cardHeader}>
                  <Ionicons
                    name="location"
                    size={responsiveSize(32)}
                    color={COLORS.white}
                  />
                  <View style={styles.trendBadge}>
                    <Text
                      style={styles.trendText}
                      {...ACCESSIBLE_TEXT_PROPS.xs}
                    >
                      +2
                    </Text>
                  </View>
                </View>
                <Text
                  style={styles.analyticsValue}
                  {...ACCESSIBLE_TEXT_PROPS["2xl"]}
                >
                  {analyticsData.activeTours}
                </Text>
                <Text
                  style={styles.analyticsLabel}
                  {...ACCESSIBLE_TEXT_PROPS.sm}
                >
                  Active Tours
                </Text>
                <Text
                  style={styles.analyticsSubtext}
                  {...ACCESSIBLE_TEXT_PROPS.xs}
                >
                  2 pending approval
                </Text>
              </LinearGradient>
            </Card>

            <Card variant="elevated" style={styles.premiumAnalyticsCard}>
              <LinearGradient
                colors={[COLORS.accent, COLORS.accentLight]}
                style={styles.analyticsGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.cardHeader}>
                  <Ionicons
                    name="star"
                    size={responsiveSize(32)}
                    color={COLORS.white}
                  />
                  <View style={styles.trendBadge}>
                    <Text
                      style={styles.trendText}
                      {...ACCESSIBLE_TEXT_PROPS.xs}
                    >
                      +0.2
                    </Text>
                  </View>
                </View>
                <Text
                  style={styles.analyticsValue}
                  {...ACCESSIBLE_TEXT_PROPS["2xl"]}
                >
                  {analyticsData.avgRating}
                </Text>
                <Text
                  style={styles.analyticsLabel}
                  {...ACCESSIBLE_TEXT_PROPS.sm}
                >
                  Avg Rating
                </Text>
                <Text
                  style={styles.analyticsSubtext}
                  {...ACCESSIBLE_TEXT_PROPS.xs}
                >
                  Based on 145 reviews
                </Text>
              </LinearGradient>
            </Card>
          </View>
        </View>

        {/* Enhanced Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle} {...ACCESSIBLE_TEXT_PROPS.xl}>
            Quick Actions
          </Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickActionCard}
                activeOpacity={0.8}
                onPress={() => handleQuickAction(action.id)}
              >
                <LinearGradient
                  colors={action.gradient}
                  style={styles.quickActionGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.quickActionContent}>
                    <Ionicons
                      name={action.icon as any}
                      size={responsiveSize(28)}
                      color={COLORS.white}
                    />
                    <Text
                      style={styles.quickActionTitle}
                      {...ACCESSIBLE_TEXT_PROPS.md}
                    >
                      {action.title}
                    </Text>
                    <Text
                      style={styles.quickActionDescription}
                      {...ACCESSIBLE_TEXT_PROPS.xs}
                    >
                      {action.description}
                    </Text>
                  </View>
                  <View style={styles.quickActionArrow}>
                    <Ionicons
                      name="arrow-forward"
                      size={responsiveSize(16)}
                      color={COLORS.white}
                    />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Enhanced Recent Bookings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle} {...ACCESSIBLE_TEXT_PROPS.xl}>
              Recent Bookings
            </Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText} {...ACCESSIBLE_TEXT_PROPS.sm}>
                View All
              </Text>
              <Ionicons name="arrow-forward" size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {recentBookings.map((booking, index) => (
            <Card
              key={booking.id}
              variant="elevated"
              style={[
                styles.bookingCard,
                { marginBottom: responsiveSpacing(12) },
              ]}
            >
              <View style={styles.bookingContent}>
                <View style={styles.bookingLeft}>
                  <Image
                    source={{ uri: booking.customerImage }}
                    style={styles.customerAvatar}
                  />
                  <View style={styles.bookingInfo}>
                    <Text
                      style={styles.bookingTour}
                      {...ACCESSIBLE_TEXT_PROPS.base}
                    >
                      {booking.tourName}
                    </Text>
                    <Text
                      style={styles.bookingCustomer}
                      {...ACCESSIBLE_TEXT_PROPS.sm}
                    >
                      by {booking.customerName}
                    </Text>
                    <Text
                      style={styles.bookingDate}
                      {...ACCESSIBLE_TEXT_PROPS.xs}
                    >
                      {booking.date}
                    </Text>
                  </View>
                </View>
                <View style={styles.bookingRight}>
                  <Text style={styles.amount} {...ACCESSIBLE_TEXT_PROPS.lg}>
                    ${booking.amount}
                  </Text>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor: `${getStatusColor(booking.status)}15`,
                        borderColor: getStatusColor(booking.status),
                      },
                    ]}
                  >
                    <Ionicons
                      name={getStatusIcon(booking.status)}
                      size={12}
                      color={getStatusColor(booking.status)}
                    />
                    <Text
                      style={[
                        styles.statusText,
                        { color: getStatusColor(booking.status) },
                      ]}
                      {...ACCESSIBLE_TEXT_PROPS.xs}
                    >
                      {booking.status}
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          ))}
        </View>

        {/* Premium Performance Card */}
        <Card variant="elevated" style={styles.premiumPerformanceCard}>
          <LinearGradient
            colors={COLORS.primaryGradient}
            style={styles.performanceGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.performanceHeader}>
              <Ionicons
                name="rocket"
                size={responsiveSize(40)}
                color={COLORS.white}
              />
              <View style={styles.performanceStats}>
                <Text
                  style={styles.performanceNumber}
                  {...ACCESSIBLE_TEXT_PROPS["3xl"]}
                >
                  85%
                </Text>
                <Text
                  style={styles.performanceMetric}
                  {...ACCESSIBLE_TEXT_PROPS.sm}
                >
                  Success Rate
                </Text>
              </View>
            </View>
            <Text style={styles.performanceTitle} {...ACCESSIBLE_TEXT_PROPS.xl}>
              Boost Your Performance
            </Text>
            <Text
              style={styles.performanceDescription}
              {...ACCESSIBLE_TEXT_PROPS.base}
            >
              Get personalized insights and recommendations to increase your
              bookings and revenue
            </Text>
            <Button
              title="View Recommendations"
              variant="secondary"
              size="md"
              icon="arrow-forward"
              iconPosition="right"
              style={styles.performanceButton}
            />
          </LinearGradient>
        </Card>

        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  floatingHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  headerGradient: {
    paddingBottom: responsiveSpacing(24),
  },
  headerContent: {
    paddingHorizontal: responsiveSpacing(20),
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: responsiveSpacing(16),
    marginTop: responsiveSpacing(8),
  },
  vendorInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarContainer: {
    position: "relative",
    marginRight: responsiveSpacing(12),
  },
  vendorAvatar: {
    width: responsiveSize(65),
    height: responsiveSize(65),
    borderRadius: responsiveSize(32.5),
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: responsiveSize(16),
    height: responsiveSize(16),
    borderRadius: responsiveSize(8),
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  vendorDetails: {
    flex: 1,
  },
  vendorGreeting: {
    fontSize: responsiveFont(FONT_SIZES.sm),
    // fontFamily: FONTS.medium,
    color: COLORS.white,
    opacity: 0.9,
    fontWeight: FONT_WEIGHTS.medium,
  },
  vendorName: {
    fontSize: responsiveFont(FONT_SIZES.xl),
    // fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    marginBottom: responsiveSpacing(6),
  },
  vendorBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: responsiveSpacing(10),
    paddingVertical: responsiveSpacing(4),
    borderRadius: RADIUS.lg,
    alignSelf: "flex-start",
  },
  vendorLevel: {
    fontSize: responsiveFont(FONT_SIZES.xs),
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.semiBold,
    marginLeft: responsiveSpacing(4),
  },
  headerActions: {
    flexDirection: "row",
    gap: responsiveSpacing(10),
  },
  headerButton: {
    width: responsiveSize(48),
    height: responsiveSize(48),
    borderRadius: RADIUS.lg,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: responsiveSize(10),
    right: responsiveSize(10),
    width: responsiveSize(8),
    height: responsiveSize(8),
    borderRadius: responsiveSize(4),
    backgroundColor: COLORS.warning,
  },
  logoSection: {
    alignItems: "center",
    marginTop: responsiveSpacing(12),
  },
  spacer: {
    height: responsiveSize(280),
  },
  section: {
    paddingHorizontal: responsiveSpacing(20),
    marginBottom: responsiveSpacing(24),
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: responsiveSpacing(16),
  },
  sectionTitle: {
    fontSize: responsiveFont(FONT_SIZES.xl),
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: responsiveSpacing(4),
  },
  viewAllText: {
    fontSize: responsiveFont(FONT_SIZES.sm),
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  periodSelector: {
    flexDirection: "row",
    backgroundColor: COLORS.gray100,
    borderRadius: RADIUS.xl,
    padding: responsiveSpacing(4),
    marginBottom: responsiveSpacing(20),
  },
  periodButton: {
    flex: 1,
    paddingVertical: responsiveSpacing(10),
    alignItems: "center",
    borderRadius: RADIUS.lg,
  },
  selectedPeriodButton: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.sm,
  },
  periodText: {
    fontSize: responsiveFont(FONT_SIZES.sm),
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHTS.medium,
  },
  selectedPeriodText: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  analyticsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: responsiveSpacing(12),
  },
  premiumAnalyticsCard: {
    width: (width - responsiveSpacing(40) - responsiveSpacing(12)) / 2,
    padding: 0,
    overflow: "hidden",
    ...SHADOWS.md,
  },
  analyticsGradient: {
    padding: responsiveSpacing(16),
    height: responsiveSize(140),
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: responsiveSpacing(8),
  },
  trendBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: responsiveSpacing(6),
    paddingVertical: responsiveSpacing(2),
    borderRadius: RADIUS.md,
  },
  trendText: {
    fontSize: responsiveFont(FONT_SIZES.xs),
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.bold,
  },
  analyticsValue: {
    fontSize: responsiveFont(FONT_SIZES["2xl"]),
    fontWeight: FONT_WEIGHTS.black,
    color: COLORS.white,
    marginBottom: responsiveSpacing(4),
  },
  analyticsLabel: {
    fontSize: responsiveFont(FONT_SIZES.sm),
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.medium,
    marginBottom: responsiveSpacing(2),
  },
  analyticsSubtext: {
    fontSize: responsiveFont(FONT_SIZES.xs),
    color: COLORS.white,
    opacity: 0.8,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: responsiveSpacing(12),
    marginTop: responsiveSpacing(8),
  },
  quickActionCard: {
    width: (width - responsiveSpacing(40) - responsiveSpacing(12)) / 2,
    borderRadius: RADIUS.xl,
    overflow: "hidden",
    ...SHADOWS.md,
  },
  quickActionGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: responsiveSpacing(16),
    paddingHorizontal: responsiveSpacing(12),
    minHeight: responsiveSize(80),
  },
  quickActionContent: {
    flex: 1,
    alignItems: "flex-start",
  },
  quickActionTitle: {
    fontSize: responsiveFont(FONT_SIZES.md),
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.bold,
    marginTop: responsiveSpacing(6),
    marginBottom: responsiveSpacing(2),
  },
  quickActionDescription: {
    fontSize: responsiveFont(FONT_SIZES.xs),
    color: COLORS.white,
    opacity: 0.9,
  },
  quickActionArrow: {
    width: responsiveSize(28),
    height: responsiveSize(28),
    borderRadius: responsiveSize(14),
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  bookingCard: {
    padding: responsiveSpacing(16),
    ...SHADOWS.sm,
  },
  bookingContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  bookingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  customerAvatar: {
    width: responsiveSize(45),
    height: responsiveSize(45),
    borderRadius: responsiveSize(22.5),
    marginRight: responsiveSpacing(12),
  },
  bookingInfo: {
    flex: 1,
  },
  bookingTour: {
    fontSize: responsiveFont(FONT_SIZES.base),
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: responsiveSpacing(2),
  },
  bookingCustomer: {
    fontSize: responsiveFont(FONT_SIZES.sm),
    color: COLORS.textSecondary,
    marginBottom: responsiveSpacing(2),
  },
  bookingDate: {
    fontSize: responsiveFont(FONT_SIZES.xs),
    color: COLORS.textTertiary,
  },
  bookingRight: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: responsiveFont(FONT_SIZES.lg),
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.success,
    marginBottom: responsiveSpacing(6),
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: responsiveSpacing(8),
    paddingVertical: responsiveSpacing(4),
    borderRadius: RADIUS.md,
    borderWidth: 1,
    gap: responsiveSpacing(4),
  },
  statusText: {
    fontSize: responsiveFont(FONT_SIZES.xs),
    fontWeight: FONT_WEIGHTS.semiBold,
    textTransform: "capitalize",
  },
  premiumPerformanceCard: {
    marginHorizontal: responsiveSpacing(20),
    marginBottom: responsiveSpacing(20),
    padding: 0,
    overflow: "hidden",
    ...SHADOWS.lg,
  },
  performanceGradient: {
    padding: responsiveSpacing(24),
  },
  performanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: responsiveSpacing(16),
  },
  performanceStats: {
    marginLeft: responsiveSpacing(16),
    flex: 1,
  },
  performanceNumber: {
    fontSize: responsiveFont(FONT_SIZES["3xl"]),
    fontWeight: FONT_WEIGHTS.black,
    color: COLORS.white,
  },
  performanceMetric: {
    fontSize: responsiveFont(FONT_SIZES.sm),
    color: COLORS.white,
    opacity: 0.9,
  },
  performanceTitle: {
    fontSize: responsiveFont(FONT_SIZES.xl),
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    textAlign: "center",
    marginBottom: responsiveSpacing(8),
  },
  performanceDescription: {
    fontSize: responsiveFont(FONT_SIZES.base),
    color: COLORS.white,
    textAlign: "center",
    opacity: 0.9,
    marginBottom: responsiveSpacing(20),
    lineHeight: responsiveFont(FONT_SIZES.base) * 1.5,
  },
  performanceButton: {
    alignSelf: "center",
    minWidth: responsiveSize(200),
  },
  bottomSpacer: {
    height: responsiveSize(100),
  },
});
