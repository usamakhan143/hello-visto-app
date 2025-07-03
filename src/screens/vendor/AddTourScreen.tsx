import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
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
  SHADOWS,
} from "../../constants";
import * as ImagePicker from "expo-image-picker";

interface AddTourScreenProps {
  navigation: any;
}

// Predefined options based on customer filtering
const DESTINATIONS = [
  "Paris, France",
  "Tokyo, Japan",
  "New York, USA",
  "London, UK",
  "Zurich, Switzerland",
  "Maldives",
  "Bali, Indonesia",
  "Dubai, UAE",
  "Bangkok, Thailand",
  "Rome, Italy",
  "Barcelona, Spain",
  "Amsterdam, Netherlands",
];

const CATEGORIES = [
  "Adventure",
  "Luxury",
  "Culture",
  "Beach",
  "Mountain",
  "City",
  "Food & Wine",
  "Wildlife",
  "Wellness",
  "Photography",
  "History",
  "Art & Architecture",
];

const PRICE_RANGES = [
  { label: "Budget (Under $500)", min: 0, max: 500 },
  { label: "Mid-range ($500-$1000)", min: 500, max: 1000 },
  { label: "Premium ($1000-$2000)", min: 1000, max: 2000 },
  { label: "Luxury ($2000+)", min: 2000, max: 10000 },
];

const DURATION_OPTIONS = [
  { label: "Half Day", days: 0.5 },
  { label: "Full Day", days: 1 },
  { label: "2-3 Days", days: 3 },
  { label: "4-7 Days", days: 7 },
  { label: "1-2 Weeks", days: 14 },
  { label: "2+ Weeks", days: 21 },
];

const GROUP_SIZE_OPTIONS = [
  { label: "Small (1-4 people)", max: 4 },
  { label: "Medium (5-8 people)", max: 8 },
  { label: "Large (9-15 people)", max: 15 },
  { label: "Extra Large (16+ people)", max: 30 },
];

