import { AntDesign } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../firebase';


export default function Transacciones() {
  const [balance, setBalance] = useState(0);
  const [transacciones, setTransacciones] = useState<any[]>([]);
  const handleGuardar = async () => {
  const user = auth.currentUser;
  if (!user) return Alert.alert("Error", "Usuario no autenticado");


useFocusEffect(() => {
  const obtenerTransacciones = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, 'transacciones'),
      where('uid', '==', user.uid)
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => doc.data());
    setTransacciones(data);

    const nuevoBalance = data.reduce((total, t) => total + parseFloat(t.monto), 0);
    setBalance(nuevoBalance);
  };

  obtenerTransacciones();
});
  try {
    await addDoc(collection(db, 'transacciones'), {
      uid: user.uid,
      descripcion,
      monto: parseFloat(monto),
      tipo,
      timestamp: serverTimestamp(),
    });
    router.replace('/transacciones');
  } catch (error) {
    Alert.alert("Error al guardar", error.message);
  }
};

  // Este efecto se activa cuando se vuelve a esta pantalla
  useFocusEffect(() => {
    const obtenerTransacciones = async () => {
      const data = await getTransaccionesLocales();
      setTransacciones(data);
      const nuevoBalance = data.reduce((total, t) => total + parseFloat(t.monto), 0);
      setBalance(nuevoBalance);
    };
    obtenerTransacciones();
  });

  // Simula la obtención local (mock)
  const getTransaccionesLocales = async () => {
    const datos = await globalThis.transaccionesGuardadas || [];
    return datos;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mi Balance</Text>
      <Text style={styles.balance}>₡ {balance.toFixed(2)}</Text>

      <Text style={styles.subtitulo}>Últimas transacciones</Text>
      <FlatList
        data={transacciones}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.descripcion}>{item.descripcion}</Text>
            <Text style={styles.monto}>{item.tipo === 'gasto' ? '-' : '+'}₡ {parseFloat(item.monto).toFixed(2)}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.botonMas} onPress={() => router.push('/Movimientos')}>
        <AntDesign name="pluscircle" size={60} color="#4CAF50" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold' },
  balance: { fontSize: 32, fontWeight: 'bold', marginVertical: 10, color: '#2E7D32' },
  subtitulo: { fontSize: 18, marginVertical: 10 },
  item: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descripcion: { fontSize: 16 },
  monto: { fontSize: 16, fontWeight: 'bold' },
  botonMas: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
});
