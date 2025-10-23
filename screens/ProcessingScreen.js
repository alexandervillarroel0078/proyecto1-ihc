// screens/ProcessingScreen.js
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { ActivityIndicator, Animated, StyleSheet, Text, View } from "react-native";

export default function ProcessingScreen({ route }) {
  const navigation = useNavigation();
  const { pedidoId, cliente, monto } = route.params ?? {};

  // Animación de "latido" del texto
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulseAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.1, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    );
    pulseAnim.start();

    const timer = setTimeout(() => {
      navigation.replace("PagoExitoso", { pedidoId, cliente, monto });
    }, 3000);

    return () => {
      pulseAnim.stop();
      clearTimeout(timer);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ActivityIndicator size="large" color="#1E6F73" />
        <Animated.Text style={[styles.text, { transform: [{ scale: pulse }] }]}>
          Procesando tu pago...
        </Animated.Text>
        <Text style={styles.subtext}>Por favor, no cierres la aplicación</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF7F8",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 40,
    paddingHorizontal: 25,
    alignItems: "center",
    width: "80%",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  text: {
    marginTop: 25,
    fontSize: 18,
    color: "#1E6F73",
    fontWeight: "700",
  },
  subtext: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
});
