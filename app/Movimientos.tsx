import { AntDesign, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';
import { auth, db } from '../firebase';

export default function Movimientos() {
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [tipo, setTipo] = useState<'ingreso' | 'gasto'>('ingreso');
  const [categoria, setCategoria] = useState('Compras');
  const [fecha, setFecha] = useState(new Date());
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const router = useRouter();

  const categorias = [
    { nombre: 'Compras', icono: <MaterialIcons name="shopping-bag" size={24} color="#FF9800" /> },
    { nombre: 'Comestibles', icono: <MaterialCommunityIcons name="food-apple" size={24} color="#607D8B" /> },
    { nombre: 'Facturas', icono: <FontAwesome5 name="file-invoice-dollar" size={24} color="#607D8B" /> },
    { nombre: 'Pagos', icono: <MaterialIcons name="payment" size={24} color="#607D8B" /> },
  ];

  const handleGuardar = async () => {
    const user = auth.currentUser;
    if (!user) return Alert.alert("Error", "Usuario no autenticado");

    if (!descripcion || !monto) {
      return Alert.alert("Campos incompletos", "Por favor completa todos los campos.");
    }

    try {
      await addDoc(collection(db, 'transacciones'), {
        uid: user.uid,
        descripcion,
        monto: parseFloat(monto),
        tipo,
        categoria,
        fecha: fecha.toISOString(),
        timestamp: serverTimestamp(),
      });
      router.replace('/transacciones');
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.botonAtras}>
  <AntDesign name="arrowleft" size={28} color="#FFA726" />
</TouchableOpacity>

      <Text style={styles.titulo}>Agregar Transacción</Text>

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        placeholder="Agregar descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <Text style={styles.label}>Monto</Text>
      <TextInput
        style={styles.input}
        placeholder="0.00"
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
      />

      <View style={styles.tipoContainer}>
        <TouchableOpacity
          style={[styles.tipoBtn, tipo === 'ingreso' && styles.tipoActivo]}
          onPress={() => setTipo('ingreso')}
        >
          <Text style={[styles.tipoTexto, tipo === 'ingreso' && styles.tipoTextoActivo]}>Ingreso</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tipoBtn, tipo === 'gasto' && styles.tipoActivo]}
          onPress={() => setTipo('gasto')}
        >
          <Text style={[styles.tipoTexto, tipo === 'gasto' && styles.tipoTextoActivo]}>Gasto</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Categoría</Text>
      <View style={styles.categorias}>
        {categorias.map(cat => (
          <TouchableOpacity
            key={cat.nombre}
            style={[
              styles.categoria,
              categoria === cat.nombre && styles.categoriaSeleccionada,
            ]}
            onPress={() => setCategoria(cat.nombre)}
          >
            {cat.icono}
            <Text
              style={[
                styles.categoriaTexto,
                categoria === cat.nombre && styles.categoriaTextoSeleccionada,
              ]}
            >
              {cat.nombre}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Fecha</Text>
      <TouchableOpacity style={styles.input} onPress={() => setMostrarPicker(true)}>
        <Text>{fecha.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {mostrarPicker && (
        <DateTimePicker
          value={fecha}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, selectedDate) => {
            setMostrarPicker(false);
            if (selectedDate) setFecha(selectedDate);
          }}
        />
      )}

      <Image
        source={require('../assets/images/Piggy.jpg')}
        style={{ width: 80, height: 80, alignSelf: 'center', marginVertical: 20 }}
        resizeMode="contain"
      />

      <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardar}>
        <Text style={styles.botonTexto}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, marginTop: 10 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 10,
    padding: 12, marginTop: 5, marginBottom: 10, backgroundColor: '#F5F5F5'
  },
  tipoContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 30,
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 5,
  },
  tipoBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 30,
  },
  tipoActivo: {
    backgroundColor: '#FFA726',
  },
  tipoTexto: {
    color: '#555',
    fontWeight: '600',
  },
  tipoTextoActivo: {
    color: 'white',
  },
  categorias: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  categoria: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#eee',
    width: '23%',
  },
  categoriaSeleccionada: {
    borderColor: '#FFA726',
    borderWidth: 2,
    backgroundColor: '#FFF3E0',
  },
  categoriaTexto: {
    marginTop: 4,
    fontSize: 12,
    color: '#607D8B',
  },
  categoriaTextoSeleccionada: {
    color: '#FFA726',
    fontWeight: 'bold',
  },
  botonGuardar: {
    backgroundColor: '#FFA726',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
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
},

});
