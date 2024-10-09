import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetallesClienteScreen = ({ route }) => {
    const { cliente } = route.params; 

    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <Text style={styles.title}>Detalles del Cliente</Text>
                <Text style={styles.nombre}>{cliente.nombre}</Text>
                <Text style={styles.correo}>{cliente.correo}</Text>
                <Text style={styles.fechaRegistro}>Fecha de registro: {new Date(cliente.fechaRegistro).toLocaleDateString('es-ES')}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    nombre: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    correo: {
        color: '#000',
        fontSize: 15,
        fontWeight: 'bold',
    },
    containerInfo: {
        flex: 1,
        alignItems: 'flex-start',
        padding: 20,
        gap: 5,
        width: '100%',
    },
});

export default DetallesClienteScreen;
