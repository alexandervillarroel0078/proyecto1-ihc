import { ScrollView, StyleSheet, View } from "react-native";
import Banner from "./Banner";
import CategoryList from "./CategoryList";
import Header from "./Header";
import ProductList from "./ProductList";
import SearchBar from "./SearchBar";

export default function Home({
  nombre,
  categorias,
  productos,
  onLocationPress,
  onPedidosPress, // ✅ agregamos esta prop
}) {
  return (
    <View style={styles.container}>
      {/* 🔹 Contenido desplazable */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Header nombre={nombre} />
        <SearchBar />
        <Banner />
        <CategoryList categorias={categorias} />
        <ProductList productos={productos} />

        {/* 🔹 Botón para navegar a Pedidos */}
        {/* <TouchableOpacity
          style={styles.btnPedidos}
          onPress={onPedidosPress} // ✅ llama a la función pasada desde HomeScreen
        >
          <Text style={styles.btnText}>🛒 Ver pedidos</Text>
        </TouchableOpacity> */}
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
    paddingBottom: 80, // deja espacio para la navbar
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
