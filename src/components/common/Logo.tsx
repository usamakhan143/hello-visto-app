import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageStyle,
  ViewStyle,
  TextStyle,
} from "react-native";
import {
  COLORS,
  FONT_SIZES,
  FONTS,
  SIZES,
  ACCESSIBLE_TEXT_PROPS,
} from "../../constants";
import {
  responsiveFont,
  responsiveSize,
  responsiveSpacing,
} from "../../utils/responsiveFont";

interface LogoProps {
  size?: "small" | "medium" | "large" | "xl";
  showText?: boolean;
  variant?: "default" | "white" | "dark";
  style?: ViewStyle;
}

const logoSizes = {
  small: responsiveSize(24),
  medium: responsiveSize(40),
  large: responsiveSize(60),
  xl: responsiveSize(80),
};

const textSizes = {
  small: responsiveFont(FONT_SIZES.md),
  medium: responsiveFont(FONT_SIZES.xl),
  large: responsiveFont(FONT_SIZES["2xl"]),
  xl: responsiveFont(FONT_SIZES["3xl"]),
};

export default function Logo({
  size = "medium",
  showText = true,
  variant = "default",
  style,
}: LogoProps) {
  const logoSize = logoSizes[size];
  const textSize = textSizes[size];

  const getTextColor = () => {
    switch (variant) {
      case "white":
        return COLORS.textWhite;
      case "dark":
        return COLORS.dark;
      default:
        return COLORS.textPrimary;
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Image
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets%2F80e6fadc5fba49849451088d08fdc300%2Fc34895fda5044aedbde4373d88e43614?format=webp&width=800",
        }}
        style={[styles.logo, { width: logoSize, height: logoSize }]}
        resizeMode="contain"
      />
      {showText && (
        <Text
          style={[styles.text, { fontSize: textSize, color: getTextColor() }]}
          {...ACCESSIBLE_TEXT_PROPS[
            size === "small" ? "md" : size === "medium" ? "xl" : "2xl"
          ]}
        >
          Hello Visto
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginRight: responsiveSpacing(8),
  },
  text: {
    // // fontFamily: FONTS.bold,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
