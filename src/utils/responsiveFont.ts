import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Based on iPhone 11 (414x896) as reference
const REFERENCE_WIDTH = 414;
const REFERENCE_HEIGHT = 896;

/**
 * Calculates responsive font size based on screen dimensions
 * Ensures text scales properly across different device sizes
 * More conservative scaling for better readability
 */
export const responsiveFont = (size: number): number => {
  const scale = Math.min(
    SCREEN_WIDTH / REFERENCE_WIDTH,
    SCREEN_HEIGHT / REFERENCE_HEIGHT,
  );
  // More conservative scaling - limit between 0.85 and 1.15
  const constrainedScale = Math.max(0.85, Math.min(scale, 1.15));
  const newSize = size * constrainedScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Responsive spacing based on screen width
 */
export const responsiveSpacing = (spacing: number): number => {
  const scale = SCREEN_WIDTH / REFERENCE_WIDTH;
  return Math.round(PixelRatio.roundToNearestPixel(spacing * scale));
};

/**
 * Responsive size for elements (width/height)
 */
export const responsiveSize = (size: number): number => {
  const scale = Math.min(
    SCREEN_WIDTH / REFERENCE_WIDTH,
    SCREEN_HEIGHT / REFERENCE_HEIGHT,
  );
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

/**
 * Get font size that respects user's accessibility settings
 * while maintaining design constraints
 */
export const accessibleFont = (
  baseFontSize: number,
  maxScale: number = 1.3,
): {
  fontSize: number;
  maxFontSizeMultiplier: number;
} => {
  return {
    fontSize: responsiveFont(baseFontSize),
    maxFontSizeMultiplier: maxScale,
  };
};

// Screen size helpers
export const isSmallScreen = (): boolean => SCREEN_WIDTH < 375;
export const isMediumScreen = (): boolean =>
  SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414;
export const isLargeScreen = (): boolean => SCREEN_WIDTH >= 414;

export const screenMetrics = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isSmall: isSmallScreen(),
  isMedium: isMediumScreen(),
  isLarge: isLargeScreen(),
};
