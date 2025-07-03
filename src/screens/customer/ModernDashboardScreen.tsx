import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import {
  COLORS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SPACING,
  RADIUS,
} from "../../constants";
import { Tour } from "../../types";

const { width } = Dimensions.get("window");

// Modern tour data
const mockTours: Tour[] = [
  {
    id: "1",
    vendorId: "vendor1",
    title: "Swiss Alps Adventure",
    description:
      "Experience breathtaking mountain views and luxury accommodations",
    price: 1299,
    discountPrice: 1599,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
    ],
    duration: 7,
    maxGuests: 8,
    location: {
      address: "Zermatt, Switzerland",
      latitude: 46.0207,
      longitude: 7.7491,
    },
    startDate: new Date(),
    endDate: new Date(),
    includes: [],
    excludes: [],
    itinerary: [],
    rating: 4.9,
    totalReviews: 247,
    isActive: true,
    isApproved: true,
    cancellationPolicy: "",
    createdAt: new Date(),
  },
  {
    id: "2",
    vendorId: "vendor2",
    title: "Maldives Paradise",
    description: "Overwater villas and pristine beaches await",
    price: 2199,
    images: [
      "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=600",
    ],
    duration: 5,
    maxGuests: 2,
    location: {
      address: "North Malé Atoll, Maldives",
      latitude: 4.1755,
      longitude: 73.5093,
    },
    startDate: new Date(),
    endDate: new Date(),
    includes: [],
    excludes: [],
    itinerary: [],
    rating: 4.8,
    totalReviews: 189,
    isActive: true,
    isApproved: true,
    cancellationPolicy: "",
    createdAt: new Date(),
  },
];

const categories = [
  {
    id: "1",
    name: "Adventure",
    icon: "trail-sign-outline",
    color: COLORS.primary,
  },
  { id: "2", name: "Luxury", icon: "diamond-outline", color: COLORS.secondary },
  { id: "3", name: "Culture", icon: "library-outline", color: COLORS.accent },
  { id: "4", name: "Beach", icon: "sunny-outline", color: COLORS.warning },
  { id: "5", name: "City", icon: "business-outline", color: COLORS.info },
];

interface DashboardScreenProps {
  navigation: any;
}

