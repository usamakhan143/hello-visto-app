import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Animated,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import Button from "../../components/ui/Button";
import {
  COLORS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SPACING,
  RADIUS,
} from "../../constants";

const { width, height } = Dimensions.get("window");

const onboardingData = [
  {
    id: 1,
    title: "Luxury Travel\nRedefined",
    subtitle: "DISCOVER • EXPLORE • EXPERIENCE",
    description:
      "Embark on extraordinary journeys curated by world-class travel experts and local connoisseurs.",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=90",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-tropical-beach-44525-large.mp4",
    icon: "diamond",
    gradient: [COLORS.primary, COLORS.secondary, COLORS.accent],
    stats: { destinations: "200+", experiences: "10K+", travelers: "1M+" },
  },
  {
    id: 2,
    title: "Seamless\nBooking Experience",
    subtitle: "BOOK • PAY • TRAVEL",
    description:
      "Effortless reservations with instant confirmations, premium support, and complete peace of mind.",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=90",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-luxury-resort-pool-44518-large.mp4",
    icon: "shield-checkmark",
    gradient: [COLORS.secondary, COLORS.accent, COLORS.primary],
    stats: { security: "100%", support: "24/7", satisfaction: "99%" },
  },
  {
    id: 3,
    title: "Create Unforgettable\nMemories",
    subtitle: "CONNECT • SHARE • INSPIRE",
    description:
      "Join an exclusive community of luxury travelers and discover hidden gems around the globe.",
    image: "https://images.pexels.com/photos/952842/pexels-photo-952842.jpeg",
    video:
      "https://assets.mixkit.co/videos/preview/mixkit-couple-walking-on-the-beach-44516-large.mp4",
    icon: "sparkles",
    gradient: [COLORS.accent, COLORS.primary, COLORS.secondary],
    stats: { reviews: "5.0★", countries: "50+", partners: "500+" },
  },
];

interface OnboardingScreenProps {
  navigation: any;
}

