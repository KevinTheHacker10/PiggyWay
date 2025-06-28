import { AntDesign, FontAwesome } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { getAuth, GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: 'fc0097a2-b27b-45fa-8bc1-011650d176e5', // este es tu client ID de tipo web
  });

  // 🔁 Manejo del login con Google
  useEffect(() => {
    if (response?.type === 'success') {
      const idToken = response.authentication?.idToken;
      const credential = GoogleAuthProvider.credential(idToken);
      signInWithCredential(getAuth(), credential)
        .then(() => {
          router.replace('/Inicio');
        })
        .catch(() => {
          setErrorMessage('Error al iniciar sesión con Google');
        });
    }
  }, [response]);

  const handleLogin = async () => {
    const authInstance = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(authInstance, email, password);
      await userCredential.user.reload(); // Esto asegura que displayName esté actualizado
      router.push('/Inicio');

    } catch (error) {
      if (typeof error === 'object' && error !== null && 'code' in error) {
        const errorCode = (error as { code: string }).code;
        if (errorCode === 'auth/user-not-found') {
          setErrorMessage('El usuario no existe');
        } else if (errorCode === 'auth/wrong-password') {
          setErrorMessage('La contraseña es incorrecta');
        } else {
          setErrorMessage('Hubo un error al intentar iniciar sesión');
        }
      } else {
        setErrorMessage('Hubo un error al intentar iniciar sesión');
      }
    }

  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.innerContainer} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>PiggyWay</Text>

        <Text style={styles.label}>Correo/Usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="Email/Username"
          placeholderTextColor="#b8b8b8"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#b8b8b8"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/Restablecer')}>
          <Text style={{ color: '#888', textAlign: 'right', marginTop: 10 }}>
            ¿Olvidaste tu contraseña?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push('/registro')}
        >
          <Text style={styles.secondaryButtonText}>Crear Cuenta</Text>
        </TouchableOpacity>

        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton} onPress={() => promptAsync()}>
            <AntDesign name="google" size={20} color="#333" style={styles.icon} />
            <Text style={styles.socialButtonText}>Iniciar con Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="apple" size={20} color="#333" style={styles.icon} />
            <Text style={styles.socialButtonText}>Iniciar con Apple</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#000',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#FF9B52',
    width: '100%',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgotPasswordText: {
    marginTop: 12,
    fontSize: 13,
    color: '#999',
  },
  secondaryButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f2f0ec',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  socialButtons: {
    width: '100%',
    gap: 10,
    marginTop: 10,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f0ec',
    borderRadius: 25,
    height: 50,
    marginTop: 10,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  icon: {
    position: 'absolute',
    left: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 10,
  },
});
