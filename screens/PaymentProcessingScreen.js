import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function PaymentProcessingScreen({ route }) {
  const navigation = useNavigation();
  const { pedidoId, cliente, monto } = route.params ?? {};

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("PagoExitoso", { pedidoId, cliente, monto }); // 👈 reemplaza a PaymentScreen
    }, 3000); // 3 segundos
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1E6F73" />
      <Text style={styles.text}>Procesando tu pago...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
});
