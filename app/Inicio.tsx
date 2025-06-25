// app/Inicio.tsx
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export default function Inicio() {
    const { nombre } = useLocalSearchParams(); // Lee el nombre desde la URL si se pasa
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Header de bienvenida */}
            <View style={styles.header}>
                <Image source={require('../assets/images/profile.png.png')} style={styles.avatar} />
                <Text style={styles.bienvenida}>Bienvenido de nuevo,</Text>
                <Text style={styles.nombre}>{nombre || 'Usuario'}</Text>
            </View>

            {/* Puntos y progreso */}
            <View style={styles.puntosCard}>
                <Text style={styles.labelPuntos}>Tus puntos</Text>
                <Text style={styles.puntos}>5,000 pts</Text>
                <Text style={styles.progresoLabel}>Progreso de la meta</Text>
                <View style={styles.barraProgresoBase}>
                    <View style={[styles.barraProgresoValor, { width: '75%' }]} />
                </View>
            </View>

            {/* Desafío diario */}
            <View style={styles.card}>
                <Text style={styles.cardTitulo}>⚡ Desafío diario</Text>
                <Text style={styles.cardTexto}>
                    Buy coffee using your reusable cup & save $2! Can you complete it today?
                </Text>
                <TouchableOpacity style={styles.botonNaranja}>
                    <Text style={styles.botonTexto}>Completar desafío</Text>
                </TouchableOpacity>
            </View>

            {/* Consejo diario */}
            <View style={styles.card}>
                <Text style={styles.cardTitulo}>💡 Consejo financiero diario</Text>
                <Text style={styles.cardTexto}>
                    Apartá una cantidad fija en tus ahorros tan pronto como recibas tu pago,
                    ¡Ahorrá automáticamente!
                </Text>
                <TouchableOpacity style={styles.botonOscuro}>
                    <Text style={styles.botonTextoOscuro}>Obtener un nuevo consejo</Text>
                </TouchableOpacity>
            </View>

            {/* Navegación inferior */}
            <View style={styles.nav}>
                <Ionicons name="home" size={24} color="#F79F1F" />
                <TouchableOpacity onPress={() => router.push('/transacciones')}>
                    <Ionicons name="refresh" size={24} color="#F79F1F" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/objetivos')}>
                    <MaterialCommunityIcons name="target" size={30} color="#FFA726" />
                </TouchableOpacity>
                <FontAwesome5 name="graduation-cap" size={22} color="#ccc" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F9FAFB',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 6,
    },
    bienvenida: {
        fontSize: 14,
        color: '#666',
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0C0C0C',
    },
    puntosCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
    },
    labelPuntos: {
        color: '#888',
        fontSize: 14,
    },
    puntos: {
        fontSize: 28,
        color: '#F79F1F',
        fontWeight: 'bold',
    },
    progresoLabel: {
        fontSize: 12,
        color: '#999',
        marginTop: 10,
    },
    barraProgresoBase: {
        width: '100%',
        height: 10,
        backgroundColor: '#eee',
        borderRadius: 10,
        marginTop: 4,
    },
    barraProgresoValor: {
        height: 10,
        backgroundColor: '#F79F1F',
        borderRadius: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
    },
    cardTitulo: {
        fontWeight: 'bold',
        marginBottom: 8,
        fontSize: 16,
        color: '#222',
    },
    cardTexto: {
        fontSize: 14,
        color: '#444',
        marginBottom: 10,
    },
    botonNaranja: {
        backgroundColor: '#F79F1F',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    botonTexto: {
        color: '#fff',
        fontWeight: 'bold',
    },
    botonOscuro: {
        backgroundColor: '#0C0C0C',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    botonTextoOscuro: {
        color: '#fff',
        fontWeight: 'bold',
    },
    nav: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#fff',
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 12,
        elevation: 4,
    },
});
