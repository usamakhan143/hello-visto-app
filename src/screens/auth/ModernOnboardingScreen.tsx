import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Animated,
  PanGestureHandler,
  State,
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

const { width, height } = Dimensions.get("window");

const onboardingData = [
  {
    id: 1,
    title: "Discover\nAmazing Places",
    subtitle: "Find and book unique travel experiences",
    description:
      "Explore thousands of verified destinations and activities from trusted local guides worldwide.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
    icon: "earth",
    color: COLORS.primary,
  },
  {
    id: 2,
    title: "Book with\nConfidence",
    subtitle: "Secure and hassle-free booking",
    description:
      "Enjoy secure payments, instant confirmations, and 24/7 customer support for worry-free travel.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
    icon: "shield-checkmark",
    color: COLORS.secondary,
  },
  {
    id: 3,
    title: "Create\nMemories",
    subtitle: "Join millions of happy travelers",
    description:
      "Share your experiences and discover new adventures through our global travel community.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    icon: "camera",
    color: COLORS.accent,
  },
];

interface OnboardingScreenProps {
  navigation: any;
}

export default function ModernOnboardingScreen({
  navigation,
}: OnboardingScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

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
    setCurrentIndex(newIndex);
  };

  const renderSlide = (item: any, index: number) => (
    <View key={item.id} style={styles.slide}>
      {/* Hero Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.3)"]}
          style={styles.imageOverlay}
        />

        {/* Floating Icon */}
        <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
          <Ionicons name={item.icon} size={32} color={COLORS.white} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Card variant="flat" padding="lg" style={styles.contentCard}>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </Card>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: "https://cdn.builder.io/api/v1/image/assets%2F80e6fadc5fba49849451088d08fdc300%2Fc34895fda5044aedbde4373d88e43614?format=webp&width=200",
            }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.brandName}>Visto</Text>
        </View>

        <Button title="Skip" variant="text" size="sm" onPress={handleSkip} />
      </View>

      {/* Slides */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        style={styles.scrollView}
      >
        {onboardingData.map((item, index) => renderSlide(item, index))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Card variant="flat" padding="lg" style={styles.footerCard}>
          {/* Pagination */}
          <View style={styles.pagination}>
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      index === currentIndex
                        ? onboardingData[currentIndex].color
                        : COLORS.gray300,
                    width: index === currentIndex ? 24 : 8,
                  },
                ]}
              />
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <Button
              title={
                currentIndex === onboardingData.length - 1
                  ? "Get Started"
                  : "Continue"
              }
              variant="primary"
              size="lg"
              fullWidth
              icon={
                currentIndex === onboardingData.length - 1
                  ? "arrow-forward"
                  : "chevron-forward"
              }
              iconPosition="right"
              onPress={handleNext}
            />
          </View>
        </Card>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.base,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: SPACING.sm,
  },
  brandName: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: width,
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  imageContainer: {
    flex: 1,
    borderRadius: RADIUS["2xl"],
    overflow: "hidden",
    marginBottom: SPACING.xl,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
  },
  iconContainer: {
    position: "absolute",
    top: SPACING.xl,
    right: SPACING.xl,
    width: 64,
    height: 64,
    borderRadius: RADIUS.full,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  content: {
    flex: 0.6,
  },
  contentCard: {
    alignItems: "center",
    backgroundColor: COLORS.surface,
  },
  subtitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: SPACING.sm,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  title: {
    fontSize: FONT_SIZES["4xl"],
    fontWeight: FONT_WEIGHTS.black,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: SPACING.lg,
    lineHeight: FONT_SIZES["4xl"] * 1.2,
  },
  description: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.regular,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: FONT_SIZES.md * 1.6,
    maxWidth: "90%",
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  footerCard: {
    backgroundColor: COLORS.surface,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.xl,
    gap: SPACING.xs,
  },
  dot: {
    height: 8,
    borderRadius: RADIUS.full,
    transition: "all 0.3s ease",
  },
  actions: {
    gap: SPACING.md,
  },
});
