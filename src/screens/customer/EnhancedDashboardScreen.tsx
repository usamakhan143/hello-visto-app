import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  Dimensions,
  RefreshControl,
  StatusBar,
  Animated,
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
} from "../../utils/responsiveFont";
import { Tour } from "../../types";

const { width, height } = Dimensions.get("window");

// Mock vendors data
const mockVendors = {
  vendor1: {
    id: "vendor-1",
    businessName: "Ahmed's Premium Tours",
    description: "Luxury travel experiences across Switzerland and Europe.",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop&crop=center",
    coverImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=300&fit=crop",
    address: "Zurich, Switzerland",
    phone: "+41 44 123 4567",
    email: "info@ahmedstours.com",
    website: "www.ahmedstours.com",
    rating: 4.8,
    totalReviews: 145,
    totalTours: 24,
    completedBookings: 856,
    memberSince: "2019",
    languages: ["English", "German", "French", "Arabic"],
    specialties: ["Luxury Tours", "Adventure Travel", "Cultural Experiences"],
    certifications: ["Swiss Tourism Certified", "Eco-Tourism Leader"],
  },
  vendor2: {
    id: "vendor-2",
    businessName: "Luxury Island Retreats",
    description: "Exclusive island experiences in tropical destinations.",
    logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=center",
    coverImage:
      "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800&h=300&fit=crop",
    address: "Malé, Maldives",
    phone: "+960 330 5678",
    email: "info@luxuryislands.com",
    website: "www.luxuryislands.com",
    rating: 4.9,
    totalReviews: 289,
    totalTours: 15,
    completedBookings: 567,
    memberSince: "2020",
    languages: ["English", "French", "Hindi"],
    specialties: ["Luxury Resorts", "Water Sports", "Spa Retreats"],
    certifications: ["Maldives Tourism Board Certified"],
  },
  vendor3: {
    id: "vendor-3",
    businessName: "Tokyo Cultural Tours",
    description: "Authentic Japanese cultural experiences.",
    logo: "https://images.unsplash.com/photo-1494790108755-2616b612b524?w=150&h=150&fit=crop&crop=center",
    coverImage:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=300&fit=crop",
    address: "Tokyo, Japan",
    phone: "+81 3 1234 5678",
    email: "info@tokyoculture.com",
    website: "www.tokyoculture.com",
    rating: 4.7,
    totalReviews: 156,
    totalTours: 18,
    completedBookings: 423,
    memberSince: "2018",
    languages: ["English", "Japanese", "Korean"],
    specialties: ["Cultural Tours", "Food Experiences", "Traditional Arts"],
    certifications: [
      "Japan Tourism Agency Certified",
      "Cultural Heritage Guide",
    ],
  },
};

// Enhanced tour data with better images
const premiumTours: Tour[] = [
  {
    id: "1",
    vendorId: "vendor1",
    title: "Swiss Alps Luxury Retreat",
    description:
      "Experience breathtaking Alpine views in five-star luxury with private helicopter transfers",
    price: 2899,
    discountPrice: 3299,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551524164-d526cea72de2?w=800&h=600&fit=crop",
    ],
    duration: 7,
    maxGuests: 6,
    location: {
      address: "Zermatt, Switzerland",
      latitude: 46.0207,
      longitude: 7.7491,
    },
    startDate: new Date(),
    endDate: new Date(),
    includes: [
      "Helicopter Transfer",
      "5-Star Resort",
      "All Meals",
      "Private Guide",
    ],
    excludes: [],
    itinerary: [],
    rating: 4.9,
    totalReviews: 347,
    isActive: true,
    isApproved: true,
    cancellationPolicy: "",
    createdAt: new Date(),
  },
  {
    id: "2",
    vendorId: "vendor2",
    title: "Maldives Overwater Paradise",
    description:
      "Ultimate luxury in private overwater villas with butler service and world-class spa",
    price: 4199,
    discountPrice: 4899,
    images: [
      "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&h=600&fit=crop",
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
    includes: [
      "Overwater Villa",
      "Butler Service",
      "Spa Treatments",
      "Water Sports",
    ],
    excludes: [],
    itinerary: [],
    rating: 4.8,
    totalReviews: 289,
    isActive: true,
    isApproved: true,
    cancellationPolicy: "",
    createdAt: new Date(),
  },
  {
    id: "3",
    vendorId: "vendor3",
    title: "Tokyo Cultural Experience",
    description:
      "Immerse in authentic Japanese culture with traditional ryokan stays and exclusive experiences",
    price: 1899,
    images: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
    ],
    duration: 6,
    maxGuests: 4,
    location: {
      address: "Tokyo, Japan",
      latitude: 35.6762,
      longitude: 139.6503,
    },
    startDate: new Date(),
    endDate: new Date(),
    includes: [
      "Ryokan Stay",
      "Tea Ceremony",
      "Private Tours",
      "Cultural Workshops",
    ],
    excludes: [],
    itinerary: [],
    rating: 4.7,
    totalReviews: 156,
    isActive: true,
    isApproved: true,
    cancellationPolicy: "",
    createdAt: new Date(),
  },
];

