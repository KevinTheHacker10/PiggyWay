import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={[styles.title]}>PiggyWay</Text>

      <Text style={styles.label}>Correo/Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Email/Username"
        placeholderTextColor="#a0a0a0"
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#a0a0a0"
        secureTextEntry
      />

      <LinearGradient
        colors={['#FF9B52', '#F7702E']}
        style={styles.loginButtonGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </LinearGradient>

      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={() => router.push('/registro')} // Navega a la pantalla de registro
      >
        <Text style={styles.createAccountButtonText}>Crear Cuenta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialButtonText}>Iniciar con Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialButtonText}>Iniciar con Apple</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // A light grey background for now
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80, // Give some space at the top
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333', // Dark grey color for the title
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    alignSelf: 'flex-start',
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  loginButtonGradient: {
    borderRadius: 30,
    width: '100%',
    marginTop: 10,
  },
  loginButton: {
    paddingVertical: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#555',
    marginTop: 15,
    marginBottom: 30,
  },
  createAccountButton: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#e0e0e0', // Light grey background for this button
  },
  createAccountButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  socialButton: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    backgroundColor: '#e0e0e0', // Light grey background for social buttons
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
