
// screens/CheckoutScreen.js
import { useRoute } from "@react-navigation/native"; // 👈 importante
import { useState } from "react";
import { ScrollView, View } from "react-native";

// 🧩 Componentes
import CouponInput from "../components/checkout/CouponInput";
import DeliveryAddress from "../components/checkout/DeliveryAddress";
import PaymentMethods from "../components/checkout/PaymentMethods";
import ResumenCompra from "../components/checkout/ResumenCompra";
import TermsCheckbox from "../components/checkout/TermsCheckbox";
import TotalFooter from "../components/checkout/TotalFooter";
import HeaderCheckout from "../components/common/HeaderCheckout";

// 👤 Contexto de usuario
import { useUser } from "../navigation/context/UserContext";

export default function ConfirmarPedidoScreen({ navigation }) {
  const route = useRoute(); // 👈 recibe los datos enviados desde CarritoResumen
  const { user } = useUser();

  // 🧾 Datos que llegan desde el carrito
  const { productos = [], total = 0 } = route.params || {};

  // ⚙️ Estados locales
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("Bank");

  // 🧮 Cálculos dinámicos
  const subtotal = productos.reduce(
    (sum, p) => sum + (p.precioUnitario * p.cantidad),
    0
  );
  const envio = subtotal > 300 ? 0 : 20; // envío gratis si supera Bs.300
  const impuestos = subtotal * 0.13;
  const descuento = coupon ? subtotal * 0.05 : 0;
  const totalFinal = subtotal - descuento + envio + impuestos;

  // 💳 Acción al pagar
  const handlePagar = () => {
    if (!termsAccepted) return; // evita continuar sin aceptar términos

    console.log("💳 Iniciando flujo de pago...");
    console.log("🧾 Productos:", productos);
    console.log("👤 Cliente:", user?.nombre ?? "Invitado");
    console.log("💰 Monto total:", totalFinal);

    navigation.navigate("ProcesandoPago", {
      pedidoId: Date.now(), // ID temporal del pedido
      cliente: user?.nombre ?? "Invitado",
      monto: totalFinal,
      productos, // envía toda la info del pedido
    });
  };

  // 🧠 Render principal
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <HeaderCheckout initialTime={90} />

      <ScrollView
        style={{ flex: 1, padding: 15 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 💳 Métodos de pago */}
        <PaymentMethods selected={selectedMethod} onSelect={setSelectedMethod} />

        {/*  Resumen completo con productos */}
        <ResumenCompra productos={productos} />

        {/*  Cupones */}
        <CouponInput value={coupon} onChange={setCoupon} onApply={() => { }} />

        {/*  Dirección de entrega */}
        <DeliveryAddress />

        {/* Aceptación de términos */}
        <TermsCheckbox
          checked={termsAccepted}
          onToggle={() => setTermsAccepted(!termsAccepted)}
        />

        {/* 🔘 Botón final */}
        <TotalFooter
          total={totalFinal}
          disabled={!termsAccepted}
          onPay={handlePagar}
        />
      </ScrollView>
    </View>
  );
}
