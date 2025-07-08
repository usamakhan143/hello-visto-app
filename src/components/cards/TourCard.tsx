import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Tour } from "../../types";
import {
  COLORS,
  SIZES,
  FONTS,
  SPACING,
  FONT_SIZES,
  FONT_WEIGHTS,
} from "../../constants";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.9;

interface TourCardProps {
  tour: Tour;
  onPress: () => void;
  showVendor?: boolean;
  onWishlistPress?: () => void;
  isWishlisted?: boolean;
  onVendorPress?: () => void;
  vendor?: {
    businessName: string;
    logo?: string;
    rating: number;
  };
}

export default function TourCard({
  tour,
  onPress,
  showVendor = false,
  onWishlistPress,
  isWishlisted = false,
  onVendorPress,
  vendor,
}: TourCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: tour.images[0] || "https://via.placeholder.com/300x200",
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          style={styles.gradient}
        />
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${tour.price}</Text>
          {tour.discountPrice && (
            <Text style={styles.originalPrice}>${tour.discountPrice}</Text>
          )}
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color={COLORS.warning} />
          <Text style={styles.rating}>
            {Number(tour.rating || 0).toFixed(1)}
          </Text>
        </View>

        {/* Wishlist Button */}
        {onWishlistPress && (
          <TouchableOpacity
            style={styles.wishlistButton}
            onPress={onWishlistPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={isWishlisted ? "heart" : "heart-outline"}
              size={20}
              color={isWishlisted ? COLORS.error : COLORS.white}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {tour.title}
        </Text>

        <View style={styles.locationContainer}>
          <Ionicons
            name="location-outline"
            size={14}
            color={COLORS.textSecondary}
          />
          <Text style={styles.location} numberOfLines={1}>
            {tour.location.address}
          </Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detail}>
            <Ionicons
              name="time-outline"
              size={14}
              color={COLORS.textSecondary}
            />
            <Text style={styles.detailText}>{tour.duration} days</Text>
          </View>
          <View style={styles.detail}>
            <Ionicons
              name="people-outline"
              size={14}
              color={COLORS.textSecondary}
            />
            <Text style={styles.detailText}>Max {tour.maxGuests}</Text>
          </View>
        </View>

        {showVendor && vendor && (
          <TouchableOpacity
            style={styles.vendorContainer}
            onPress={onVendorPress}
            activeOpacity={0.7}
          >
            <View style={styles.vendorInfo}>
              {vendor.logo && (
                <Image
                  source={{ uri: vendor.logo }}
                  style={styles.vendorLogo}
                />
              )}
              <View style={styles.vendorDetails}>
                <Text style={styles.vendorName}>{vendor.businessName}</Text>
                <View style={styles.vendorMeta}>
                  <View style={styles.vendorRating}>
                    <Ionicons name="star" size={12} color={COLORS.warning} />
                    <Text style={styles.vendorRatingText}>{vendor.rating}</Text>
                  </View>
                </View>
              </View>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={COLORS.textSecondary}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius * 2,
    marginHorizontal: SIZES.padding,
    marginVertical: SIZES.base,
    elevation: 4,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    width: CARD_WIDTH,
  },
  imageContainer: {
    position: "relative",
    height: 200,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  priceContainer: {
    position: "absolute",
    top: SIZES.padding,
    right: SIZES.padding,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: SIZES.radius,
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    // fontFamily: FONTS.bold,
    fontWeight: "700",
    color: COLORS.primary,
  },
  originalPrice: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textDecorationLine: "line-through",
    marginLeft: 4,
  },
  ratingContainer: {
    position: "absolute",
    bottom: SIZES.padding,
    right: SIZES.padding,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: SIZES.radius,
  },
  rating: {
    color: COLORS.surface,
    fontSize: 12,
    // fontFamily: FONTS.medium,
    marginLeft: 4,
  },
  wishlistButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: SIZES.padding,
  },
  title: {
    fontSize: 18,
    // fontFamily: FONTS.bold,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  location: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 4,
    flex: 1,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  detailText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  vendorContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 8,
    marginTop: 8,
  },
  vendorInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  vendorLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  vendorDetails: {
    flex: 1,
  },
  vendorName: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  vendorMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  vendorRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  vendorRatingText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginLeft: 2,
  },
});
