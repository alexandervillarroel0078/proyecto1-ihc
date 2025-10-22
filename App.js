// App.js
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";

import AppNavigator from "./navigation/AppNavigator";
import { UserProvider, useUser } from "./navigation/context/UserContext";

// 🔹 Screens
import ConfirmarPedidoScreen from "./screens/ConfirmarPedidoScreen";
import LoginScreen from "./screens/LoginScreen";

// 🔹 Nuevas pantallas del flujo de pago
import PaymentProcessingScreen from "./screens/PaymentProcessingScreen";
import PaymentSuccessScreen from "./screens/PaymentSuccessScreen"; // renombrada desde PaymentScreen

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { user } = useUser();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          {/* 🔹 Navegación principal (tabs o home general) */}
          <Stack.Screen name="Main" component={AppNavigator} />

          {/* 🔹 Flujo de compra */}
          <Stack.Screen name="ConfirmarPedido" component={ConfirmarPedidoScreen} />
          <Stack.Screen name="ProcesandoPago" component={PaymentProcessingScreen} />
          <Stack.Screen name="PagoExitoso" component={PaymentSuccessScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      {/* 🔹 Toast global visible desde cualquier parte */}
      <Toast />
    </UserProvider>
  );
}
