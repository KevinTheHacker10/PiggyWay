import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth, db } from '../firebase';

export default function Transacciones() {
  const [balance, setBalance] = useState(0);
  const [transacciones, setTransacciones] = useState<any[]>([]);
  const router = useRouter();

  const handleGuardar = async (descripcion: string, monto: string, tipo: string) => {
    const user = auth.currentUser;
    if (!user) {
      return Alert.alert('Error', 'Usuario no autenticado');
    }

    try {
      await addDoc(collection(db, 'transacciones'), {
        uid: user.uid,
        descripcion,
        monto: parseFloat(monto),
        tipo,
        timestamp: serverTimestamp(),
      });
      router.replace('/transacciones');
    } catch (error: any) {
      Alert.alert('Error al guardar', error.message);
    }
  };

  useFocusEffect(() => {
    const obtenerTransacciones = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(collection(db, 'transacciones'), where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => doc.data());
      setTransacciones(data);

      const nuevoBalance = data.reduce((total, t) => total + parseFloat(t.monto), 0);
      setBalance(nuevoBalance);
    };

    obtenerTransacciones();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Transacciones</Text>

      <View style={styles.balanceBox}>
        <Text style={styles.balanceLabel}>Mi Balance</Text>
        <Text style={styles.balance}>₡ {balance.toFixed(2)}</Text>
      </View>

      <Text style={styles.subtitulo}>Movimientos recientes</Text>

      <FlatList
        data={transacciones}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.descripcion}>{item.descripcion}</Text>
              <Text style={styles.tipo}>
                {item.tipo === 'gasto' ? 'Gasto' : 'Ingreso'} • {item.categoria || 'General'}
              </Text>
            </View>
            <Text
              style={[
                styles.monto,
                { color: item.tipo === 'gasto' ? '#E53935' : '#43A047' },
              ]}
            >
              {item.tipo === 'gasto' ? '-' : '+'}₡ {parseFloat(item.monto).toFixed(2)}
            </Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.botonMas}
        onPress={() => router.push('/Movimientos')}
      >
        <AntDesign name="pluscircle" size={65} color="#FFA726" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  balanceBox: {
    backgroundColor: '#FFF3E0',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceLabel: { fontSize: 16, color: '#666' },
  balance: { fontSize: 36, fontWeight: 'bold', color: '#FFA726', marginTop: 5 },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFA726',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#FAFAFA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  descripcion: { fontSize: 16, fontWeight: '500', color: '#333' },
  tipo: { fontSize: 13, color: '#999', marginTop: 2 },
  monto: { fontSize: 18, fontWeight: 'bold' },
  botonMas: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
});
