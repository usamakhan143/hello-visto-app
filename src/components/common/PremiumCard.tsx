import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { COLORS, SIZES } from "../../constants";

interface PremiumCardProps {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "luxury" | "glass";
  padding?: number;
  margin?: number;
  style?: ViewStyle;
}

export default function PremiumCard({
  children,
  variant = "default",
  padding = SIZES.padding,
  margin = 0,
  style,
}: PremiumCardProps) {
  const getCardStyle = () => {
    const baseStyle = {
      padding,
      margin,
      borderRadius: SIZES.radiusLarge,
    };

    switch (variant) {
      case "elevated":
        return {
          ...baseStyle,
          backgroundColor: COLORS.surfaceLight,
          shadowColor: COLORS.dark,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.15,
          shadowRadius: 24,
          elevation: 12,
        };
      case "luxury":
        return {
          ...baseStyle,
          backgroundColor: COLORS.surfaceLight,
          shadowColor: COLORS.primary,
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.25,
          shadowRadius: 32,
          elevation: 16,
          borderWidth: 1,
          borderColor: COLORS.borderLight,
        };
      case "glass":
        return {
          ...baseStyle,
          backgroundColor: COLORS.overlayLight,
          backdropFilter: "blur(20px)",
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.2)",
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: COLORS.surfaceLight,
          shadowColor: COLORS.dark,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 6,
        };
    }
  };

  return <View style={[getCardStyle(), style]}>{children}</View>;
}