const trendingDestinations = [
  {
    id: "1",
    name: "Santorini",
    country: "Greece",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop",
    tours: 24,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Bali",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=600&h=400&fit=crop",
    tours: 31,
    rating: 4.7,
  },
  {
    id: "3",
    name: "Dubai",
    country: "UAE",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop",
    tours: 18,
    rating: 4.9,
  },
];

const categories = [
  {
    id: "1",
    name: "Luxury",
    icon: "diamond-outline",
    color: COLORS.primary,
    gradient: [COLORS.primary, COLORS.primaryLight],
  },
  {
    id: "2",
    name: "Adventure",
    icon: "trail-sign-outline",
    color: COLORS.secondary,
    gradient: [COLORS.secondary, COLORS.secondaryLight],
  },
  {
    id: "3",
    name: "Culture",
    icon: "library-outline",
    color: COLORS.accent,
    gradient: [COLORS.accent, COLORS.accentLight],
  },
  {
    id: "4",
    name: "Beach",
    icon: "sunny-outline",
    color: COLORS.warning,
    gradient: [COLORS.warning, COLORS.warningLight],
  },
  {
    id: "5",
    name: "City",
    icon: "business-outline",
    color: COLORS.info,
    gradient: [COLORS.info, COLORS.infoLight],
  },
  {
    id: "6",
    name: "Wellness",
    icon: "leaf-outline",
    color: COLORS.success,
    gradient: [COLORS.success, COLORS.successLight],
  },
];

interface DashboardScreenProps {
  navigation: any;
}

