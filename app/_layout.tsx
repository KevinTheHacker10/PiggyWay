import { useColorScheme } from '@/hooks/useColorScheme';
import { Poppins_400Regular, Poppins_600SemiBold, } from '@expo-google-fonts/poppins';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Poppins_400Regular,
    Poppins_600SemiBold,
  });
  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
         <Stack.Screen name="login" options={{ headerShown: false }} />
         <Stack.Screen name="registro" options={{ headerShown: false }} />
         <Stack.Screen name="Movimientos" options={{ headerShown: false }} />
         <Stack.Screen name="transacciones" options={{ headerShown: false }} />
         <Stack.Screen name="Inicio" options={{ headerShown: false }} />
         <Stack.Screen name="Restablecer" options={{ headerShown: false }} />
         <Stack.Screen name="objetivos" options={{ headerShown: false }} />
          <Stack.Screen name="masobjetivo" options={{ headerShown: false }} />
          <Stack.Screen name="Meta" options={{ headerShown: false }} />
         
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
