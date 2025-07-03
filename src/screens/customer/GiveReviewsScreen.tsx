import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import {
  COLORS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SPACING,
  RADIUS,
  SHADOWS,
} from "../../constants";

interface GiveReviewsScreenProps {
  navigation: any;
  route?: any;
}

const mockCompletedTours = [
  {
    id: "1",
    title: "Swiss Alps Adventure",
    vendor: "Ahmed's Tours",
    date: "2024-01-10",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
    hasReview: false,
  },
  {
    id: "2",
    title: "Tokyo Cultural Experience",
    vendor: "Japan Explorers",
    date: "2023-12-20",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=200&fit=crop",
    hasReview: true,
    rating: 5,
  },
  {
    id: "3",
    title: "Bali Paradise Tour",
    vendor: "Island Adventures",
    date: "2023-11-15",
    image:
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=300&h=200&fit=crop",
    hasReview: false,
  },
];

export default function GiveReviewsScreen({
  navigation,
  route,
}: GiveReviewsScreenProps) {
  const [selectedTour, setSelectedTour] = useState<any>(
    route?.params?.tour || null,
  );
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(!!route?.params?.tour);

  const handleGiveReview = (tour: any) => {
    setSelectedTour(tour);
    setRating(0);
    setReviewText("");
    setShowReviewForm(true);
  };

  const submitReview = () => {
    if (rating === 0) {
      Alert.alert("Please rate your experience", "Select at least 1 star");
      return;
    }

    Alert.alert(
      "Review Submitted!",
      "Thank you for your feedback. Your review helps other travelers.",
      [
        {
          text: "OK",
          onPress: () => {
            setShowReviewForm(false);
            setSelectedTour(null);
          },
        },
      ],
    );
  };

  const renderStars = (
    currentRating: number,
    onPress?: (rating: number) => void,
  ) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => onPress && onPress(star)}
            disabled={!onPress}
          >
            <Ionicons
              name={star <= currentRating ? "star" : "star-outline"}
              size={onPress ? 32 : 16}
              color={COLORS.warning}
              style={{ marginRight: 4 }}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderTourItem = ({ item }: { item: any }) => (
    <Card variant="elevated" style={styles.tourCard}>
      <View style={styles.tourContent}>
        <Image source={{ uri: item.image }} style={styles.tourImage} />
        <View style={styles.tourDetails}>
          <Text style={styles.tourTitle}>{item.title}</Text>
          <Text style={styles.vendorName}>{item.vendor}</Text>
          <Text style={styles.tourDate}>Completed: {item.date}</Text>

          {item.hasReview ? (
            <View style={styles.reviewStatus}>
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={COLORS.success}
              />
              <Text style={styles.reviewStatusText}>Review Given</Text>
              {renderStars(item.rating)}
            </View>
          ) : (
            <Button
              title="Give Review"
              variant="primary"
              size="sm"
              onPress={() => handleGiveReview(item)}
              style={styles.reviewButton}
            />
          )}
        </View>
      </View>
    </Card>
  );

  if (showReviewForm && selectedTour) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowReviewForm(false)}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Write Review</Text>
        </View>

        <View style={styles.content}>
          <Card variant="elevated" style={styles.reviewFormCard}>
            <Image
              source={{ uri: selectedTour.image }}
              style={styles.reviewTourImage}
            />
            <Text style={styles.reviewTourTitle}>{selectedTour.title}</Text>
            <Text style={styles.reviewVendorName}>
              {selectedTour.vendor || "Tour Provider"}
            </Text>
            {selectedTour.completedDate && (
              <Text style={styles.completedDate}>
                Completed:{" "}
                {new Date(selectedTour.completedDate).toLocaleDateString()}
              </Text>
            )}

            <View style={styles.ratingSection}>
              <Text style={styles.ratingLabel}>Rate your experience:</Text>
              {renderStars(rating, setRating)}
            </View>

            <Input
              label="Write your review"
              placeholder="Share your experience with other travelers..."
              value={reviewText}
              onChangeText={setReviewText}
              multiline
              numberOfLines={4}
              style={styles.reviewInput}
            />

            <Button
              title="Submit Review"
              variant="primary"
              size="lg"
              fullWidth
              onPress={submitReview}
              style={styles.submitButton}
            />
          </Card>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Give Reviews</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Share your experience and help other travelers
        </Text>

        <FlatList
          data={mockCompletedTours}
          renderItem={renderTourItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
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
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.md,
    ...SHADOWS.sm,
  },
  headerTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  subtitle: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: SPACING.xl,
  },
  listContainer: {
    paddingBottom: SPACING.xl,
  },
  tourCard: {
    marginBottom: SPACING.md,
  },
  tourContent: {
    flexDirection: "row",
    padding: SPACING.base,
  },
  tourImage: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.md,
    marginRight: SPACING.md,
  },
  tourDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  tourTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  vendorName: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  tourDate: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textTertiary,
    marginBottom: SPACING.sm,
  },
  reviewStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewStatusText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.success,
    marginLeft: SPACING.xs,
    marginRight: SPACING.sm,
  },
  reviewButton: {
    alignSelf: "flex-start",
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewFormCard: {
    padding: SPACING.xl,
    alignItems: "center",
  },
  reviewTourImage: {
    width: 120,
    height: 80,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
  },
  reviewTourTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: SPACING.xs,
  },
  reviewVendorName: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  completedDate: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textTertiary,
    marginBottom: SPACING.lg,
    textAlign: "center",
  },
  ratingSection: {
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  ratingLabel: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  reviewInput: {
    marginBottom: SPACING.lg,
  },
  submitButton: {
    marginTop: SPACING.base,
  },
});
