
// components/carrito/CarritoLista.jsx
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, View } from "react-native";
import CarritoItem from "./CarritoItem";

export default function CarritoLista({ productos, onEliminar }) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true} // 🔹 muestra scroll visible
      >
        {productos.length > 0 ? (
          productos.map((p) => (
            <CarritoItem
              key={p.id}
              producto={p}
              onEliminar={() => onEliminar(p.id)}
            />
          ))
        ) : (
          <View style={styles.empty}>
            <Ionicons name="cart-outline" size={130} color="#DADADA" />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 330, // 🔹 cuadro fijo con borde
    borderWidth: 1.5,
    borderColor: "#DADADA",
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  scroll: {
    paddingHorizontal: 10,
  },
  scrollContent: {
    paddingVertical: 10,
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
