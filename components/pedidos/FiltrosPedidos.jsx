import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const filtros = ["descuentos", "rango de precio", "cancelados", "periodos"];

export default function FiltrosPedidos() {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {filtros.map((f, i) => (
          <TouchableOpacity key={i} style={styles.chip}>
            <Text style={styles.text}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 5,
    marginBottom: 10,
  },
  container: {
    paddingHorizontal: 10,
    gap: 8,
  },
  chip: {
    backgroundColor: "#1E6F73",
    borderRadius: 16,       // ✅ más plano
    paddingHorizontal: 10,  // ✅ menos ancho
    paddingVertical: 4,     // ✅ más bajo
    minHeight: 28,          // ✅ altura equilibrada
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
    textTransform: "lowercase", // igual que tu diseño
  },
});
