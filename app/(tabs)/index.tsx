import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Top image */}
        <Image
 source={require('@/assets/images/Tree.png')}
 style={styles.topImage}
 contentFit="contain"
 />

      {/* Title */}
 <Text style={styles.title}>¡Tu aventura financiera empieza aquí!</Text>

      {/* Subtitle */}
 <Text style={styles.subtitle}>Ahorra, aprende y diviértete con PiggyWay.</Text>

      {/* Piggy image (Placeholder) */}
 <Image
 source={require('@/assets/images/Piggy.jpg')} // Placeholder for the piggy image
 style={styles.piggyImage}
 contentFit="contain"
 />

      {/* Button */}
 <LinearGradient
 colors={['#FF9B52', '#F7702E']}
 style={styles.buttonGradient}
 start={{ x: 0, y: 0 }}
 end={{ x: 1, y: 0 }}
 >
 <TouchableOpacity style={styles.button}>
 <Text style={styles.buttonText}>Empezar</Text>
 </TouchableOpacity>
 </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
 flex: 1,
 backgroundColor: '#fff',
 alignItems: 'center',
 justifyContent: 'space-around',
 paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  topImage: {
 width: '100%',
 height: 200,
  },
  title: {
 fontSize: 24,
 fontWeight: 'bold',
 color: '#FF9B52', 
 textAlign: 'center',
  },
  subtitle: {
 fontSize: 16,
 color: '#000', 
 textAlign: 'center',
 marginTop: 10,
  },
  piggyImage: {
 width: 150, 
 height: 150, 
  },
  buttonGradient: {
 borderRadius: 30,
 width: '80%', 
  },
  button: {
 paddingVertical: 15,
  },
  buttonText: {
 color: '#fff',
 fontSize: 18,
 fontWeight: 'bold',
 textAlign: 'center',
  },
});