export default function EnhancedDashboardScreen({
  navigation,
}: DashboardScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: "clamp",
  });

  const renderCategory = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        selectedCategory === item.id && styles.selectedCategoryCard,
      ]}
      onPress={() =>
        setSelectedCategory(selectedCategory === item.id ? "" : item.id)
      }
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={
          selectedCategory === item.id
            ? item.gradient
            : ["transparent", "transparent"]
        }
        style={styles.categoryGradient}
      >
        <View
          style={[
            styles.categoryIcon,
            {
              backgroundColor:
                selectedCategory === item.id
                  ? "rgba(255,255,255,0.2)"
                  : `${item.color}15`,
            },
          ]}
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
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderPremiumTour = ({
    item,
    index,
  }: {
    item: Tour;
    index: number;
  }) => (
    <TouchableOpacity
      style={[styles.premiumTourCard, index === 0 && styles.firstTourCard]}
      onPress={() => navigation.navigate("TourDetails", { tour: item })}
      activeOpacity={0.9}
    >
      <View style={styles.tourImageContainer}>
        <Image source={{ uri: item.images[0] }} style={styles.tourImage} />

        {/* Premium Badge */}
        <View style={styles.premiumBadge}>
          <LinearGradient
            colors={[COLORS.warning, COLORS.warningLight]}
            style={styles.premiumBadgeGradient}
          >
            <Ionicons name="star" size={12} color={COLORS.white} />
            <Text style={styles.premiumBadgeText}>PREMIUM</Text>
          </LinearGradient>
        </View>

        {/* Price Section */}
        <BlurView intensity={80} style={styles.priceSection}>
          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>${item.price}</Text>
            {item.discountPrice && (
              <Text style={styles.originalPrice}>${item.discountPrice}</Text>
            )}
          </View>
          <Text style={styles.priceLabel}>per person</Text>
        </BlurView>
      </View>

      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.tourContentOverlay}
      >
        <View style={styles.tourContent}>
          {/* Rating Badge */}
          <View style={styles.inlineRatingContainer}>
            <BlurView intensity={80} style={styles.ratingBadge}>
              <Ionicons name="star" size={14} color={COLORS.warning} />
              <Text style={styles.ratingText}>{item.rating}</Text>
              <Text style={styles.reviewCount}>({item.totalReviews})</Text>
            </BlurView>
          </View>

          <Text style={styles.tourTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.tourDescription} numberOfLines={2}>
            {item.description}
          </Text>

          <View style={styles.tourMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="location" size={14} color={COLORS.white} />
              <Text style={styles.metaText}>{item.location.address}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="time" size={14} color={COLORS.white} />
              <Text style={styles.metaText}>{item.duration} days</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="people" size={14} color={COLORS.white} />
              <Text style={styles.metaText}>Max {item.maxGuests}</Text>
            </View>
          </View>

          <View style={styles.tourFeatures}>
            {item.includes.slice(0, 2).map((feature, idx) => (
              <View key={idx} style={styles.featureTag}>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          {/* Vendor Info */}
          {mockVendors[item.vendorId as keyof typeof mockVendors] && (
            <TouchableOpacity
              style={styles.vendorSection}
              onPress={() =>
                navigation.navigate("VendorProfile", {
                  vendor:
                    mockVendors[item.vendorId as keyof typeof mockVendors],
                })
              }
              activeOpacity={0.7}
            >
              <Image
                source={{
                  uri: mockVendors[item.vendorId as keyof typeof mockVendors]
                    .logo,
                }}
                style={styles.vendorLogo}
              />
              <View style={styles.vendorInfo}>
                <Text style={styles.vendorName} numberOfLines={1}>
                  {
                    mockVendors[item.vendorId as keyof typeof mockVendors]
                      .businessName
                  }
                </Text>
                <View style={styles.vendorMeta}>
                  <Ionicons name="star" size={12} color={COLORS.warning} />
                  <Text style={styles.vendorRating}>
                    {
                      mockVendors[item.vendorId as keyof typeof mockVendors]
                        .rating
                    }
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color={COLORS.white} />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderTrendingDestination = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.destinationCard}
      activeOpacity={0.8}
      onPress={() => navigation.navigate("Search", { destination: item.name })}
    >
      <Image source={{ uri: item.image }} style={styles.destinationImage} />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)"]}
        style={styles.destinationOverlay}
      >
        <View style={styles.destinationContent}>
          <Text style={styles.destinationName}>{item.name}</Text>
          <Text style={styles.destinationCountry}>{item.country}</Text>
          <View style={styles.destinationMeta}>
            <View style={styles.destinationRating}>
              <Ionicons name="star" size={12} color={COLORS.warning} />
              <Text style={styles.destinationRatingText}>{item.rating}</Text>
            </View>
            <Text style={styles.destinationTours}>{item.tours} tours</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.white}
        translucent={false}
        hidden={false}
      />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
      >
        {/* Enhanced Header */}
        <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
          <LinearGradient
            colors={[COLORS.white, COLORS.gray50]}
            style={styles.headerGradient}
          >
            <SafeAreaView style={styles.headerContent}>
              <View style={styles.headerTop}>
                <View style={styles.userSection}>
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                    }}
                    style={styles.userAvatar}
                  />
                  <View style={styles.userInfo}>
                    <Text style={styles.greeting} {...ACCESSIBLE_TEXT_PROPS.sm}>
                      Good morning
                    </Text>
                    <Text style={styles.userName} {...ACCESSIBLE_TEXT_PROPS.xl}>
                      Ahmed Riaz
                    </Text>
                    <View style={styles.userBadge}>
                      <Ionicons
                        name="diamond"
                        size={12}
                        color={COLORS.warning}
                      />
                      <Text
                        style={styles.userLevel}
                        {...ACCESSIBLE_TEXT_PROPS.xs}
                      >
                        Premium
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.headerActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons
                      name="search"
                      size={24}
                      color={COLORS.textPrimary}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => navigation.navigate("Notifications")}
                  >
                    <Ionicons
                      name="notifications"
                      size={24}
                      color={COLORS.textPrimary}
                    />
                    <View style={styles.notificationDot} />
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
          </LinearGradient>
        </Animated.View>

        {/* Premium Search Section */}
        <View style={styles.searchSection}>
          <Card variant="elevated" style={styles.searchCard}>
            <Text style={styles.searchTitle} {...ACCESSIBLE_TEXT_PROPS.lg}>
              Where will your next adventure take you?
            </Text>
            <TouchableOpacity
              style={styles.searchContainer}
              onPress={() => navigation.navigate("Search")}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.primaryLight]}
                style={styles.searchGradient}
              >
                <Ionicons name="search" size={20} color={COLORS.white} />
                <Text
                  style={styles.searchPlaceholder}
                  {...ACCESSIBLE_TEXT_PROPS.base}
                >
                  Discover amazing destinations...
                </Text>
                <Ionicons name="options" size={20} color={COLORS.white} />
              </LinearGradient>
            </TouchableOpacity>
          </Card>
        </View>

        {/* Enhanced Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statsContainer}>
            {[
              {
                icon: "airplane",
                value: "24+",
                label: "Countries",
                color: COLORS.primary,
              },
              {
                icon: "calendar",
                value: "5",
                label: "Upcoming",
                color: COLORS.secondary,
              },
              {
                icon: "star",
                value: "4.9",
                label: "Your Rating",
                color: COLORS.warning,
              },
              {
                icon: "heart",
                value: "12",
                label: "Saved",
                color: COLORS.error,
              },
            ].map((stat, index) => (
              <Card key={index} variant="elevated" style={styles.statCard}>
                <LinearGradient
                  colors={[`${stat.color}15`, `${stat.color}05`]}
                  style={styles.statGradient}
                >
                  <View
                    style={[
                      styles.statIcon,
                      { backgroundColor: `${stat.color}20` },
                    ]}
                  >
                    <Ionicons
                      name={stat.icon as any}
                      size={24}
                      color={stat.color}
                    />
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </LinearGradient>
              </Card>
            ))}
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Explore by Category</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Search", { category: "all" })}
            >
              <Text style={styles.seeAllButton}>View All</Text>
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

        {/* Premium Tours Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Premium Experiences</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Search", { category: "premium" })
              }
            >
              <Text style={styles.seeAllButton}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={premiumTours}
            renderItem={renderPremiumTour}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.toursList}
            snapToInterval={width * 0.85}
            decelerationRate="fast"
          />
        </View>

        {/* Trending Destinations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Destinations</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Search", { category: "destinations" })
              }
            >
              <Text style={styles.seeAllButton}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={trendingDestinations}
            renderItem={renderTrendingDestination}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.destinationsList}
          />
        </View>

        {/* Enhanced Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {[
              {
                title: "My Bookings",
                icon: "calendar",
                color: COLORS.primary,
                screen: "MyBookings",
              },
              {
                title: "Wishlist",
                icon: "heart",
                color: COLORS.error,
                screen: "Favorites",
              },
              {
                title: "Rewards",
                icon: "gift",
                color: COLORS.secondary,
                screen: "Rewards",
              },

              {
                title: "Profile",
                icon: "person",
                color: COLORS.accent,
                screen: "Profile",
              },
            ].map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionCard}
                onPress={() => navigation.navigate(action.screen)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[`${action.color}15`, `${action.color}05`]}
                  style={styles.quickActionGradient}
                >
                  <View
                    style={[
                      styles.quickActionIcon,
                      { backgroundColor: `${action.color}20` },
                    ]}
                  >
                    <Ionicons
                      name={action.icon as any}
                      size={24}
                      color={action.color}
                    />
                  </View>
                  <Text style={styles.quickActionText}>{action.title}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaCard}>
          <ImageBackground
            source={{
              uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
            }}
            style={styles.ctaBackground}
            imageStyle={styles.ctaBackgroundImage}
          >
            <LinearGradient
              colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.6)"]}
              style={styles.ctaOverlay}
            >
              <View style={styles.ctaContent}>
                <Ionicons
                  name="compass-outline"
                  size={48}
                  color={COLORS.white}
                  style={styles.ctaIcon}
                />
                <Text style={styles.ctaTitle}>
                  Ready for your next adventure?
                </Text>
                <Text style={styles.ctaDescription}>
                  Discover breathtaking destinations and create memories that
                  last a lifetime
                </Text>
                <TouchableOpacity
                  style={styles.ctaButton}
                  onPress={() => navigation.navigate("Search")}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={[COLORS.white, "#f8f9fa"]}
                    style={styles.ctaButtonGradient}
                  >
                    <Text style={styles.ctaButtonText}>Start Exploring</Text>
                    <Ionicons
                      name="arrow-forward"
                      size={20}
                      color={COLORS.primary}
                    />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

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
  header: {
    marginBottom: SPACING.lg,
  },
  headerGradient: {
    paddingBottom: SPACING.lg,
  },
  headerContent: {
    paddingHorizontal: SPACING.lg,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SPACING.lg,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  userAvatar: {
    width: responsiveSize(60),
    height: responsiveSize(60),
    borderRadius: RADIUS.full,
    marginRight: responsiveSpacing(SPACING.base),
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: responsiveFont(FONT_SIZES.sm),
    // fontFamily: FONTS.medium,
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHTS.medium,
  },
  userName: {
    fontSize: responsiveFont(FONT_SIZES.xl),
    // fontFamily: FONTS.bold,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: responsiveSpacing(SPACING.xs),
  },
  userBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `${COLORS.warning}15`,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.md,
    alignSelf: "flex-start",
  },
  userLevel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.warning,
    fontWeight: FONT_WEIGHTS.semiBold,
    marginLeft: SPACING.xs,
  },
  headerActions: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.sm,
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.error,
  },

  searchSection: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    marginTop: -80,
  },
  searchCard: {
    padding: SPACING.lg,
  },
  searchTitle: {
    fontSize: responsiveFont(FONT_SIZES.lg),
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: responsiveSpacing(SPACING.base),
    textAlign: "center",
  },
  searchContainer: {
    borderRadius: RADIUS.lg,
    overflow: "hidden",
  },
  searchGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.base,
    gap: SPACING.base,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: responsiveFont(FONT_SIZES.base),
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.medium,
  },
  statsSection: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  statsContainer: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  statCard: {
    flex: 1,
    padding: 0,
    overflow: "hidden",
  },
  statGradient: {
    alignItems: "center",
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.sm,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
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
    textAlign: "center",
  },
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: responsiveFont(FONT_SIZES.xl),
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
  },
  seeAllButton: {
    fontSize: responsiveFont(FONT_SIZES.sm),
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  categoriesList: {
    paddingRight: SPACING.lg,
  },
  categoryCard: {
    marginRight: SPACING.base,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    minWidth: 100,
  },
  selectedCategoryCard: {
    transform: [{ scale: 1.05 }],
  },
  categoryGradient: {
    alignItems: "center",
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.base,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.sm,
  },
  categoryText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  selectedCategoryText: {
    color: COLORS.white,
  },
  toursList: {
    paddingRight: SPACING.lg,
  },
  premiumTourCard: {
    width: width * 0.8,
    height: 400,
    marginRight: SPACING.lg,
    borderRadius: RADIUS.xl,
    overflow: "hidden",
    ...SHADOWS.lg,
  },
  firstTourCard: {
    marginLeft: 0,
  },
  tourImageContainer: {
    flex: 1,
    position: "relative",
  },
  tourImage: {
    width: "100%",
    height: "100%",
  },
  premiumBadge: {
    position: "absolute",
    top: SPACING.base,
    left: SPACING.base,
    borderRadius: RADIUS.md,
    overflow: "hidden",
  },
  premiumBadgeGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    gap: SPACING.xs,
  },
  premiumBadgeText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.bold,
  },
  priceSection: {
    position: "absolute",
    top: SPACING.base,
    right: SPACING.base,
    borderRadius: RADIUS.md,
    overflow: "hidden",
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  currentPrice: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
  },
  originalPrice: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.white,
    textDecorationLine: "line-through",
    opacity: 0.7,
  },
  priceLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.white,
    opacity: 0.8,
    textAlign: "center",
  },
  inlineRatingContainer: {
    alignSelf: "flex-start",
    marginBottom: SPACING.sm,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.md,
    gap: SPACING.xs,
  },
  ratingText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
  },
  reviewCount: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.white,
    opacity: 0.8,
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
    padding: SPACING.lg,
  },
  tourTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    marginBottom: SPACING.sm,
  },
  tourDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: SPACING.base,
    lineHeight: FONT_SIZES.sm * 1.4,
  },
  tourMeta: {
    flexDirection: "row",
    gap: SPACING.lg,
    marginBottom: SPACING.base,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  metaText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.white,
    opacity: 0.9,
  },
  tourFeatures: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  featureTag: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.md,
  },
  featureText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.medium,
  },
  vendorSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
  },
  vendorLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: SPACING.sm,
  },
  vendorInfo: {
    flex: 1,
  },
  vendorName: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.medium,
    marginBottom: 2,
  },
  vendorMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  vendorRating: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.white,
    marginLeft: 2,
    opacity: 0.9,
  },
  vendorResponse: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.white,
    opacity: 0.7,
    marginLeft: 4,
  },
  destinationsList: {
    paddingRight: SPACING.lg,
  },
  destinationCard: {
    width: 200,
    height: 150,
    marginRight: SPACING.base,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    ...SHADOWS.md,
  },
  destinationImage: {
    width: "100%",
    height: "100%",
  },
  destinationOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "70%",
  },
  destinationContent: {
    flex: 1,
    justifyContent: "flex-end",
    padding: SPACING.base,
  },
  destinationName: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
  },
  destinationCountry: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.white,
    opacity: 0.8,
    marginBottom: SPACING.sm,
  },
  destinationMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  destinationRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  destinationRatingText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  destinationTours: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.white,
    opacity: 0.8,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.base,
    marginTop: SPACING.base,
  },
  quickActionCard: {
    width: (width - SPACING.lg * 2 - SPACING.base) / 2,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    ...SHADOWS.sm,
  },
  quickActionGradient: {
    alignItems: "center",
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.base,
    backgroundColor: COLORS.surface,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.lg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.base,
  },
  quickActionText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  ctaCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: 80,
    borderRadius: RADIUS.xl,
    overflow: "hidden",
    ...SHADOWS.lg,
  },
  ctaBackground: {
    height: 280,
    justifyContent: "center",
  },
  ctaBackgroundImage: {
    borderRadius: RADIUS.xl,
  },
  ctaOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ctaContent: {
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
  },
  ctaIcon: {
    marginBottom: SPACING.lg,
    opacity: 0.9,
  },
  ctaTitle: {
    fontSize: FONT_SIZES["2xl"],
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    textAlign: "center",
    marginBottom: SPACING.base,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  ctaDescription: {
    fontSize: FONT_SIZES.base,
    color: COLORS.white,
    textAlign: "center",
    opacity: 0.95,
    marginBottom: SPACING.xl,
    lineHeight: FONT_SIZES.base * 1.6,
    maxWidth: "85%",
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  ctaButton: {
    borderRadius: RADIUS.full,
    overflow: "hidden",
    ...SHADOWS.md,
  },
  ctaButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.base,
    gap: SPACING.sm,
  },
  ctaButtonText: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.primary,
  },
  bottomSpacer: {
    height: SPACING["4xl"],
  },
});
