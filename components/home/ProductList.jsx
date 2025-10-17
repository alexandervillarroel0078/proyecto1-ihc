import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProductList({ productos }) {
  return (
    <View style={styles.container}>
      {/* 🔹 Encabezado de sección */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recomendados</Text>
        <Text style={styles.sectionLink}>ver más</Text>
      </View>

      {/* 🔹 Lista horizontal de productos */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}
      >
        {productos.map((p, i) => (
          <View key={i} style={styles.productCard}>
            <TouchableOpacity onPress={() => console.log("Detalle de:", p.nombre)}>
              <Image source={p.img} style={styles.productImg} />
              {p.nuevo && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Nuevo</Text>
                </View>
              )}
            </TouchableOpacity>

            <Text style={styles.productName}>{p.nombre}</Text>
            <Text style={styles.productPrice}>Bs. {p.precio}</Text>

            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => console.log("Agregado al carrito:", p.nombre)}
            >
              <Text style={styles.addText}>agregar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F8F9",
    paddingTop: 10,
    paddingBottom: 0,
  },
  scroll: {
    backgroundColor: "#F7F8F9",
    paddingBottom: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    marginBottom: 10,
  },
  sectionTitle: { color: "#1E6F73", fontWeight: "bold", fontSize: 17 },
  sectionLink: { color: "#f28c56", fontSize: 13, fontWeight: "600" },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: "center",
    marginLeft: 10,
    width: 130,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  productImg: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  productName: {
    fontWeight: "bold",
    marginTop: 6,
    fontSize: 13,
    color: "#333",
    textAlign: "center",
  },
  productPrice: {
    color: "#000",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
  },
  addBtn: {
    backgroundColor: "#1E6F73",
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  addText: { color: "#fff", fontSize: 13, fontWeight: "bold" },

  badge: {
    position: "absolute",
    top: 4,
    left: 4,
    backgroundColor: "#FAA700",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
