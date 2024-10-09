import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { obtenerRecetasLanding } from '../../services/recetaService';
import { obtenerFavoritos, agregarFavorito, eliminarFavorito } from '../../services/favoritosService';


const ProductosScreen = ({ navigation }) => {
    const [error, setError] = useState(null);
    const [isFavoriteFilter, setIsFavoriteFilter] = useState(false);
    const [selectedOption, setSelectedOption] = useState('todo');
    const [recetas, setRecetas] = useState([]);
    const [favoritos, setFavoritos] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [recetasData, favoritosData] = await Promise.all([
                    obtenerRecetasLanding(),
                    //obtenerFavoritos() 
                ]);
                setRecetas(recetasData);
                //setFavoritos(favoritosData.map(fav => fav.id));
            } catch (err) {
                setError(err.message);
                console.log(err.message);
            }
        };

        cargarDatos();
    }, []);

    const toggleFavorite = async (id) => {
        if (favoritos.includes(id)) {
            // Si ya es favorito, eliminar de favoritos
            await eliminarFavorito(id);
            setFavoritos(favoritos.filter(favId => favId !== id)); // Remover de la lista de favoritos
        } else {
            // Si no es favorito, agregar a favoritos
            await agregarFavorito(id);
            setFavoritos([...favoritos, id]); // Añadir a la lista de favoritos
        }
    };

    const addToCart = (id) => {
        console.log(`Agregando receta con ID: ${id} al carrito`);
        // Aquí podrías implementar la lógica para agregar al carrito
    };

    const filteredRecetas = recetas.filter(receta =>
        receta.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
        receta.especificaciones.toLowerCase().includes(searchText.toLowerCase())
    ).filter(receta => {
        // Si el filtro de favoritos está activado, filtrar solo las recetas que están en favoritos
        if (isFavoriteFilter) {
            return favoritos.includes(receta.id);
        }
        return true; // Si no está activado, mostrar todas las recetas
    });


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
                            onChangeText={text => setSearchText(text)}
                        />
                    </View>

                    <Text style={styles.titleText}>NUESTROS PRODUCTOS 🍺</Text>

                    <View style={styles.containerButtons}>

                        <TouchableOpacity style={styles.favoriteButton} onPress={() => setIsFavoriteFilter(!isFavoriteFilter)}>
                            <Icon
                                name={isFavoriteFilter ? "heart" : "heart-outline"} // Muestra corazón lleno o vacío
                                size={24}
                                color={isFavoriteFilter ? "#E1A500" : "#000"} // Rojo si está seleccionado, negro si no
                            />
                        </TouchableOpacity>

                        <Picker
                            selectedValue={selectedOption}
                            style={styles.picker}
                            onValueChange={(itemValue) => setSelectedOption(itemValue)}>
                            <Picker.Item label="Todo" value="todo" />
                            <Picker.Item label="Lo más nuevo" value="nuevo" />
                            <Picker.Item label="Por precio (mayor a menor)" value="mayorMenor" />
                            <Picker.Item label="Por precio (menor a mayor)" value="menorMayor" />
                        </Picker>
                    </View>

                    <View style={styles.containerCard}>
                        {filteredRecetas.map((receta) => (
                            <ImageBackground
                                key={receta.id}
                                source={{ uri: receta.rutaFondo }}
                                style={styles.card}
                                imageStyle={styles.backgroundImage}
                            >
                                <View style={styles.header}>
                                    <Text style={styles.precio}>${receta.precioPaquete1.toFixed(2)}</Text>
                                    <TouchableOpacity onPress={() => toggleFavorite(receta.id)}>
                                        <Icon
                                            name={favoritos.includes(receta.id) ? 'heart' : 'heart-outline'}
                                            size={24}
                                            color={favoritos.includes(receta.id) ? 'red' : '#000'}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <Image
                                    source={{ uri: receta.imagen }}
                                    style={styles.imagen}
                                    resizeMode="contain"
                                />

                                {receta.stock <= 0 ? (
                                    <Text style={styles.agotado}>¡AGOTADO!</Text>
                                ) : (
                                    <Text style={styles.disponible}>¡DISPONIBLE!</Text>
                                )}

                                <View style={styles.footer}>
                                    <Text style={styles.nombre}>{receta.nombre}</Text>
                                    <Text style={styles.especificaciones}>{receta.especificaciones}</Text>

                                    <TouchableOpacity
                                        style={[
                                            styles.addButton,
                                            receta.stock <= 0 ? styles.disabledButton : null // Aplica un estilo diferente si está deshabilitado
                                        ]}
                                        onPress={() => addToCart(receta.id)}
                                        disabled={receta.stock <= 0} // Deshabilita el botón si el stock es 0 o menos
                                    >
                                        <Text style={receta.stock <= 0 ? styles.disabledButtonText : styles.addButtonText}>
                                            Agregar al carrito
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            </ImageBackground>
                        ))}
                    </View>

                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    containerCard: {
        width: '95%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
        overflow: 'hidden'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 16,
        width: '48%',
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
        alignItems: 'center'
    },
    imagen: {
        marginTop: 10,
        width: '100%',
        height: 200,
    },
    header: {
        backgroundColor: '#eae7e6',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
    },
    disabledButton: {
        backgroundColor: '#e0e0e0',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    addButton: {
        backgroundColor: '#6e2400',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    addButtonText: {
        color: '#b9b9b9',
        fontSize: 14,
        fontWeight: 'bold',
    },
    footer: {
        height: 110,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        backgroundColor: '#eae9e8',
    },
    precio: {
        color: '#E1A500',
        fontWeight: 'bold',
    },
    agotado: {
        position: 'absolute',
        width: 80,
        textAlign: 'center',
        backgroundColor: '#e72929',
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        padding: 4,
        transform: [{ rotate: '-35deg' }],
        top: 50,
        left: 10
    },
    disponible: {
        position: 'absolute',
        width: 90,
        textAlign: 'center',
        backgroundColor: 'rgb(41, 231, 62)',
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        padding: 4,
        transform: [{ rotate: '-35deg' }],
        top: 50,
        left: 10
    },
    especificaciones: {
        textAlign: 'center',
        color: '#000',
        fontSize: 8,
        paddingHorizontal: 10,
    },
    nombre: {
        textAlign: 'center',
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 8,
        paddingTop: 10,
    },
    scrollContainer: {
        paddingBottom: 16
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerButtons: {
        marginTop: 10,
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    containerItems: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        position: 'absolute',
        bottom: 30,
        backgroundColor: 'red'
    },
    picker: {
        textAlign: 'center',
        height: 50,
        width: '78%',
        borderWidth: 2,
        borderColor: '#E1A500',
        borderRadius: 10,
        backgroundColor: 'transparent',
    },
    inputContainer: {
        width: '100%',
        marginTop: 30,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        position: 'absolute',
        left: 20,
    },
    searchInput: {
        textAlign: 'center',
        height: 50,
        width: '100%',
        borderWidth: 2,
        borderColor: '#E1A500',
        borderRadius: 10,
    },
    favoriteButton: {
        width: '20%',
        height: 50,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#E1A500',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    favoriteButtonText: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        color: '#E1A500',
        fontWeight: '800',
    },
    titleText: {
        marginTop: 20,
        textAlign: 'center',
        color: '#000',
        fontSize: 22,
        fontWeight: 'bold',
    },
});

export default ProductosScreen;
