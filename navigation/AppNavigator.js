import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import PaymentScreen from "../screens/PaymentScreen";
import PedidosScreen from "../screens/PedidosScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            height: 68,
            borderTopWidth: 1.2, // línea gris envolvente
            borderTopColor: "#DADADA",
            paddingTop: 12.5, // espacio aire arriba
            elevation: 6,
          },
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            let iconName, label;
            if (route.name === "Inicio") {
              iconName = focused ? "home" : "home-outline";
              label = "Inicio";
            } else if (route.name === "Ubicación") {
              iconName = focused ? "locate" : "locate-outline";
              label = "Ubicación";
            } else if (route.name === "Pedidos") {
              iconName = focused ? "list" : "list-outline";
              label = "Pedidos";
            } else if (route.name === "Perfil") {
              iconName = focused ? "person" : "person-outline";
              label = "Perfil";
            }

            // ✅ Color activo e inactivo
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
                {/* 🔹 Línea verde activa */}
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

                {/* 🔹 Ícono */}
                <Ionicons name={iconName} size={22} color={color} />

                {/* 🔹 Texto debajo del ícono */}
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
        <Tab.Screen name="Ubicación" component={PaymentScreen} />
        <Tab.Screen name="Pedidos" component={PedidosScreen} />
        <Tab.Screen name="Perfil" component={ProfileScreen} />
        
      </Tab.Navigator>
  );
}

{/*
  <Tab.Screen name="Pago"component={PaymentScreen}
          options={{ tabBarButton: () => null }}
        />
  
  navigation.navigate("Pago", {
  pedidoId: pedido.id ?? 123,
  cliente: user?.nombre ?? "Invitado",
  monto: pedido.total ?? 50.00,
});
 */}
