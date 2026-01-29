import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <StatusBar style="dark" />

          <View style={styles.headerContainer}>
            {/* Logo Placeholder - In a real app, use an Image component here */}
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoIcon}>🛒</Text>
            </View>
            <Text style={styles.appName}>SUPRAMINE</Text>
            <Text style={styles.appTagline}>FLEET & HAULING</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>USERNAME / NIK</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>👤</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Masukkan NIK Anda"
                  placeholderTextColor="#94A3B8"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>PASSWORD</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!isPasswordVisible}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                  <Text style={styles.eyeIcon}>{isPasswordVisible ? '👁️' : '🚫'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ gap: 10, marginBottom: 24 }}>
              <TouchableOpacity style={styles.loginButton} onPress={() => router.replace('/driver')}>
                <Text style={styles.loginButtonText}>Masuk sebagai Driver</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.loginButton]} onPress={() => router.replace('/maintenance')}
              >
                <Text style={[styles.loginButtonText]}>Masuk sebagai Mekanik</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotPasswordButton}>
              <Text style={styles.forgotPasswordText}>Lupa Password?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>PUSAT BANTUAN & KENDALA OPERASIONAL</Text>
            <Text style={styles.callCenterText}>CALL CENTER: 0800-1-SUPRA</Text>
            <Text style={styles.versionText}>V2.4.0 PRODUCTION</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#0F172A', // Slate 900
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoIcon: {
    fontSize: 32,
  },
  appName: {
    fontSize: 24,
    fontWeight: '800', // ExtraBold
    color: '#0F172A', // Slate 900
    letterSpacing: 1,
    marginBottom: 4,
  },
  appTagline: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B', // Slate 500
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  formContainer: {
    marginBottom: 48,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8', // Slate 400
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC', // Slate 50
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: '#F1F5F9', // Slate 100
  },
  inputIcon: {
    fontSize: 16,
    marginRight: 12,
    opacity: 0.5,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#334155', // Slate 700
    fontWeight: '500',
  },
  eyeIcon: {
    fontSize: 16,
    opacity: 0.5,
    marginLeft: 12,
  },
  loginButton: {
    backgroundColor: '#0F172A', // Slate 900
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 0,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  forgotPasswordButton: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#475569', // Slate 600
    fontSize: 14,
    fontWeight: '600',
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 'auto',
  },
  footerText: {
    fontSize: 10,
    color: '#94A3B8', // Slate 400
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  callCenterText: {
    fontSize: 11,
    color: '#0F172A', // Slate 900
    fontWeight: '800',
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  versionText: {
    fontSize: 10,
    color: '#CBD5E1', // Slate 300
    fontWeight: '500',
  },
});

