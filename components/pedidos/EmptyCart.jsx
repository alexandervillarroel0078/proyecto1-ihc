import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EmptyCart({ onPressHome }) {
  return (
    <View style={styles.container}>
      <Ionicons name="cart-outline" size={80} color="#1E6F73" style={styles.icon} />

      <Text style={styles.title}>No tienes pedidos aún</Text>
      <Text style={styles.subtitle}>
        Parece que todavía no realizaste ningún pedido.  
        ¡Explora productos y haz tu primera compra!
      </Text>

      <TouchableOpacity style={styles.button} onPress={onPressHome}>
        <Text style={styles.buttonText}>Ir a comprar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    marginTop: 60,
  },
  icon: {
    marginBottom: 15,
    opacity: 0.8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E6F73",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FAA700",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
