import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PedidoCard({ pedido }) {
  return (
    <View style={styles.card}>
      {/* === HEADER === */}
      <View style={styles.header}>
        <View style={styles.statusPill}>
          <Text style={styles.statusText}>{pedido.estado}</Text>
        </View>
        <Text style={styles.pedidoId}>Pedido #{pedido.id}</Text>
      </View>

      {/* === CONTENIDO PRINCIPAL === */}
      <View style={styles.content}>
        <Image source={pedido.imagen} style={styles.imagen} />

        <View style={styles.details}>
          <Text style={styles.productos}>{pedido.productos} productos</Text>
          <Text style={styles.fecha}>
            <Ionicons name="time-outline" size={13} color="#555" />{" "}
            {pedido.fecha}, {pedido.hora}
          </Text>
          <Text style={styles.total}>Bs. {pedido.total.toFixed(2)}</Text>
        </View>
      </View>

      {/* === BOTONES === */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.btnRepetir}>
          <Ionicons name="refresh" size={16} color="#1E6F73" />
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
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  statusPill: {
    backgroundColor: "#D1F0D1",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  statusText: {
    color: "#2E8B57",
    fontSize: 12,
    fontWeight: "600",
  },
  pedidoId: {
    color: "#555",
    fontWeight: "600",
    fontSize: 13,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  imagen: {
    width: 45,
    height: 45,
    borderRadius: 8,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  productos: {
    color: "#333",
    fontSize: 13,
    fontWeight: "500",
  },
  fecha: {
    color: "#777",
    fontSize: 12,
    marginVertical: 2,
  },
  total: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 14,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 8,
  },
  btnRepetir: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF6F6",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  btnEliminar: {
    backgroundColor: "#E74C3C",
    borderRadius: 8,
    padding: 6,
  },
  btnText: {
    color: "#1E6F73",
    fontWeight: "bold",
    fontSize: 13,
    marginLeft: 5,
  },
});
