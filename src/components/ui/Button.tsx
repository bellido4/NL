import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { typeScale, radius, spacing } from '@/theme/typography';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Button({
  label,
  onPress,
  variant = 'primary',
  loading,
  disabled,
  style,
}: ButtonProps) {
  const theme = useTheme();
  const scale = React.useRef(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(scale.current, { damping: 15, stiffness: 250 }) }],
  }));

  const backgroundColor = {
    primary: theme.accent,
    secondary: theme.surfaceElevated,
    ghost: 'transparent',
    danger: theme.danger,
  }[variant];

  const textColor = variant === 'secondary' || variant === 'ghost' ? theme.textPrimary : theme.primary;

  return (
    <AnimatedPressable
      disabled={disabled || loading}
      onPressIn={() => {
        scale.current = 0.97;
      }}
      onPressOut={() => {
        scale.current = 1;
      }}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
      style={[
        styles.base,
        { backgroundColor, opacity: disabled ? 0.5 : 1, borderRadius: radius.md },
        variant === 'ghost' && { borderWidth: 1, borderColor: theme.border },
        animatedStyle,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[typeScale.button, { color: textColor }]}>{label}</Text>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
