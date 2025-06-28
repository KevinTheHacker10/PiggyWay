import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../firebase';
export default function Objetivos() {
  const [objetivos, setObjetivos] = useState<any[]>([]);
  const router = useRouter();
  const handleEliminarObjetivo = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'objetivos', id));
      setObjetivos(objetivos.filter(obj => obj.id !== id));
    } catch (error) {
      console.error('Error eliminando objetivo:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      const obtenerObjetivos = async () => {
        const user = auth.currentUser;
        if (!user) return;

        const q = query(collection(db, 'objetivos'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => {
          const d = doc.data();
          return {
            id: doc.id,
            titulo: d.titulo || d.nombre || 'Objetivo sin nombre',
            montoActual: d.montoActual,
            montoMeta: d.montoMeta,
            icono: d.icono || 'star',
            fondo: d.fondo || '#FFF3E0',
            progreso: d.montoActual / d.montoMeta,
          };
        });
        setObjetivos(data);
      };

      obtenerObjetivos();
    }, [])
  );


  const renderObjetivo = (item: any) => (
    <View style={styles.objetivo}>
      <View style={[styles.iconBox, { backgroundColor: item.fondo }]}>
        <AntDesign name="star" size={24} color="#FF9800" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <View style={styles.barraContainer}>
          <View style={[styles.barra, { width: `${item.progreso * 100}%` }]} />
        </View>
        <Text style={styles.metaTexto}>
          ₡{item.montoActual ? item.montoActual.toLocaleString() : 0} / ₡{item.montoMeta ? item.montoMeta.toLocaleString() : 0}
        </Text>
      </View>
      <TouchableOpacity onPress={() => router.push({ pathname: '/masobjetivo', params: { id: item.id } })}>
        <AntDesign name="edit" size={24} color="#FFA726" style={{ marginLeft: 10 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleEliminarObjetivo(item.id)}>
        <AntDesign name="closecircle" size={24} color="#FF9800" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.botonAtras}>
        <AntDesign name="arrowleft" size={28} color="#FFA726" />
      </TouchableOpacity>

      <Text style={styles.encabezado}>Mis metas de ahorro</Text>

      <FlatList
        data={objetivos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderObjetivo(item)}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity
        style={styles.botonMas}
        onPress={() => router.push('/masobjetivo')}
      >
        <AntDesign name="pluscircle" size={65} color="#FFA726" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  encabezado: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  objetivo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    gap: 10,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  titulo: { fontSize: 16, fontWeight: '600' },
  barraContainer: {
    backgroundColor: '#E0E0E0',
    height: 6,
    borderRadius: 4,
    marginTop: 6,
    marginBottom: 4,
    width: '100%',
  },
  barra: {
    backgroundColor: '#FFA726',
    height: 6,
    borderRadius: 4,
  },
  metaTexto: {
    fontSize: 12,
    color: '#757575',
  },
  botonMas: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  botonAtras: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 10,
  }
});
