import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/common/Header";
import { COLORS, SIZES, FONTS } from "../../constants";

interface NotificationsScreenProps {
  navigation: any;
}

export default function NotificationsScreen({
  navigation,
}: NotificationsScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Notifications"
        showBack
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Notifications Coming Soon!</Text>
        <Text style={styles.subtitle}>
          This feature will show you important updates, booking confirmations,
          and system notifications.
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
