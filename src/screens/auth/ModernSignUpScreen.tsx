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

interface SignUpScreenProps {
  navigation: any;
}

export default function ModernSignUpScreen({ navigation }: SignUpScreenProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "customer" as "customer" | "vendor",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleRoleChange = (userType: "customer" | "vendor") => {
    setFormData({ ...formData, userType });
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const { user, userData } = await AuthService.signUp(
        formData.email,
        formData.password,
        {
          displayName: formData.name,
          userType: formData.userType,
        },
      );

      Alert.alert("Success", "Account created successfully!", [
        {
          text: "Continue",
          onPress: () => {
            // Navigate based on selected role
            if (formData.userType === "vendor") {
              navigation.reset({
                index: 0,
                routes: [{ name: "VendorMain" }],
              });
            } else if (formData.userType === "admin") {
              navigation.reset({
                index: 0,
                routes: [{ name: "AdminMain" }],
              });
            } else {
              navigation.reset({
                index: 0,
                routes: [{ name: "CustomerMain" }],
              });
            }
          },
        },
      ]);
    } catch (error: any) {
      Alert.alert(
        "Sign Up Failed",
        error.message || "Please try again or contact support.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    Alert.alert("Coming Soon", "Google Sign-Up will be available soon!");
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
                colors={[COLORS.secondary, COLORS.secondaryDark]}
                style={styles.iconGradient}
              >
                <Ionicons
                  name="person-add-outline"
                  size={32}
                  color={COLORS.white}
                />
              </LinearGradient>
            </View>

            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Join thousands of travelers exploring the world with Hello Visto
            </Text>
          </View>

          {/* Role Selection */}
          <Card variant="elevated" padding="lg" style={styles.roleCard}>
            <Text style={styles.roleTitle}>I want to:</Text>
            <View style={styles.roleOptions}>
              <TouchableOpacity
                style={[
                  styles.roleOption,
                  formData.userType === "customer" && styles.activeRoleOption,
                ]}
                onPress={() => handleRoleChange("customer")}
              >
                <View style={styles.roleIconContainer}>
                  <Ionicons
                    name="airplane-outline"
                    size={24}
                    color={
                      formData.userType === "customer"
                        ? COLORS.white
                        : COLORS.primary
                    }
                  />
                </View>
                <Text
                  style={[
                    styles.roleOptionTitle,
                    formData.userType === "customer" &&
                      styles.activeRoleOptionTitle,
                  ]}
                >
                  Book Tours
                </Text>
                <Text
                  style={[
                    styles.roleOptionDescription,
                    formData.userType === "customer" &&
                      styles.activeRoleOptionDescription,
                  ]}
                >
                  Discover and book amazing travel experiences
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.roleOption,
                  formData.userType === "vendor" && styles.activeRoleOption,
                ]}
                onPress={() => handleRoleChange("vendor")}
              >
                <View style={styles.roleIconContainer}>
                  <Ionicons
                    name="business-outline"
                    size={24}
                    color={
                      formData.userType === "vendor"
                        ? COLORS.white
                        : COLORS.secondary
                    }
                  />
                </View>
                <Text
                  style={[
                    styles.roleOptionTitle,
                    formData.userType === "vendor" &&
                      styles.activeRoleOptionTitle,
                  ]}
                >
                  Sell Tours
                </Text>
                <Text
                  style={[
                    styles.roleOptionDescription,
                    formData.userType === "vendor" &&
                      styles.activeRoleOptionDescription,
                  ]}
                >
                  Create and manage tour experiences
                </Text>
              </TouchableOpacity>
            </View>
          </Card>

          {/* Sign Up Form */}
          <Card variant="elevated" padding="xl" style={styles.formCard}>
            <View style={styles.form}>
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChangeText={(value) => handleInputChange("name", value)}
                leftIcon="person-outline"
                autoComplete="name"
                error={errors.name}
              />

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
                placeholder="Create a strong password"
                value={formData.password}
                onChangeText={(value) => handleInputChange("password", value)}
                leftIcon="lock-closed-outline"
                rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
                onRightIconPress={() => setShowPassword(!showPassword)}
                secureTextEntry={!showPassword}
                autoComplete="new-password"
                error={errors.password}
              />

              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChangeText={(value) =>
                  handleInputChange("confirmPassword", value)
                }
                leftIcon="lock-closed-outline"
                rightIcon={
                  showConfirmPassword ? "eye-off-outline" : "eye-outline"
                }
                onRightIconPress={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                secureTextEntry={!showConfirmPassword}
                autoComplete="new-password"
                error={errors.confirmPassword}
              />

              {/* Password Requirements */}
              <View style={styles.passwordRequirements}>
                <Text style={styles.requirementsTitle}>
                  Password must contain:
                </Text>
                <View style={styles.requirementsList}>
                  <View style={styles.requirementItem}>
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color={
                        formData.password.length >= 8
                          ? COLORS.success
                          : COLORS.gray400
                      }
                    />
                    <Text
                      style={[
                        styles.requirementText,
                        formData.password.length >= 8 && styles.requirementMet,
                      ]}
                    >
                      At least 8 characters
                    </Text>
                  </View>
                  <View style={styles.requirementItem}>
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color={
                        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)
                          ? COLORS.success
                          : COLORS.gray400
                      }
                    />
                    <Text
                      style={[
                        styles.requirementText,
                        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(
                          formData.password,
                        ) && styles.requirementMet,
                      ]}
                    >
                      Uppercase, lowercase, and number
                    </Text>
                  </View>
                </View>
              </View>

              <Button
                title="Create Account"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                onPress={handleSignUp}
                icon="arrow-forward"
                iconPosition="right"
                style={styles.signUpButton}
              />

              {/* Terms */}
              <Text style={styles.termsText}>
                By creating an account, you agree to our{" "}
                <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>

              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or sign up with</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Sign Up */}
              <GoogleSignInButton
                onPress={handleGoogleSignUp}
                size="large"
                variant="light"
                style={styles.googleButton}
              />

              {/* Sign In Link */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.signInText}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>

          {/* Benefits */}
          <View style={styles.benefits}>
            <Text style={styles.benefitsTitle}>Join Hello Visto Today</Text>
            <View style={styles.benefitsList}>
              {[
                {
                  icon: "globe",
                  title: "Worldwide Destinations",
                  description: "Access to 50+ countries",
                },
                {
                  icon: "diamond",
                  title: "Premium Experiences",
                  description: "Curated luxury tours",
                },
                {
                  icon: "medal",
                  title: "Expert Support",
                  description: "Professional travel advisors",
                },
              ].map((benefit, index) => (
                <View key={index} style={styles.benefitItem}>
                  <View style={styles.benefitIcon}>
                    <Ionicons
                      name={benefit.icon}
                      size={20}
                      color={COLORS.primary}
                    />
                  </View>
                  <View style={styles.benefitContent}>
                    <Text style={styles.benefitTitle}>{benefit.title}</Text>
                    <Text style={styles.benefitDescription}>
                      {benefit.description}
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
    paddingVertical: SPACING.xl,
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
    shadowColor: COLORS.secondary,
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
    maxWidth: "85%",
  },
  roleCard: {
    marginBottom: SPACING.lg,
  },
  roleTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
    textAlign: "center",
  },
  roleOptions: {
    gap: SPACING.base,
  },
  roleOption: {
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: "center",
  },
  activeRoleOption: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  roleIconContainer: {
    width: 50,
    height: 50,
    borderRadius: RADIUS.full,
    backgroundColor: `${COLORS.primary}10`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.sm,
  },
  roleOptionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  activeRoleOptionTitle: {
    color: COLORS.white,
  },
  roleOptionDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  activeRoleOptionDescription: {
    color: COLORS.white,
    opacity: 0.9,
  },
  formCard: {
    marginBottom: SPACING.lg,
  },
  form: {
    gap: SPACING.base,
  },
  passwordRequirements: {
    marginBottom: SPACING.base,
  },
  requirementsTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  requirementsList: {
    gap: SPACING.xs,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  requirementText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  requirementMet: {
    color: COLORS.success,
  },
  signUpButton: {
    marginTop: SPACING.md,
  },
  termsText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: FONT_SIZES.xs * 1.4,
    marginVertical: SPACING.base,
  },
  termsLink: {
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.medium,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: SPACING.lg,
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
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  signInText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.primary,
  },
  benefits: {
    paddingBottom: SPACING["2xl"],
  },
  benefitsTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
    textAlign: "center",
  },
  benefitsList: {
    gap: SPACING.base,
  },
  benefitItem: {
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
  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    backgroundColor: `${COLORS.primary}10`,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.base,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  benefitDescription: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
});
