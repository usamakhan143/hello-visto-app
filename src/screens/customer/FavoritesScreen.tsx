import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  StatusBar,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import {
  COLORS,
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
} from "../../utils/responsiveFont";

const { width } = Dimensions.get("window");

interface FavoritesScreenProps {
  navigation: any;
}

const favoriteTours = [
  {
    id: "1",
    title: "Swiss Alps Luxury Retreat",
    location: "Zermatt, Switzerland",
    price: 2899,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    duration: 7,
    savedDate: "2024-01-10",
    description: "Experience the majestic beauty of the Swiss Alps",
    includes: ["Luxury Accommodation", "Guided Tours", "Meals Included"],
  },
  {
    id: "2",
    title: "Maldives Paradise",
    location: "North Malé Atoll, Maldives",
    price: 4199,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=400&h=300&fit=crop",
    duration: 5,
    savedDate: "2024-01-08",
    description: "Luxury overwater villas in tropical paradise",
    includes: ["Water Villa", "All Inclusive", "Spa Access"],
  },
  {
    id: "3",
    title: "Tokyo Cultural Experience",
    location: "Tokyo, Japan",
    price: 1899,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
    duration: 6,
    savedDate: "2024-01-05",
    description: "Immerse yourself in authentic Japanese culture",
    includes: ["Cultural Tours", "Traditional Meals", "City Guide"],
  },
  {
    id: "4",
    title: "Santorini Romance",
    location: "Santorini, Greece",
    price: 2299,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop",
    duration: 4,
    savedDate: "2024-01-03",
    description: "Romantic getaway with stunning sunset views",
    includes: ["Boutique Hotel", "Wine Tasting", "Private Tours"],
  },
];

const categories = [
  { id: "all", title: "All", count: favoriteTours.length },
  { id: "luxury", title: "Luxury", count: 2 },
  { id: "adventure", title: "Adventure", count: 1 },
  { id: "cultural", title: "Cultural", count: 1 },
];

