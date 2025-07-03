import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import {
  COLORS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SPACING,
  RADIUS,
} from "../../constants";

interface ForgotPasswordScreenProps {
  navigation: any;
}

export default function ForgotPasswordScreen({
  navigation,
}: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = async () => {
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setEmailSent(true);
      Alert.alert(
        "Reset Email Sent!",
        "Check your email for password reset instructions.",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } catch (error) {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (value: string) => {
    setEmail(value);
    if (error) {
      setError("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.white}
        translucent={false}
        hidden={false}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {/* Main Content */}
          <View style={styles.content}>
            {/* Icon */}
            <View style={styles.iconContainer}>
              <LinearGradient
                colors={[COLORS.primary, COLORS.primaryLight]}
                style={styles.iconBackground}
              >
                <Ionicons name="mail-outline" size={40} color={COLORS.white} />
              </LinearGradient>
            </View>

            {/* Title & Description */}
            <View style={styles.textSection}>
              <Text style={styles.title}>Forgot Password?</Text>
              <Text style={styles.description}>
                {emailSent
                  ? "We've sent password reset instructions to your email."
                  : "Don't worry! Enter your email address and we'll send you instructions to reset your password."}
              </Text>
            </View>

            {/* Form */}
            {!emailSent && (
              <Card variant="elevated" padding="xl" style={styles.formCard}>
                <View style={styles.form}>
                  <Input
                    label="Email Address"
                    placeholder="Enter your registered email"
                    value={email}
                    onChangeText={handleInputChange}
                    leftIcon="mail-outline"
                    keyboardType="email-address"
                    autoComplete="email"
                    autoCapitalize="none"
                    error={error}
                  />

                  <Button
                    title="Send Reset Instructions"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={loading}
                    onPress={handleResetPassword}
                    icon="send"
                    iconPosition="right"
                    style={styles.resetButton}
                  />
                </View>
              </Card>
            )}

            {/* Success State */}
            {emailSent && (
              <Card variant="elevated" padding="xl" style={styles.successCard}>
                <View style={styles.successContent}>
                  <View style={styles.successIcon}>
                    <Ionicons
                      name="checkmark-circle"
                      size={60}
                      color={COLORS.success}
                    />
                  </View>
                  <Text style={styles.successTitle}>Email Sent!</Text>
                  <Text style={styles.successDescription}>
                    Check your inbox and follow the instructions to reset your
                    password.
                  </Text>
                  <Button
                    title="Back to Login"
                    variant="primary"
                    size="lg"
                    fullWidth
                    onPress={() => navigation.goBack()}
                    style={styles.backToLoginButton}
                  />
                </View>
              </Card>
            )}

            {/* Help Section */}
            <View style={styles.helpSection}>
              <Text style={styles.helpTitle}>Need more help?</Text>
              <View style={styles.helpOptions}>
                <TouchableOpacity style={styles.helpOption}>
                  <Ionicons
                    name="chatbubble-outline"
                    size={20}
                    color={COLORS.primary}
                  />
                  <Text style={styles.helpOptionText}>Contact Support</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.helpOption}
                  onPress={() => navigation.navigate("SignUp")}
                >
                  <Ionicons
                    name="person-add-outline"
                    size={20}
                    color={COLORS.primary}
                  />
                  <Text style={styles.helpOptionText}>Create New Account</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Remember your password? </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.loginText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
  },
  header: {
    paddingTop: SPACING.base,
    paddingBottom: SPACING.lg,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flex: 1,
    paddingBottom: SPACING.xl,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  iconBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  textSection: {
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZES["4xl"],
    fontWeight: FONT_WEIGHTS.black,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.regular,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: FONT_SIZES.md * 1.5,
    paddingHorizontal: SPACING.base,
  },
  formCard: {
    marginBottom: SPACING.xl,
  },
  form: {
    gap: SPACING.lg,
  },
  resetButton: {
    marginTop: SPACING.base,
  },
  successCard: {
    marginBottom: SPACING.xl,
  },
  successContent: {
    alignItems: "center",
    gap: SPACING.lg,
  },
  successIcon: {
    marginBottom: SPACING.sm,
  },
  successTitle: {
    fontSize: FONT_SIZES["2xl"],
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.success,
    textAlign: "center",
  },
  successDescription: {
    fontSize: FONT_SIZES.base,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: FONT_SIZES.base * 1.5,
  },
  backToLoginButton: {
    marginTop: SPACING.base,
  },
  helpSection: {
    marginBottom: SPACING.xl,
  },
  helpTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: SPACING.md,
  },
  helpOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  helpOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.sm,
    gap: SPACING.xs,
  },
  helpOptionText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.medium,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  loginText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.primary,
  },
});
