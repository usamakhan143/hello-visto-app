import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SPACING } from "../../constants";
import Logo from "../../components/common/Logo";

const { width, height } = Dimensions.get("window");

interface SplashScreenProps {
  navigation: any;
}

export default function SplashScreen({ navigation }: SplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Floating elements animations
  const float1 = useRef(new Animated.Value(0)).current;
  const float2 = useRef(new Animated.Value(0)).current;
  const float3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    StatusBar.setHidden(true);

    // Start floating elements animations
    startFloatingAnimations();

    // Main logo animation sequence
    const animationSequence = Animated.sequence([
      // Initial entrance
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // Slight rotation for premium effect
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      // Hold for a moment
      Animated.delay(800),
      // Final pulse before navigation
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]);

    animationSequence.start(() => {
      StatusBar.setHidden(false);
      navigation.replace("Onboarding");
    });

    // Cleanup on unmount
    return () => {
      StatusBar.setHidden(false);
    };
  }, [navigation]);

  const startFloatingAnimations = () => {
    const createFloatingAnimation = (
      animValue: Animated.Value,
      delay: number,
    ) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ]),
      );
    };

    createFloatingAnimation(float1, 0).start();
    createFloatingAnimation(float2, 1000).start();
    createFloatingAnimation(float3, 2000).start();
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const float1Transform = float1.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -20, 0],
  });

  const float2Transform = float2.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 15, 0],
  });

  const float3Transform = float3.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -25, 0],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          COLORS.primary,
          COLORS.primaryLight,
          COLORS.secondary,
          COLORS.accent,
        ]}
        locations={[0, 0.3, 0.7, 1]}
        style={styles.gradient}
      >
        {/* Floating decorative elements */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.element1,
            {
              transform: [{ translateY: float1Transform }],
              opacity: float1,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.floatingElement,
            styles.element2,
            {
              transform: [{ translateY: float2Transform }],
              opacity: float2,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.floatingElement,
            styles.element3,
            {
              transform: [{ translateY: float3Transform }],
              opacity: float3,
            },
          ]}
        />

        {/* Animated rings around logo */}
        <Animated.View
          style={[
            styles.ring,
            styles.outerRing,
            {
              opacity: fadeAnim,
              transform: [
                {
                  scale: scaleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1.2],
                  }),
                },
                { rotate: spin },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.ring,
            styles.middleRing,
            {
              opacity: fadeAnim,
              transform: [
                {
                  scale: scaleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1.1],
                  }),
                },
                {
                  rotate: rotateAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "-180deg"],
                  }),
                },
              ],
            },
          ]}
        />

        {/* Main logo container */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.logoBackground}>
            <Logo size="xl" showText={true} variant="white" />
          </View>
        </Animated.View>

        {/* Premium loading indicator */}
        <Animated.View
          style={[
            styles.loadingContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.loadingBar}>
            <Animated.View
              style={[
                styles.loadingProgress,
                {
                  transform: [
                    {
                      scaleX: scaleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  floatingElement: {
    position: "absolute",
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  element1: {
    width: 60,
    height: 60,
    top: height * 0.2,
    left: width * 0.15,
  },
  element2: {
    width: 40,
    height: 40,
    top: height * 0.7,
    right: width * 0.2,
  },
  element3: {
    width: 80,
    height: 80,
    top: height * 0.15,
    right: width * 0.1,
  },
  ring: {
    position: "absolute",
    borderWidth: 2,
    borderRadius: 9999,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  outerRing: {
    width: 200,
    height: 200,
  },
  middleRing: {
    width: 160,
    height: 160,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  logoBackground: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 100,
    padding: SPACING["3xl"],
    backdropFilter: "blur(10px)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  loadingContainer: {
    position: "absolute",
    bottom: height * 0.15,
    alignItems: "center",
  },
  loadingBar: {
    width: 200,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 2,
    overflow: "hidden",
  },
  loadingProgress: {
    height: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 2,
  },
});
