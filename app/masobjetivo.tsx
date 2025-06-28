import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth, db } from '../firebase';

export default function AñadirObjetivo() {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fecha, setFecha] = useState<Date | null>(null);
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const router = useRouter();

  const ideas = [
    'Vacaciones',
    'Fondo de emergencias',
    'Celular',
    'Carro',
    'Regalo',
    'Fiesta',
  ];

  const handleGuardar = async () => {
    const user = auth.currentUser;
    if (!user) {
      return Alert.alert('Error', 'Usuario no autenticado');
    }

    if (!nombre || !cantidad) {
      return Alert.alert('Faltan datos', 'Debes ingresar nombre y cantidad');
    }

    try {
      await addDoc(collection(db, 'objetivos'), {
        uid: user.uid,
        nombre,
        cantidad: parseFloat(cantidad),
        fechaLimite: fecha ? fecha.toISOString() : null,
        creado: serverTimestamp(),
        progreso: 0,
      });

      router.replace('/objetivos');
    } catch (error: any) {
      Alert.alert('Error al guardar', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.botonAtras}>
        <AntDesign name="arrowleft" size={28} color="#FFA726" />
      </TouchableOpacity>

      <Text style={styles.titulo}>Crear nuevo objetivo</Text>

      <Text style={styles.label}>Nombre del objetivo</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Vacaciones, Emergencias..."
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Cantidad objetivo</Text>
      <TextInput
        style={styles.input}
        placeholder="₡ 0.00"
        value={cantidad}
        onChangeText={setCantidad}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Fecha límite opcional</Text>
      <TouchableOpacity style={styles.input} onPress={() => setMostrarPicker(true)}>
        <Text>{fecha ? fecha.toLocaleDateString() : 'día/mes/año'}</Text>
      </TouchableOpacity>

      {mostrarPicker && (
        <DateTimePicker
          value={fecha || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, selectedDate) => {
            setMostrarPicker(false);
            if (selectedDate) setFecha(selectedDate);
          }}
        />
      )}

      <Text style={styles.subtitulo}>
        <MaterialIcons name="whatshot" size={16} color="#FFA726" /> Ideas de objetivos populares
      </Text>

      <View style={styles.chips}>
        {ideas.map((idea) => (
          <TouchableOpacity
            key={idea}
            style={styles.chip}
            onPress={() => setNombre(idea)}
          >
            <Text>{idea}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.boton} onPress={handleGuardar}>
        <Text style={styles.botonTexto}>Crear objetivo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  label: { fontSize: 16, marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    marginTop: 5,
    backgroundColor: '#F9F9F9',
  },
  subtitulo: {
    marginTop: 20,
    fontWeight: 'bold',
    color: '#333',
    fontSize: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 8,
  },
  chip: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  boton: {
    backgroundColor: '#FFA726',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botonAtras: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 10,
  }
});
