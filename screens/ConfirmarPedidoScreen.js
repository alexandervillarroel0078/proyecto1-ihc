// screens/CheckoutScreen.js
import { useState } from "react";
import { ScrollView, View } from "react-native";
import CouponInput from "../components/checkout/CouponInput";
import DeliveryAddress from "../components/checkout/DeliveryAddress";
import PaymentMethods from "../components/checkout/PaymentMethods";
import PurchaseSummary from "../components/checkout/PurchaseSummary";
import TermsCheckbox from "../components/checkout/TermsCheckbox";
import TotalFooter from "../components/checkout/TotalFooter";
import Header from "../components/common/Header";

import { useUser } from "../navigation/context/UserContext";

export default function ConfirmarPedidoScreen({ navigation }) {
  const { user } = useUser();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("Bank");

  const subtotal = 950.0, envio = 50.99, descuento = 0, impuestos = 0;
  const total = subtotal - descuento + envio + impuestos;

  const handlePagar = () => {
  if (!termsAccepted) return; // evita pago sin aceptar términos

  console.log("💳 Iniciando flujo de pago...");
  navigation.navigate("ProcesandoPago", {
    pedidoId: Date.now(), // genera ID temporal del pedido
    cliente: user?.nombre ?? "Invitado",
    monto: total,
  });
};


  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header mensaje="Tiempo restante 05:00 min" colorFondo="#FF6B6B" />
      <ScrollView style={{ flex: 1, padding: 15 }} showsVerticalScrollIndicator={false}>
        <PaymentMethods selected={selectedMethod} onSelect={setSelectedMethod} />
        <PurchaseSummary subtotal={subtotal} descuento={descuento} envio={envio} impuestos={impuestos} />
        <CouponInput value={coupon} onChange={setCoupon} onApply={() => {}} />
        <DeliveryAddress />
        <TermsCheckbox checked={termsAccepted} onToggle={() => setTermsAccepted(!termsAccepted)} />
        <TotalFooter total={total} disabled={!termsAccepted} onPay={handlePagar} />
      </ScrollView>
    </View>
  );
}
