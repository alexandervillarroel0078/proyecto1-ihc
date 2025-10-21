
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppNavigator from "./navigation/AppNavigator";
import { UserProvider, useUser } from "./navigation/context/UserContext";
import CheckoutScreen from "./screens/CheckoutScreen";
import LoginScreen from "./screens/LoginScreen";
import PaymentScreen from "./screens/PaymentScreen";

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { user } = useUser();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        // Si no hay usuario logueado, mostrar Login
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          {/* 🔹 Tabs principales */}
          <Stack.Screen name="Main" component={AppNavigator} />

          {/* 🔹 Pantalla de Checkout fuera de los tabs */}
          <Stack.Screen name="Checkout" component={CheckoutScreen} />

          {/* 🔹 Pantalla de pago (si no la manejas como tab fija) */}
          <Stack.Screen name="Pago" component={PaymentScreen} />
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
    </UserProvider>
  );
}

