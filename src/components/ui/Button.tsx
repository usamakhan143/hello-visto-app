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
  FONT_SIZES,
  FONT_WEIGHTS,
  SPACING,
  RADIUS,
  SHADOWS,
  ACCESSIBLE_TEXT_PROPS,
} from "../../constants";
import {
  responsiveFont,
  responsiveSize,
  responsiveSpacing,
} from "../../utils/responsiveFont";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "text";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  style?: any;
}

export default function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  style,
}: ButtonProps) {
  const getButtonStyles = () => {
    const baseStyles = [
      styles.button,
      styles[size],
      fullWidth && styles.fullWidth,
    ];

    switch (variant) {
      case "primary":
        baseStyles.push(styles.primary);
        break;
      case "secondary":
        baseStyles.push(styles.secondary);
        break;
      case "outline":
        baseStyles.push(styles.outline);
        break;
      case "ghost":
        baseStyles.push(styles.ghost);
        break;
      case "text":
        baseStyles.push(styles.text);
        break;
    }

    if (disabled) {
      baseStyles.push(styles.disabled);
    }

    return baseStyles;
  };

  const getTextStyles = () => {
    const baseStyles = [styles.text, styles[`${size}Text`]];

    switch (variant) {
      case "primary":
        baseStyles.push(styles.primaryText);
        break;
      case "secondary":
        baseStyles.push(styles.secondaryText);
        break;
      case "outline":
        baseStyles.push(styles.outlineText);
        break;
      case "ghost":
        baseStyles.push(styles.ghostText);
        break;
      case "text":
        baseStyles.push(styles.textButtonText);
        break;
    }

    if (disabled) {
      baseStyles.push(styles.disabledText);
    }

    return baseStyles;
  };

  const getIconSize = () => {
    switch (size) {
      case "sm":
        return 16;
      case "lg":
        return 20;
      default:
        return 18;
    }
  };

  const getIconColor = () => {
    if (disabled) return COLORS.gray400;

    switch (variant) {
      case "primary":
        return COLORS.white;
      case "secondary":
        return COLORS.white;
      case "outline":
        return COLORS.primary;
      case "ghost":
        return COLORS.primary;
      case "text":
        return COLORS.primary;
      default:
        return COLORS.white;
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size="small"
          color={
            variant === "primary" || variant === "secondary"
              ? COLORS.white
              : COLORS.primary
          }
        />
      );
    }

    return (
      <View style={styles.content}>
        {icon && iconPosition === "left" && (
          <Ionicons
            name={icon as any}
            size={getIconSize()}
            color={getIconColor()}
            style={styles.iconLeft}
          />
        )}
        <Text
          style={getTextStyles()}
          {...ACCESSIBLE_TEXT_PROPS[
            size === "sm" ? "sm" : size === "lg" ? "md" : "base"
          ]}
        >
          {title}
        </Text>
        {icon && iconPosition === "right" && (
          <Ionicons
            name={icon as any}
            size={getIconSize()}
            color={getIconColor()}
            style={styles.iconRight}
          />
        )}
      </View>
    );
  };

  if (variant === "primary" && !disabled) {
    return (
      <TouchableOpacity
        style={[getButtonStyles(), style]}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryDark]}
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
      style={[getButtonStyles(), style]}
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
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
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
  fullWidth: {
    width: "100%",
  },

  // Sizes
  sm: {
    height: responsiveSize(36),
    paddingHorizontal: responsiveSpacing(SPACING.md),
  },
  md: {
    height: responsiveSize(44),
    paddingHorizontal: responsiveSpacing(SPACING.lg),
  },
  lg: {
    height: responsiveSize(52),
    paddingHorizontal: responsiveSpacing(SPACING.xl),
  },

  // Variants
  primary: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.sm,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
    ...SHADOWS.sm,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  ghost: {
    backgroundColor: `${COLORS.primary}10`,
  },
  text: {
    backgroundColor: "transparent",
  },
  disabled: {
    backgroundColor: COLORS.gray200,
    ...SHADOWS.xs,
  },

  // Text Styles
  buttonText: {
    // fontFamily: FONTS.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
    letterSpacing: 0.3,
  },
  smText: {
    fontSize: responsiveFont(FONT_SIZES.sm),
  },
  mdText: {
    fontSize: responsiveFont(FONT_SIZES.base),
  },
  lgText: {
    fontSize: responsiveFont(FONT_SIZES.md),
  },

  // Text Colors
  primaryText: {
    color: COLORS.white,
  },
  secondaryText: {
    color: COLORS.white,
  },
  outlineText: {
    color: COLORS.primary,
  },
  ghostText: {
    color: COLORS.primary,
  },
  textButtonText: {
    color: COLORS.primary,
  },
  disabledText: {
    color: COLORS.gray400,
  },

  // Icons
  iconLeft: {
    marginRight: responsiveSpacing(SPACING.xs),
  },
  iconRight: {
    marginLeft: responsiveSpacing(SPACING.xs),
  },
});
