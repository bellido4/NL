import { create } from 'zustand';
import type { Session } from '@supabase/supabase-js';
import type { Profile } from '@/types/database';
import { supabase } from '@/lib/supabase';

interface AuthState {
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  isHydrated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  profile: null,
  isLoading: false,
  isHydrated: false,

  hydrate: async () => {
    const { data } = await supabase.auth.getSession();
    set({ session: data.session, isHydrated: true });

    if (data.session) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.session.user.id)
        .single();
      set({ profile: (profile as unknown as Profile) ?? null });
    }

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session });
    });
  },

  signIn: async (email, password) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      set({ session: data.session });

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
      if (profileError) throw profileError;

      // El rol decide el flujo — nunca se elige manualmente.
      set({ profile: profile as unknown as Profile });
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null, profile: null });
  },
}));
