import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../components/common/Button";
import Logo from "../../components/common/Logo";
import GradientBackground from "../../components/common/GradientBackground";
import PremiumCard from "../../components/common/PremiumCard";
import { COLORS, SIZES, FONTS, FONT_SIZES } from "../../constants";

const { width, height } = Dimensions.get("window");

const onboardingData = [
  {
    id: 1,
    title: "Luxury Travel\nExperiences",
    description:
      "Discover exclusive tours and unforgettable adventures curated by premium local vendors worldwide.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600",
    icon: "earth-outline",
    color: COLORS.primary,
  },
  {
    id: 2,
    title: "Premium\nBooking Experience",
    description:
      "Seamless reservations with 5-star customer service, instant confirmations, and exclusive member benefits.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600",
    icon: "shield-checkmark-outline",
    color: COLORS.secondary,
  },
  {
    id: 3,
    title: "Extraordinary\nMemories Await",
    description:
      "Join an elite community of travelers exploring the world's most sought-after destinations.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
    icon: "sparkles-outline",
    color: COLORS.accent,
  },
];

interface OnboardingScreenProps {
  navigation: any;
}

export default function OnboardingScreen({
  navigation,
}: OnboardingScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate("Login");
    }
  };

  const handleSkip = () => {
    navigation.navigate("Login");
  };

  const renderSlide = (item: any, index: number) => (
    <View key={item.id} style={styles.slide}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <View style={styles.overlay} />
        <View style={styles.slideContent}>
          {/* Premium Icon */}
          <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
            <Ionicons name={item.icon} size={32} color={COLORS.textWhite} />
          </View>

          {/* Content Card */}
          <PremiumCard variant="glass" style={styles.contentCard}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </PremiumCard>
        </View>
      </ImageBackground>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground variant="luxury">
        {/* Header with Logo */}
        <View style={styles.header}>
          <Logo size="large" variant="white" />
        </View>

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(
              event.nativeEvent.contentOffset.x / width,
            );
            setCurrentIndex(newIndex);
          }}
          style={styles.scrollView}
        >
          {onboardingData.map((item, index) => renderSlide(item, index))}
        </ScrollView>

        {/* Premium Footer */}
        <PremiumCard variant="glass" style={styles.footer}>
          <View style={styles.pagination}>
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentIndex
                    ? styles.activeDot
                    : styles.inactiveDot,
                ]}
              />
            ))}
          </View>

          <View style={styles.buttons}>
            <Button
              title="Skip"
              onPress={handleSkip}
              variant="text"
              style={styles.skipButton}
              textStyle={styles.skipText}
            />
            <Button
              title={
                currentIndex === onboardingData.length - 1
                  ? "Begin Journey"
                  : "Continue"
              }
              onPress={handleNext}
              variant="primary"
              style={styles.nextButton}
            />
          </View>
        </PremiumCard>
      </GradientBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: SIZES.xl,
    paddingHorizontal: SIZES.padding,
    alignItems: "center",
    marginBottom: SIZES.lg,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: width,
    flex: 1,
    paddingHorizontal: SIZES.padding,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImageStyle: {
    borderRadius: SIZES.radiusXL,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
    borderRadius: SIZES.radiusXL,
  },
  slideContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SIZES.lg,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SIZES.xxl,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  contentCard: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    // fontFamily: FONTS.extraBold,
    fontWeight: "800",
    color: COLORS.textWhite,
    textAlign: "center",
    marginBottom: SIZES.lg,
    lineHeight: 40,
    textShadowColor: COLORS.dark,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  description: {
    fontSize: FONT_SIZES.md,
    // fontFamily: FONTS.medium,
    color: COLORS.textWhite,
    textAlign: "center",
    lineHeight: 24,
    opacity: 0.95,
    letterSpacing: 0.5,
  },
  footer: {
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.xl,
    padding: SIZES.lg,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SIZES.xl,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  activeDot: {
    width: 24,
    backgroundColor: COLORS.textWhite,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  inactiveDot: {
    width: 6,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: SIZES.md,
  },
  skipButton: {
    flex: 1,
  },
  skipText: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZES.md,
    // fontFamily: FONTS.medium,
  },
  nextButton: {
    flex: 2,
  },
});
