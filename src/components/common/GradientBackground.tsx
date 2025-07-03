import React from "react";
import { ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../constants";

interface GradientBackgroundProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent" | "luxury" | "sunset";
  style?: ViewStyle;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

const gradientVariants = {
  primary: [COLORS.gradientStart, COLORS.gradientMiddle],
  secondary: [COLORS.secondary, COLORS.gradientEnd],
  accent: [COLORS.accent, COLORS.gradientStart],
  luxury: [COLORS.gradientStart, COLORS.gradientMiddle, COLORS.gradientEnd],
  sunset: [COLORS.accent, COLORS.gradientStart, COLORS.gradientMiddle],
};

export default function GradientBackground({
  children,
  variant = "luxury",
  style,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
}: GradientBackgroundProps) {
  return (
    <LinearGradient
      colors={gradientVariants[variant]}
      start={start}
      end={end}
      style={[{ flex: 1 }, style]}
    >
      {children}
    </LinearGradient>
  );
}
