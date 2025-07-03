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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
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
} from "../../utils/responsiveFont";

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
  },
];

export default function FavoritesScreen({ navigation }: FavoritesScreenProps) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const removeFavorite = (tourId: string) => {
    // In a real app, this would remove from favorites list
    console.log("Removing favorite:", tourId);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <SafeAreaView style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle} {...ACCESSIBLE_TEXT_PROPS["2xl"]}>
            My Favorites
          </Text>
          <Text style={styles.headerSubtitle} {...ACCESSIBLE_TEXT_PROPS.base}>
            {favoriteTours.length} saved destinations
          </Text>
        </View>
      </SafeAreaView>

      {favoriteTours.length === 0 ? (
        <View style={styles.emptyState}>
          <LinearGradient
            colors={[COLORS.primaryLight, COLORS.primary]}
            style={styles.emptyIcon}
          >
            <Ionicons
              name="heart-outline"
              size={responsiveSize(48)}
              color={COLORS.white}
            />
          </LinearGradient>
          <Text style={styles.emptyTitle} {...ACCESSIBLE_TEXT_PROPS.xl}>
            No Favorites Yet
          </Text>
          <Text style={styles.emptyDescription} {...ACCESSIBLE_TEXT_PROPS.base}>
            Start exploring and save your dream destinations
          </Text>
          <Button
            title="Explore Tours"
            variant="primary"
            size="lg"
            icon="search"
            onPress={() => navigation.navigate("Search")}
            style={styles.exploreButton}
          />
        </View>
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
          <View style={styles.toursGrid}>
            {favoriteTours.map((tour) => (
              <Card
                key={tour.id}
                variant="elevated"
                style={styles.favoriteCard}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("TourDetails", { tour })}
                  style={styles.cardContent}
                >
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: tour.image }}
                      style={styles.tourImage}
                    />

                    {/* Favorite Button */}
                    <TouchableOpacity
                      style={styles.favoriteButton}
                      onPress={() => removeFavorite(tour.id)}
                    >
                      <Ionicons name="heart" size={20} color={COLORS.error} />
                    </TouchableOpacity>

                    {/* Rating Badge */}
                    <View style={styles.ratingBadge}>
                      <Ionicons name="star" size={12} color={COLORS.warning} />
                      <Text
                        style={styles.ratingText}
                        {...ACCESSIBLE_TEXT_PROPS.xs}
                      >
                        {tour.rating}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.tourInfo}>
                    <Text
                      style={styles.tourTitle}
                      numberOfLines={2}
                      {...ACCESSIBLE_TEXT_PROPS.md}
                    >
                      {tour.title}
                    </Text>

                    <View style={styles.locationContainer}>
                      <Ionicons
                        name="location"
                        size={14}
                        color={COLORS.textSecondary}
                      />
                      <Text
                        style={styles.locationText}
                        numberOfLines={1}
                        {...ACCESSIBLE_TEXT_PROPS.sm}
                      >
                        {tour.location}
                      </Text>
                    </View>

                    <View style={styles.tourMeta}>
                      <View style={styles.metaItem}>
                        <Ionicons
                          name="time"
                          size={14}
                          color={COLORS.textSecondary}
                        />
                        <Text
                          style={styles.metaText}
                          {...ACCESSIBLE_TEXT_PROPS.xs}
                        >
                          {tour.duration} days
                        </Text>
                      </View>
                      <Text
                        style={styles.savedDate}
                        {...ACCESSIBLE_TEXT_PROPS.xs}
                      >
                        Saved {tour.savedDate}
                      </Text>
                    </View>

                    <View style={styles.priceContainer}>
                      <Text style={styles.price} {...ACCESSIBLE_TEXT_PROPS.lg}>
                        ${tour.price}
                      </Text>
                      <Text
                        style={styles.priceLabel}
                        {...ACCESSIBLE_TEXT_PROPS.xs}
                      >
                        per person
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Card>
            ))}
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
                  <Text style={styles.actionText} {...ACCESSIBLE_TEXT_PROPS.sm}>
                    Find More Tours
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionCard}
                onPress={() => navigation.navigate("Bookings")}
              >
                <LinearGradient
                  colors={[COLORS.secondary, COLORS.secondaryLight]}
                  style={styles.actionGradient}
                >
                  <Ionicons name="calendar" size={24} color={COLORS.white} />
                  <Text style={styles.actionText} {...ACCESSIBLE_TEXT_PROPS.sm}>
                    My Bookings
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.white,
    paddingBottom: responsiveSpacing(SPACING.lg),
    ...SHADOWS.sm,
  },
  headerContent: {
    paddingHorizontal: responsiveSpacing(SPACING.lg),
    alignItems: "center",
  },
  headerTitle: {
    fontSize: responsiveFont(FONT_SIZES["2xl"]),
    // fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: responsiveSpacing(SPACING.xs),
  },
  headerSubtitle: {
    fontSize: responsiveFont(FONT_SIZES.base),
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHTS.medium,
  },
  content: {
    flex: 1,
    paddingHorizontal: responsiveSpacing(SPACING.lg),
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: responsiveSpacing(SPACING.xl),
  },
  emptyIcon: {
    width: responsiveSize(100),
    height: responsiveSize(100),
    borderRadius: responsiveSize(50),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: responsiveSpacing(SPACING.xl),
  },
  emptyTitle: {
    fontSize: responsiveFont(FONT_SIZES.xl),
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: responsiveSpacing(SPACING.base),
    textAlign: "center",
  },
  emptyDescription: {
    fontSize: responsiveFont(FONT_SIZES.base),
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: responsiveSpacing(SPACING.xl),
    lineHeight: responsiveFont(FONT_SIZES.base) * 1.5,
  },
  exploreButton: {
    minWidth: responsiveSize(200),
  },
  toursGrid: {
    paddingTop: responsiveSpacing(SPACING.lg),
  },
  favoriteCard: {
    marginBottom: responsiveSpacing(SPACING.lg),
    overflow: "hidden",
  },
  cardContent: {
    flexDirection: "row",
  },
  imageContainer: {
    width: responsiveSize(120),
    height: responsiveSize(100),
    position: "relative",
  },
  tourImage: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: RADIUS.lg,
    borderBottomLeftRadius: RADIUS.lg,
  },
  favoriteButton: {
    position: "absolute",
    top: responsiveSpacing(SPACING.sm),
    right: responsiveSpacing(SPACING.sm),
    width: responsiveSize(32),
    height: responsiveSize(32),
    borderRadius: responsiveSize(16),
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.sm,
  },
  ratingBadge: {
    position: "absolute",
    bottom: responsiveSpacing(SPACING.sm),
    left: responsiveSpacing(SPACING.sm),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: responsiveSpacing(SPACING.xs),
    paddingVertical: responsiveSpacing(2),
    borderRadius: RADIUS.sm,
    gap: responsiveSpacing(2),
  },
  ratingText: {
    fontSize: responsiveFont(FONT_SIZES.xs),
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  tourInfo: {
    flex: 1,
    padding: responsiveSpacing(SPACING.base),
  },
  tourTitle: {
    fontSize: responsiveFont(FONT_SIZES.md),
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: responsiveSpacing(SPACING.xs),
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: responsiveSpacing(SPACING.xs),
    marginBottom: responsiveSpacing(SPACING.sm),
  },
  locationText: {
    fontSize: responsiveFont(FONT_SIZES.sm),
    color: COLORS.textSecondary,
    flex: 1,
  },
  tourMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: responsiveSpacing(SPACING.sm),
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: responsiveSpacing(SPACING.xs),
  },
  metaText: {
    fontSize: responsiveFont(FONT_SIZES.xs),
    color: COLORS.textSecondary,
  },
  savedDate: {
    fontSize: responsiveFont(FONT_SIZES.xs),
    color: COLORS.textTertiary,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: responsiveSpacing(SPACING.xs),
  },
  price: {
    fontSize: responsiveFont(FONT_SIZES.lg),
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
  },
  priceLabel: {
    fontSize: responsiveFont(FONT_SIZES.xs),
    color: COLORS.textSecondary,
  },
  quickActions: {
    marginTop: responsiveSpacing(SPACING.xl),
    marginBottom: responsiveSpacing(SPACING.lg),
  },
  quickActionsTitle: {
    fontSize: responsiveFont(FONT_SIZES.lg),
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: responsiveSpacing(SPACING.base),
  },
  actionsGrid: {
    flexDirection: "row",
    gap: responsiveSpacing(SPACING.base),
  },
  actionCard: {
    flex: 1,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    ...SHADOWS.sm,
  },
  actionGradient: {
    alignItems: "center",
    paddingVertical: responsiveSpacing(SPACING.lg),
    paddingHorizontal: responsiveSpacing(SPACING.base),
    gap: responsiveSpacing(SPACING.sm),
  },
  actionText: {
    fontSize: responsiveFont(FONT_SIZES.sm),
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.semiBold,
    textAlign: "center",
  },
  bottomSpacer: {
    height: responsiveSize(100),
  },
});
