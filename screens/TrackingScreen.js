import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

export default function TrackingScreen() {
  const origin = { latitude: -17.7843, longitude: -63.1831 }; // 📍 punto fijo (ejemplo)
  const [destination, setDestination] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);

  // Cargar destino guardado si existe
  useEffect(() => {
    const loadSavedDestination = async () => {
      const saved = await AsyncStorage.getItem("lastDestination");
      if (saved) {
        const dest = JSON.parse(saved);
        setDestination(dest);
        getRoute(origin, dest);
      }
    };
    loadSavedDestination();
  }, []);

  // Función para obtener la ruta usando OSRM
  const getRoute = async (origin, dest) => {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${dest.longitude},${dest.latitude}?overview=full&geometries=geojson`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        const coords = data.routes[0].geometry.coordinates.map(([lon, lat]) => ({
          latitude: lat,
          longitude: lon,
        }));
        setRouteCoords(coords);
      } else {
        Alert.alert("Error", "No se encontró una ruta disponible.");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo calcular la ruta.");
      console.error(error);
    }
  };

  // Cuando el usuario toca el mapa
  const handleMapPress = async (e) => {
    const newDest = e.nativeEvent.coordinate;
    setDestination(newDest);
    await AsyncStorage.setItem("lastDestination", JSON.stringify(newDest));
    getRoute(origin, newDest);
  };

  return (
    <View style={styles.container}>
      {/* 🔹 Header */}
      <View style={styles.header}>
        <Ionicons name="notifications-outline" size={22} color="#fff" />
        <Text style={styles.headerTitle}>Selecciona tu destino 🗺️</Text>
        <Ionicons name="cart-outline" size={22} color="#fff" />
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          {destination ? "Ruta generada ✔️" : "Toca el mapa para seleccionar destino"}
        </Text>
      </View>

      {/* 🔹 Mapa */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={handleMapPress}
      >
        {/* 📍 Origen fijo */}
        <Marker coordinate={origin} title="Restaurante (Origen)" pinColor="green" />

        {/* 🎯 Destino seleccionado */}
        {destination && <Marker coordinate={destination} title="Tu destino" pinColor="red" />}

        {/* 🛣️ Ruta calculada */}
        {routeCoords.length > 0 && (
          <Polyline coordinates={routeCoords} strokeWidth={4} strokeColor="#1E6F73" />
        )}
      </MapView>
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
});