export default function FavoritesScreen({ navigation }: FavoritesScreenProps) {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const removeFavorite = (tourId: string) => {
    console.log("Removing favorite:", tourId);
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <LinearGradient
        colors={[COLORS.primary + "20", COLORS.secondary + "20"]}
        style={styles.emptyContainer}
      >
        <View style={styles.emptyIconContainer}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            style={styles.emptyIcon}
          >
            <Ionicons
              name="heart-outline"
              size={responsiveSize(48)}
              color={COLORS.white}
            />
          </LinearGradient>
        </View>
        <Text style={styles.emptyTitle} {...ACCESSIBLE_TEXT_PROPS.xl}>
          No Favorites Yet
        </Text>
        <Text style={styles.emptyDescription} {...ACCESSIBLE_TEXT_PROPS.base}>
          Discover amazing destinations and save your favorites to plan your
          next adventure
        </Text>
        <Button
          title="Explore Destinations"
          variant="primary"
          size="lg"
          icon="compass"
          onPress={() => navigation.navigate("Search")}
          style={styles.exploreButton}
        />
      </LinearGradient>
    </View>
  );

  const renderTourCard = (tour: any) => (
    <TouchableOpacity
      key={tour.id}
      style={styles.tourCard}
      onPress={() => navigation.navigate("TourDetails", { tour })}
      activeOpacity={0.8}
    >
      <View style={styles.tourImageContainer}>
        <Image source={{ uri: tour.image }} style={styles.tourImage} />

        {/* Price Badge */}
        <BlurView intensity={80} style={styles.priceBadge}>
          <Text style={styles.priceText}>${tour.price}</Text>
          <Text style={styles.priceLabel}>per person</Text>
        </BlurView>

        {/* Rating Badge */}
        <BlurView intensity={80} style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color={COLORS.warning} />
          <Text style={styles.ratingText}>{tour.rating}</Text>
        </BlurView>

        {/* Favorite Button */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => removeFavorite(tour.id)}
        >
          <Ionicons name="heart" size={18} color={COLORS.error} />
        </TouchableOpacity>

        {/* Content Overlay */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.tourContentOverlay}
        >
          <View style={styles.tourContent}>
            <Text style={styles.tourTitle} numberOfLines={2}>
              {tour.title}
            </Text>
            <Text style={styles.tourDescription} numberOfLines={1}>
              {tour.description}
            </Text>

            <View style={styles.tourMeta}>
              <View style={styles.metaItem}>
                <Ionicons name="location" size={12} color={COLORS.white} />
                <Text style={styles.metaText} numberOfLines={1}>
                  {tour.location}
                </Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="time" size={12} color={COLORS.white} />
                <Text style={styles.metaText}>{tour.duration} days</Text>
              </View>
            </View>

            <View style={styles.tourFeatures}>
              {tour.includes.slice(0, 2).map((feature: string, idx: number) => (
                <View key={idx} style={styles.featureTag}>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} {...ACCESSIBLE_TEXT_PROPS.lg}>
          My Favorites
        </Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons
            name="search-outline"
            size={24}
            color={COLORS.textPrimary}
          />
        </TouchableOpacity>
      </View>

      {favoriteTours.length === 0 ? (
        renderEmptyState()
      ) : (
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={COLORS.primary}
              colors={[COLORS.primary]}
            />
          }
        >
          {/* Travel Inspiration Section */}
          <Card variant="elevated" style={styles.inspirationCard}>
            <LinearGradient
              colors={[COLORS.primary + "15", COLORS.secondary + "15"]}
              style={styles.inspirationContainer}
            >
              <View style={styles.inspirationHeader}>
                <View style={styles.inspirationIcon}>
                  <Ionicons name="compass" size={24} color={COLORS.primary} />
                </View>
                <View style={styles.inspirationText}>
                  <Text style={styles.inspirationTitle}>
                    Plan Your Dream Trip
                  </Text>
                  <Text style={styles.inspirationSubtitle}>
                    Turn your saved favorites into reality
                  </Text>
                </View>
              </View>

              <View style={styles.planningActions}>
                <TouchableOpacity
                  style={styles.planningButton}
                  onPress={() => navigation.navigate("TripPlanner")}
                >
                  <Ionicons
                    name="calendar-outline"
                    size={16}
                    color={COLORS.primary}
                  />
                  <Text style={styles.planningButtonText}>
                    Create Itinerary
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.planningButton}
                  onPress={() => navigation.navigate("BudgetCalculator")}
                >
                  <Ionicons
                    name="calculator-outline"
                    size={16}
                    color={COLORS.secondary}
                  />
                  <Text style={styles.planningButtonText}>
                    Budget Calculator
                  </Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </Card>

          {/* Categories */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryChip,
                  selectedCategory === category.id && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category.id &&
                      styles.categoryTextActive,
                  ]}
                >
                  {category.title}
                </Text>
                <View
                  style={[
                    styles.categoryBadge,
                    selectedCategory === category.id &&
                      styles.categoryBadgeActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryCount,
                      selectedCategory === category.id &&
                        styles.categoryCountActive,
                    ]}
                  >
                    {category.count}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Tours Grid */}
          <View style={styles.toursGrid}>
            {favoriteTours.map((tour) => renderTourCard(tour))}
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <Text
              style={styles.quickActionsTitle}
              {...ACCESSIBLE_TEXT_PROPS.lg}
            >
              Quick Actions
            </Text>

            <View style={styles.actionsGrid}>
              <TouchableOpacity
                style={styles.actionCard}
                onPress={() => navigation.navigate("Search")}
              >
                <LinearGradient
                  colors={[COLORS.primary, COLORS.primaryLight]}
                  style={styles.actionGradient}
                >
                  <Ionicons name="search" size={24} color={COLORS.white} />
                  <Text style={styles.actionText}>Discover More</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionCard}
                onPress={() => navigation.navigate("MyBookings")}
              >
                <LinearGradient
                  colors={[COLORS.secondary, COLORS.secondaryLight]}
                  style={styles.actionGradient}
                >
                  <Ionicons name="calendar" size={24} color={COLORS.white} />
                  <Text style={styles.actionText}>My Bookings</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      )}
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
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.sm,
  },
  headerTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    flex: 1,
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
  },
  emptyContainer: {
    width: "100%",
    paddingVertical: responsiveSpacing(SPACING["4xl"]),
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.xl,
    alignItems: "center",
  },
  emptyIconContainer: {
    marginBottom: SPACING.xl,
  },
  emptyIcon: {
    width: responsiveSize(100),
    height: responsiveSize(100),
    borderRadius: responsiveSize(50),
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.base,
    textAlign: "center",
  },
  emptyDescription: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: SPACING.xl,
    lineHeight: FONT_SIZES.base * 1.5,
  },
  exploreButton: {
    minWidth: responsiveSize(200),
  },
  inspirationCard: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.base,
    overflow: "hidden",
  },
  inspirationContainer: {
    padding: SPACING.lg,
  },
  inspirationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.base,
  },
  inspirationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary + "20",
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.base,
  },
  inspirationText: {
    flex: 1,
  },
  inspirationTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  inspirationSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: FONT_SIZES.sm * 1.4,
  },
  planningActions: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  planningButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.base,
    borderRadius: RADIUS.lg,
    gap: SPACING.xs,
    ...SHADOWS.sm,
  },
  planningButtonText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.textPrimary,
  },
  categoriesContainer: {
    marginVertical: SPACING.base,
  },
  categoriesContent: {
    paddingHorizontal: SPACING.xs,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    marginHorizontal: SPACING.xs,
    ...SHADOWS.sm,
  },
  categoryChipActive: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.textSecondary,
    marginRight: SPACING.xs,
  },
  categoryTextActive: {
    color: COLORS.white,
  },
  categoryBadge: {
    backgroundColor: COLORS.gray200,
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
    minWidth: 20,
    alignItems: "center",
  },
  categoryBadgeActive: {
    backgroundColor: COLORS.white + "30",
  },
  categoryCount: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textSecondary,
  },
  categoryCountActive: {
    color: COLORS.white,
  },
  toursGrid: {
    gap: SPACING.lg,
    paddingVertical: SPACING.base,
  },
  tourCard: {
    height: responsiveSize(280),
    borderRadius: RADIUS.xl,
    overflow: "hidden",
    ...SHADOWS.lg,
  },
  tourImageContainer: {
    flex: 1,
    position: "relative",
  },
  tourImage: {
    width: "100%",
    height: "100%",
  },
  priceBadge: {
    position: "absolute",
    top: SPACING.base,
    left: SPACING.base,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.lg,
    alignItems: "center",
  },
  priceText: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
  },
  priceLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.white + "90",
  },
  ratingBadge: {
    position: "absolute",
    top: SPACING.base,
    right: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.lg,
    gap: SPACING.xs,
  },
  ratingText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
  },
  favoriteButton: {
    position: "absolute",
    top: SPACING.base,
    right: SPACING.base,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.white + "90",
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.sm,
  },
  tourContentOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
  },
  tourContent: {
    flex: 1,
    justifyContent: "flex-end",
    padding: SPACING.base,
  },
  tourTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  tourDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.white + "80",
    marginBottom: SPACING.sm,
  },
  tourMeta: {
    flexDirection: "row",
    marginBottom: SPACING.sm,
    gap: SPACING.base,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    flex: 1,
  },
  metaText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.white + "80",
    flex: 1,
  },
  tourFeatures: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  featureTag: {
    backgroundColor: COLORS.white + "20",
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
  },
  featureText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.medium,
  },
  quickActions: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  quickActionsTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.base,
  },
  actionsGrid: {
    flexDirection: "row",
    gap: SPACING.base,
  },
  actionCard: {
    flex: 1,
    borderRadius: RADIUS.xl,
    overflow: "hidden",
    ...SHADOWS.lg,
  },
  actionGradient: {
    alignItems: "center",
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.base,
    gap: SPACING.sm,
  },
  actionText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.semiBold,
    textAlign: "center",
  },
  bottomSpacer: {
    height: 100,
  },
});
