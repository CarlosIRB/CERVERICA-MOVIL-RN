import { API_URL } from '@env'

const baseURL = `${API_URL}/receta`;

// Función para obtener el token
const obtenerToken = () => {
  const sesion = JSON.parse(localStorage.getItem("sesion"));
  return sesion ? sesion.token : null;
};

const fetchGet = async (endpoint) => {
  // Definir los encabezados sin el token
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    // Realizar la solicitud fetch
    const response = await fetch(`${baseURL}${endpoint}`, {
      method: "GET",
      headers: headers,
    });

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      // Intentar obtener el cuerpo del error
      let errorMessage = "No se pudo obtener datos"; // Mensaje por defecto
      try {
        const errorData = await response.json(); // Capturar el cuerpo del error
        errorMessage = errorData.message || errorMessage; // Usar el mensaje del error si existe
      } catch (jsonError) {
        // Si no se puede convertir a JSON, mantener el mensaje por defecto
        console.error("Error al parsear el cuerpo de la respuesta de error:", jsonError);
      }

      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    // Retornar los datos en caso de éxito
    return await response.json();
  } catch (error) {
    // Manejar errores en la llamada a la API
    console.error("Error en la llamada API:", error);
    throw error; // Lanzar el error para manejarlo en otro lugar si es necesario
  }
};

  
/*
const fetchGet = async (endpoint) => {
  const token = obtenerToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(`${baseURL}${endpoint}`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      const errorData = await response.json(); // Capturar el cuerpo del error
      throw new Error(
        `Error ${response.status}: ${
          errorData.message || "No se pudo obtener datos"
        }`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error en la llamada API:", error);
    throw error;
  }
};
*/

const fetchPost = async (endpoint, data) => {
  const token = obtenerToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(`${_baseURL}${endpoint}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en la llamada API:", error);
    throw error;
  }
};

const fetchPut = async (endpoint, data) => {
  const token = obtenerToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(`${_baseURL}${endpoint}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en la llamada API:", error);
    throw error;
  }
};

const fetchDelete = async (endpoint) => {
  const token = obtenerToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(`${_baseURL}${endpoint}`, {
      method: "DELETE",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en la llamada API:", error);
    throw error;
  }
};

export const obtener = () => {
  return fetchGet("");
};

export const crear = (data) => {
  return fetchPost("", data);
};

export const obtenerPorId = (id) => {
  return fetchGet(`/${id}`);
};

export const modificar = (id, data) => {
  return fetchPut(`/${id}`, data);
};

export const eliminar = (id) => {
  return fetchDelete(`/${id}`);
};

export const crearPasos = (id, data) => {
  return fetchPost(`/${id}/pasos`, data);
};

export const obtenerPasos = (id) => {
  return fetchGet(`/${id}/pasos`);
};

export const modificarPasos = (id, data) => {
  return fetchPut(`/${id}/pasos`, data);
};

export const activar = (id) => {
  return fetchPost(`/activar/${id}`, {});
};

export const desactivar = (id) => {
  return fetchPost(`/desactivar/${id}`, {});
};

export const actualizarPrecios = (id, data) => {
  return fetchPost(`/${id}/ActualizarPrecios`, data);
};

export const obtenerRecetasConStock = (id) => {
  return fetchGet(`/${id}/ConStock`);
};

export const obtenerRecetasLanding = () => {
  return fetchGet("/obtener-recetas-landing");
};
