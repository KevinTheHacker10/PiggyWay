import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const metas = [
    { id: '1', label: 'Celular', icon: 'smartphone' },
    { id: '2', label: 'Viaje', icon: 'flight' },
    { id: '3', label: 'Estudios', icon: 'school' },
    { id: '4', label: 'Ropa', icon: 'checkroom' },
    { id: '5', label: 'Videojuegos', icon: 'sports-esports' },
];
const { nombre } = useLocalSearchParams();

export default function Meta() {
    const [seleccionada, setSeleccionada] = useState<string | null>(null);
    const router = useRouter();

    const seleccionarMeta = (id: string) => {
        setSeleccionada(id);
    };

    const finalizar = () => {
        if (seleccionada) {
            alert(`Meta seleccionada: ${metas.find(m => m.id === seleccionada)?.label}`);
            router.replace('/'); // cambiar según ruta deseada
        } else {
            alert('Selecciona una meta antes de continuar.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.etapa}>2 de 2</Text>
            <Text style={styles.titulo}>¿Para qué estás ahorrando?</Text>
            <FlatList
                data={metas}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={{ paddingVertical: 20 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.card,
                            seleccionada === item.id && styles.cardSeleccionada,
                        ]}
                        onPress={() => seleccionarMeta(item.id)}
                    >
                        <MaterialIcons
                            name={item.icon as any}
                            size={32}
                            color={seleccionada === item.id ? '#fff' : '#F79F1F'}
                        />
                        <Text
                            style={[
                                styles.label,
                                seleccionada === item.id && styles.labelSeleccionada,
                            ]}
                        >
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity
                style={styles.boton}
                onPress={() => router.push({ pathname: '/Inicio', params: { nombre } })}
            >
                <Text style={styles.botonTexto}>Finalizar Inscripción</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        padding: 20,
    },
    etapa: {
        alignSelf: 'flex-start',
        backgroundColor: '#FDEBD0',
        color: '#D35400',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        fontWeight: 'bold',
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 20,
        marginBottom: 20,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 5,
        elevation: 3,
    },
    cardSeleccionada: {
        backgroundColor: '#F79F1F',
    },
    label: {
        marginTop: 8,
        fontWeight: '600',
        color: '#333',
    },
    labelSeleccionada: {
        color: '#fff',
    },
    boton: {
        backgroundColor: '#F79F1F',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 'auto',
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