export default function AddTourScreen({ navigation }: AddTourScreenProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [newInclude, setNewInclude] = useState("");
  const [newExclude, setNewExclude] = useState("");

  // Form data state
  const [formData, setFormData] = useState({
    // Basic Info
    title: "",
    description: "",
    shortDescription: "",

    // Pricing
    price: "",
    discountPrice: "",

    // Tour Details
    duration: "",
    maxGuests: "",
    minAge: "",

    // Location
    destination: "",
    address: "",
    latitude: "",
    longitude: "",

    // Categories & Tags
    category: "",
    tags: [] as string[],

    // What's Included/Excluded
    includes: [] as string[],
    excludes: [] as string[],

    // Images
    images: [] as string[],

    // Itinerary
    itinerary: [] as Array<{
      day: number;
      title: string;
      description: string;
      activities: string[];
    }>,

    // Additional Info
    difficulty: "",
    cancellationPolicy: "",
    highlights: [] as string[],
  });

  const [errors, setErrors] = useState<any>({});

  const updateFormData = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const addToArray = (field: string, value: string) => {
    if (value.trim()) {
      const currentArray = formData[field as keyof typeof formData] as string[];
      updateFormData(field, [...currentArray, value.trim()]);
    }
  };

  const removeFromArray = (field: string, index: number) => {
    const currentArray = formData[field as keyof typeof formData] as string[];
    updateFormData(
      field,
      currentArray.filter((_, i) => i !== index),
    );
  };

  const pickImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
        aspect: [16, 9],
      });

      if (!result.canceled && result.assets) {
        const newImages = result.assets.map((asset) => asset.uri);
        updateFormData("images", [...formData.images, ...newImages]);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick images");
    }
  };

  const validateStep = (step: number) => {
    const newErrors: any = {};

    switch (step) {
      case 1: // Basic Info
        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.description.trim())
          newErrors.description = "Description is required";
        if (!formData.category) newErrors.category = "Category is required";
        if (!formData.destination)
          newErrors.destination = "Destination is required";
        break;

      case 2: // Details & Pricing
        if (!formData.price) newErrors.price = "Price is required";
        if (!formData.duration) newErrors.duration = "Duration is required";
        if (!formData.maxGuests) newErrors.maxGuests = "Max guests is required";
        break;

      case 3: // Includes & Excludes
        if (formData.includes.length === 0)
          newErrors.includes = "Add at least one inclusion";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const submitTour = async () => {
    if (!validateStep(currentStep)) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      Alert.alert(
        "Success!",
        "Your tour has been created and submitted for review.",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } catch (error) {
      Alert.alert("Error", "Failed to create tour. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3, 4].map((step) => (
        <View key={step} style={styles.stepContainer}>
          <View
            style={[
              styles.stepCircle,
              step <= currentStep && styles.activeStepCircle,
            ]}
          >
            <Text
              style={[
                styles.stepNumber,
                step <= currentStep && styles.activeStepNumber,
              ]}
            >
              {step}
            </Text>
          </View>
          {step < 4 && (
            <View
              style={[
                styles.stepLine,
                step < currentStep && styles.activeStepLine,
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Basic Information</Text>

      <Input
        label="Tour Title *"
        placeholder="Enter tour title"
        value={formData.title}
        onChangeText={(value) => updateFormData("title", value)}
        error={errors.title}
      />

      <Input
        label="Short Description"
        placeholder="Brief tour description for cards"
        value={formData.shortDescription}
        onChangeText={(value) => updateFormData("shortDescription", value)}
        multiline
        numberOfLines={2}
      />

      <Input
        label="Full Description *"
        placeholder="Detailed tour description"
        value={formData.description}
        onChangeText={(value) => updateFormData("description", value)}
        multiline
        numberOfLines={4}
        error={errors.description}
      />

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Category *</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.optionsContainer}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.optionChip,
                  formData.category === category && styles.selectedChip,
                ]}
                onPress={() => updateFormData("category", category)}
              >
                <Text
                  style={[
                    styles.optionText,
                    formData.category === category && styles.selectedText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        {errors.category && (
          <Text style={styles.errorText}>{errors.category}</Text>
        )}
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Destination *</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.optionsContainer}>
            {DESTINATIONS.map((dest) => (
              <TouchableOpacity
                key={dest}
                style={[
                  styles.optionChip,
                  formData.destination === dest && styles.selectedChip,
                ]}
                onPress={() => updateFormData("destination", dest)}
              >
                <Text
                  style={[
                    styles.optionText,
                    formData.destination === dest && styles.selectedText,
                  ]}
                >
                  {dest}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        {errors.destination && (
          <Text style={styles.errorText}>{errors.destination}</Text>
        )}
      </View>

      <Input
        label="Specific Address"
        placeholder="Exact pickup/meeting address"
        value={formData.address}
        onChangeText={(value) => updateFormData("address", value)}
      />
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Details & Pricing</Text>

      <View style={styles.row}>
        <Input
          label="Price (USD) *"
          placeholder="0"
          value={formData.price}
          onChangeText={(value) => updateFormData("price", value)}
          keyboardType="numeric"
          style={styles.halfInput}
          error={errors.price}
        />
        <Input
          label="Original Price (if discounted)"
          placeholder="0"
          value={formData.discountPrice}
          onChangeText={(value) => updateFormData("discountPrice", value)}
          keyboardType="numeric"
          style={styles.halfInput}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Duration *</Text>
        <View style={styles.optionsGrid}>
          {DURATION_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.label}
              style={[
                styles.optionCard,
                formData.duration === option.days.toString() &&
                  styles.selectedCard,
              ]}
              onPress={() => updateFormData("duration", option.days.toString())}
            >
              <Text
                style={[
                  styles.optionCardText,
                  formData.duration === option.days.toString() &&
                    styles.selectedCardText,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.duration && (
          <Text style={styles.errorText}>{errors.duration}</Text>
        )}
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Group Size *</Text>
        <View style={styles.optionsGrid}>
          {GROUP_SIZE_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.label}
              style={[
                styles.optionCard,
                formData.maxGuests === option.max.toString() &&
                  styles.selectedCard,
              ]}
              onPress={() => updateFormData("maxGuests", option.max.toString())}
            >
              <Text
                style={[
                  styles.optionCardText,
                  formData.maxGuests === option.max.toString() &&
                    styles.selectedCardText,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.maxGuests && (
          <Text style={styles.errorText}>{errors.maxGuests}</Text>
        )}
      </View>

      <Input
        label="Minimum Age"
        placeholder="0"
        value={formData.minAge}
        onChangeText={(value) => updateFormData("minAge", value)}
        keyboardType="numeric"
      />
    </View>
  );

  const renderStep3 = () => {
    return (
      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>What's Included & Excluded</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>What's Included *</Text>
          <View style={styles.addItemContainer}>
            <Input
              placeholder="Add item (e.g., Professional guide)"
              value={newInclude}
              onChangeText={setNewInclude}
              style={styles.addItemInput}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                addToArray("includes", newInclude);
                setNewInclude("");
              }}
            >
              <Ionicons name="add" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.itemsList}>
            {formData.includes.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={16}
                  color={COLORS.success}
                />
                <Text style={styles.listItemText}>{item}</Text>
                <TouchableOpacity
                  onPress={() => removeFromArray("includes", index)}
                >
                  <Ionicons name="close" size={16} color={COLORS.error} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          {errors.includes && (
            <Text style={styles.errorText}>{errors.includes}</Text>
          )}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>What's Not Included</Text>
          <View style={styles.addItemContainer}>
            <Input
              placeholder="Add item (e.g., International flights)"
              value={newExclude}
              onChangeText={setNewExclude}
              style={styles.addItemInput}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                addToArray("excludes", newExclude);
                setNewExclude("");
              }}
            >
              <Ionicons name="add" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.itemsList}>
            {formData.excludes.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Ionicons name="close-circle" size={16} color={COLORS.error} />
                <Text style={styles.listItemText}>{item}</Text>
                <TouchableOpacity
                  onPress={() => removeFromArray("excludes", index)}
                >
                  <Ionicons name="close" size={16} color={COLORS.error} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  const renderStep4 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Images & Final Details</Text>

      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>Tour Images</Text>
        <TouchableOpacity style={styles.imagePickerButton} onPress={pickImages}>
          <Ionicons name="camera" size={24} color={COLORS.primary} />
          <Text style={styles.imagePickerText}>Add Images</Text>
        </TouchableOpacity>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.imagesContainer}>
            {formData.images.map((uri, index) => (
              <View key={index} style={styles.imageContainer}>
                <Image source={{ uri }} style={styles.tourImage} />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => removeFromArray("images", index)}
                >
                  <Ionicons name="close" size={16} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <Input
        label="Cancellation Policy"
        placeholder="Describe your cancellation policy"
        value={formData.cancellationPolicy}
        onChangeText={(value) => updateFormData("cancellationPolicy", value)}
        multiline
        numberOfLines={3}
      />

      <View style={styles.reviewSection}>
        <Text style={styles.reviewTitle}>Review Your Tour</Text>
        <Card variant="flat" style={styles.reviewCard}>
          <Text style={styles.reviewLabel}>Title:</Text>
          <Text style={styles.reviewValue}>{formData.title || "Not set"}</Text>

          <Text style={styles.reviewLabel}>Category:</Text>
          <Text style={styles.reviewValue}>
            {formData.category || "Not set"}
          </Text>

          <Text style={styles.reviewLabel}>Destination:</Text>
          <Text style={styles.reviewValue}>
            {formData.destination || "Not set"}
          </Text>

          <Text style={styles.reviewLabel}>Price:</Text>
          <Text style={styles.reviewValue}>${formData.price || "0"}</Text>

          <Text style={styles.reviewLabel}>Duration:</Text>
          <Text style={styles.reviewValue}>
            {formData.duration || "0"} days
          </Text>

          <Text style={styles.reviewLabel}>Max Guests:</Text>
          <Text style={styles.reviewValue}>{formData.maxGuests || "0"}</Text>
        </Card>
      </View>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Tour</Text>
      </View>

      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderCurrentStep()}
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.bottomButtons}>
        {currentStep > 1 && (
          <Button
            title="Previous"
            variant="outline"
            onPress={prevStep}
            style={styles.navButton}
          />
        )}

        {currentStep < 4 ? (
          <Button
            title="Next"
            variant="primary"
            onPress={nextStep}
            style={styles.navButton}
          />
        ) : (
          <Button
            title="Create Tour"
            variant="primary"
            onPress={submitTour}
            loading={loading}
            style={styles.navButton}
          />
        )}
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
  stepIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.white,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.gray200,
    alignItems: "center",
    justifyContent: "center",
  },
  activeStepCircle: {
    backgroundColor: COLORS.primary,
  },
  stepNumber: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textSecondary,
  },
  activeStepNumber: {
    color: COLORS.white,
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: COLORS.gray200,
    marginHorizontal: SPACING.xs,
  },
  activeStepLine: {
    backgroundColor: COLORS.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  stepContent: {
    paddingVertical: SPACING.lg,
  },
  stepTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xl,
    textAlign: "center",
  },
  fieldGroup: {
    marginBottom: SPACING.lg,
  },
  fieldLabel: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  optionsContainer: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  optionChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.gray100,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  selectedText: {
    color: COLORS.white,
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  optionCard: {
    flex: 1,
    minWidth: "45%",
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  selectedCard: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionCardText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.textPrimary,
    textAlign: "center",
  },
  selectedCardText: {
    color: COLORS.white,
  },
  row: {
    flexDirection: "row",
    gap: SPACING.md,
  },
  halfInput: {
    flex: 1,
  },
  addItemContainer: {
    flexDirection: "row",
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  addItemInput: {
    flex: 1,
  },
  addButton: {
    width: 44,
    height: 44,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
  },
  itemsList: {
    gap: SPACING.sm,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.sm,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    gap: SPACING.sm,
  },
  listItemText: {
    flex: 1,
    fontSize: FONT_SIZES.sm,
    color: COLORS.textPrimary,
  },
  imagePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: "dashed",
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  imagePickerText: {
    fontSize: FONT_SIZES.base,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.medium,
  },
  imagesContainer: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  imageContainer: {
    position: "relative",
  },
  tourImage: {
    width: 100,
    height: 100,
    borderRadius: RADIUS.md,
  },
  removeImageButton: {
    position: "absolute",
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    backgroundColor: COLORS.error,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  reviewSection: {
    marginTop: SPACING.xl,
  },
  reviewTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  reviewCard: {
    padding: SPACING.lg,
  },
  reviewLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  reviewValue: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  errorText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
  bottomButtons: {
    flexDirection: "row",
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: SPACING.md,
  },
  navButton: {
    flex: 1,
  },
});
