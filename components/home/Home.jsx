// components/home/Home.jsx
import { ScrollView, StyleSheet, View } from "react-native";
import ProductList from "../productos/ProductList";
import Banner from "./Banner";
import CategoryList from "./CategoryList";
import SearchBar from "./SearchBar";

// 👇 Cambia esta línea
// import Header from "./Header";
import Header from "../common/Header"; // ✅ Header global y reutilizable

export default function Home({
  nombre,
  categorias,
  productos,
}) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* 🔹 Header global */}
        <Header nombre={nombre} showCart showBell />

        {/* 🔹 Barra de búsqueda */}
        <SearchBar />

        {/* 🔹 Banner de promociones */}
        <Banner />

        {/* 🔹 Lista de categorías */}
        <CategoryList categorias={categorias} />

        {/* 🔹 Productos recomendados */}
        <ProductList productos={productos} modo="home" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  scroll: {
    flex: 1,
    paddingBottom: 80,
  },
  btnPedidos: {
    backgroundColor: "#1E6F73",
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 30,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
