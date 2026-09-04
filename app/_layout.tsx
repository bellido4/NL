import React, { useEffect } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAuthStore } from '@/store/auth.store';

const queryClient = new QueryClient();

export default function RootLayout() {
  const { session, profile, isHydrated, hydrate } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    hydrate();
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup) {
      router.replace('/(auth)/login');
      return;
    }

    if (session && profile?.must_change_password) {
      router.replace('/(auth)/change-password');
      return;
    }

    if (session && inAuthGroup && profile) {
      // El rol decide el destino — nunca se elige manualmente.
      router.replace(profile.role === 'admin' ? '/(admin)/dashboard' : '/(client)/home');
    }
  }, [session, profile, isHydrated, segments]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Slot />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
