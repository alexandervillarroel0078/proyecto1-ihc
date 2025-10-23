// components/carrito/CarritoResumen.jsx
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CarritoResumen({ productos }) {
  const navigation = useNavigation();

  console.log("🧾 Renderizando <CarritoResumen /> con productos:", productos.length);

  // 🔹 Calcular total general
  const total = productos.reduce((sum, p) => {
    const precio = Number(p.precio) || 0;
    const cantidad = Number(p.cantidad) || 1;
    const subtotal = precio * cantidad;
    console.log(
      `➡️ Producto: ${p.nombre} | Precio: ${precio} | Cantidad: ${cantidad} | Subtotal: ${subtotal}`
    );
    return sum + subtotal;
  }, 0);

  console.log("💰 Total calculado del carrito:", total.toFixed(2));

  // 🔹 Acción al presionar pagar
  const handlePagar = () => {
    console.log("🟢 Botón 'Pagar' presionado");

    if (productos.length === 0) {
      console.log("⚠️ No hay productos en el carrito, no se puede proceder al pago");
      return;
    }

    console.log("✅ Procediendo con navegación a ConfirmarPedidoScreen...");
    console.log("📦 Enviando productos:", productos.map((p) => p.nombre).join(", "));
    console.log("💳 Total a pagar:", total);

    navigation.navigate("ConfirmarPedido", {
      productos: productos.map(p => ({
        id: p.id,
        nombre: p.nombre,
        precioUnitario: Number(p.precio),
        cantidad: p.cantidad,
        subtotal: Number(p.precio) * (p.cantidad || 1),
      })),
      total,
    });

  };

  return (
    <View style={styles.fixedContainer}>
      <View style={styles.container}>
        <View style={styles.totalBox}>
          <Text style={styles.totalInline}>
            Total: <Text style={styles.totalAmount}>Bs. {total.toFixed(2)}</Text>
          </Text>
        </View>


        <TouchableOpacity style={styles.payButton} onPress={handlePagar}>
          <Text style={styles.payText}>Pagar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fixedContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#F7B48A",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 2,
    borderColor: "#E9A775",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: -3 },
    zIndex: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalBox: {
    flexDirection: "column",
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
    color: "#000",
    opacity: 0.8,
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#000",
    marginTop: 2,
  },
  payButton: {
    backgroundColor: "#1E6F73",
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 12,
    shadowColor: "#1E6F73",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 5,
  },

  payText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  totalInline: {
    fontSize: 17,
    color: "#000",
    fontWeight: "600",
  },

  totalAmount: {
    fontSize: 18,
    color: "#000000ff",
    fontWeight: "bold",
  },

});
