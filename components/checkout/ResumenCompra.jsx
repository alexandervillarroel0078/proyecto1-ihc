
// components/checkout/ResumenCompra.jsx
import { StyleSheet, Text, View } from "react-native";

export default function ResumenCompra({ productos }) {
  if (!productos || productos.length === 0)
    return (
      <View style={styles.box}>
        <Text style={styles.title}>📦 RESUMEN DE COMPRA</Text>
        <Text>No hay productos en el pedido</Text>
      </View>
    );

  const subtotal = productos.reduce((sum, p) => sum + (p.precioUnitario * p.cantidad), 0);
  const envio = subtotal > 300 ? 0 : 20;
  const impuestos = subtotal * 0.13;
  const total = subtotal + envio + impuestos;

  return (
    <View style={styles.box}>
      <Text style={styles.title}>📦 RESUMEN DE COMPRA</Text>

      {/* Lista de productos */}
      {productos.map((p) => (
        <View key={p.id} style={styles.row}>
          <Text>{p.nombre} (x{p.cantidad})</Text>
          <Text>Bs. {(p.precioUnitario * p.cantidad).toFixed(2)}</Text>
        </View>
      ))}

      <View style={styles.separator} />

      {/* Totales */}
      <View style={styles.row}><Text>Subtotal</Text><Text>Bs. {subtotal.toFixed(2)}</Text></View>
      <View style={styles.row}><Text>Envío</Text><Text>Bs. {envio.toFixed(2)}</Text></View>
      <View style={styles.row}><Text>Impuestos (13%)</Text><Text>Bs. {impuestos.toFixed(2)}</Text></View>

      <View style={styles.separator} />
      <View style={[styles.row, { marginTop: 4 }]}>
        <Text style={{ fontWeight: "bold" }}>TOTAL</Text>
        <Text style={{ fontWeight: "bold" }}>Bs. {total.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  title: {
    color: "#A85B2D",
    fontWeight: "700",
    marginBottom: 8,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 6,
  },
});
