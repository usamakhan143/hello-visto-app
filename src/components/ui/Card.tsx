import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { COLORS, SPACING, RADIUS, SHADOWS } from "../../constants";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "outlined" | "flat";
  padding?: keyof typeof SPACING;
  margin?: keyof typeof SPACING;
  borderRadius?: keyof typeof RADIUS;
  style?: ViewStyle;
}

export default function Card({
  children,
  variant = "default",
  padding = "base",
  margin,
  borderRadius = "lg",
  style,
}: CardProps) {
  const getCardStyles = () => {
    const baseStyles = [
      styles.card,
      {
        padding: SPACING[padding] || SPACING.base,
        borderRadius: RADIUS[borderRadius] || RADIUS.lg,
      },
    ];

    if (margin && SPACING[margin]) {
      baseStyles.push({ margin: SPACING[margin] });
    }

    switch (variant) {
      case "elevated":
        baseStyles.push(styles.elevated);
        break;
      case "outlined":
        baseStyles.push(styles.outlined);
        break;
      case "flat":
        baseStyles.push(styles.flat);
        break;
      default:
        baseStyles.push(styles.default);
        break;
    }

    return baseStyles;
  };

  return <View style={[getCardStyles(), style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
  },
  default: {
    ...SHADOWS.sm,
  },
  elevated: {
    ...SHADOWS.lg,
  },
  outlined: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  flat: {
    backgroundColor: COLORS.surface,
  },
});
