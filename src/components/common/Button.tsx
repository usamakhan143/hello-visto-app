import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  FONTS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SPACING,
  RADIUS,
} from "../../constants";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "text" | "luxury" | "ghost";
  size?: "small" | "medium" | "large" | "xl";
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  iconPosition?: "left" | "right";
  style?: any;
  textStyle?: any;
}

export default function Button({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  style,
  textStyle,
}: ButtonProps) {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];

    switch (variant) {
      case "outline":
        baseStyle.push(styles.outline);
        break;
      case "text":
        baseStyle.push(styles.text);
        break;
      case "secondary":
        baseStyle.push(styles.secondary);
        break;
      case "luxury":
        baseStyle.push(styles.luxury);
        break;
      case "ghost":
        baseStyle.push(styles.ghost);
        break;
    }

    if (disabled) {
      baseStyle.push(styles.disabled);
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.buttonText, styles[`${size}Text`]];

    switch (variant) {
      case "outline":
        baseStyle.push(styles.outlineText);
        break;
      case "text":
        baseStyle.push(styles.textButtonText);
        break;
      case "secondary":
        baseStyle.push(styles.secondaryText);
        break;
      case "luxury":
        baseStyle.push(styles.luxuryText);
        break;
      case "ghost":
        baseStyle.push(styles.ghostText);
        break;
    }

    if (disabled) {
      baseStyle.push(styles.disabledText);
    }

    return baseStyle;
  };

  const getIconSize = () => {
    switch (size) {
      case "small":
        return 16;
      case "large":
        return 24;
      case "xl":
        return 28;
      default:
        return 20;
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          color={
            variant === "primary" || variant === "luxury"
              ? COLORS.white
              : COLORS.primary
          }
          size="small"
        />
      );
    }

    return (
      <View style={styles.content}>
        {icon && iconPosition === "left" && (
          <Ionicons
            name={icon as any}
            size={getIconSize()}
            color={
              variant === "primary" || variant === "luxury"
                ? COLORS.white
                : COLORS.primary
            }
            style={styles.iconLeft}
          />
        )}
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
        {icon && iconPosition === "right" && (
          <Ionicons
            name={icon as any}
            size={getIconSize()}
            color={
              variant === "primary" || variant === "luxury"
                ? COLORS.white
                : COLORS.primary
            }
            style={styles.iconRight}
          />
        )}
      </View>
    );
  };

  if ((variant === "primary" || variant === "luxury") && !disabled) {
    const gradientColors =
      variant === "luxury"
        ? [COLORS.gradientStart, COLORS.gradientMiddle, COLORS.gradientEnd]
        : [COLORS.primary, COLORS.secondary];

    return (
      <TouchableOpacity
        style={[getButtonStyle(), style]}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={gradientColors}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: RADIUS.lg,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  gradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconLeft: {
    marginRight: SPACING.sm,
  },
  iconRight: {
    marginLeft: SPACING.sm,
  },
  small: {
    height: 40,
    paddingHorizontal: SPACING.md,
  },
  medium: {
    height: 52,
    paddingHorizontal: SPACING.lg,
  },
  large: {
    height: 60,
    paddingHorizontal: SPACING.xl,
  },
  xl: {
    height: 68,
    paddingHorizontal: SPACING["2xl"],
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  luxury: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  outline: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: "transparent",
    shadowOpacity: 0,
    elevation: 0,
  },
  text: {
    backgroundColor: "transparent",
    shadowOpacity: 0,
    elevation: 0,
  },
  ghost: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  disabled: {
    backgroundColor: COLORS.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    // // fontFamily: FONTS.semiBold,
    fontWeight: "600",
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  smallText: {
    fontSize: FONT_SIZES.sm,
  },
  mediumText: {
    fontSize: FONT_SIZES.md,
  },
  largeText: {
    fontSize: FONT_SIZES.lg,
  },
  xlText: {
    fontSize: FONT_SIZES.xl,
    // fontFamily: FONTS.bold,
    fontWeight: "700",
  },
  outlineText: {
    color: COLORS.primary,
  },
  textButtonText: {
    color: COLORS.primary,
  },
  secondaryText: {
    color: COLORS.white,
  },
  luxuryText: {
    color: COLORS.white,
    // fontFamily: FONTS.bold,
    fontWeight: "700",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  ghostText: {
    color: COLORS.white,
  },
  disabledText: {
    color: COLORS.textSecondary,
  },
});
