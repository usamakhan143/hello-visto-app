import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import TourCard from "../../components/cards/TourCard";
import {
  COLORS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SPACING,
  RADIUS,
  SHADOWS,
} from "../../constants";

interface VendorProfileScreenProps {
  navigation: any;
  route?: any;
}

// Mock vendor data - in real app would come from API
const mockVendor = {
  id: "vendor-1",
  businessName: "Ahmed's Premium Tours",
  description:
    "Luxury travel experiences across Switzerland and Europe. We specialize in creating unforgettable moments with personalized service and attention to detail.",
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
};

const mockReviews = [
  {
    id: "1",
    customerName: "Sarah Johnson",
    customerAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b524?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    comment:
      "Amazing experience! Ahmed's team provided exceptional service throughout our Swiss Alps adventure.",
    tourName: "Swiss Alps Luxury Retreat",
    date: "2024-01-15",
  },
  {
    id: "2",
    customerName: "Mike Chen",
    customerAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    comment:
      "Professional, organized, and truly memorable. Highly recommend for luxury travelers.",
    tourName: "Europe Grand Tour",
    date: "2024-01-10",
  },
  {
    id: "3",
    customerName: "Emily Davis",
    customerAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    rating: 4,
    comment:
      "Great attention to detail and customer service. The accommodations were top-notch.",
    tourName: "Alpine Wellness Retreat",
    date: "2024-01-05",
  },
];

const mockPopularTours = [
  {
    id: "1",
    title: "Swiss Alps Luxury Retreat",
    price: 2899,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    ],
    rating: 4.9,
    totalReviews: 45,
    duration: 7,
    maxGuests: 8,
    location: { address: "Swiss Alps, Switzerland" },
    includes: ["Luxury Hotel", "All Meals", "Private Guide"],
    vendorId: "vendor-1",
  },
  {
    id: "2",
    title: "Europe Grand Tour",
    price: 4299,
    images: [
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400",
    ],
    rating: 4.8,
    totalReviews: 32,
    duration: 14,
    maxGuests: 12,
    location: { address: "Multiple European Cities" },
    includes: ["Luxury Hotels", "All Transportation", "Expert Guide"],
    vendorId: "vendor-1",
  },
];

