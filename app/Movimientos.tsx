import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Movimientos() {
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [tipo, setTipo] = useState<'ingreso' | 'gasto'>('ingreso');

  const handleGuardar = () => {
    if (!descripcion || !monto) {
      Alert.alert('Error', 'Debe completar todos los campos');
      return;
    }

    const nuevaTransaccion = { descripcion, monto, tipo };
    globalThis.transaccionesGuardadas = [
      ...(globalThis.transaccionesGuardadas || []),
      nuevaTransaccion,
    ];
    router.replace('/transacciones');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nuevo Movimiento</Text>

      <TextInput
        style={styles.input}
        placeholder="Descripción"
        onChangeText={setDescripcion}
        value={descripcion}
      />

      <TextInput
        style={styles.input}
        placeholder="Monto"
        keyboardType="numeric"
        onChangeText={setMonto}
        value={monto}
      />

      <View style={styles.tipoContainer}>
        <TouchableOpacity
          style={[styles.tipoBtn, tipo === 'ingreso' && styles.seleccionado]}
          onPress={() => setTipo('ingreso')}
        >
          <Text style={styles.tipoTexto}>Ingreso</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tipoBtn, tipo === 'gasto' && styles.seleccionado]}
          onPress={() => setTipo('gasto')}
        >
          <Text style={styles.tipoTexto}>Gasto</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.boton} onPress={handleGuardar}>
        <Text style={styles.botonTexto}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 15,
  },
  tipoContainer: {
    flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20,
  },
  tipoBtn: {
    padding: 10, borderRadius: 8, backgroundColor: '#e0e0e0', width: '40%', alignItems: 'center',
  },
  seleccionado: {
    backgroundColor: '#4CAF50',
  },
  tipoTexto: { color: '#000' },
  boton: {
    backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, alignItems: 'center',
  },
  botonTexto: {
    color: '#fff', fontWeight: 'bold', fontSize: 16,
  },
});
