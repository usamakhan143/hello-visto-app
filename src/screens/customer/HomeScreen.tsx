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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import TourCard from "../../components/cards/TourCard";
import Button from "../../components/common/Button";
import { COLORS, SIZES, FONTS } from "../../constants";
import { Tour } from "../../types";

const { width } = Dimensions.get("window");

// Mock data
const mockTours: Tour[] = [
  {
    id: "1",
    vendorId: "vendor1",
    title: "Bali Cultural Adventure",
    description: "Explore ancient temples and traditional villages",
    price: 299,
    discountPrice: 399,
    images: [
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400",
    ],
    duration: 5,
    maxGuests: 8,
    location: {
      address: "Ubud, Bali, Indonesia",
      latitude: -8.5069,
      longitude: 115.2625,
    },
    startDate: new Date(),
    endDate: new Date(),
    includes: [],
    excludes: [],
    itinerary: [],
    rating: 4.8,
    totalReviews: 127,
    isActive: true,
    isApproved: true,
    cancellationPolicy: "",
    createdAt: new Date(),
  },
  {
    id: "2",
    vendorId: "vendor2",
    title: "Tokyo Food & Culture Tour",
    description: "Discover authentic Japanese cuisine and culture",
    price: 189,
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400",
    ],
    duration: 3,
    maxGuests: 12,
    location: {
      address: "Tokyo, Japan",
      latitude: 35.6762,
      longitude: 139.6503,
    },
    startDate: new Date(),
    endDate: new Date(),
    includes: [],
    excludes: [],
    itinerary: [],
    rating: 4.9,
    totalReviews: 203,
    isActive: true,
    isApproved: true,
    cancellationPolicy: "",
    createdAt: new Date(),
  },
];

const categories = [
  { id: "1", name: "Adventure", icon: "trail-sign-outline" },
  { id: "2", name: "Culture", icon: "library-outline" },
  { id: "3", name: "Food", icon: "restaurant-outline" },
  { id: "4", name: "Nature", icon: "leaf-outline" },
  { id: "5", name: "City", icon: "business-outline" },
];

interface HomeScreenProps {
  navigation: any;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
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
      <Ionicons
        name={item.icon}
        size={24}
        color={selectedCategory === item.id ? COLORS.surface : COLORS.primary}
      />
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
    <TourCard
      tour={item}
      onPress={() => navigation.navigate("TourDetails", { tour: item })}
      showVendor
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.accent]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.userInfo}>
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
                color={COLORS.surface}
              />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons
              name="search-outline"
              size={20}
              color={COLORS.textSecondary}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Where do you want to go?"
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
        </LinearGradient>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore Categories</Text>
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
            <Text style={styles.sectionTitle}>Featured Tours</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
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

        {/* Popular Destinations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Destinations</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.destinationsContainer}>
              {["Paris", "Tokyo", "New York", "London"].map(
                (destination, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.destinationCard}
                    onPress={() =>
                      navigation.navigate("Search", { destination })
                    }
                  >
                    <Image
                      source={{ uri: `https://via.placeholder.com/150x100` }}
                      style={styles.destinationImage}
                    />
                    <LinearGradient
                      colors={["transparent", "rgba(0,0,0,0.7)"]}
                      style={styles.destinationGradient}
                    />
                    <Text style={styles.destinationName}>{destination}</Text>
                  </TouchableOpacity>
                ),
              )}
            </View>
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionCard}>
              <Ionicons
                name="calendar-outline"
                size={32}
                color={COLORS.primary}
              />
              <Text style={styles.quickActionText}>My Bookings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Ionicons name="heart-outline" size={32} color={COLORS.error} />
              <Text style={styles.quickActionText}>Wishlist</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Ionicons
                name="chatbubble-outline"
                size={32}
                color={COLORS.secondary}
              />
              <Text style={styles.quickActionText}>Support</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingHorizontal: SIZES.padding,
    paddingBottom: SIZES.padding * 2,
    borderBottomLeftRadius: SIZES.radius * 3,
    borderBottomRightRadius: SIZES.radius * 3,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.padding * 2,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  greeting: {
    fontSize: 14,
    color: COLORS.surface,
    opacity: 0.9,
  },
  userName: {
    fontSize: 18,
    // fontFamily: FONTS.bold,
    fontWeight: "600",
    color: COLORS.surface,
  },
  notificationButton: {
    position: "relative",
    padding: 8,
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  filterButton: {
    padding: 4,
  },
  section: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding * 1.5,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.padding,
  },
  sectionTitle: {
    fontSize: 20,
    // fontFamily: FONTS.bold,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  seeAllText: {
    fontSize: 14,
    color: COLORS.primary,
    // fontFamily: FONTS.medium,
  },
  categoriesList: {
    paddingRight: SIZES.padding,
  },
  categoryItem: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  selectedCategoryItem: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 12,
    color: COLORS.text,
    marginTop: 4,
  },
  selectedCategoryText: {
    color: COLORS.surface,
  },
  toursList: {
    paddingRight: SIZES.padding,
  },
  destinationsContainer: {
    flexDirection: "row",
    paddingLeft: SIZES.padding,
  },
  destinationCard: {
    width: 150,
    height: 100,
    borderRadius: SIZES.radius,
    marginRight: 12,
    overflow: "hidden",
    position: "relative",
  },
  destinationImage: {
    width: "100%",
    height: "100%",
  },
  destinationGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
  },
  destinationName: {
    position: "absolute",
    bottom: 8,
    left: 8,
    color: COLORS.surface,
    fontSize: 14,
    // fontFamily: FONTS.medium,
    fontWeight: "600",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    alignItems: "center",
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quickActionText: {
    fontSize: 12,
    color: COLORS.text,
    marginTop: 8,
    textAlign: "center",
  },
});
