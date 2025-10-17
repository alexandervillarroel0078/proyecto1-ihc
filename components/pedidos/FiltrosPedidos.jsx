// components/pedidos/FiltrosPedidos.jsx
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

const filtros = ["descuentos", "rango de precio", "cancelados", "periodos"];

export default function FiltrosPedidos() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.container}
    >
      {filtros.map((f, i) => (
        <TouchableOpacity key={i} style={styles.chip}>
          <Text style={styles.text}>{f}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { marginVertical: 8 },
  container: { paddingHorizontal: 10, gap: 8 },
  chip: {
    backgroundColor: "#1E6F73",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  text: { color: "#fff", fontWeight: "600", fontSize: 13 },
});
