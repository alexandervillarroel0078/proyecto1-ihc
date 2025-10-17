// components/home/CategoryList.jsx
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CategoryList({ categorias }) {
  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>CATEGORÍAS</Text>
        <Text style={styles.sectionLink}>ver más</Text>
      </View>

      <View style={styles.categoryContainer}>
        {categorias.map((c, i) => (
          <TouchableOpacity key={i} style={[styles.categoryBox, { backgroundColor: c.color }]}>
            <Image source={c.icon} style={styles.categoryIcon} />
            <Text style={styles.categoryText}>{c.nombre}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginBottom: 5,
  },
  sectionTitle: { color: "#1E6F73", fontWeight: "bold", fontSize: 16 },
  sectionLink: { color: "#f28c56", fontSize: 12 },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  categoryBox: {
    width: 70,
    height: 70,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryIcon: { width: 32, height: 32, marginBottom: 5 },
  categoryText: { fontSize: 12, fontWeight: "600", color: "#333" },
});
