import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { typeScale, spacing } from '@/theme/typography';
import { useAuthStore } from '@/store/auth.store';

export default function HomeScreen() {
  const theme = useTheme();
  const profile = useAuthStore((s) => s.profile);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ padding: spacing.lg }}>
        <Text style={[typeScale.caption, { color: theme.textSecondary }]}>Bienvenido de nuevo</Text>
        <Text style={[typeScale.h1, { color: theme.textPrimary }]}>
          {profile?.company_name ?? profile?.full_name ?? 'Cliente'}
        </Text>

        {/* TODO: banner de promociones, acceso rápido a carrito/favoritos,
            estado del último pedido, categorías horizontales, productos recientes */}
      </View>
    </ScrollView>
  );
}
