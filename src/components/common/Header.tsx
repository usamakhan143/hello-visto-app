import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, SIZES, FONTS } from "../../constants";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightIcon?: string;
  onRightPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
}

export default function Header({
  title,
  showBack = false,
  onBackPress,
  rightIcon,
  onRightPress,
  backgroundColor = COLORS.surface,
  textColor = COLORS.text,
}: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.container, { paddingTop: insets.top, backgroundColor }]}
    >
      <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} />
      <View style={styles.header}>
        <View style={styles.leftSection}>
          {showBack && (
            <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
              <Ionicons name="chevron-back" size={24} color={textColor} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.centerSection}>
          <Text style={[styles.title, { color: textColor }]}>{title}</Text>
        </View>

        <View style={styles.rightSection}>
          {rightIcon && (
            <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
              <Ionicons name={rightIcon as any} size={24} color={textColor} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 4,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: SIZES.headerHeight,
    paddingHorizontal: SIZES.padding,
  },
  leftSection: {
    width: 40,
    alignItems: "flex-start",
  },
  centerSection: {
    flex: 1,
    alignItems: "center",
  },
  rightSection: {
    width: 40,
    alignItems: "flex-end",
  },
  title: {
    fontSize: 18,
    // fontFamily: FONTS.bold,
    fontWeight: "600",
  },
  iconButton: {
    padding: 8,
  },
});
