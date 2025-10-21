import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Home from "../components/home/Home"; // 🔹 reutiliza la barra superior
import { useUser } from "../navigation/context/UserContext";

export default function CheckoutScreen({ navigation }) {
  const { user } = useUser();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [coupon, setCoupon] = useState("");

  const subtotal = 950.0;
  const envio = 50.99;
  const descuento = 0.0;
  const impuestos = 0.0;
  const total = subtotal - descuento + envio + impuestos;

  const handlePagar = () => {
    navigation.navigate("Ubicación"); // luego irá a PaymentScreen
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* 🔹 Barra superior reutilizada */}
      <Home
        nombre={user?.nombre || "Usuario"}
        categorias={[]}
        productos={[]}
        showOnlyHeader={true}
      />

      <ScrollView style={{ flex: 1, padding: 15 }} showsVerticalScrollIndicator={false}>
        {/* 🔸 Temporizador */}
        <View style={styles.timerBox}>
          <Text style={styles.timerText}>tiempo restante 05:00 min</Text>
        </View>

        {/* 🔸 Métodos de pago */}
        <Text style={styles.sectionTitle}>MÉTODOS DE PAGO</Text>
        <View style={styles.paymentMethods}>
          <TouchableOpacity style={styles.methodCard}>
            <Text style={styles.methodText}>Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.methodCard, styles.methodActive]}>
            <Text style={[styles.methodText, { color: "#fff" }]}>Bank</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.methodCard}>
            <Text style={styles.methodText}>QR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.methodCard}>
            <Text style={styles.methodText}>Wallet</Text>
          </TouchableOpacity>
        </View>

        {/* 🔸 Resumen de compra */}
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>📦 RESUMEN DE COMPRA</Text>
          <View style={styles.row}><Text>Subtotal</Text><Text>Bs. {subtotal.toFixed(2)}</Text></View>
          <View style={styles.row}><Text>Descuento</Text><Text>Bs. {descuento.toFixed(2)}</Text></View>
          <View style={styles.row}><Text>Envío</Text><Text>Bs. {envio.toFixed(2)}</Text></View>
          <View style={styles.row}><Text>Impuestos</Text><Text>Bs. {impuestos.toFixed(2)}</Text></View>
          <View style={styles.separator} />
          <View style={[styles.row, { marginTop: 4 }]}>
            <Text style={{ fontWeight: "bold" }}>Total</Text>
            <Text style={{ fontWeight: "bold" }}>Bs. {total.toFixed(2)}</Text>
          </View>
        </View>

        {/* 🔸 Cupón */}
        <View style={styles.couponBox}>
          <TextInput
            style={styles.input}
            placeholder="¿Tienes un cupón?"
            value={coupon}
            onChangeText={setCoupon}
          />
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyText}>Aplicar</Text>
          </TouchableOpacity>
        </View>

        {/* 🔸 Dirección */}
        <View style={styles.addressBox}>
          <Text style={styles.summaryTitle}>📍 DIRECCIÓN DE ENTREGA</Text>
          <Image
            source={require("../assets/icons/map_placeholder.png")}
            style={{ width: "100%", height: 140, borderRadius: 10, marginTop: 8 }}
            resizeMode="cover"
          />
          <View style={{ marginTop: 10 }}>
            <Text>Fecha prevista: 06 de Octubre de 2025</Text>
            <Text>Hora estimada: 18:30 - 19:00</Text>
          </View>
          <TouchableOpacity style={styles.addSpecBtn}>
            <Text style={styles.addSpecText}>agregar especificaciones</Text>
          </TouchableOpacity>
        </View>

        {/* 🔸 Términos */}
        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setTermsAccepted(!termsAccepted)}
        >
          <View style={[styles.checkbox, termsAccepted && styles.checkboxActive]} />
          <Text style={styles.checkboxText}>Aceptar términos y condiciones</Text>
        </TouchableOpacity>

        {/* 🔸 Total y botón */}
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total Bs. {total.toFixed(2)}</Text>
          <TouchableOpacity
            style={[styles.payButton, !termsAccepted && { opacity: 0.5 }]}
            disabled={!termsAccepted}
            onPress={handlePagar}
          >
            <Text style={styles.payButtonText}>botón de pagar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  timerBox: {
    backgroundColor: "#C93B3B",
    borderRadius: 5,
    paddingVertical: 6,
    alignItems: "center",
    marginBottom: 15,
  },
  timerText: { color: "#fff", fontWeight: "600" },
  sectionTitle: { fontWeight: "bold", color: "#013A3F", marginBottom: 6 },
  paymentMethods: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  methodCard: {
    borderWidth: 1.5,
    borderColor: "#1E6F73",
    borderRadius: 8,
    paddingVertical: 14,
    width: "23%",
    alignItems: "center",
  },
  methodActive: { backgroundColor: "#1E6F73" },
  methodText: { fontWeight: "600", color: "#1E6F73" },
  summaryBox: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  summaryTitle: { color: "#A85B2D", fontWeight: "700", marginBottom: 8 },
  row: { flexDirection: "row", justifyContent: "space-between", marginVertical: 2 },
  separator: { height: 1, backgroundColor: "#ddd", marginVertical: 6 },
  couponBox: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#fff",
  },
  applyButton: {
    backgroundColor: "#FCD5B4",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 6,
  },
  applyText: { fontWeight: "700", color: "#333" },
  addressBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  addSpecBtn: {
    backgroundColor: "#F7B48A",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 12,
  },
  addSpecText: { color: "#013A3F", fontWeight: "700", textTransform: "lowercase" },
  checkboxRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: "#1E6F73",
    borderRadius: 3,
    marginRight: 10,
  },
  checkboxActive: { backgroundColor: "#1E6F73" },
  checkboxText: { color: "#333" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  totalText: { fontWeight: "bold", color: "#333", fontSize: 16 },
  payButton: {
    backgroundColor: "#1E6F73",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  payButtonText: { color: "#fff", fontWeight: "bold" },
});
{/*
    navigation.navigate("Pago", {
  pedidoId: 123,
  cliente: user?.nombre,
  monto: total,
});

    */}