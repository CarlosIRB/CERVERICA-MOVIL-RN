import React from "react";
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "./src/screens/auth/WelcomeScreen";
import LoginScreen from "./src/screens/auth/LoginScreen";
import ProductosScreen from "./src/screens/productos/ProductosScreen";
import ClientesScreen from "./src/screens/clientes/ClientesScreen";
import NotificacionesScreen from "./src/screens/notifications/NotificacionesScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { Provider } from "react-redux";
import store from "./src/store/store";
import DetallesClienteScreen from "./src/screens/clientes/DetallesCliente";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Productos") {
            iconName = focused ? "beer" : "beer-outline";
          }
          else if (route.name === "Clientes") {
            iconName = focused ? "people" : "people-outline";
          }
          else if (route.name === "Notificaciones") {
            iconName = focused ? "notifications" : "notifications-outline";
          } else if (route.name === "Logout") {
            iconName = focused ? "log-out" : "log-out-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#E1A500",
        tabBarInactiveTintColor: "gray",
      })}
    >

      <Tab.Screen name="Clientes" component={ClientesScreen} />
      <Tab.Screen name="Productos" component={ProductosScreen} />
      <Tab.Screen name="Notificaciones" component={NotificacionesScreen} />
      <Tab.Screen
        name="Logout"
        component={LoginScreen}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => navigation.navigate("Login")}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeTabs" // Cambia "Productos" a "HomeTabs" o similar
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetallesClienteScreen"
            component={DetallesClienteScreen}
            options={{ title: "Detalles del Cliente" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
