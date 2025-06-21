import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Registro = () => {
  return (
    <View style={styles.container}>
      <Text>Página de Registro</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Registro;
