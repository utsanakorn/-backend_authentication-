import { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { router } from 'expo-router'
import { supabase } from '../../lib/supabase'

// --- Zod Schema ---
const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type SignUpForm = z.infer<typeof signUpSchema>

export default function SignUpScreen() {
  const [loading, setLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  const { control, handleSubmit, formState: { errors } } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async (data: SignUpForm) => {
    setLoading(true)
    setAuthError(null)

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    })

    setLoading(false)

    if (error) {
      if (error.message.includes('already registered')) {
        setAuthError('This email is already in use.')
      } else if (error.message.includes('weak')) {
        setAuthError('Password is too weak. Use at least 8 characters.')
      } else if (error.status === 0) {
        setAuthError('Network error. Please check your connection.')
      } else {
        setAuthError(error.message)
      }
      return
    }

    router.replace('/(app)/home')
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Create Account</Text>

      {/* Email */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      {/* Password */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="Password"
            secureTextEntry
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

      {/* Confirm Password */}
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.confirmPassword && styles.inputError]}
            placeholder="Confirm Password"
            secureTextEntry
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
      )}

      {/* Auth Error */}
      {authError && <Text style={styles.errorText}>{authError}</Text>}

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.buttonText}>Sign Up</Text>
        }
      </TouchableOpacity>

      {/* Link to Sign In */}
      <TouchableOpacity onPress={() => router.replace('/(auth)/sign-in')}>
        <Text style={styles.linkText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center',
    paddingHorizontal: 24, backgroundColor: '#fff',
  },
  title: {
    fontSize: 28, fontWeight: 'bold',
    marginBottom: 32, textAlign: 'center',
  },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 12, marginBottom: 4, fontSize: 16,
  },
  inputError: { borderColor: '#e53e3e' },
  errorText: { color: '#e53e3e', fontSize: 13, marginBottom: 8 },
  button: {
    backgroundColor: '#4f46e5', borderRadius: 8,
    padding: 14, alignItems: 'center', marginTop: 16,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  linkText: { color: '#4f46e5', textAlign: 'center', marginTop: 16 },
})