import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

export default function TrackingScreen({navigation }) {
  const origin = { latitude: -17.7833, longitude: -63.1821 }; // ejemplo: Mercado Los Pocitos
  const destination = { latitude: -17.7885, longitude: -63.181 }; // ejemplo: Parque Autonómico
  const routeCoords = [
    origin,
    { latitude: -17.7845, longitude: -63.1815 },
    { latitude: -17.786, longitude: -63.1818 },
    destination,
  ];
  const handleLocation = () => {
    
    navigation.navigate('Tracking');
  };

  return (
    <View style={styles.container}>
      {/* 🔹 Header */}
      <View style={styles.header}>
        <Ionicons name="notifications-outline" size={22} color="#fff" />
        <Text style={styles.headerTitle}>Tiempo estimado de llegada: 30 min</Text>
        <Ionicons name="cart-outline" size={22} color="#fff" />
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>En preparación...</Text>
      </View>

      {/* 🔹 Mapa */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -17.785,
          longitude: -63.182,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={origin} title="Restaurante" />
        <Marker coordinate={destination} title="Destino" />
        <Polyline coordinates={routeCoords} strokeWidth={4} strokeColor="#1E6F73" />
      </MapView>

      {/* 🔹 Barra inferior */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#fff" />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={handleLocation}>
            <Ionicons name="locate-sharp" size={24} color="#fff" />
            <Text style={styles.navText}>Ubicación</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="cart" size={24} color="#fff" />
          <Text style={styles.navText}>Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color="#fff" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f6f6" },

  header: {
    backgroundColor: "#1E6F73",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  headerTitle: { color: "#fff", fontSize: 14, fontWeight: "600" },

  statusContainer: {
    backgroundColor: "#E5EAF3",
    alignItems: "center",
    paddingVertical: 10,
  },
  statusText: {
    color: "#1E6F73",
    fontWeight: "600",
  },

  map: {
    flex: 1,
    width: "100%",
  },

  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1E6F73",
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navItem: { alignItems: "center" },
  navText: { color: "#fff", fontSize: 12, marginTop: 2 },
});
