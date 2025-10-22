// components/carrito/CarritoResumen.jsx
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CarritoResumen({ productos }) {
  // 🔹 Calcular total general
  const total = productos.reduce((sum, p) => {
    const precio = Number(p.precio) || 0;
    const cantidad = Number(p.cantidad) || 1;
    return sum + precio * cantidad;
  }, 0);

  const handlePagar = () => {
    console.log("Ir al pago 💳");
    // Aquí podrías navegar a otra pantalla o procesar el pago
  };

  return (
    <View style={styles.fixedContainer}>
      <View style={styles.container}>
        <Text style={styles.totalText}>
          <Text style={styles.label}>Total </Text>
          Bs. {total.toFixed(2)}
        </Text>

        <TouchableOpacity style={styles.payButton} onPress={handlePagar}>
          <Text style={styles.payText}>boton de pagar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fixedContainer: {
    position: "absolute",
    bottom: 0, // 🔹 Siempre visible al fondo
    left: 0,
    right: 0,
    backgroundColor: "#F7B48A", // color durazno como en tu captura
    paddingVertical: 8,
    elevation: 10, // sombra en Android
    shadowColor: "#000", // sombra en iOS
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: -2 },
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
  },
  label: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#000",
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#000",
  },
  payButton: {
    backgroundColor: "#1E6F73", // verde oscuro del tema
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  payText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    textTransform: "capitalize",
  },
});