export default function ModernDashboardScreen({
  navigation,
}: DashboardScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => setRefreshing(false), 2000);
  };

  const renderCategory = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        selectedCategory === item.id && styles.selectedCategoryCard,
      ]}
      onPress={() =>
        setSelectedCategory(selectedCategory === item.id ? "" : item.id)
      }
    >
      <View
        style={[styles.categoryIcon, { backgroundColor: `${item.color}15` }]}
      >
        <Ionicons
          name={item.icon}
          size={24}
          color={selectedCategory === item.id ? COLORS.white : item.color}
        />
      </View>
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.selectedCategoryText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderTour = ({ item }: { item: Tour }) => (
    <Card variant="elevated" style={styles.tourCard}>
      <TouchableOpacity
        onPress={() => navigation.navigate("TourDetails", { tour: item })}
        activeOpacity={0.8}
      >
        <View style={styles.tourImageContainer}>
          <Image
            source={{ uri: item.images[0] }}
            style={styles.tourImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.6)"]}
            style={styles.tourImageOverlay}
          />

          {/* Price Badge */}
          <View style={styles.priceBadge}>
            <Text style={styles.price}>${item.price}</Text>
            {item.discountPrice && (
              <Text style={styles.originalPrice}>${item.discountPrice}</Text>
            )}
          </View>

          {/* Rating Badge */}
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={14} color={COLORS.warning} />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>

        <View style={styles.tourContent}>
          <Text style={styles.tourTitle} numberOfLines={2}>
            {item.title}
          </Text>

          <View style={styles.tourDetails}>
            <View style={styles.tourDetail}>
              <Ionicons
                name="location-outline"
                size={14}
                color={COLORS.textSecondary}
              />
              <Text style={styles.tourDetailText}>{item.location.address}</Text>
            </View>
            <View style={styles.tourDetail}>
              <Ionicons
                name="time-outline"
                size={14}
                color={COLORS.textSecondary}
              />
              <Text style={styles.tourDetailText}>{item.duration} days</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userSection}>
            <View style={styles.userInfo}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
                }}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.greeting}>Good morning</Text>
                <Text style={styles.userName}>Ahmed Riaz</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => navigation.navigate("Notifications")}
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color={COLORS.textPrimary}
              />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>

          {/* Logo */}
          <View style={styles.logoSection}>
            <Image
              source={{
                uri: "https://cdn.builder.io/api/v1/image/assets%2F80e6fadc5fba49849451088d08fdc300%2Fc34895fda5044aedbde4373d88e43614?format=webp&width=200",
              }}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.brandName}>Hello Visto</Text>
          </View>
        </View>

        {/* Search Section */}
        <Card variant="elevated" style={styles.searchCard}>
          <Text style={styles.searchTitle}>Where to next?</Text>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search-outline"
              size={20}
              color={COLORS.textSecondary}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search destinations, tours..."
              placeholderTextColor={COLORS.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => navigation.navigate("Search")}
            />
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons
                name="options-outline"
                size={20}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            <Card variant="elevated" style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons name="airplane" size={24} color={COLORS.primary} />
              </View>
              <Text style={styles.statValue}>15+</Text>
              <Text style={styles.statLabel}>Countries</Text>
            </Card>

            <Card variant="elevated" style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons name="calendar" size={24} color={COLORS.secondary} />
              </View>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Upcoming</Text>
            </Card>

            <Card variant="elevated" style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons name="star" size={24} color={COLORS.warning} />
              </View>
              <Text style={styles.statValue}>4.9</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </Card>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Explore Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Featured Tours */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Destinations</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={mockTours}
            renderItem={renderTour}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.toursList}
          />
        </View>

        {/* Quick Actions */}
        <Card variant="elevated" style={styles.quickActionsCard}>
          <Text style={styles.quickActionsTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity
              style={styles.quickAction}
              onPress={() => navigation.navigate("MyBookings")}
            >
              <View
                style={[
                  styles.quickActionIcon,
                  { backgroundColor: `${COLORS.primary}15` },
                ]}
              >
                <Ionicons
                  name="calendar-outline"
                  size={24}
                  color={COLORS.primary}
                />
              </View>
              <Text style={styles.quickActionText}>My Bookings</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickAction}
              onPress={() => navigation.navigate("Wishlist")}
            >
              <View
                style={[
                  styles.quickActionIcon,
                  { backgroundColor: `${COLORS.error}15` },
                ]}
              >
                <Ionicons name="heart-outline" size={24} color={COLORS.error} />
              </View>
              <Text style={styles.quickActionText}>Wishlist</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickAction}
              onPress={() => navigation.navigate("Support")}
            >
              <View
                style={[
                  styles.quickActionIcon,
                  { backgroundColor: `${COLORS.secondary}15` },
                ]}
              >
                <Ionicons
                  name="chatbubble-outline"
                  size={24}
                  color={COLORS.secondary}
                />
              </View>
              <Text style={styles.quickActionText}>Support</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickAction}
              onPress={() => navigation.navigate("Profile")}
            >
              <View
                style={[
                  styles.quickActionIcon,
                  { backgroundColor: `${COLORS.accent}15` },
                ]}
              >
                <Ionicons
                  name="person-outline"
                  size={24}
                  color={COLORS.accent}
                />
              </View>
              <Text style={styles.quickActionText}>Profile</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* CTA Section */}
        <Card variant="elevated" style={styles.ctaCard}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryDark]}
            style={styles.ctaGradient}
          >
            <Text style={styles.ctaTitle}>Ready for your next adventure?</Text>
            <Text style={styles.ctaDescription}>
              Discover amazing destinations and book your perfect getaway today.
            </Text>
            <Button
              title="Explore Destinations"
              variant="secondary"
              size="md"
              icon="arrow-forward"
              iconPosition="right"
              onPress={() => navigation.navigate("Search")}
              style={styles.ctaButton}
            />
          </LinearGradient>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.base,
  },
  userSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: RADIUS.full,
    marginRight: SPACING.base,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  greeting: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHTS.regular,
  },
  userName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
  },
  notificationButton: {
    position: "relative",
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationBadge: {
    position: "absolute",
    top: SPACING.sm,
    right: SPACING.sm,
    width: 8,
    height: 8,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.error,
  },
  logoSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: SPACING.sm,
  },
  brandName: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.black,
    color: COLORS.textPrimary,
  },
  searchCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  searchTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.base,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gray100,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.sm,
    fontSize: FONT_SIZES.base,
    color: COLORS.textPrimary,
  },
  filterButton: {
    padding: SPACING.xs,
  },
  statsSection: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SPACING.sm,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: SPACING.lg,
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: RADIUS.full,
    backgroundColor: `${COLORS.primary}15`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.sm,
  },
  statValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.black,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHTS.medium,
  },
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.base,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
  },
  seeAllText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  categoriesList: {
    paddingRight: SPACING.lg,
  },
  categoryCard: {
    alignItems: "center",
    paddingVertical: SPACING.base,
    paddingHorizontal: SPACING.md,
    marginRight: SPACING.sm,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    minWidth: 80,
  },
  selectedCategoryCard: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.xs,
  },
  categoryText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textPrimary,
    fontWeight: FONT_WEIGHTS.medium,
  },
  selectedCategoryText: {
    color: COLORS.white,
  },
  toursList: {
    paddingRight: SPACING.lg,
  },
  tourCard: {
    width: width * 0.75,
    marginRight: SPACING.base,
    padding: 0,
    overflow: "hidden",
  },
  tourImageContainer: {
    height: 200,
    position: "relative",
  },
  tourImage: {
    width: "100%",
    height: "100%",
  },
  tourImageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
  },
  priceBadge: {
    position: "absolute",
    top: SPACING.base,
    right: SPACING.base,
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.md,
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
  },
  originalPrice: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    textDecorationLine: "line-through",
    marginLeft: SPACING.xs,
  },
  ratingBadge: {
    position: "absolute",
    top: SPACING.base,
    left: SPACING.base,
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.md,
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.textPrimary,
    marginLeft: SPACING.xs,
  },
  tourContent: {
    padding: SPACING.base,
  },
  tourTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  tourDetails: {
    gap: SPACING.xs,
  },
  tourDetail: {
    flexDirection: "row",
    alignItems: "center",
  },
  tourDetailText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  quickActionsCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  quickActionsTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.base,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: SPACING.sm,
  },
  quickAction: {
    width: "48%",
    alignItems: "center",
    paddingVertical: SPACING.base,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.sm,
  },
  quickActionText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textPrimary,
    fontWeight: FONT_WEIGHTS.medium,
  },
  ctaCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING["2xl"],
    padding: 0,
    overflow: "hidden",
  },
  ctaGradient: {
    padding: SPACING.xl,
    alignItems: "center",
  },
  ctaTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    textAlign: "center",
    marginBottom: SPACING.sm,
  },
  ctaDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.white,
    textAlign: "center",
    opacity: 0.9,
    marginBottom: SPACING.lg,
    lineHeight: FONT_SIZES.sm * 1.5,
  },
  ctaButton: {
    backgroundColor: COLORS.white,
  },
});
