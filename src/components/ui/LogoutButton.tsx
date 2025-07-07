import React from "react";
import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthService } from "../../services/firebase";
import {
  COLORS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SPACING,
  RADIUS,
} from "../../constants";

interface LogoutButtonProps {
  style?: any;
  textStyle?: any;
  variant?: "primary" | "secondary" | "text";
  showIcon?: boolean;
}

export default function LogoutButton({
  style,
  textStyle,
  variant = "text",
  showIcon = true,
}: LogoutButtonProps) {
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await AuthService.signOut();
            // AuthContext will automatically handle navigation to auth screens
            Alert.alert("Success", "You have been logged out successfully");
          } catch (error: any) {
            Alert.alert("Error", error.message || "Failed to logout");
          }
        },
      },
    ]);
  };

  const getButtonStyle = () => {
    switch (variant) {
      case "primary":
        return [styles.button, styles.primaryButton, style];
      case "secondary":
        return [styles.button, styles.secondaryButton, style];
      default:
        return [styles.textButton, style];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "primary":
        return [styles.buttonText, styles.primaryText, textStyle];
      case "secondary":
        return [styles.buttonText, styles.secondaryText, textStyle];
      default:
        return [styles.textButtonText, textStyle];
    }
  };

  return (
    <TouchableOpacity style={getButtonStyle()} onPress={handleLogout}>
      {showIcon && (
        <Ionicons
          name="log-out-outline"
          size={20}
          color={variant === "primary" ? COLORS.white : COLORS.error}
          style={styles.icon}
        />
      )}
      <Text style={getTextStyle()}>Logout</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.base,
    borderRadius: RADIUS.md,
  },
  primaryButton: {
    backgroundColor: COLORS.error,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  textButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
  },
  buttonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  primaryText: {
    color: COLORS.white,
  },
  secondaryText: {
    color: COLORS.error,
  },
  textButtonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.error,
  },
  icon: {
    marginRight: SPACING.xs,
  },
});
