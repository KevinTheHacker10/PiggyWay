import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const objetivosDummy = [
  {
    id: '1',
    titulo: 'Vacaciones 2025',
    progreso: 0.6,
    montoActual: 50000,
    montoMeta: 300000,
    icono: 'piggy-bank',
    fondo: '#FFE0B2',
  },
  {
    id: '2',
    titulo: 'Carro',
    progreso: 0.25,
    montoActual: 130000,
    montoMeta: 325000,
    icono: 'car',
    fondo: '#C8E6C9',
  },
  {
    id: '3',
    titulo: 'Graduación',
    progreso: 0.1,
    montoActual: 30000,
    montoMeta: 300000,
    icono: 'graduation-cap',
    fondo: '#E1F5FE',
  },
];

export default function Objetivos() {
  const router = useRouter();

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
          ₡{item.montoActual.toLocaleString()} / ₡{item.montoMeta.toLocaleString()}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.botonAtras}>
  <AntDesign name="arrowleft" size={28} color="#FFA726" />
</TouchableOpacity>

      <Text style={styles.encabezado}>Mis metas de ahorro</Text>

      <FlatList
        data={objetivosDummy}
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
