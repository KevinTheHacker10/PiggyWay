// +not-found.tsx
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: '',
          headerTintColor: '#000',
          headerStyle: { backgroundColor: '#fff' },
        }}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Image
            source={require('../assets/images/Error 404.jpg')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title}>Error 404</Text>
          <Text style={styles.subtitle}>¡Ups! Sin conexión a Internet.</Text>
          <Text style={styles.text}>
            Verifica tu conexión y vuelve a intentarlo.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.replace('/'); 
          }}
        >
          <Text style={styles.buttonText}>Reintentar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 30,
  },
  content: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  text: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#F79F1F',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
