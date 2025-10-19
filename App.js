
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppNavigator from "./navigation/AppNavigator";
import { UserProvider, useUser } from "./navigation/context/UserContext";
import LoginScreen from "./screens/LoginScreen";
{/* 
const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { user } = useUser();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="Main" component={AppNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <UserProvider>
      <RootNavigator />
    </UserProvider>
  );
}   */}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { user } = useUser();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        // Si no hay usuario logueado, mostrar Login
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        // Si hay usuario, mostrar todo el Tab Navigator dentro de "Main"
        <Stack.Screen name="Main" component={AppNavigator} />
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

