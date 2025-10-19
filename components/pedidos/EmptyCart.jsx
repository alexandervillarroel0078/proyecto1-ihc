import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function EmptyCart() {
  return (
    <View style={styles.container}>
      <Ionicons name="cart-outline" size={120} color="#DADADA" />
      <Text style={styles.text}>No tienes pedidos aún</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  text: {
    fontSize: 16,
    color: "#999",
    marginTop: 10,
  },
});
