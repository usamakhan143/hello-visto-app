import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import {
  COLORS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SPACING,
  RADIUS,
} from "../../constants";

interface SearchScreenProps {
  navigation: any;
  route?: any;
}

export default function ModernSearchScreen({
  navigation,
  route,
}: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState(
    route?.params?.destination || "",
  );
  const [filters, setFilters] = useState({
    priceRange: "",
    duration: "",
    rating: 0,
    category: route?.params?.category || "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const priceRanges = [
    { label: "Under $500", value: "under-500" },
    { label: "$500 - $1000", value: "500-1000" },
    { label: "$1000 - $2000", value: "1000-2000" },
    { label: "Over $2000", value: "over-2000" },
  ];

  const durations = [
    { label: "1-3 days", value: "1-3" },
    { label: "4-7 days", value: "4-7" },
    { label: "1-2 weeks", value: "1-2w" },
    { label: "2+ weeks", value: "2w+" },
  ];

  const categories = [
    "Adventure",
    "Luxury",
    "Culture",
    "Beach",
    "Mountain",
    "City",
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search Tours</Text>
        <TouchableOpacity
          style={styles.filterToggle}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Ionicons
            name={showFilters ? "close" : "options-outline"}
            size={24}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={styles.searchSection}>
        <Input
          placeholder="Search destinations, tours..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon="search-outline"
          style={styles.searchInput}
        />
      </View>

      {/* Filters */}
      {showFilters && (
        <Card variant="elevated" style={styles.filtersCard}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Price Range */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Price Range</Text>
              <View style={styles.filterOptions}>
                {priceRanges.map((range, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.filterChip,
                      filters.priceRange === range.value &&
                        styles.activeFilterChip,
                    ]}
                    onPress={() =>
                      setFilters({
                        ...filters,
                        priceRange:
                          filters.priceRange === range.value ? "" : range.value,
                      })
                    }
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        filters.priceRange === range.value &&
                          styles.activeFilterChipText,
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
                      styles.filterChip,
                      filters.duration === duration.value &&
                        styles.activeFilterChip,
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
                        styles.filterChipText,
                        filters.duration === duration.value &&
                          styles.activeFilterChipText,
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
                        rating <= filters.rating
                          ? COLORS.warning
                          : COLORS.border
                      }
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Categories */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Categories</Text>
              <View style={styles.filterOptions}>
                {categories.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.filterChip,
                      filters.category === category && styles.activeFilterChip,
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
                        styles.filterChipText,
                        filters.category === category &&
                          styles.activeFilterChipText,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Filter Actions */}
            <View style={styles.filterActions}>
              <Button
                title="Clear All"
                variant="outline"
                size="md"
                onPress={() =>
                  setFilters({
                    priceRange: "",
                    duration: "",
                    rating: 0,
                    category: "",
                  })
                }
                style={styles.clearButton}
              />
              <Button
                title="Apply Filters"
                variant="primary"
                size="md"
                onPress={() => setShowFilters(false)}
                style={styles.applyButton}
              />
            </View>
          </ScrollView>
        </Card>
      )}

      {/* Results */}
      <View style={styles.resultsSection}>
        <Text style={styles.resultsText}>Search for amazing destinations</Text>
        <Text style={styles.resultsSubtext}>
          Use the search bar above to find your perfect tour
        </Text>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.base,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
  },
  filterToggle: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchSection: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.base,
  },
  searchInput: {
    marginBottom: 0,
  },
  filtersCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.base,
    maxHeight: 400,
  },
  filterSection: {
    marginBottom: SPACING.lg,
  },
  filterTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  filterChip: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.gray100,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeFilterChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterChipText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
    fontWeight: FONT_WEIGHTS.medium,
  },
  activeFilterChipText: {
    color: COLORS.white,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  ratingOption: {
    padding: SPACING.xs,
  },
  filterActions: {
    flexDirection: "row",
    gap: SPACING.sm,
    marginTop: SPACING.base,
  },
  clearButton: {
    flex: 1,
  },
  applyButton: {
    flex: 1,
  },
  resultsSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
  },
  resultsText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: SPACING.sm,
  },
  resultsSubtext: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: FONT_SIZES.sm * 1.5,
  },
});
