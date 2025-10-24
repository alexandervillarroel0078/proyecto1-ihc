// components/carrito/CarritoHeader.jsx
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CarritoHeader({ totalItems = 0, onVaciar }) {
  return (
    <View style={styles.header}>
      {/* 🛒 Título e ícono */}
      <View style={styles.left}>
        <Ionicons name="cart-outline" size={26} color="#1E6F73" />
        <Text style={styles.title}>Carrito</Text>
        {totalItems > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{totalItems}</Text>
          </View>
        )}
      </View>

      {/* 🧹 Botón de vaciar */}
      {totalItems > 0 && (
        <TouchableOpacity onPress={onVaciar} style={styles.clearBtn}>
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <Text style={styles.clearText}>Vaciar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F1F5F4",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#D8E2E1",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E6F73",
    marginLeft: 6,
  },
  badge: {
    backgroundColor: "#E63946",
    borderRadius: 10,
    marginLeft: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  clearBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E6F73",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  clearText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 4,
  },
});
