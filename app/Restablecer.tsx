import AntDesign from '@expo/vector-icons/build/AntDesign';
import { useRouter } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebase';

export default function RestablecerContrasena() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleReset = async () => {
    if (!email) return Alert.alert('Error', 'Por favor ingresa un correo válido');
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Correo enviado', 'Revisa tu bandeja de entrada para restablecer la contraseña');
      router.replace('/login');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.botonAtras}>
  <AntDesign name="arrowleft" size={28} color="#FFA726" />
</TouchableOpacity>

      <Text style={styles.title}>Restablecer contraseña</Text>
      <Text style={styles.text}>
        Introduzca su dirección de correo electrónico para recibir un enlace de restablecimiento de contraseña.
      </Text>

      <Text style={styles.label}>Dirección de correo</Text>
      <TextInput
        style={styles.input}
        placeholder="you@email.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>Volver a inicio de sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  text: { fontSize: 14, color: '#444', marginBottom: 20 },
  label: { fontSize: 14, color: '#444', marginBottom: 8 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFA033', padding: 14, borderRadius: 10, alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  back: { textAlign: 'center', color: '#888', marginTop: 30 },
  botonAtras: {
  position: 'absolute',
  top: 30,
  left: 20,
  zIndex: 10,
}
});
// This file is for resetting the password in the PiggyWay app.
// It allows users to enter their email and receive a password reset link.
// The user can navigate back to the login screen after requesting a reset.