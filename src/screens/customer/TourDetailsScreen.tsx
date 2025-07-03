import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import {
  COLORS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SPACING,
  RADIUS,
} from "../../constants";
import { Tour } from "../../types";

const { width, height } = Dimensions.get("window");

interface TourDetailsScreenProps {
  navigation: any;
  route: {
    params: {
      tour?: Tour;
    };
  };
}

export default function TourDetailsScreen({
  navigation,
  route,
}: TourDetailsScreenProps) {
  const tour = route.params?.tour || {
    id: "1",
    vendorId: "vendor1",
    title: "Swiss Alps Adventure",
    description:
      "Experience breathtaking mountain views, luxury accommodations, and authentic Alpine culture in this unforgettable 7-day journey.",
    price: 1299,
    discountPrice: 1599,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1551524164-6cf6ac833fb4?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    ],
    duration: 7,
    maxGuests: 8,
    location: {
      address: "Zermatt, Switzerland",
      latitude: 46.0207,
      longitude: 7.7491,
    },
    rating: 4.9,
    totalReviews: 247,
  };

  // Mock vendor data - same as in EnhancedDashboardScreen
  const mockVendor = {
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
    responseTime: "< 2 hours",
    memberSince: "2019",
    languages: ["English", "German", "French", "Arabic"],
    specialties: ["Luxury Tours", "Adventure Travel", "Cultural Experiences"],
    certifications: ["Swiss Tourism Certified", "Eco-Tourism Leader"],
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleCall = () => {
    Linking.openURL(`tel:${mockVendor.phone}`);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in the "${tour.title}" tour. Can you provide more details?`,
    );
    Linking.openURL(
      `https://wa.me/${mockVendor.phone.replace(/[^0-9]/g, "")}?text=${message}`,
    );
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Inquiry about ${tour.title} tour`);
    const body = encodeURIComponent(
      `Hi,\n\nI'm interested in booking the "${tour.title}" tour. Could you please provide more information?\n\nThank you!`,
    );
    Linking.openURL(
      `mailto:${mockVendor.email}?subject=${subject}&body=${body}`,
    );
  };

  const tabs = [
    { id: "overview", title: "Overview" },
    { id: "itinerary", title: "Itinerary" },
    { id: "reviews", title: "Reviews" },
  ];

  const includes = [
    "Professional mountain guide",
    "Luxury alpine accommodation",
    "All meals and beverages",
    "Transportation and transfers",
    "Professional photography session",
    "Equipment and safety gear",
  ];

  const excludes = [
    "International flights",
    "Travel insurance",
    "Personal expenses",
    "Gratuities",
    "Spa treatments",
  ];

  const itinerary = [
    {
      day: 1,
      title: "Arrival in Zermatt",
      description:
        "Welcome reception, hotel check-in, and orientation dinner with stunning Matterhorn views.",
      activities: [
        "Airport transfer",
        "Hotel check-in",
        "Welcome dinner",
        "Evening briefing",
      ],
    },
    {
      day: 2,
      title: "Alpine Adventure",
      description:
        "Full day hiking excursion with professional guide to discover hidden mountain trails.",
      activities: [
        "Mountain hiking",
        "Cable car ride",
        "Alpine lunch",
        "Photography session",
      ],
    },
    {
      day: 3,
      title: "Cultural Immersion",
      description:
        "Explore local villages, traditional crafts, and authentic Swiss culture.",
      activities: [
        "Village tour",
        "Craft workshop",
        "Local cuisine",
        "Cultural show",
      ],
    },
  ];

  const reviews = [
    {
      id: "1",
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "Absolutely incredible experience! The views were breathtaking and the guide was amazing.",
      date: "2 weeks ago",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100",
    },
    {
      id: "2",
      name: "Michael Chen",
      rating: 5,
      comment:
        "Perfect organization and unforgettable memories. Highly recommend this tour!",
      date: "1 month ago",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    },
  ];

  const renderImage = ({ item, index }: { item: string; index: number }) => (
    <Image source={{ uri: item }} style={styles.tourImage} resizeMode="cover" />
  );

  const renderTab = (tab: any) => (
    <TouchableOpacity
      key={tab.id}
      style={[styles.tab, selectedTab === tab.id && styles.activeTab]}
      onPress={() => setSelectedTab(tab.id)}
    >
      <Text
        style={[styles.tabText, selectedTab === tab.id && styles.activeTabText]}
      >
        {tab.title}
      </Text>
    </TouchableOpacity>
  );

  const renderOverview = () => (
    <View style={styles.tabContent}>
      <Text style={styles.description}>{tour.description}</Text>

      {/* Agency/Vendor Info Section */}
      <Card variant="elevated" style={styles.agencyCard}>
        <TouchableOpacity
          style={styles.agencyHeader}
          onPress={() =>
            navigation.navigate("VendorProfile", { vendor: mockVendor })
          }
          activeOpacity={0.7}
        >
          <View style={styles.agencyInfo}>
            <Image
              source={{ uri: mockVendor.logo }}
              style={styles.agencyLogo}
            />
            <View style={styles.agencyDetails}>
              <Text style={styles.agencyLabel}>Tour by</Text>
              <Text style={styles.agencyName}>{mockVendor.businessName}</Text>
              <View style={styles.agencyMeta}>
                <View style={styles.agencyRating}>
                  <Ionicons name="star" size={14} color={COLORS.warning} />
                  <Text style={styles.agencyRatingText}>
                    {mockVendor.rating}
                  </Text>
                  <Text style={styles.agencyReviewCount}>
                    ({mockVendor.totalReviews} reviews)
                  </Text>
                </View>
                <Text style={styles.agencyResponse}>
                  • {mockVendor.responseTime}
                </Text>
              </View>
            </View>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={COLORS.textSecondary}
          />
        </TouchableOpacity>

        <View style={styles.agencyStats}>
          <View style={styles.agencyStatItem}>
            <Text style={styles.agencyStatNumber}>{mockVendor.totalTours}</Text>
            <Text style={styles.agencyStatLabel}>Tours</Text>
          </View>
          <View style={styles.agencyStatDivider} />
          <View style={styles.agencyStatItem}>
            <Text style={styles.agencyStatNumber}>
              {mockVendor.completedBookings}
            </Text>
            <Text style={styles.agencyStatLabel}>Bookings</Text>
          </View>
          <View style={styles.agencyStatDivider} />
          <View style={styles.agencyStatItem}>
            <Text style={styles.agencyStatNumber}>
              {mockVendor.memberSince}
            </Text>
            <Text style={styles.agencyStatLabel}>Since</Text>
          </View>
        </View>

        <View style={styles.agencyActions}>
          <TouchableOpacity
            style={styles.agencyActionButton}
            onPress={handleCall}
          >
            <Ionicons name="call" size={16} color={COLORS.primary} />
            <Text style={styles.agencyActionText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.agencyActionButton}
            onPress={handleWhatsApp}
          >
            <Ionicons name="logo-whatsapp" size={16} color={COLORS.success} />
            <Text style={styles.agencyActionText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.agencyActionButton}
            onPress={handleEmail}
          >
            <Ionicons name="mail" size={16} color={COLORS.accent} />
            <Text style={styles.agencyActionText}>Email</Text>
          </TouchableOpacity>
        </View>
      </Card>

      <Card variant="flat" style={styles.highlightsCard}>
        <Text style={styles.highlightsTitle}>What's Included</Text>
        {includes.map((item, index) => (
          <View key={index} style={styles.highlightItem}>
            <Ionicons
              name="checkmark-circle"
              size={16}
              color={COLORS.success}
            />
            <Text style={styles.highlightText}>{item}</Text>
          </View>
        ))}
      </Card>

      <Card variant="flat" style={styles.highlightsCard}>
        <Text style={styles.highlightsTitle}>What's Not Included</Text>
        {excludes.map((item, index) => (
          <View key={index} style={styles.highlightItem}>
            <Ionicons name="close-circle" size={16} color={COLORS.error} />
            <Text style={styles.highlightText}>{item}</Text>
          </View>
        ))}
      </Card>
    </View>
  );

  const renderItinerary = () => (
    <View style={styles.tabContent}>
      <Text style={styles.itineraryTitle}>Day by Day Plan</Text>
      {itinerary.map((day) => (
        <Card key={day.day} variant="flat" style={styles.itineraryCard}>
          <View style={styles.dayHeader}>
            <View style={styles.dayNumber}>
              <Text style={styles.dayNumberText}>{day.day}</Text>
            </View>
            <Text style={styles.dayTitle}>
              Day {day.day} - {day.title}
            </Text>
          </View>
          <Text style={styles.dayDescription}>{day.description}</Text>
          <View style={styles.activitiesList}>
            {day.activities.map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <Ionicons
                  name="time-outline"
                  size={14}
                  color={COLORS.primary}
                />
                <Text style={styles.activityText}>{activity}</Text>
              </View>
            ))}
          </View>
        </Card>
      ))}
    </View>
  );

  const renderReviews = () => (
    <View style={styles.tabContent}>
      <View style={styles.reviewsHeader}>
        <View style={styles.ratingOverview}>
          <Text style={styles.ratingNumber}>{tour.rating}</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name="star"
                size={16}
                color={
                  star <= Math.floor(tour.rating)
                    ? COLORS.warning
                    : COLORS.border
                }
              />
            ))}
          </View>
          <Text style={styles.reviewCount}>({tour.totalReviews} reviews)</Text>
        </View>
      </View>

      {reviews.map((review) => (
        <Card key={review.id} variant="flat" style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Image
              source={{ uri: review.avatar }}
              style={styles.reviewerAvatar}
            />
            <View style={styles.reviewerInfo}>
              <Text style={styles.reviewerName}>{review.name}</Text>
              <View style={styles.reviewStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons
                    key={star}
                    name="star"
                    size={12}
                    color={
                      star <= review.rating ? COLORS.warning : COLORS.border
                    }
                  />
                ))}
              </View>
              <Text style={styles.reviewDate}>{review.date}</Text>
            </View>
          </View>
          <Text style={styles.reviewText}>{review.comment}</Text>
        </Card>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.white} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, isWishlisted && styles.activeWishlist]}
          onPress={() => setIsWishlisted(!isWishlisted)}
        >
          <Ionicons
            name={isWishlisted ? "heart" : "heart-outline"}
            size={24}
            color={isWishlisted ? COLORS.error : COLORS.white}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.imageContainer}>
          <FlatList
            data={tour.images}
            renderItem={renderImage}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const newIndex = Math.round(
                event.nativeEvent.contentOffset.x / width,
              );
              setCurrentImageIndex(newIndex);
            }}
          />

          {/* Image Indicators */}
          <View style={styles.imageIndicators}>
            {tour.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === currentImageIndex
                    ? styles.activeIndicator
                    : styles.inactiveIndicator,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Tour Info */}
        <View style={styles.content}>
          <Card variant="flat" style={styles.infoCard}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>{tour.title}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color={COLORS.warning} />
                <Text style={styles.rating}>{tour.rating}</Text>
                <Text style={styles.reviewCount}>({tour.totalReviews})</Text>
              </View>
            </View>

            <View style={styles.locationContainer}>
              <Ionicons
                name="location-outline"
                size={16}
                color={COLORS.textSecondary}
              />
              <Text style={styles.location}>{tour.location.address}</Text>
            </View>

            <View style={styles.details}>
              <View style={styles.detailItem}>
                <Ionicons
                  name="time-outline"
                  size={16}
                  color={COLORS.textSecondary}
                />
                <Text style={styles.detailText}>{tour.duration} days</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons
                  name="people-outline"
                  size={16}
                  color={COLORS.textSecondary}
                />
                <Text style={styles.detailText}>
                  Max {tour.maxGuests} guests
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons
                  name="calendar-outline"
                  size={16}
                  color={COLORS.textSecondary}
                />
                <Text style={styles.detailText}>Available daily</Text>
              </View>
            </View>
          </Card>

          {/* Tabs */}
          <View style={styles.tabsContainer}>{tabs.map(renderTab)}</View>

          {/* Tab Content */}
          {selectedTab === "overview" && renderOverview()}
          {selectedTab === "itinerary" && renderItinerary()}
          {selectedTab === "reviews" && renderReviews()}
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>From</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>${tour.price}</Text>
            {tour.discountPrice && (
              <Text style={styles.originalPrice}>${tour.discountPrice}</Text>
            )}
          </View>
          <Text style={styles.priceSubtext}>per person</Text>
        </View>
        <Button
          title="Book Now"
          variant="primary"
          size="lg"
          onPress={() => navigation.navigate("Booking", { tour })}
          icon="arrow-forward"
          iconPosition="right"
          style={styles.bookButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingTop: 50,
    paddingBottom: SPACING.base,
    zIndex: 100,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  activeWishlist: {
    backgroundColor: COLORS.surface,
  },
  imageContainer: {
    height: height * 0.4,
    position: "relative",
  },
  tourImage: {
    width: width,
    height: "100%",
  },
  imageIndicators: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: SPACING.xs,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: RADIUS.full,
  },
  activeIndicator: {
    backgroundColor: COLORS.white,
    width: 24,
  },
  inactiveIndicator: {
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: RADIUS["2xl"],
    borderTopRightRadius: RADIUS["2xl"],
    marginTop: -20,
    paddingTop: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  infoCard: {
    marginBottom: SPACING.lg,
  },
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SPACING.base,
  },
  title: {
    flex: 1,
    fontSize: FONT_SIZES["2xl"],
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginRight: SPACING.base,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  rating: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.textPrimary,
  },
  reviewCount: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.base,
    gap: SPACING.xs,
  },
  location: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: SPACING.xs,
  },
  detailText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.base,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
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
  tabContent: {
    paddingBottom: 120,
  },
  description: {
    fontSize: FONT_SIZES.base,
    lineHeight: FONT_SIZES.base * 1.6,
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  highlightsCard: {
    marginBottom: SPACING.base,
  },
  agencyCard: {
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
  },
  agencyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  agencyInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  agencyLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: SPACING.md,
  },
  agencyDetails: {
    flex: 1,
  },
  agencyLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textTertiary,
    marginBottom: 2,
  },
  agencyName: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  agencyMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  agencyRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  agencyRatingText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginLeft: 2,
  },
  agencyReviewCount: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textTertiary,
    marginLeft: 2,
  },
  agencyResponse: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textTertiary,
    marginLeft: SPACING.xs,
  },
  agencyStats: {
    flexDirection: "row",
    paddingVertical: SPACING.md,
    marginBottom: SPACING.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  agencyStatItem: {
    flex: 1,
    alignItems: "center",
  },
  agencyStatNumber: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
    marginBottom: 2,
  },
  agencyStatLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  agencyStatDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.xs,
  },
  agencyActions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  agencyActionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.gray50,
    borderRadius: RADIUS.md,
    gap: SPACING.xs,
  },
  agencyActionText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.textSecondary,
  },
  highlightsTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.base,
  },
  highlightItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  highlightText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
    flex: 1,
  },
  itineraryTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  itineraryCard: {
    marginBottom: SPACING.base,
  },
  dayHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  dayNumber: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.base,
  },
  dayNumberText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.bold,
  },
  dayTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.textPrimary,
    flex: 1,
  },
  dayDescription: {
    fontSize: FONT_SIZES.sm,
    lineHeight: FONT_SIZES.sm * 1.5,
    color: COLORS.textSecondary,
    marginBottom: SPACING.base,
  },
  activitiesList: {
    gap: SPACING.xs,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  activityText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textPrimary,
  },
  reviewsHeader: {
    marginBottom: SPACING.lg,
  },
  ratingOverview: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.base,
  },
  ratingNumber: {
    fontSize: FONT_SIZES["2xl"],
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
  },
  starsContainer: {
    flexDirection: "row",
    gap: SPACING.xs,
  },
  reviewCard: {
    marginBottom: SPACING.base,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    marginRight: SPACING.base,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  reviewStars: {
    flexDirection: "row",
    gap: 2,
    marginBottom: SPACING.xs,
  },
  reviewDate: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  reviewText: {
    fontSize: FONT_SIZES.sm,
    lineHeight: FONT_SIZES.sm * 1.5,
    color: COLORS.textPrimary,
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.base,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  priceContainer: {
    flex: 1,
    marginRight: SPACING.base,
  },
  priceLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  price: {
    fontSize: FONT_SIZES["2xl"],
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
  },
  originalPrice: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textDecorationLine: "line-through",
  },
  priceSubtext: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  bookButton: {
    flex: 1,
  },
});
