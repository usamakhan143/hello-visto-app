import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/common/Header";
import TourCard from "../../components/cards/TourCard";
import Button from "../../components/common/Button";
import { COLORS, SIZES, FONTS } from "../../constants";
import { Tour } from "../../types";

// Mock data (same as HomeScreen for consistency)
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
];

interface SearchScreenProps {
  navigation: any;
}

export default function SearchScreen({ navigation }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    duration: "",
    rating: 0,
    category: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const priceRanges = [
    { label: "Under $100", value: [0, 100] },
    { label: "$100 - $300", value: [100, 300] },
    { label: "$300 - $500", value: [300, 500] },
    { label: "Over $500", value: [500, 1000] },
  ];

  const durations = [
    { label: "1-2 days", value: "1-2" },
    { label: "3-5 days", value: "3-5" },
    { label: "6-10 days", value: "6-10" },
    { label: "10+ days", value: "10+" },
  ];

  const categories = [
    "Adventure",
    "Culture",
    "Food & Drink",
    "Nature",
    "City Tours",
    "Beach",
  ];

  const renderTour = ({ item }: { item: Tour }) => (
    <TourCard
      tour={item}
      onPress={() => navigation.navigate("TourDetails", { tour: item })}
      showVendor
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Search Tours"
        showBack
        onBackPress={() => navigation.goBack()}
        rightIcon={showFilters ? "close" : "options-outline"}
        onRightPress={() => setShowFilters(!showFilters)}
      />

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
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons
              name="close-circle"
              size={20}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>

      {showFilters && (
        <ScrollView
          style={styles.filtersContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Price Range */}
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Price Range</Text>
            <View style={styles.filterOptions}>
              {priceRanges.map((range, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.filterOption,
                    filters.priceRange[0] === range.value[0] &&
                      filters.priceRange[1] === range.value[1] &&
                      styles.activeFilterOption,
                  ]}
                  onPress={() =>
                    setFilters({ ...filters, priceRange: range.value })
                  }
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      filters.priceRange[0] === range.value[0] &&
                        filters.priceRange[1] === range.value[1] &&
                        styles.activeFilterOptionText,
                    ]}
                  >
                    {range.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Duration */}
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Duration</Text>
            <View style={styles.filterOptions}>
              {durations.map((duration, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.filterOption,
                    filters.duration === duration.value &&
                      styles.activeFilterOption,
                  ]}
                  onPress={() =>
                    setFilters({
                      ...filters,
                      duration:
                        filters.duration === duration.value
                          ? ""
                          : duration.value,
                    })
                  }
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      filters.duration === duration.value &&
                        styles.activeFilterOptionText,
                    ]}
                  >
                    {duration.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Rating */}
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Minimum Rating</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <TouchableOpacity
                  key={rating}
                  style={styles.ratingOption}
                  onPress={() => setFilters({ ...filters, rating })}
                >
                  <Ionicons
                    name="star"
                    size={24}
                    color={
                      rating <= filters.rating ? COLORS.warning : COLORS.border
                    }
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Categories */}
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Categories</Text>
            <View style={styles.categoriesContainer}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryChip,
                    filters.category === category && styles.activeCategoryChip,
                  ]}
                  onPress={() =>
                    setFilters({
                      ...filters,
                      category: filters.category === category ? "" : category,
                    })
                  }
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      filters.category === category &&
                        styles.activeCategoryChipText,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterActions}>
            <Button
              title="Clear All"
              variant="outline"
              onPress={() =>
                setFilters({
                  priceRange: [0, 1000],
                  duration: "",
                  rating: 0,
                  category: "",
                })
              }
              style={styles.clearButton}
            />
            <Button
              title="Apply Filters"
              onPress={() => setShowFilters(false)}
              style={styles.applyButton}
            />
          </View>
        </ScrollView>
      )}

      <FlatList
        data={mockTours}
        renderItem={renderTour}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.toursList}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color={COLORS.border} />
            <Text style={styles.emptyStateText}>No tours found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try adjusting your search or filters
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    paddingVertical: 12,
    borderRadius: SIZES.radius,
    elevation: 2,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  filtersContainer: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.padding,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    maxHeight: 300,
    elevation: 2,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterSection: {
    marginBottom: SIZES.padding * 1.5,
  },
  filterTitle: {
    fontSize: 16,
    // fontFamily: FONTS.bold,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  activeFilterOption: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterOptionText: {
    fontSize: 14,
    color: COLORS.text,
  },
  activeFilterOptionText: {
    color: COLORS.surface,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 8,
  },
  ratingOption: {
    padding: 4,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeCategoryChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryChipText: {
    fontSize: 12,
    color: COLORS.text,
  },
  activeCategoryChipText: {
    color: COLORS.surface,
  },
  filterActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: SIZES.padding,
  },
  clearButton: {
    flex: 1,
  },
  applyButton: {
    flex: 1,
  },
  toursList: {
    paddingBottom: 20,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SIZES.padding * 4,
  },
  emptyStateText: {
    fontSize: 18,
    // fontFamily: FONTS.bold,
    fontWeight: "600",
    color: COLORS.text,
    marginTop: SIZES.padding,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: 8,
  },
});
