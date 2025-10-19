import { View } from "react-native";
import PedidoCard from "./PedidoCard";

export default function PedidosList({ pedidos }) {
  return (
    <View>
      {pedidos.map((p) => (
        <PedidoCard key={p.id} pedido={p} />
      ))}
    </View>
  );
}
