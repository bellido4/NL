import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { z } from 'zod';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/Button';
import { typeScale, spacing, radius } from '@/theme/typography';
import { useAuthStore } from '@/store/auth.store';

const loginSchema = z.object({
  email: z.string().email('Introduce un email válido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

export default function LoginScreen() {
  const theme = useTheme();
  const signIn = useAuthStore((s) => s.signIn);
  const isLoading = useAuthStore((s) => s.isLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    try {
      await signIn(email, password);
    } catch (e) {
      setError('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.container, { backgroundColor: theme.primary }]}
    >
      <Text style={[typeScale.display, { color: theme.white, marginBottom: spacing.xs }]}>
        Nevada
      </Text>
      <Text style={[typeScale.bodyLarge, { color: theme.turquoiseLight, marginBottom: spacing.xl }]}>
        Lubricantes profesionales, pedidos en segundos.
      </Text>

      <View style={[styles.form, { backgroundColor: theme.white, borderRadius: radius.xl }]}>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <View style={styles.passwordRow}>
          <TextInput
            placeholder="Contraseña"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={[styles.input, { flex: 1 }]}
          />
          <Text onPress={() => setShowPassword((v) => !v)} style={{ color: theme.blueGray }}>
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </Text>
        </View>

        {error && <Text style={{ color: theme.danger, marginBottom: spacing.sm }}>{error}</Text>}

        <Button label="Iniciar sesión" onPress={handleSubmit} loading={isLoading} />

        <Text style={[typeScale.caption, { color: theme.textSecondary, marginTop: spacing.md, textAlign: 'center' }]}>
          ¿Olvidaste tu contraseña?
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: spacing.lg },
  form: { padding: spacing.lg },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  passwordRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
});
