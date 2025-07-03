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
import GoogleSignInButton from "../../components/ui/GoogleSignInButton";
import {
  COLORS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SPACING,
  RADIUS,
} from "../../constants";
import { AuthService } from "../../services/firebase";

interface LoginScreenProps {
  navigation: any;
}

export default function ModernLoginScreen({ navigation }: LoginScreenProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const user = await AuthService.signIn(formData.email, formData.password);
      // Check user role and navigate accordingly
      if (user?.role === "vendor") {
        navigation.navigate("VendorMain");
      } else {
        navigation.navigate("CustomerMain");
      }
    } catch (error) {
      Alert.alert(
        "Login Failed",
        "Please check your credentials and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    Alert.alert("Coming Soon", "Google Sign-In will be available soon!");
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
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
              <Ionicons
                name="chevron-back"
                size={24}
                color={COLORS.textPrimary}
              />
            </TouchableOpacity>
          </View>

          {/* Hero Section */}
          <View style={styles.hero}>
            <View style={styles.iconContainer}>
              <LinearGradient
                colors={[COLORS.primary, COLORS.primaryDark]}
                style={styles.iconGradient}
              >
                <Ionicons
                  name="log-in-outline"
                  size={32}
                  color={COLORS.white}
                />
              </LinearGradient>
            </View>

            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Sign in to continue your journey with Hello Visto
            </Text>
          </View>

          {/* Login Form */}
          <Card variant="elevated" padding="xl" style={styles.formCard}>
            <View style={styles.form}>
              <Input
                label="Email Address"
                placeholder="Enter your email"
                value={formData.email}
                onChangeText={(value) => handleInputChange("email", value)}
                leftIcon="mail-outline"
                keyboardType="email-address"
                autoComplete="email"
                error={errors.email}
              />

              <Input
                label="Password"
                placeholder="Enter your password"
                value={formData.password}
                onChangeText={(value) => handleInputChange("password", value)}
                leftIcon="lock-closed-outline"
                rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
                onRightIconPress={() => setShowPassword(!showPassword)}
                secureTextEntry={!showPassword}
                autoComplete="password"
                error={errors.password}
              />

              <TouchableOpacity
                style={styles.forgotPassword}
                onPress={handleForgotPassword}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <Button
                title="Sign In"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                onPress={handleLogin}
                icon="arrow-forward"
                iconPosition="right"
                style={styles.loginButton}
              />

              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or continue with</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Login */}
              <GoogleSignInButton
                onPress={handleGoogleLogin}
                size="large"
                variant="light"
                style={styles.googleButton}
              />

              {/* Demo Access Buttons */}
              <View style={styles.demoSection}>
                <Text style={styles.demoTitle}>Quick Demo Access:</Text>
                <View style={styles.demoButtons}>
                  <Button
                    title="Customer Demo"
                    variant="secondary"
                    size="md"
                    onPress={() => navigation.navigate("CustomerMain")}
                    icon="person"
                    style={styles.demoButton}
                  />
                  <Button
                    title="Vendor Demo"
                    variant="accent"
                    size="md"
                    onPress={() => navigation.navigate("VendorMain")}
                    icon="business"
                    style={styles.demoButton}
                  />
                </View>
              </View>

              {/* Sign Up Link */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                  <Text style={styles.signUpText}>Create Account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>

          {/* Features */}
          <View style={styles.features}>
            <Text style={styles.featuresTitle}>Why Choose Hello Visto?</Text>
            <View style={styles.featuresList}>
              {[
                {
                  icon: "shield-checkmark",
                  title: "Secure Payments",
                  description: "Your data is protected",
                },
                {
                  icon: "people",
                  title: "Trusted Community",
                  description: "1M+ happy travelers",
                },
                {
                  icon: "headset",
                  title: "24/7 Support",
                  description: "Always here to help",
                },
              ].map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <View style={styles.featureIcon}>
                    <Ionicons
                      name={feature.icon}
                      size={20}
                      color={COLORS.primary}
                    />
                  </View>
                  <View style={styles.featureContent}>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureDescription}>
                      {feature.description}
                    </Text>
                  </View>
                </View>
              ))}
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
    paddingVertical: SPACING.base,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  hero: {
    alignItems: "center",
    paddingVertical: SPACING["2xl"],
  },
  iconContainer: {
    marginBottom: SPACING.lg,
  },
  iconGradient: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.full,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: FONT_SIZES["4xl"],
    fontWeight: FONT_WEIGHTS.black,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.regular,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: FONT_SIZES.md * 1.5,
    maxWidth: "80%",
  },
  formCard: {
    marginBottom: SPACING.xl,
  },
  form: {
    gap: SPACING.base,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    paddingVertical: SPACING.xs,
  },
  forgotPasswordText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.primary,
  },
  loginButton: {
    marginTop: SPACING.md,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: SPACING.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginHorizontal: SPACING.base,
  },
  googleButton: {
    marginBottom: SPACING.lg,
  },
  demoSection: {
    marginVertical: SPACING.lg,
    padding: SPACING.base,
    backgroundColor: COLORS.gray50,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  demoTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: SPACING.base,
  },
  demoButtons: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  demoButton: {
    flex: 1,
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
  signUpText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.primary,
  },
  features: {
    paddingBottom: SPACING["2xl"],
  },
  featuresTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
    textAlign: "center",
  },
  featuresList: {
    gap: SPACING.base,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.base,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    backgroundColor: `${COLORS.primary}10`,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.base,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
});
