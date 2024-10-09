import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { obtenerClientes } from '../../services/clienteService';

const ClientesScreen = ({ navigation }) => {
    const [error, setError] = useState(null);
    const [clientes, setClientes] = useState([]);
    const [searchText, setSearchText] = useState(''); // Estado para el texto de búsqueda

    useEffect(() => {
        const cargarClientes = async () => {
            try {
                const data = await obtenerClientes();
                setClientes(data);
            } catch (err) {
                setError(err.message);
                console.log(err.message);
            }
        };

        cargarClientes();
    }, []);

    // Filtrar los clientes según el texto de búsqueda
    const filteredClientes = clientes.filter(cliente =>
        cliente.nombre.toLowerCase().includes(searchText.toLowerCase())
    );

    // Función para navegar a los detalles del cliente
    const verDetallesCliente = (cliente) => {
        navigation.navigate('DetallesClienteScreen', { cliente }); // Navegar pasando el objeto cliente
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.containerItems}>
                    <View style={styles.inputContainer}>
                        <Icon name="search" size={20} color="#000" style={styles.icon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Busqueda..."
                            value={searchText}
                            onChangeText={text => setSearchText(text)} // Actualiza el estado con el texto ingresado
                        />
                    </View>

                    <Text style={styles.titleText}>LISTA DE CLIENTES</Text>

                    <View style={styles.containerCard}>
                        {filteredClientes.map((cliente) => (
                            <TouchableOpacity 
                                key={cliente.id} 
                                style={styles.card} 
                                onPress={() => verDetallesCliente(cliente)} 
                            >
                                <Text style={styles.nombre}>Nombre: {cliente.nombre}</Text>
                                <Text style={styles.nombre}>Email: {cliente.correo}</Text>
                                <Text style={styles.nombre}>
                                    Fecha de registro: {new Date(cliente.fechaRegistro).toLocaleDateString('es-ES')}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    containerCard: {
        width: '90%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
        overflow: 'hidden',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 16,
        padding: 20,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 2,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
    },
    nombre: {
        color: '#000',
        fontSize: 12,
        fontWeight: 'bold',
        paddingTop: 10,
    },
    scrollContainer: {
        paddingBottom: 16,
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerItems: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        position: 'absolute',
        left: 20,
    },
    inputContainer: {
        width: '100%',
        marginTop: 30,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        textAlign: 'center',
        height: 50,
        width: '100%',
        borderWidth: 2,
        borderColor: '#E1A500',
        borderRadius: 10,
    },
    titleText: {
        marginTop: 20,
        textAlign: 'center',
        color: '#000',
        fontSize: 22,
        fontWeight: 'bold',
    },
});

export default ClientesScreen;
