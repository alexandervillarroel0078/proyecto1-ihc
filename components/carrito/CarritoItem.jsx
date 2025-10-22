// components/carrito/CarritoItem.jsx
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CarritoItem({ producto, onEliminar }) {
  const [cantidad, setCantidad] = useState(1);

  const incrementar = () => setCantidad((c) => c + 1);
  const decrementar = () => setCantidad((c) => (c > 1 ? c - 1 : 1));

  // ✅ Convertir el precio a número para evitar errores
  const precioUnitario = Number(producto.precio) || 0;
  const total = (precioUnitario * cantidad).toFixed(2);

  return (
    <View style={styles.item}>
      <Image source={producto.img} style={styles.img} />

      <View style={styles.info}>
        <Text style={styles.nombre}>{producto.nombre}</Text>
        <Text style={styles.precio}>
          Precio unitario: Bs. {precioUnitario.toFixed(2)}
        </Text>
        <Text style={styles.total}>Total: Bs. {total}</Text>
      </View>

      <View style={styles.controls}>
        <Text style={styles.label}>Cantidad</Text>

        <View style={styles.qtyBox}>
          <TouchableOpacity style={styles.qtyBtn} onPress={decrementar}>
            <Ionicons name="remove" size={16} color="#1E6F73" />
          </TouchableOpacity>

          <Text style={styles.qtyText}>{cantidad}</Text>

          <TouchableOpacity style={styles.qtyBtn} onPress={incrementar}>
            <Ionicons name="add" size={16} color="#1E6F73" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onEliminar}>
          <Ionicons name="trash-outline" size={22} color="#F28C56" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#E6E6E6",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  img: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 8,
  },
  info: {
    flex: 1,
  },
  nombre: {
    color: "#BF4B21",
    fontWeight: "bold",
    fontSize: 13,
  },
  precio: {
    color: "#444",
    fontSize: 12,
  },
  total: {
    color: "#111",
    fontWeight: "600",
    marginTop: 3,
  },
  controls: {
    alignItems: "center",
  },
  label: {
    fontSize: 11,
    color: "#BF4B21",
    fontWeight: "bold",
  },
  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 5,
    marginVertical: 5,
  },
  qtyBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  qtyText: {
    marginHorizontal: 8,
    fontWeight: "bold",
  },
});
