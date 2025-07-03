import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  ViewStyle,
} from "react-native";
import {
  COLORS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SPACING,
  RADIUS,
  SHADOWS,
} from "../../constants";

interface GoogleSignInButtonProps {
  onPress: () => void;
  loading?: boolean;
  style?: ViewStyle;
  variant?: "light" | "dark";
  size?: "small" | "medium" | "large";
}

export default function GoogleSignInButton({
  onPress,
  loading = false,
  style,
  variant = "light",
  size = "medium",
}: GoogleSignInButtonProps) {
  const isDark = variant === "dark";

  const buttonSizes = {
    small: {
      height: 40,
      paddingHorizontal: SPACING.md,
      fontSize: FONT_SIZES.sm,
      iconSize: 16,
    },
    medium: {
      height: 48,
      paddingHorizontal: SPACING.lg,
      fontSize: FONT_SIZES.base,
      iconSize: 20,
    },
    large: {
      height: 56,
      paddingHorizontal: SPACING.xl,
      fontSize: FONT_SIZES.md,
      iconSize: 24,
    },
  };

  const currentSize = buttonSizes[size];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          height: currentSize.height,
          paddingHorizontal: currentSize.paddingHorizontal,
          backgroundColor: isDark ? "#1f1f1f" : "#ffffff",
          borderColor: isDark ? "#333333" : "#dadce0",
        },
        style,
      ]}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {/* Google Icon */}
        <View style={[styles.iconContainer, { marginRight: SPACING.sm }]}>
          <Image
            source={{
              uri: "https://developers.google.com/identity/images/g-logo.png",
            }}
            style={{
              width: currentSize.iconSize,
              height: currentSize.iconSize,
            }}
            resizeMode="contain"
          />
        </View>

        {/* Google Text */}
        <Text
          style={[
            styles.text,
            {
              fontSize: currentSize.fontSize,
              color: isDark ? "#ffffff" : "#3c4043",
            },
          ]}
        >
          {loading ? "Signing in..." : "Continue with Google"}
        </Text>
      </View>

      {/* Loading overlay */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingDot} />
          <View style={[styles.loadingDot, { animationDelay: "0.1s" }]} />
          <View style={[styles.loadingDot, { animationDelay: "0.2s" }]} />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: RADIUS.base,
    position: "relative",
    overflow: "hidden",
    ...SHADOWS.sm,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: FONT_WEIGHTS.medium,
    textAlign: "center",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4285f4",
    marginHorizontal: 2,
  },
});
