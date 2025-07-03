export const COLORS = {
  // Hello Visto Brand Colors (Inspired by logo)
  primary: "#7C3AED", // Rich purple (from logo)
  primaryLight: "#A78BFA",
  primaryDark: "#5B21B6",
  primaryGradient: ["#7C3AED", "#A855F7", "#C084FC"],

  // Secondary Colors (Complementary)
  secondary: "#F59E0B", // Warm amber
  secondaryLight: "#FCD34D",
  secondaryDark: "#D97706",

  // Accent Colors (Modern teal for contrast)
  accent: "#06B6D4", // Modern cyan
  accentLight: "#22D3EE",
  accentDark: "#0891B2",

  // Neutral Colors (Clean & Modern)
  white: "#FFFFFF",
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray800: "#1F2937",
  gray900: "#111827",

  // Background Colors
  background: "#FAFBFC",
  surface: "#FFFFFF",
  surfaceElevated: "#F8FAFC",

  // Text Colors
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  textTertiary: "#9CA3AF",
  textInverse: "#FFFFFF",
  textWhite: "#FFFFFF",
  text: "#111827",

  // Status Colors
  success: "#10B981",
  successLight: "#34D399",
  warning: "#F59E0B",
  warningLight: "#FBBF24",
  error: "#EF4444",
  errorLight: "#F87171",
  info: "#3B82F6",
  infoLight: "#60A5FA",

  // Border Colors
  border: "#E5E7EB",
  borderLight: "#F3F4F6",
  borderDark: "#D1D5DB",

  // Shadow Colors
  shadow: "rgba(0, 0, 0, 0.1)",
  shadowMedium: "rgba(0, 0, 0, 0.15)",
  shadowLarge: "rgba(0, 0, 0, 0.25)",

  // Overlay Colors
  overlay: "rgba(0, 0, 0, 0.5)",
  overlayLight: "rgba(255, 255, 255, 0.95)",
};

export const FONTS = {
  thin: "System",
  light: "System",
  regular: "System",
  medium: "System",
  semiBold: "System",
  bold: "System",
  extraBold: "System",
  black: "System",
};

export const FONT_WEIGHTS = {
  thin: "100",
  light: "300",
  regular: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
  extraBold: "800",
  black: "900",
};

export const FONT_SIZES = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  "2xl": 22,
  "3xl": 24,
  "4xl": 28,
  "5xl": 32,
  "6xl": 36,
  xxxl: 40,
};

export const ACCESSIBLE_TEXT_PROPS = {
  xs: { maxFontSizeMultiplier: 1.2 },
  sm: { maxFontSizeMultiplier: 1.2 },
  base: { maxFontSizeMultiplier: 1.15 },
  md: { maxFontSizeMultiplier: 1.15 },
  lg: { maxFontSizeMultiplier: 1.1 },
  xl: { maxFontSizeMultiplier: 1.1 },
  "2xl": { maxFontSizeMultiplier: 1.05 },
  "3xl": { maxFontSizeMultiplier: 1.0 },
  "4xl": { maxFontSizeMultiplier: 1.0 },
  "5xl": { maxFontSizeMultiplier: 1.0 },
  "6xl": { maxFontSizeMultiplier: 1.0 },
};

export const LINE_HEIGHTS = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
  loose: 1.8,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
  "3xl": 40,
  "4xl": 48,
  "5xl": 64,
  "6xl": 80,
};

export const RADIUS = {
  none: 0,
  xs: 4,
  sm: 6,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  full: 9999,
};

export const SHADOWS = {
  xs: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
};

export const SIZES = {
  // Component Heights
  buttonSmall: 36,
  buttonMedium: 44,
  buttonLarge: 52,
  inputHeight: 48,
  headerHeight: 60,
  tabBarHeight: 80,

  // Layout
  screenPadding: 20,
  cardPadding: 16,
  sectionSpacing: 24,

  // Legacy spacing (for backward compatibility)
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
};

export const COMMISSION_RATE = 0.05; // 5%

export const SUBSCRIPTION_PLANS = {
  basic: {
    name: "Basic",
    price: 29.99,
    tourLimit: 10,
    features: ["10 Tour Listings", "Basic Analytics", "Email Support"],
  },
  premium: {
    name: "Premium",
    price: 59.99,
    tourLimit: 50,
    features: [
      "50 Tour Listings",
      "Advanced Analytics",
      "Priority Support",
      "Featured Listings",
    ],
  },
  enterprise: {
    name: "Enterprise",
    price: 99.99,
    tourLimit: 200,
    features: [
      "200 Tour Listings",
      "Full Analytics",
      "24/7 Support",
      "Custom Branding",
      "API Access",
    ],
  },
};

export const API_ENDPOINTS = {
  tours: "/tours",
  bookings: "/bookings",
  vendors: "/vendors",
  users: "/users",
  reviews: "/reviews",
  notifications: "/notifications",
};

export const STORAGE_KEYS = {
  user: "@hellvisto_user",
  token: "@hellvisto_token",
  onboarded: "@hellvisto_onboarded",
};
