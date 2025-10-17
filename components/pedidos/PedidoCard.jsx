// components/pedidos/PedidoCard.jsx
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PedidoCard({ pedido }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.pedidoId}>Pedido #{pedido.id}</Text>
        <Text style={styles.fecha}>{pedido.fecha}</Text>
      </View>

      <Text style={styles.subText}>Entregado • {pedido.hora}</Text>
      <Text style={styles.subText}>{pedido.productos} productos</Text>
      <Text style={styles.total}>TOTAL Bs. {pedido.total}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.btnRepetir}>
          <Ionicons name="refresh" size={18} color="#1E6F73" />
          <Text style={styles.btnText}>Repetir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnEliminar}>
          <Ionicons name="trash" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 6,
    padding: 12,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pedidoId: { color: "#f28c56", fontWeight: "bold" },
  fecha: { color: "#777", fontSize: 12 },
  subText: { color: "#555", fontSize: 13 },
  total: { color: "#000", fontWeight: "bold", marginTop: 4 },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 8,
  },
  btnRepetir: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fcebd9",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  btnEliminar: {
    backgroundColor: "#E74C3C",
    borderRadius: 8,
    padding: 6,
  },
  btnText: { color: "#1E6F73", marginLeft: 4, fontWeight: "bold" },
});
