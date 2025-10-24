import { ScrollView, StyleSheet, Text, View } from "react-native";
import EmptyCart from "../components/pedidos/EmptyCart";
import FiltrosPedidos from "../components/pedidos/FiltrosPedidos";
import PedidosList from "../components/pedidos/PedidosList";
import pedidosData from "../data/pedidos.json"; // 👈 ahora tomamos datos desde JSON

export default function PedidosScreen() {
  const pedidos = pedidosData; // 🔹 simulamos datos importados

  return (
    <View style={styles.container}>
      {/* 🔹 Título principal */}
      <Text style={styles.title}>Mis pedidos</Text>

      {/* 🔹 Barra de filtros */}
      <FiltrosPedidos />

      {/* 🔹 Lista de pedidos o carrito vacío */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {pedidos.length > 0 ? (
          <PedidosList pedidos={pedidos} />
        ) : (
          <EmptyCart />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 45,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E6F73",
    marginBottom: 12,
    letterSpacing: 0.3,
  },
});
