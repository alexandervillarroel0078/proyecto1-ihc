import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import Header from "../components/home/Header"; // ✅ reutilizado

export default function TrackingScreen() {
  // 📍 Coordenadas fijas (simulación)
  const origin = { latitude: -17.7833, longitude: -63.1821 }; // Plaza 24 de Septiembre
  const destination = { latitude: -17.7868, longitude: -63.1765 }; // Mercado Los Pozitos

  // 🛣️ Ruta simulada
  const routeCoords = [
    origin,
    { latitude: -17.7842, longitude: -63.1815 },
    { latitude: -17.7852, longitude: -63.1790 },
    { latitude: -17.7860, longitude: -63.1775 },
    destination,
  ];

  // 🕒 Estado dinámico
  const [status, setStatus] = useState("En preparación...");
  const [headerColor, setHeaderColor] = useState("#fff");

  // 🕓 A los 10 seg cambia a “En camino”
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("En camino 🚗");
      setHeaderColor("#fff");
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* 🔹 Barra superior dinámica */}
      <Header mensaje={status} colorFondo={headerColor} />

      {/* 🔹 Info extra (puedes quitar si no la necesitas) */}
      <View style={styles.timeBox}>
        <Text style={styles.timeText}>Tiempo estimado de llegada: 30:00 min</Text>
      </View>

      {/* 🔹 Mapa con ruta */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -17.7845,
          longitude: -63.1805,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* 📍 Origen */}
        <Marker coordinate={origin} title="Restaurante" pinColor="green" />

        {/* 🎯 Destino */}
        <Marker coordinate={destination} title="Cliente" pinColor="red" />

        {/* 🛣️ Ruta */}
        <Polyline coordinates={routeCoords} strokeWidth={5} strokeColor="#1E6F73" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f6f6" },

  timeBox: {
    backgroundColor: "#E5EAF3",
    alignItems: "center",
    paddingVertical: 8,
  },
  timeText: {
    color: "#013A3F",
    fontWeight: "600",
    fontSize: 13,
  },

  map: {
    flex: 1,
    width: "100%",
  },
});
