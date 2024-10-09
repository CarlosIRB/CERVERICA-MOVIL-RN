import axios from 'axios';
import { API_URL } from '@env';

const BASE_URL = API_URL;

// Agregar favorito
export const agregarFavorito = async (favoritoUsuarioAgregar) => {
    try {
        const response = await axios.post(`${BASE_URL}/favoritos/agregar-favorito`, favoritoUsuarioAgregar);
        return response.data;
    } catch (error) {
        console.error('Error al agregar favorito:', error?.response?.data || error.message);
        throw new Error('No se pudo agregar el favorito.');
    }
};

// Eliminar favorito
export const eliminarFavorito = async (favoritoUsuarioEliminar) => {
    try {
        const response = await axios.post(`${BASE_URL}/favoritos/eliminar-favorito`, favoritoUsuarioEliminar);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar favorito:', error?.response?.data || error.message);
        throw new Error('No se pudo eliminar el favorito.');
    }
};

// Obtener favoritos por usuario (con idUsuario)
export const obtenerFavoritosPorUsuario = async (idUsuario) => {
    try {
        const response = await axios.get(`${BASE_URL}/favoritos/obtener-favoritos/${idUsuario}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener favoritos:', error?.response?.data || error.message);
        throw new Error('No se pudo obtener los favoritos del usuario.');
    }
};

// Obtener favoritos del usuario autenticado
export const obtenerFavoritos = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/favoritos/obtener-favoritos`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener favoritos:', error?.response?.data || error.message);
        throw new Error('No se pudieron obtener los favoritos.');
    }
};
