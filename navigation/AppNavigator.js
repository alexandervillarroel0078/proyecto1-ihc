 

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";

// 🟩 Pantallas principales (Tabs)
import HomeScreen from "../screens/HomeScreen";
import MisPedidosScreen from "../screens/MisPedidosScreen";
import ProfileScreen from "../screens/ProfileScreen";
import TrackingScreen from "../screens/TrackingScreen";
// 🟧 Pantalla adicional (fuera del tab)
import CarritoScreen from "../screens/CarritoScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          height: 68,
          borderTopWidth: 1.2,
          borderTopColor: "#DADADA",
          paddingTop: 12.5,
          elevation: 6,
        },
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let iconName, label;
          if (route.name === "Inicio") {
            iconName = focused ? "home" : "home-outline";
            label = "Home";
          } else if (route.name === "Ubicación") {
            iconName = focused ? "locate" : "locate-outline";
            label = "Ubicación";
          } else if (route.name === "Pedidos") {
            iconName = focused ? "list" : "list-outline";
            label = "Mis Pedidos";
          } else if (route.name === "Perfil") {
            iconName = focused ? "person" : "person-outline";
            label = "Perfil";
          }

          const activeColor = "#1E6F73";
          const inactiveColor = "#013A3F";
          const color = focused ? activeColor : inactiveColor;

          return (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                marginTop: focused ? -1.2 : 0,
              }}
            >
              {focused && (
                <View
                  style={{
                    position: "absolute",
                    top: -12.5,
                    width: "100%",
                    height: 3,
                    backgroundColor: activeColor,
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                  }}
                />
              )}
              <Ionicons name={iconName} size={22} color={color} />
              <Text
                style={{
                  color,
                  fontSize: 11.5,
                  fontWeight: focused ? "700" : "500",
                  marginTop: 2,
                }}
              >
                {label}
              </Text>
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Ubicación" component={TrackingScreen} />
      <Tab.Screen name="Pedidos" component={MisPedidosScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      {/* 🟩 Tabs principales */}
      <Stack.Screen
        name="Tabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />

      {/* 🟧 Pantalla secundaria (fuera del tab bar) */}
      <Stack.Screen
        name="Carrito"
        component={CarritoScreen}
        options={{
          headerShown: false,
          presentation: "card", // o "modal" si quieres que suba desde abajo
        }}
      />
    </Stack.Navigator>
  );
}
