// components/productos/ProductList.jsx
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function ProductList({ productos, modo = "home", onAgregar }) {
  const navigation = useNavigation();

  const handleAgregar = (producto) => {
    if (modo === "carrito") {
      onAgregar?.(producto);
      Toast.show({
        type: "success",
        text1: "Producto agregado 🛒",
        visibilityTime: 1200,
      });
    } else {
      navigation.navigate("Carrito", { producto, agregarDirecto: true });
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔹 Encabezado */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recomendados</Text>
        <TouchableOpacity
          onPress={() => console.log("Ver más productos")}
          style={styles.sectionLinkWrapper}
          activeOpacity={0.7}
        >
          <Text style={styles.sectionLink}>ver más</Text>
          <View style={styles.sectionLinkLine} />
        </TouchableOpacity>


      </View>

      {/* 🔹 Lista horizontal */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}
      >
        {productos.map((p, i) => (
          <Pressable
            key={i}
            style={({ pressed }) => [
              styles.productCard,
              pressed && styles.cardPressed, // efecto flotante
            ]}
          >
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
              onPress={() => handleAgregar(p)}
            >
              <Text style={styles.addText}>
                {modo === "carrito" ? "Añadir" : "Agregar"}
              </Text>
            </TouchableOpacity>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionLinkWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  sectionLink: {
    color: "#f28c56",
    fontSize: 13,
    fontWeight: "600",
    textTransform: "lowercase",
  },
  sectionLinkLine: {
    marginTop: 0.0001,
    width: "90%", // ancho relativo al texto
    height: 1.2,
    backgroundColor: "#f28c56",
    borderRadius: 2,
  },

  container: {
    backgroundColor: "#F7F8F9",
    paddingTop: 10,
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
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginLeft: 10,
    width: 130,
    height: 220,
    borderWidth: 1,
    borderColor: "#E0DDDD",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardPressed: {
    transform: [{ scale: 0.96 }],
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  productImg: {
    width: 110,
    height: 110,
    resizeMode: "contain",
    marginBottom: 4,
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
    paddingVertical: 6,
    width: "100%",
    alignItems: "center",
  },
  addText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
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
