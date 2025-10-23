// screens/TrackingScreen.js
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import Header from "../components/common/Header";
import { useUser } from "../navigation/context/UserContext";

export default function RutaScreen() {
  const { user } = useUser();
  const origin = { latitude: -17.7833, longitude: -63.1821 };
  const destination = { latitude: -17.7868, longitude: -63.1765 };
  const routeCoords = [
    origin,
    { latitude: -17.7842, longitude: -63.1815 },
    { latitude: -17.7852, longitude: -63.179 },
    { latitude: -17.786, longitude: -63.1775 },
    destination,
  ];
  const mapRef = useRef(null);

  // 🕓 Estado del pedido
  const [status, setStatus] = useState("🧑‍🍳 Preparando tu pedido...");
  const [position, setPosition] = useState(origin);
  const totalTime = 20;
  const [secondsLeft, setSecondsLeft] = useState(totalTime);
  const [isRunning, setIsRunning] = useState(true);

  // ✨ Animación del borde neón
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(anim, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  // 🔹 Colores del borde según estado
  const neonColors = status.includes("Preparando")
    ? ["#FFD700", "#FF8C00"]
    : status.includes("En camino")
      ? ["#00FFFF", "#00FF99"]
      : ["#2196F3", "#8A2BE2"];

  // 🔁 Reiniciar simulación
  const resetSimulation = () => {
    setStatus("🧑‍🍳 Preparando tu pedido...");
    setPosition(origin);
    setSecondsLeft(totalTime);
    setIsRunning(true);
  };

  // 🔄 Simulación del estado y movimiento del pedido
  useEffect(() => {
    if (!isRunning) return;

    // ⏳ Cambia a “En camino” después de 3 segundos
    const preparingTimer = setTimeout(
      () => setStatus("🚗 En camino hacia tu dirección..."),
      3000
    );

    // 🚴 Movimiento y cuenta regresiva
    const interval = setInterval(() => {
      setSecondsLeft((t) => {
        if (t <= 1) {
          setStatus("✅ Pedido entregado con éxito");
          setIsRunning(false);
          setTimeout(resetSimulation, 6000);
          return 0;
        }

        const newTime = t - 1;
        const progress = 1 - newTime / totalTime;
        const index = Math.floor(progress * (routeCoords.length - 1));
        setPosition(routeCoords[index]);
        return newTime;
      });
    }, 1000);

    return () => {
      clearTimeout(preparingTimer);
      clearInterval(interval);
    };
  }, [isRunning]);
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.animateToRegion(
      {
        latitude: position.latitude,
        longitude: position.longitude,
        latitudeDelta: 0.01, // 🔹 zoom más cercano
        longitudeDelta: 0.01,
      },
      1000 // duración de la animación (ms)
    );
  }, [position]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  // 🎆 Animación para bordes
  const translate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ["-100%", "100%"],
  });

  return (
    <View style={styles.screen}>
      {/* 🟩 Header igual que en todas las pantallas */}
      <Header showCart={true} showBell={true} nombre={user.nombre} />

      {/* 🔹 Texto de estado y tiempo */}
      <View style={styles.infoBox}>

        <Text style={styles.timeText}>
          ⏱ Tiempo estimado: {minutes}:{seconds.toString().padStart(2, "0")} min
        </Text>
      </View>

      {/* 🗺️ Mapa con efecto neón */}
      <View style={styles.mapWrapper}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: -17.7845,
            longitude: -63.1805,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={origin} title="Restaurante" pinColor="green" />
          <Marker coordinate={position} title="Repartidor" description={status}>
            <View style={styles.driverMarker}>
              <Text style={{ color: "#fff", fontSize: 10 }}>🛵</Text>
            </View>
          </Marker>
          <Marker coordinate={destination} title="Cliente" pinColor="red" />
          <Polyline coordinates={routeCoords} strokeWidth={5} strokeColor="#1E6F73" />
        </MapView>

        {/* ✨ Borde neón animado */}
        <View style={styles.borderOverlay} pointerEvents="none">
          {/* Superior */}
          <Animated.View
            style={[styles.borderLine, styles.topLine, { transform: [{ translateX: translate }] }]}
          >
            <LinearGradient
              colors={neonColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.gradient, { opacity: 0.3, blurRadius: 8 }]}
            />
          </Animated.View>

          {/* Inferior */}
          <Animated.View
            style={[styles.borderLine, styles.bottomLine, { transform: [{ translateX: translate }] }]}
          >
            <LinearGradient
              colors={neonColors}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              style={styles.gradient}
            />
          </Animated.View>

          {/* Izquierda */}
          <Animated.View
            style={[styles.borderLine, styles.leftLine, { transform: [{ translateY: translate }] }]}
          >
            <LinearGradient
              colors={neonColors}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={styles.gradient}
            />
          </Animated.View>

          {/* Derecha */}
          <Animated.View
            style={[styles.borderLine, styles.rightLine, { transform: [{ translateY: translate }] }]}
          >
            <LinearGradient
              colors={neonColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.gradient}
            />
          </Animated.View>
        </View>
      </View>

      {/* 🔻 Estado final */}
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000",
  },
  infoBox: {
    backgroundColor: "#E5EAF3",
    alignItems: "center",
    paddingVertical: 8,
  },
  infoText: {
    color: "#013A3F",
    fontWeight: "600",
    fontSize: 14,
  },
  timeText: {
    color: "#555",
    fontSize: 13,
    marginTop: 2,
  },
  mapWrapper: {
    flex: 1,

    borderRadius: 0,
    overflow: "hidden",
    position: "relative",
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
    filter: "saturate(1.2) brightness(1.1)", // mejora el color (en web)
  },

  borderOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  borderLine: {
    position: "absolute",
    height: 4,
    width: "100%",
    shadowColor: "#00FFFF",
    shadowOpacity: 0.8,
    shadowRadius: 12,
    opacity: 0.9,
  },

  gradient: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  topLine: { top: 0 },
  bottomLine: { bottom: 0 },
  leftLine: {
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    height: "100%",
  },
  rightLine: {
    right: 0,
    top: 0,
    bottom: 0,
    width: 4,
    height: "100%",
  },
  driverMarker: {
    backgroundColor: "#1E6F73",
    padding: 6,
    borderRadius: 15,
  },
  statusBar: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  statusText: {
    fontSize: 16,
    color: "#1E6F73",
    fontWeight: "600",
  },
});
