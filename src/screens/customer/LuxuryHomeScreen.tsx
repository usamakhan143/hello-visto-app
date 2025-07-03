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
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import Logo from "../../components/common/Logo";
import Button from "../../components/common/Button";
import PremiumCard from "../../components/common/PremiumCard";
import GradientBackground from "../../components/common/GradientBackground";
import { COLORS, SIZES, FONTS, FONT_SIZES } from "../../constants";
import { Tour } from "../../types";

const { width } = Dimensions.get("window");

// Premium mock data with luxury destinations
const mockTours: Tour[] = [
  {
    id: "1",
    vendorId: "vendor1",
    title: "Swiss Alps Luxury Retreat",
    description:
      "Experience the ultimate alpine luxury with private chalets, helicopter tours, and Michelin-starred dining.",
    price: 2899,
    discountPrice: 3499,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
    ],
    duration: 7,
    maxGuests: 4,
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
    title: "Maldives Overwater Villa",
    description:
      "Private overwater villa with personal butler, world-class spa, and exclusive beach access.",
    price: 1999,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
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

const luxuryCategories = [
  {
    id: "1",
    name: "Luxury Resorts",
    icon: "diamond-outline",
    gradient: [COLORS.primary, COLORS.secondary],
  },
  {
    id: "2",
    name: "Private Jets",
    icon: "airplane-outline",
    gradient: [COLORS.accent, COLORS.primary],
  },
  {
    id: "3",
    name: "Yacht Charters",
    icon: "boat-outline",
    gradient: [COLORS.secondary, COLORS.gradientEnd],
  },
  {
    id: "4",
    name: "Wine Tours",
    icon: "wine-outline",
    gradient: [COLORS.gradientStart, COLORS.accent],
  },
  {
    id: "5",
    name: "Adventure",
    icon: "trail-sign-outline",
    gradient: [COLORS.gradientMiddle, COLORS.gradientEnd],
  },
];

interface HomeScreenProps {
  navigation: any;
}

export default function LuxuryHomeScreen({ navigation }: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const renderCategory = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.selectedCategoryItem,
      ]}
      onPress={() =>
        setSelectedCategory(selectedCategory === item.id ? "" : item.id)
      }
    >
      <LinearGradient
        colors={item.gradient}
        style={styles.categoryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons name={item.icon} size={24} color={COLORS.textWhite} />
        <Text style={styles.categoryText}>{item.name}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderTour = ({ item }: { item: Tour }) => (
    <PremiumCard variant="luxury" style={styles.tourCard}>
      <ImageBackground
        source={{ uri: item.images[0] }}
        style={styles.tourImage}
        imageStyle={styles.tourImageStyle}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.tourOverlay}
        />

        {/* Price Badge */}
        <BlurView intensity={20} style={styles.priceContainer}>
          <Text style={styles.price}>${item.price}</Text>
          {item.discountPrice && (
            <Text style={styles.originalPrice}>${item.discountPrice}</Text>
          )}
        </BlurView>

        {/* Rating Badge */}
        <BlurView intensity={20} style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color={COLORS.gold} />
          <Text style={styles.rating}>{item.rating}</Text>
        </BlurView>

        {/* Tour Info */}
        <View style={styles.tourInfo}>
          <Text style={styles.tourTitle}>{item.title}</Text>
          <View style={styles.tourDetails}>
            <View style={styles.tourDetail}>
              <Ionicons
                name="location-outline"
                size={14}
                color={COLORS.textWhite}
              />
              <Text style={styles.tourDetailText}>{item.location.address}</Text>
            </View>
            <View style={styles.tourDetail}>
              <Ionicons
                name="time-outline"
                size={14}
                color={COLORS.textWhite}
              />
              <Text style={styles.tourDetailText}>{item.duration} days</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </PremiumCard>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Premium Header */}
        <GradientBackground variant="luxury" style={styles.header}>
          <BlurView intensity={10} style={styles.headerContent}>
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
                <BlurView intensity={20} style={styles.notificationBlur}>
                  <Ionicons
                    name="notifications-outline"
                    size={24}
                    color={COLORS.textWhite}
                  />
                  <View style={styles.notificationBadge} />
                </BlurView>
              </TouchableOpacity>
            </View>

            <Logo size="medium" variant="white" style={styles.logo} />

            {/* Premium Search Bar */}
            <BlurView intensity={20} style={styles.searchContainer}>
              <Ionicons
                name="search-outline"
                size={20}
                color={COLORS.textWhite}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Where would you like to explore?"
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onFocus={() => navigation.navigate("Search")}
              />
              <TouchableOpacity style={styles.filterButton}>
                <Ionicons
                  name="options-outline"
                  size={20}
                  color={COLORS.textWhite}
                />
              </TouchableOpacity>
            </BlurView>
          </BlurView>
        </GradientBackground>

        {/* Luxury Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Luxury Experiences</Text>
          <FlatList
            data={luxuryCategories}
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
            <Text style={styles.sectionTitle}>Exclusive Destinations</Text>
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

        {/* Premium Services */}
        <PremiumCard variant="luxury" style={styles.servicesCard}>
          <Text style={styles.servicesTitle}>Premium Services</Text>
          <Text style={styles.servicesDescription}>
            Concierge planning, private transfers, and 24/7 luxury support
          </Text>
          <View style={styles.servicesList}>
            {[
              { icon: "car-outline", title: "Private Transfers" },
              { icon: "restaurant-outline", title: "Fine Dining" },
              { icon: "bed-outline", title: "Luxury Hotels" },
              { icon: "chatbubble-outline", title: "Concierge" },
            ].map((service, index) => (
              <View key={index} style={styles.serviceItem}>
                <View style={styles.serviceIcon}>
                  <Ionicons
                    name={service.icon}
                    size={24}
                    color={COLORS.primary}
                  />
                </View>
                <Text style={styles.serviceTitle}>{service.title}</Text>
              </View>
            ))}
          </View>
        </PremiumCard>
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
    paddingBottom: SIZES.xxl,
    borderBottomLeftRadius: SIZES.radiusXL,
    borderBottomRightRadius: SIZES.radiusXL,
  },
  headerContent: {
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.lg,
  },
  userSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.lg,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: SIZES.md,
    borderWidth: 2,
    borderColor: COLORS.textWhite,
  },
  greeting: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textWhite,
    opacity: 0.9,
  },
  userName: {
    fontSize: FONT_SIZES.lg,
    // fontFamily: FONTS.bold,
    fontWeight: "700",
    color: COLORS.textWhite,
  },
  notificationButton: {
    position: "relative",
  },
  notificationBlur: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
  },
  logo: {
    alignSelf: "center",
    marginBottom: SIZES.lg,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: SIZES.radiusLarge,
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.md,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  searchInput: {
    flex: 1,
    marginLeft: SIZES.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.textWhite,
    // fontFamily: FONTS.medium,
  },
  filterButton: {
    padding: SIZES.xs,
  },
  section: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    // fontFamily: FONTS.bold,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: SIZES.md,
  },
  seeAllText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    // fontFamily: FONTS.semiBold,
  },
  categoriesList: {
    paddingRight: SIZES.padding,
  },
  categoryItem: {
    marginRight: SIZES.md,
    borderRadius: SIZES.radiusLarge,
    overflow: "hidden",
  },
  selectedCategoryItem: {
    transform: [{ scale: 1.05 }],
  },
  categoryGradient: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    alignItems: "center",
    minWidth: 100,
  },
  categoryText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textWhite,
    marginTop: SIZES.xs,
    textAlign: "center",
    // fontFamily: FONTS.semiBold,
  },
  toursList: {
    paddingRight: SIZES.padding,
  },
  tourCard: {
    width: width * 0.8,
    height: 280,
    marginRight: SIZES.md,
    padding: 0,
    overflow: "hidden",
  },
  tourImage: {
    flex: 1,
    justifyContent: "space-between",
  },
  tourImageStyle: {
    borderRadius: SIZES.radiusLarge,
  },
  tourOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  priceContainer: {
    position: "absolute",
    top: SIZES.md,
    right: SIZES.md,
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.radius,
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: FONT_SIZES.md,
    // fontFamily: FONTS.bold,
    fontWeight: "700",
    color: COLORS.textWhite,
  },
  originalPrice: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textWhite,
    textDecorationLine: "line-through",
    marginLeft: SIZES.xs,
    opacity: 0.7,
  },
  ratingContainer: {
    position: "absolute",
    top: SIZES.md,
    left: SIZES.md,
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.radius,
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZES.sm,
    // fontFamily: FONTS.semiBold,
    marginLeft: SIZES.xs,
  },
  tourInfo: {
    padding: SIZES.md,
  },
  tourTitle: {
    fontSize: FONT_SIZES.lg,
    // fontFamily: FONTS.bold,
    fontWeight: "700",
    color: COLORS.textWhite,
    marginBottom: SIZES.sm,
  },
  tourDetails: {
    gap: SIZES.xs,
  },
  tourDetail: {
    flexDirection: "row",
    alignItems: "center",
  },
  tourDetailText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textWhite,
    marginLeft: SIZES.xs,
    opacity: 0.9,
  },
  servicesCard: {
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.xl,
  },
  servicesTitle: {
    fontSize: FONT_SIZES.xl,
    // fontFamily: FONTS.bold,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: SIZES.sm,
  },
  servicesDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SIZES.lg,
    lineHeight: 20,
  },
  servicesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceItem: {
    width: "48%",
    alignItems: "center",
    marginBottom: SIZES.md,
  },
  serviceIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: `${COLORS.primary}10`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SIZES.sm,
  },
  serviceTitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
    // fontFamily: FONTS.semiBold,
    textAlign: "center",
  },
});
