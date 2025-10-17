// screens/PedidosScreen.js
import { ScrollView, StyleSheet, Text, View } from "react-native";
import EmptyCart from "../components/pedidos/EmptyCart";
import FiltrosPedidos from "../components/pedidos/FiltrosPedidos";
import PedidoCard from "../components/pedidos/PedidoCard";

export default function PedidosScreen() {
  // 🔹 simulación visual (tres pedidos)
  const pedidos = [
    { id: 1, fecha: "Lun 6 de Oct.", hora: "12:17 PM", productos: 3, total: 99.99 },
    { id: 2, fecha: "Mar 7 de Oct.", hora: "5:42 PM", productos: 2, total: 79.49 },
    { id: 3, fecha: "Jue 9 de Oct.", hora: "9:05 AM", productos: 5, total: 149.9 },
  ];

  return (
    <View style={styles.container}>
      {/* 🔹 Título principal */}
      <Text style={styles.title}>Mis pedidos</Text>

      {/* 🔹 Filtros horizontales */}
      <FiltrosPedidos />

      {/* 🔹 Lista de pedidos */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {pedidos.length > 0 ? (
          pedidos.map((p) => <PedidoCard key={p.id} pedido={p} />)
        ) : (
          <EmptyCart /> // si quisieras simular vacío, pon pedidos = []
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E6F73",
    marginBottom: 15,
  },
  scroll: {
    marginBottom: 80, // espacio para la tabbar
  },
});
