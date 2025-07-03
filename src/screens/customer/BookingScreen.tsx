import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
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

interface BookingScreenProps {
  navigation: any;
  route: {
    params: {
      tour?: any;
    };
  };
}

export default function BookingScreen({
  navigation,
  route,
}: BookingScreenProps) {
  const tour = route.params?.tour || {
    title: "Swiss Alps Adventure",
    price: 1299,
    duration: 7,
  };

  const [bookingData, setBookingData] = useState({
    guests: 2,
    startDate: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    specialRequests: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string | number) => {
    setBookingData({ ...bookingData, [field]: value });
  };

  const adjustGuests = (increment: boolean) => {
    const newCount = increment
      ? bookingData.guests + 1
      : bookingData.guests - 1;
    if (newCount >= 1 && newCount <= 8) {
      setBookingData({ ...bookingData, guests: newCount });
    }
  };

  const calculateTotal = () => {
    return tour.price * bookingData.guests;
  };

  const handleBooking = async () => {
    if (!bookingData.contactName || !bookingData.contactEmail) {
      Alert.alert(
        "Missing Information",
        "Please fill in your contact details.",
      );
      return;
    }

    setLoading(true);
    try {
      // Simulate booking process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      Alert.alert(
        "Booking Confirmed!",
        `Your booking for ${tour.title} has been confirmed. You will receive a confirmation email shortly.`,
        [
          {
            text: "View Bookings",
            onPress: () => navigation.navigate("MyBookings"),
          },
          {
            text: "Continue Exploring",
            onPress: () => navigation.navigate("CustomerMain"),
          },
        ],
      );
    } catch (error) {
      Alert.alert("Booking Failed", "Please try again or contact support.");
    } finally {
      setLoading(false);
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
          <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Tour</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Tour Summary */}
        <Card variant="elevated" style={styles.tourCard}>
          <Text style={styles.tourTitle}>{tour.title}</Text>
          <Text style={styles.tourPrice}>
            ${tour.price} per person • {tour.duration} days
          </Text>
        </Card>

        {/* Guest Selection */}
        <Card variant="elevated" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Number of Guests</Text>
          <View style={styles.guestSelector}>
            <TouchableOpacity
              style={styles.guestButton}
              onPress={() => adjustGuests(false)}
            >
              <Ionicons name="remove" size={20} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.guestCount}>{bookingData.guests}</Text>
            <TouchableOpacity
              style={styles.guestButton}
              onPress={() => adjustGuests(true)}
            >
              <Ionicons name="add" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Date Selection */}
        <Card variant="elevated" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Preferred Start Date</Text>
          <TouchableOpacity style={styles.dateSelector}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={COLORS.textSecondary}
            />
            <Text style={styles.dateText}>
              {bookingData.startDate || "Select your preferred date"}
            </Text>
            <Ionicons
              name="chevron-down"
              size={20}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
        </Card>

        {/* Contact Information */}
        <Card variant="elevated" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.form}>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={bookingData.contactName}
              onChangeText={(value) => handleInputChange("contactName", value)}
              leftIcon="person-outline"
            />
            <Input
              label="Email Address"
              placeholder="Enter your email"
              value={bookingData.contactEmail}
              onChangeText={(value) => handleInputChange("contactEmail", value)}
              leftIcon="mail-outline"
              keyboardType="email-address"
            />
            <Input
              label="Phone Number"
              placeholder="Enter your phone number"
              value={bookingData.contactPhone}
              onChangeText={(value) => handleInputChange("contactPhone", value)}
              leftIcon="call-outline"
              keyboardType="phone-pad"
            />
          </View>
        </Card>

        {/* Special Requests */}
        <Card variant="elevated" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Special Requests</Text>
          <Input
            placeholder="Any special requirements or dietary restrictions?"
            value={bookingData.specialRequests}
            onChangeText={(value) =>
              handleInputChange("specialRequests", value)
            }
            multiline
            numberOfLines={3}
          />
        </Card>

        {/* Price Breakdown */}
        <Card variant="elevated" style={styles.priceCard}>
          <Text style={styles.sectionTitle}>Price Breakdown</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>
              ${tour.price} × {bookingData.guests} guests
            </Text>
            <Text style={styles.priceValue}>
              ${tour.price * bookingData.guests}
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Service fee</Text>
            <Text style={styles.priceValue}>$99</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Insurance</Text>
            <Text style={styles.priceValue}>$49</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${calculateTotal() + 148}</Text>
          </View>
        </Card>

        {/* Terms */}
        <Card variant="flat" style={styles.termsCard}>
          <Text style={styles.termsText}>
            By proceeding with this booking, you agree to our{" "}
            <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
            <Text style={styles.termsLink}>Cancellation Policy</Text>.
          </Text>
        </Card>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ${calculateTotal() + 148}</Text>
        </View>
        <Button
          title="Confirm Booking"
          variant="primary"
          size="lg"
          loading={loading}
          onPress={handleBooking}
          icon="checkmark"
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
  placeholder: {
    width: 40,
  },
  tourCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.base,
  },
  tourTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  tourPrice: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  sectionCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.base,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.base,
  },
  guestSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.lg,
  },
  guestButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    backgroundColor: `${COLORS.primary}15`,
    alignItems: "center",
    justifyContent: "center",
  },
  guestCount: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    minWidth: 40,
    textAlign: "center",
  },
  dateSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gray100,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
  },
  dateText: {
    flex: 1,
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
  },
  form: {
    gap: SPACING.sm,
  },
  priceCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.base,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  priceLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  priceValue: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
  totalLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
  },
  totalValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
  },
  termsCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
    backgroundColor: `${COLORS.info}10`,
  },
  termsText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    lineHeight: FONT_SIZES.xs * 1.5,
  },
  termsLink: {
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.medium,
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
    gap: SPACING.base,
  },
  totalContainer: {
    flex: 1,
  },
  totalText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
  },
  bookButton: {
    flex: 1,
  },
});