export default function VendorProfileScreen({
  navigation,
  route,
}: VendorProfileScreenProps) {
  const [selectedTab, setSelectedTab] = useState("about");

  // Safety check for vendor data
  const vendor = route?.params?.vendor || mockVendor;

  if (!vendor) {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Vendor not found</Text>
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    );
  }

  const handleWebsite = () => {
    Linking.openURL(`https://${vendor.website}`);
  };

  const renderStars = (rating: number, size: number = 16) => (
    <View style={styles.starsContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={
            star <= rating
              ? "star"
              : star <= rating + 0.5
                ? "star-half"
                : "star-outline"
          }
          size={size}
          color={COLORS.warning}
          style={{ marginRight: 2 }}
        />
      ))}
    </View>
  );

  const renderReview = ({ item }: { item: any }) => (
    <Card variant="elevated" style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Image
          source={{ uri: item.customerAvatar }}
          style={styles.customerAvatar}
        />
        <View style={styles.reviewInfo}>
          <Text style={styles.customerName}>{item.customerName}</Text>
          <View style={styles.reviewMeta}>
            {renderStars(item.rating, 14)}
            <Text style={styles.reviewDate}>{item.date}</Text>
          </View>
          <Text style={styles.tourName}>{item.tourName}</Text>
        </View>
      </View>
      <Text style={styles.reviewComment}>{item.comment}</Text>
    </Card>
  );

  const renderTour = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.tourCard}
      onPress={() => navigation.navigate("TourDetails", { tour: item })}
      activeOpacity={0.9}
    >
      <View style={styles.tourImageContainer}>
        <Image
          source={{ uri: item.images[0] }}
          style={styles.tourImage}
          resizeMode="cover"
        />
        <View style={styles.tourOverlay}>
          <View style={styles.tourPrice}>
            <Text style={styles.priceText}>${item.price}</Text>
          </View>
          <View style={styles.tourRating}>
            <Ionicons name="star" size={14} color={COLORS.warning} />
            <Text style={styles.ratingText}>
              {Number(item.rating || 0).toFixed(1)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.tourInfo}>
        <Text style={styles.tourTitle} numberOfLines={2}>
          {item.title}
        </Text>

        <View style={styles.tourMeta}>
          <View style={styles.metaItem}>
            <Ionicons
              name="location-outline"
              size={14}
              color={COLORS.textSecondary}
            />
            <Text style={styles.metaText} numberOfLines={1}>
              {item.location.address}
            </Text>
          </View>

          <View style={styles.tourDetails}>
            <View style={styles.detailItem}>
              <Ionicons
                name="time-outline"
                size={12}
                color={COLORS.textSecondary}
              />
              <Text style={styles.detailText}>{item.duration} days</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons
                name="people-outline"
                size={12}
                color={COLORS.textSecondary}
              />
              <Text style={styles.detailText}>Max {item.maxGuests}</Text>
            </View>
          </View>
        </View>

        {item.includes && item.includes.length > 0 && (
          <View style={styles.includesContainer}>
            <Text style={styles.includesTitle}>Includes:</Text>
            <Text style={styles.includesText} numberOfLines={2}>
              {item.includes.slice(0, 3).join(" • ")}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderTabContent = () => {
    switch (selectedTab) {
      case "about":
        return (
          <View style={styles.tabContent}>
            <Text style={styles.description}>{vendor.description}</Text>

            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Contact Information</Text>
              <View style={styles.contactItem}>
                <Ionicons name="location" size={20} color={COLORS.primary} />
                <Text style={styles.contactText}>{vendor.address}</Text>
              </View>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Languages</Text>
              <View style={styles.tagsContainer}>
                {(vendor.languages || []).map((lang, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{lang}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Specialties</Text>
              <View style={styles.tagsContainer}>
                {(vendor.specialties || []).map((specialty, index) => (
                  <View key={index} style={[styles.tag, styles.specialtyTag]}>
                    <Text style={[styles.tagText, { color: COLORS.primary }]}>
                      {specialty}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {(vendor.certifications || []).map((cert, index) => (
                <View key={index} style={styles.certificationItem}>
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color={COLORS.success}
                  />
                  <Text style={styles.certificationText}>{cert}</Text>
                </View>
              ))}
            </View>
          </View>
        );
      case "reviews":
        return (
          <FlatList
            data={mockReviews}
            renderItem={renderReview}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.tabContent}
          />
        );
      case "tours":
        return (
          <FlatList
            data={mockPopularTours}
            renderItem={renderTour}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.toursContent}
            ItemSeparatorComponent={() => <View style={styles.tourSeparator} />}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Cover Image */}
        <View style={styles.header}>
          <Image
            source={{ uri: vendor.coverImage }}
            style={styles.coverImage}
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.7)"]}
            style={styles.coverOverlay}
          />

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>

          <View style={styles.vendorInfo}>
            <Image source={{ uri: vendor.logo }} style={styles.vendorLogo} />
            <Text style={styles.vendorName}>{vendor.businessName}</Text>
            <View style={styles.ratingContainer}>
              {renderStars(vendor.rating, 18)}
              <Text style={styles.ratingText}>
                {vendor.rating} ({vendor.totalReviews} reviews)
              </Text>
            </View>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{vendor.totalTours}</Text>
            <Text style={styles.statLabel}>Tour Packages</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{vendor.completedBookings}</Text>
            <Text style={styles.statLabel}>Happy Customers</Text>
          </View>

          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{vendor.memberSince}</Text>
            <Text style={styles.statLabel}>Member Since</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {[
            { id: "about", label: "About" },
            { id: "tours", label: "Tours" },
            { id: "reviews", label: "Reviews" },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, selectedTab === tab.id && styles.activeTab]}
              onPress={() => setSelectedTab(tab.id)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab.id && styles.activeTabText,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Bottom Spacer for Bottom Navigation */}
        <View style={styles.bottomSpacer} />
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
    position: "relative",
    height: 250,
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  coverOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
  },
  backButton: {
    position: "absolute",
    top: SPACING.lg,
    left: SPACING.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  vendorInfo: {
    position: "absolute",
    bottom: SPACING.lg,
    left: SPACING.lg,
    right: SPACING.lg,
    alignItems: "center",
  },
  vendorLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: COLORS.white,
    marginBottom: SPACING.sm,
  },
  vendorName: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    textAlign: "center",
    marginBottom: SPACING.xs,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.white,
    marginLeft: SPACING.xs,
  },
  statsSection: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.lg,
    ...SHADOWS.sm,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    gap: SPACING.sm,
  },
  actionButton: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHTS.medium,
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  tabContent: {
    padding: SPACING.lg,
  },
  description: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textPrimary,
    lineHeight: FONT_SIZES.base * 1.5,
    marginBottom: SPACING.xl,
  },
  infoSection: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.sm,
  },
  contactText: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  tag: {
    backgroundColor: COLORS.gray100,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
  },
  specialtyTag: {
    backgroundColor: `${COLORS.primary}15`,
    borderWidth: 1,
    borderColor: `${COLORS.primary}30`,
  },
  tagText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  certificationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.xs,
  },
  certificationText: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  reviewCard: {
    marginBottom: SPACING.md,
  },
  reviewHeader: {
    flexDirection: "row",
    marginBottom: SPACING.sm,
  },
  customerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SPACING.sm,
  },
  reviewInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.textPrimary,
  },
  reviewMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: SPACING.xs,
  },
  reviewDate: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textTertiary,
    marginLeft: SPACING.sm,
  },
  tourName: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  reviewComment: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textPrimary,
    lineHeight: FONT_SIZES.base * 1.4,
  },
  toursContent: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.base,
  },
  tourSeparator: {
    height: SPACING.lg,
  },
  tourCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    ...SHADOWS.md,
  },
  tourImageContainer: {
    height: 180,
    position: "relative",
  },
  tourImage: {
    width: "100%",
    height: "100%",
  },
  tourOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-between",
    padding: SPACING.base,
  },
  tourPrice: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.md,
  },
  priceText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
  },
  tourRating: {
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.md,
    gap: SPACING.xs,
  },
  ratingText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.white,
  },
  tourInfo: {
    padding: SPACING.lg,
  },
  tourTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    lineHeight: FONT_SIZES.lg * 1.2,
  },
  tourMeta: {
    gap: SPACING.sm,
    marginBottom: SPACING.base,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  metaText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    flex: 1,
  },
  tourDetails: {
    flexDirection: "row",
    gap: SPACING.lg,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  detailText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  includesContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
  },
  includesTitle: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  includesText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    lineHeight: FONT_SIZES.xs * 1.4,
  },
  bottomSpacer: {
    height: 120,
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
