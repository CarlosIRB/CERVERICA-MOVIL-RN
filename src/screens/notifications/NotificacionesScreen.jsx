// // src/screens/notifications/NotificacionesScreen.js
// import React, { useEffect, useState } from 'react';
// import { View, FlatList, StyleSheet, ActivityIndicator, ToastAndroid } from 'react-native';
// import NotificationItem from '../../components/notifications/NotificationItem';
// import NotificationHeader from '../../components/notifications/NotificationHeader';
// import { fetchNotificaciones, marcarNotificacionVisto } from '../../services/notificationService';
// import { useDispatch, useSelector } from 'react-redux';
// import { getNotificaciones, eliminarNotificacion } from '../../store/notifications/notificationActions';
// import { formatFecha } from '../../utils/dateFormatter'

// const NotificacionesScreen = () => {
//   const dispatch = useDispatch();
//   const { notificaciones, loading, error } = useSelector(state => state.notifications);

//   const [filterQuery, setFilterQuery] = useState('');
//   const [ascendente, setAscendente] = useState(true);
//   const [filteredNotificaciones, setFilteredNotificaciones] = useState([]);

//   useEffect(() => {
//     dispatch(getNotificaciones());
//   }, [dispatch]);

//   useEffect(() => {
//     handleFilterAndSort();
//   }, [notificaciones, filterQuery, ascendente]);

//   const handleFilterAndSort = () => {
//     let data = [...notificaciones];

//     // Filtrar
//     if (filterQuery) {
//       data = data.filter(noti =>
//         noti.mensaje.toLowerCase().includes(filterQuery.toLowerCase()) ||
//         formatFecha(noti.fecha).toLowerCase().includes(filterQuery.toLowerCase())
//       );
//     }

//     // Ordenar
//     data.sort((a, b) => {
//       const dateA = new Date(a.fecha);
//       const dateB = new Date(b.fecha);
//       return ascendente ? dateA - dateB : dateB - dateA;
//     });

//     setFilteredNotificaciones(data);
//   };

//   const handleToggleOrder = () => {
//     setAscendente(!ascendente);
//   };

//   const handleVistoPress = async (notificacion) => {
//     try {
//       await marcarNotificacionVisto(notificacion.id);
//       dispatch(eliminarNotificacion(notificacion.id));
//       ToastAndroid.show('Notificación marcada como vista', ToastAndroid.SHORT);
//     } catch (error) {
//       ToastAndroid.show('Error al marcar la notificación', ToastAndroid.SHORT);
//     }
//   };

 

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#FFA500" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <NotificationHeader
//         filterQuery={filterQuery}
//         onFilterChange={setFilterQuery}
//         ascendente={ascendente}
//         onToggleOrder={handleToggleOrder}
//       />
//       <FlatList
//         data={filteredNotificaciones}
//         renderItem={({ item }) => (
//           <NotificationItem notificacion={item} onVistoPress={handleVistoPress} />
//         )}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={styles.list}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000', // Fondo negro según tu XML
//     padding: 16,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   list: {
//     paddingBottom: 52, // Similar al paddingBottom en tu ScrollView
//   },
// });

// export default NotificacionesScreen;




// NotificacionesScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios'; // Para las peticiones de API
import { API_URL } from '@env';

const NotificacionesScreen = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [filterQuery, setFilterQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [ascendente, setAscendente] = useState(true);

  useEffect(() => {
    fetchNotificaciones();
  }, []);
//${getToken()}
  const fetchNotificaciones = async () => {
    try {
      const response = await axios.get(`${API_URL}Notificaciones`, {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1AbS5tIiwibmFtZSI6IknDsWlnbyBNb250b3lhIiwibmFtZWlkIjoiOTc1ZjA5NGItYTMzMy00NzQyLWIyMzUtMTk2MDg5NzhmY2Y5IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0MjAwIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIiwicm9sZSI6IkNsaWVudGUiLCJuYmYiOjE3MjgxOTYwODYsImV4cCI6MTcyODIwNjg4NiwiaWF0IjoxNzI4MTk2MDg2fQ.tGMib7KDspYNamEIEOoWFAmExBSV8PaOPQXBUwK3lOY`
        }
      });
      setNotificaciones(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const filterNotificaciones = (query) => {
    setFilterQuery(query.toLowerCase());
  };

  const toggleOrden = () => {
    setAscendente(!ascendente);
    const sortedNotificaciones = [...notificaciones].sort((a, b) =>
      ascendente ? new Date(b.fecha) - new Date(a.fecha) : new Date(a.fecha) - new Date(b.fecha)
    );
    setNotificaciones(sortedNotificaciones);
  };

  const renderNotificacion = ({ item }) => (
    <View style={styles.notificacionItem}>
      <Image source={require('../../../assets/logo-completo.png')} style={styles.icon} />
      <View style={styles.notificacionText}>
        <Text style={styles.mensaje}>{item.mensaje}</Text>
        <Text style={styles.fecha}>{formatFecha(item.fecha)}</Text>
      </View>
    </View>
  );

  const formatFecha = (fecha) => {
    // Implementar lógica para formatear la fecha (similar al código original en Kotlin)
    const diffInMinutes = Math.floor((new Date() - new Date(fecha)) / (1000 * 60));
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} minutos`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;
    return `Hace ${Math.floor(diffInHours / 24)} días`;
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar..."
        value={filterQuery}
        onChangeText={filterNotificaciones}
      />
      <TouchableOpacity onPress={toggleOrden}>
        <Text style={styles.ordenButton}>
          {ascendente ? 'Fecha Descendente' : 'Fecha Ascendente'}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={notificaciones.filter((item) =>
          item.mensaje.toLowerCase().includes(filterQuery)
        )}
        renderItem={renderNotificacion}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  ordenButton: {
    textAlign: 'center',
    color: '#000',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  notificacionItem: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  notificacionText: {
    flex: 1,
  },
  mensaje: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  fecha: {
    fontSize: 12,
    color: '#666',
  },
});

export default NotificacionesScreen;
