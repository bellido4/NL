import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { typeScale, spacing } from '@/theme/typography';

export default function DashboardScreen() {
  const theme = useTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ padding: spacing.lg }}>
        <Text style={[typeScale.h1, { color: theme.textPrimary }]}>Dashboard</Text>
        {/* TODO: KPIs (pedidos hoy, ventas, clientes, productos),
            gráficas, últimos pedidos, actividad en tiempo real (Supabase Realtime) */}
      </View>
    </ScrollView>
  );
}
