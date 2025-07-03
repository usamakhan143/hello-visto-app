import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import Button from "../../components/common/Button";
import Logo from "../../components/common/Logo";
import GradientBackground from "../../components/common/GradientBackground";
import PremiumCard from "../../components/common/PremiumCard";
import { COLORS, SIZES, FONT_SIZES } from "../../constants";
import { AuthService } from "../../services/firebase";

interface LoginScreenProps {
  navigation: any;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Required Fields", "Please enter your email and password");
      return;
    }

    setLoading(true);
    try {
      await AuthService.signIn(email, password);
      navigation.navigate("CustomerMain");
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

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
        }}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <GradientBackground variant="luxury" style={styles.overlay}>
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
                  <BlurView intensity={20} style={styles.blurButton}>
                    <Ionicons
                      name="chevron-back"
                      size={24}
                      color={COLORS.textWhite}
                    />
                  </BlurView>
                </TouchableOpacity>

                <Logo size="xl" variant="white" />

                <View style={styles.headerText}>
                  <Text style={styles.welcomeText}>Welcome Back</Text>
                  <Text style={styles.subtitleText}>
                    Sign in to continue your journey
                  </Text>
                </View>
              </View>

              {/* Login Form */}
              <PremiumCard variant="glass" style={styles.formCard}>
                <View style={styles.form}>
                  {/* Email Input */}
                  <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Email Address</Text>
                    <View
                      style={[
                        styles.inputContainer,
                        focusedField === "email" &&
                          styles.inputContainerFocused,
                      ]}
                    >
                      <Ionicons
                        name="mail-outline"
                        size={20}
                        color={COLORS.textSecondary}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        placeholderTextColor={COLORS.textSecondary}
                        value={email}
                        onChangeText={setEmail}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField("")}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                      />
                    </View>
                  </View>

                  {/* Password Input */}
                  <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <View
                      style={[
                        styles.inputContainer,
                        focusedField === "password" &&
                          styles.inputContainerFocused,
                      ]}
                    >
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color={COLORS.textSecondary}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        placeholderTextColor={COLORS.textSecondary}
                        value={password}
                        onChangeText={setPassword}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField("")}
                        secureTextEntry={!showPassword}
                        autoComplete="password"
                      />
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        <Ionicons
                          name={
                            showPassword ? "eye-off-outline" : "eye-outline"
                          }
                          size={20}
                          color={COLORS.textSecondary}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Forgot Password */}
                  <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>

                  {/* Login Button */}
                  <Button
                    title="Sign In"
                    onPress={handleLogin}
                    variant="luxury"
                    size="large"
                    loading={loading}
                    icon="log-in-outline"
                    style={styles.loginButton}
                  />

                  {/* Divider */}
                  <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>or continue with</Text>
                    <View style={styles.dividerLine} />
                  </View>

                  {/* Social Login */}
                  <TouchableOpacity
                    style={styles.googleButton}
                    onPress={handleGoogleLogin}
                  >
                    <Ionicons
                      name="logo-google"
                      size={20}
                      color={COLORS.textPrimary}
                    />
                    <Text style={styles.googleButtonText}>Google</Text>
                  </TouchableOpacity>

                  {/* Sign Up Link */}
                  <View style={styles.footer}>
                    <Text style={styles.footerText}>
                      Don't have an account?{" "}
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("SignUp")}
                    >
                      <Text style={styles.signUpText}>Create Account</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </PremiumCard>
            </ScrollView>
          </KeyboardAvoidingView>
        </GradientBackground>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  backgroundImageStyle: {
    opacity: 0.3,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SIZES.padding,
  },
  header: {
    alignItems: "center",
    paddingTop: SIZES.xl,
    marginBottom: SIZES.xxl,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: SIZES.xl,
    zIndex: 1,
  },
  blurButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    alignItems: "center",
    marginTop: SIZES.lg,
  },
  welcomeText: {
    fontSize: FONT_SIZES.xxxl,
    // // fontFamily: FONTS.extraBold,
    fontWeight: "800",
    color: COLORS.textWhite,
    marginBottom: SIZES.sm,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subtitleText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textWhite,
    opacity: 0.9,
    textAlign: "center",
  },
  formCard: {
    flex: 1,
    justifyContent: "center",
    marginBottom: SIZES.xl,
  },
  form: {
    width: "100%",
  },
  inputSection: {
    marginBottom: SIZES.lg,
  },
  inputLabel: {
    fontSize: FONT_SIZES.sm,
    // fontFamily: FONTS.semiBold,
    color: COLORS.textWhite,
    marginBottom: SIZES.sm,
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: SIZES.radiusLarge,
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.md,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  inputContainerFocused: {
    borderColor: COLORS.primary,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  input: {
    flex: 1,
    marginLeft: SIZES.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.textWhite,
    // fontFamily: FONTS.medium,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: SIZES.xl,
  },
  forgotPasswordText: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.sm,
    // fontFamily: FONTS.semiBold,
  },
  loginButton: {
    marginBottom: SIZES.xl,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  dividerText: {
    marginHorizontal: SIZES.md,
    color: COLORS.textWhite,
    fontSize: FONT_SIZES.sm,
    opacity: 0.8,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surfaceLight,
    borderRadius: SIZES.radiusLarge,
    paddingVertical: SIZES.md,
    marginBottom: SIZES.xl,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  googleButtonText: {
    marginLeft: SIZES.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    // fontFamily: FONTS.semiBold,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZES.sm,
    opacity: 0.8,
  },
  signUpText: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.sm,
    // fontFamily: FONTS.bold,
    fontWeight: "600",
  },
});
