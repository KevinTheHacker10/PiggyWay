import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { auth, createUserWithEmailAndPassword, db } from '../firebase';


export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirm = (date: Date) => { setFechaNacimiento(date); hideDatePicker(); };
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [verPassword, setVerPassword] = useState(false);
  const router = useRouter();

  const handleRegistro = async () => {
    if (password !== confirmarPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, password);
      const user = userCredential.user;
      await updateProfile(userCredential.user, {
        displayName: nombre,
      });
      await setDoc(doc(db, "usuarios", user.uid), {
        uid: user.uid,
        nombre,
        correo,
        fechaNacimiento: fechaNacimiento.toISOString(),
        creadoEn: new Date().toISOString()
      });
      alert('Usuario registrado con éxito');
      router.push({ pathname: '/Meta', params: { nombre } });
    } catch (error: any) {
      alert(error?.message ?? 'Ocurrió un error inesperado');
    }
  };

  const onChangeFecha = (event: any, selectedDate?: Date) => {
    setMostrarPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setFechaNacimiento(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.botonAtras}>
        <AntDesign name="arrowleft" size={28} color="#FFA726" />
      </TouchableOpacity>

      <Text style={styles.etapa}>1 de 2</Text>
      <Text style={styles.titulo}>¡Empecemos!</Text>
      <Text style={styles.subtitulo}>Crea tu cuenta</Text>

      <Text style={styles.label}>Nombre Completo</Text>
      <TextInput
        style={styles.input}
        placeholder="Tu nombre completo"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Correo Electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="ejemplo@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={correo}
        onChangeText={setCorreo}
      />

      <Text style={styles.label}>Contraseña</Text>
      <View style={styles.inputIcon}>
        <TextInput
          style={styles.inputInner}
          placeholder="Crea una contraseña"
          secureTextEntry={!verPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setVerPassword(!verPassword)}>
          <MaterialIcons
            name={verPassword ? 'visibility-off' : 'visibility'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Confirmar Contraseña</Text>
      <View style={styles.inputIcon}>
        <TextInput
          style={styles.inputInner}
          placeholder="Repite la contraseña"
          secureTextEntry={!verPassword}
          value={confirmarPassword}
          onChangeText={setConfirmarPassword}
        />
        <TouchableOpacity onPress={() => setVerPassword(!verPassword)}>
          <MaterialIcons
            name={verPassword ? 'visibility-off' : 'visibility'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Fecha de Nacimiento</Text>

      {Platform.OS === 'web' ? (
        <View style={styles.input}>
          {
            React.createElement('input', {
              type: 'date',
              value: fechaNacimiento.toISOString().split('T')[0],
              onChange: (e) => setFechaNacimiento(new Date(e.target.value)),
              style: {
                width: '100%',
                border: 'none',
                outline: 'none',
                fontSize: 16,
              }
            })
          }
        </View>
      ) : (
        <>
          <TouchableOpacity
            style={[styles.input, { justifyContent: 'center' }]}
            onPress={showDatePicker}
          >
            <Text>{fechaNacimiento.toLocaleDateString('es-ES')}</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            maximumDate={new Date()}
            date={fechaNacimiento}
          />
        </>
      )}

      <TouchableOpacity style={styles.boton} onPress={handleRegistro}>
        <Text style={styles.botonTexto}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  etapa: {
    backgroundColor: '#FDEBD0',
    color: '#D35400',
    padding: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitulo: {
    color: 'gray',
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  inputIcon: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputInner: {
    flex: 1,
    color: '#000',
  },
  boton: {
    backgroundColor: '#F79F1F',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  botonAtras: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 10,
  }
});
