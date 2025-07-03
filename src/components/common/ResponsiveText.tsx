import React from "react";
import { Text, TextProps, TextStyle } from "react-native";
import { FONT_SIZES, ACCESSIBLE_TEXT_PROPS } from "../../constants";
import { responsiveFont } from "../../utils/responsiveFont";

interface ResponsiveTextProps extends TextProps {
  size?: keyof typeof FONT_SIZES;
  weight?:
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  color?: string;
  align?: "left" | "center" | "right" | "justify";
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
}

export default function ResponsiveText({
  size = "base",
  weight = "400",
  color,
  align = "left",
  children,
  style,
  ...props
}: ResponsiveTextProps) {
  const textStyle: TextStyle = {
    fontSize: responsiveFont(FONT_SIZES[size]),
    fontWeight: weight,
    textAlign: align,
    ...(color && { color }),
  };

  return (
    <Text
      style={[textStyle, style]}
      {...ACCESSIBLE_TEXT_PROPS[size]}
      {...props}
    >
      {children}
    </Text>
  );
}
