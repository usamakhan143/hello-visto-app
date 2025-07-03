import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SPACING,
  RADIUS,
  SHADOWS,
} from "../../constants";

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  error?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  secureTextEntry?: boolean;
  keyboardType?: any;
  autoCapitalize?: any;
  autoComplete?: any;
  multiline?: boolean;
  numberOfLines?: number;
  disabled?: boolean;
  style?: any;
}

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  onFocus,
  onBlur,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  autoComplete,
  multiline = false,
  numberOfLines = 1,
  disabled = false,
  style,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const getContainerStyles = () => {
    const baseStyles = [styles.container];

    if (isFocused) {
      baseStyles.push(styles.containerFocused);
    }

    if (error) {
      baseStyles.push(styles.containerError);
    }

    if (disabled) {
      baseStyles.push(styles.containerDisabled);
    }

    return baseStyles;
  };

  return (
    <View style={[styles.wrapper, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={getContainerStyles()}>
        {leftIcon && (
          <Ionicons
            name={leftIcon as any}
            size={20}
            color={isFocused ? COLORS.primary : COLORS.gray400}
            style={styles.leftIcon}
          />
        )}

        <TextInput
          style={[
            styles.input,
            multiline && styles.multilineInput,
            leftIcon && styles.inputWithLeftIcon,
            rightIcon && styles.inputWithRightIcon,
          ]}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray400}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={!disabled}
        />

        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
            <Ionicons
              name={rightIcon as any}
              size={20}
              color={COLORS.gray400}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACING.base,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.base,
    ...SHADOWS.xs,
  },
  containerFocused: {
    borderColor: COLORS.primary,
    ...SHADOWS.md,
  },
  containerError: {
    borderColor: COLORS.error,
  },
  containerDisabled: {
    backgroundColor: COLORS.gray100,
    borderColor: COLORS.gray200,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: FONT_SIZES.base,
    color: COLORS.textPrimary,
    fontWeight: FONT_WEIGHTS.regular,
  },
  multilineInput: {
    height: "auto",
    minHeight: 48,
    paddingVertical: SPACING.md,
    textAlignVertical: "top",
  },
  inputWithLeftIcon: {
    marginLeft: SPACING.xs,
  },
  inputWithRightIcon: {
    marginRight: SPACING.xs,
  },
  leftIcon: {
    marginRight: SPACING.xs,
  },
  rightIcon: {
    padding: SPACING.xs,
  },
  errorText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.error,
    marginTop: SPACING.xs,
    fontWeight: FONT_WEIGHTS.medium,
  },
});
