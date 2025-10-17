
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// 🔹 Función que devuelve color e ícono según estado
function getStatusConfig(estado) {
  switch (estado.toLowerCase()) {
    case "entregado":
      return { bg: "#D1F0D1", text: "#2E8B57", icon: "checkmark-circle" };
    case "pendiente":
      return { bg: "#FFF5CC", text: "#C8A100", icon: "time-outline" };
    case "en camino":
      return { bg: "#CDE8FF", text: "#1E6F73", icon: "car-outline" };
    case "preparando":
      return { bg: "#FFE5B4", text: "#E67E22", icon: "flame-outline" };
    case "cancelado":
      return { bg: "#F8D7DA", text: "#C0392B", icon: "close-circle" };
    default:
      return { bg: "#EEE", text: "#555", icon: "help-circle-outline" };
  }
}

export default function PedidoCard({ pedido }) {
  const { bg, text, icon } = getStatusConfig(pedido.estado);

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        {/* === Columna izquierda === */}
        <View style={styles.leftColumn}>
          {/* 🔹 Píldora dinámica con ícono */}
          <View style={[styles.statusPill, { backgroundColor: bg }]}>
            <Ionicons name={icon} size={14} color={text} style={{ marginRight: 4 }} />
            <Text style={[styles.statusText, { color: text }]}>
              {pedido.estado}
            </Text>
          </View>

          <Text style={styles.productos}>{pedido.productos} productos</Text>
          <Text style={styles.fecha}>
            <Ionicons name="time-outline" size={13} color="#555" /> {pedido.fecha}, {pedido.hora}
          </Text>
          <Text style={styles.total}>Bs. {pedido.total.toFixed(2)}</Text>
        </View>

        {/* === Columna derecha === */}
        <View style={styles.rightColumn}>
          <Text style={styles.pedidoId}>{pedido.numero}</Text>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.btnRepetir}>
              <Ionicons name="refresh" size={16} color="#1E6F73" />
              <Text style={styles.btnText}>Repetir</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnEliminar}>
              <Ionicons name="trash" size={16} color="#E74C3C" />
            </TouchableOpacity>

          </View>
          <Text style={styles.verMas}>Ver más</Text>
        </View>
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
    marginHorizontal: 1,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  leftColumn: {
    flex: 2,
  },
  rightColumn: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  statusPill: {
    flexDirection: "row", // 🔹 Ícono + texto lado a lado
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
    textTransform: "capitalize",
    flexShrink: 1,
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
  pedidoId: {
    color: "#555",
    fontWeight: "600",
    fontSize: 13,
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  btnRepetir: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF6F6",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  btnEliminar: {
    backgroundColor: "#E74C3C",
    borderRadius: 8,
    padding: 6,
  },
  btnEliminar: {
    borderWidth: 1.5,
    borderColor: "#E74C3C",
    borderRadius: 6,
    padding: 4,
  },
  btnText: {
    color: "#1E6F73",
    fontWeight: "bold",
    fontSize: 12.5,
    marginLeft: 4,
  },
  verMas: {
  position: "absolute", // 🔹 activa el posicionamiento manual
  bottom: -50,           // 🔹 distancia desde el borde inferior
  right: 16,            // 🔹 distancia desde el borde derecho
  color: "#1E6F73",
  fontSize: 12.5,
  textDecorationLine: "underline",
},


});
