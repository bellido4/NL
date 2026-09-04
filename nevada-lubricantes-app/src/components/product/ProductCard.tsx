import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useTheme } from '@/hooks/useTheme';
import { typeScale, radius, spacing } from '@/theme/typography';
import type { Product } from '@/types/database';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onAddToCart: () => void;
}

export function ProductCard({ product, onPress, onAddToCart }: ProductCardProps) {
  const theme = useTheme();
  const outOfStock = product.stock <= 0;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.card,
        { backgroundColor: theme.surface, borderColor: theme.border, borderRadius: radius.lg },
      ]}
    >
      <Image
        source={{ uri: product.images[0] }}
        style={styles.image}
        contentFit="cover"
        transition={150}
      />
      {outOfStock && (
        <View style={[styles.badge, { backgroundColor: theme.danger }]}>
          <Text style={[typeScale.caption, { color: theme.white }]}>Sin stock</Text>
        </View>
      )}
      <View style={{ padding: spacing.sm }}>
        <Text style={[typeScale.bodyMedium, { color: theme.textPrimary }]} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={[typeScale.caption, { color: theme.textSecondary, marginTop: 2 }]}>
          {product.format ?? ''}
        </Text>
        <View style={styles.footer}>
          <Text style={[typeScale.h3, { color: theme.accent }]}>
            {product.price.toFixed(2)} €
          </Text>
          <Pressable
            disabled={outOfStock}
            onPress={onAddToCart}
            style={[styles.addButton, { backgroundColor: theme.accent, opacity: outOfStock ? 0.4 : 1 }]}
          >
            <Text style={{ color: theme.primary, fontWeight: '700' }}>+</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, borderWidth: 1, overflow: 'hidden', margin: spacing.xs },
  image: { width: '100%', aspectRatio: 1, backgroundColor: '#eee' },
  badge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