export default function PremiumOnboardingScreen({
  navigation,
}: OnboardingScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Initial animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous rotation animation for decorative elements
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    } else {
      navigation.navigate("Login");
    }
  };

  const handleSkip = () => {
    navigation.navigate("Login");
  };

  const onScrollEnd = (event: any) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      // Trigger animations for new slide
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const renderSlide = (item: any, index: number) => {
    const currentItem = onboardingData[currentIndex];
    const isActive = index === currentIndex;

    return (
      <View key={item.id} style={styles.slide}>
        {/* Background Image with Parallax Effect */}
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          {/* Dynamic Gradient Overlay */}
          <LinearGradient
            colors={[
              "rgba(0,0,0,0.0)",
              "rgba(0,0,0,0.1)",
              "rgba(0,0,0,0.4)",
              "rgba(0,0,0,0.7)",
            ]}
            locations={[0, 0.3, 0.7, 1]}
            style={styles.gradientOverlay}
          />

          {/* Floating Decorative Elements */}
          <Animated.View
            style={[
              styles.decorativeElement,
              styles.decorativeElement1,
              {
                transform: [
                  {
                    rotate: rotateAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "360deg"],
                    }),
                  },
                ],
                opacity: isActive ? 0.3 : 0,
              },
            ]}
          >
            <LinearGradient
              colors={item.gradient}
              style={styles.decorativeGradient}
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.decorativeElement,
              styles.decorativeElement2,
              {
                transform: [
                  {
                    rotate: rotateAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["360deg", "0deg"],
                    }),
                  },
                ],
                opacity: isActive ? 0.2 : 0,
              },
            ]}
          >
            <LinearGradient
              colors={[...item.gradient].reverse()}
              style={styles.decorativeGradient}
            />
          </Animated.View>

          {/* Content Container */}
          <Animated.View
            style={[
              styles.contentContainer,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                  { scale: scaleAnim },
                ],
              },
            ]}
          >
            {/* Premium Icon */}
            <View style={styles.iconSection}>
              <BlurView intensity={8} tint="light" style={styles.iconContainer}>
                <LinearGradient
                  colors={item.gradient}
                  style={styles.iconGradient}
                >
                  <Ionicons name={item.icon} size={40} color={COLORS.white} />
                </LinearGradient>
              </BlurView>
            </View>

            {/* Title Section */}
            <View style={styles.titleSection}>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>

            {/* Stats Section */}
            <BlurView intensity={6} tint="dark" style={styles.statsContainer}>
              <LinearGradient
                colors={["rgba(255,255,255,0.08)", "rgba(255,255,255,0.04)"]}
                style={styles.statsOverlay}
              >
                <View style={styles.statsGrid}>
                  {Object.entries(item.stats).map(([key, value], idx) => (
                    <View key={idx} style={styles.statItem}>
                      <Text style={styles.statValue}>{value}</Text>
                      <Text style={styles.statLabel}>{key.toUpperCase()}</Text>
                    </View>
                  ))}
                </View>
              </LinearGradient>
            </BlurView>
          </Animated.View>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Header */}
      <SafeAreaView style={styles.header}>
        <BlurView intensity={8} tint="dark" style={styles.headerContent}>
          <View style={styles.logoSection}>
            <Image
              source={{
                uri: "https://cdn.builder.io/api/v1/image/assets%2F80e6fadc5fba49849451088d08fdc300%2Fc34895fda5044aedbde4373d88e43614?format=webp&width=200",
              }}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.brandName}>Hello Visto</Text>
            <Text style={styles.brandTagline}>LUXURY TRAVEL</Text>
          </View>

          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <BlurView intensity={6} tint="dark" style={styles.skipBlur}>
              <Text style={styles.skipText}>Skip</Text>
            </BlurView>
          </TouchableOpacity>
        </BlurView>
      </SafeAreaView>

      {/* Slides */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        style={styles.scrollView}
        decelerationRate="fast"
      >
        {onboardingData.map((item, index) => renderSlide(item, index))}
      </ScrollView>

      {/* Footer */}
      <SafeAreaView style={styles.footer}>
        <BlurView intensity={10} tint="dark" style={styles.footerContent}>
          {/* Advanced Pagination */}
          <View style={styles.pagination}>
            {onboardingData.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={styles.paginationDot}
                onPress={() => {
                  setCurrentIndex(index);
                  scrollViewRef.current?.scrollTo({
                    x: index * width,
                    animated: true,
                  });
                }}
              >
                <View style={styles.dotBackground}>
                  {index === currentIndex && (
                    <LinearGradient
                      colors={onboardingData[currentIndex].gradient}
                      style={styles.activeDot}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBar}>
            <LinearGradient
              colors={onboardingData[currentIndex].gradient}
              style={[
                styles.progressFill,
                {
                  width: `${((currentIndex + 1) / onboardingData.length) * 100}%`,
                },
              ]}
            />
          </View>

          {/* Action Button */}
          <View style={styles.actionSection}>
            <TouchableOpacity style={styles.premiumButton} onPress={handleNext}>
              <LinearGradient
                colors={onboardingData[currentIndex].gradient}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.buttonText}>
                  {currentIndex === onboardingData.length - 1
                    ? "Begin Journey"
                    : "Continue"}
                </Text>
                <Ionicons
                  name={
                    currentIndex === onboardingData.length - 1
                      ? "rocket"
                      : "arrow-forward"
                  }
                  size={20}
                  color={COLORS.white}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </BlurView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray900,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.base,
    borderRadius: RADIUS.lg,
    margin: SPACING.base,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  logoSection: {
    alignItems: "center",
  },
  logo: {
    width: 32,
    height: 32,
    marginBottom: SPACING.xs,
  },
  brandName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.black,
    color: COLORS.white,
    letterSpacing: 2,
  },
  brandTagline: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.white,
    opacity: 0.8,
    letterSpacing: 1,
  },
  skipButton: {
    borderRadius: RADIUS.full,
    overflow: "hidden",
  },
  skipBlur: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  skipText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: width,
    height: height,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  decorativeElement: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: RADIUS.full,
  },
  decorativeElement1: {
    top: "20%",
    right: "-10%",
  },
  decorativeElement2: {
    bottom: "30%",
    left: "-15%",
    width: 150,
    height: 150,
  },
  decorativeGradient: {
    flex: 1,
    borderRadius: RADIUS.full,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 120,
    paddingBottom: 200,
    paddingHorizontal: SPACING.lg,
  },
  iconSection: {
    alignItems: "center",
  },
  iconContainer: {
    borderRadius: RADIUS.full,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  iconGradient: {
    width: 100,
    height: 100,
    borderRadius: RADIUS.full,
    alignItems: "center",
    justifyContent: "center",
  },
  titleSection: {
    alignItems: "center",
    paddingHorizontal: SPACING.base,
  },
  subtitle: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    letterSpacing: 3,
    marginBottom: SPACING.sm,
    opacity: 0.9,
  },
  title: {
    fontSize: FONT_SIZES["5xl"],
    fontWeight: FONT_WEIGHTS.black,
    color: COLORS.white,
    textAlign: "center",
    marginBottom: SPACING.lg,
    lineHeight: FONT_SIZES["5xl"] * 1.1,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  description: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.regular,
    color: COLORS.white,
    textAlign: "center",
    lineHeight: FONT_SIZES.md * 1.6,
    opacity: 0.9,
    maxWidth: "90%",
  },
  statsContainer: {
    borderRadius: RADIUS.xl,
    overflow: "hidden",
    marginHorizontal: SPACING.base,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  statsOverlay: {
    borderRadius: RADIUS.xl,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.base,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.black,
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.white,
    opacity: 0.8,
    letterSpacing: 1,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerContent: {
    margin: SPACING.base,
    borderRadius: RADIUS.xl,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: SPACING.base,
    gap: SPACING.sm,
  },
  paginationDot: {
    padding: SPACING.xs,
  },
  dotBackground: {
    width: 12,
    height: 12,
    borderRadius: RADIUS.full,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    overflow: "hidden",
  },
  activeDot: {
    flex: 1,
    borderRadius: RADIUS.full,
  },
  progressBar: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: RADIUS.full,
    marginBottom: SPACING.lg,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.1)",
  },
  progressFill: {
    height: "100%",
    borderRadius: RADIUS.full,
  },
  actionSection: {
    alignItems: "center",
  },
  premiumButton: {
    borderRadius: RADIUS.full,
    overflow: "hidden",
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING["2xl"],
    paddingVertical: SPACING.base,
    gap: SPACING.sm,
  },
  buttonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    letterSpacing: 0.5,
  },
});
