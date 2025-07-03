import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/common/Header";
import { COLORS, SIZES, FONTS } from "../../constants";

interface AdminDashboardScreenProps {
  navigation: any;
}

export default function AdminDashboardScreen({
  navigation,
}: AdminDashboardScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Admin Dashboard" rightIcon="analytics-outline" />
      <View style={styles.content}>
        <Text style={styles.title}>Admin Dashboard Coming Soon!</Text>
        <Text style={styles.subtitle}>
          This feature will provide comprehensive admin controls for managing
          vendors, commissions, and platform analytics.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SIZES.padding * 2,
  },
  title: {
    fontSize: 24,
    // fontFamily: FONTS.bold,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 24,
  },
});
