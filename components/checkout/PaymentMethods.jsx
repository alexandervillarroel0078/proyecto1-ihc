import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react"; // 👈 Necesario para usar React.cloneElement
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PaymentMethods({ selected, onSelect }) {
  console.log("💳 Renderizando PaymentMethods — método seleccionado:", selected);

  // 🔹 Lista de métodos con íconos personalizados
  const methods = [
    { name: "Card", icon: <Ionicons name="card-outline" size={28} color="#1E6F73" /> },
    { name: "Bank", icon: <FontAwesome5 name="university" size={26} color="#1E6F73" /> },
    { name: "QR", icon: <MaterialCommunityIcons name="qrcode" size={30} color="#1E6F73" /> },
    { name: "Wallet", icon: <Ionicons name="wallet-outline" size={28} color="#1E6F73" /> },
  ];

  return (
    <View>
      <Text style={styles.title}>MÉTODOS DE PAGO</Text>

      <View style={styles.container}>
        {methods.map((m) => {
          const isActive = selected === m.name;

          console.log(`🔘 ${m.name} ${isActive ? "seleccionado ✅" : "no seleccionado"}`);

          return (
            <TouchableOpacity
              key={m.name}
              style={[styles.card, isActive && styles.activeCard]}
              onPress={() => {
                console.log("👉 Método elegido:", m.name);
                onSelect(m.name);
              }}
              activeOpacity={0.8}
            >
              <View style={styles.iconWrapper}>
                {isActive
                  ? // Cambiar color del ícono cuando está activo
                    React.cloneElement(m.icon, { color: "#fff" })
                  : m.icon}
              </View>

              <Text style={[styles.text, isActive && styles.activeText]}>{m.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    color: "#013A3F",
    marginBottom: 10,
    fontSize: 15,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  card: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#1E6F73",
    borderRadius: 10,
    marginHorizontal: 4,
    paddingVertical: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  activeCard: {
    backgroundColor: "#1E6F73",
    borderColor: "#1E6F73",
  },
  iconWrapper: {
    marginBottom: 8,
  },
  text: {
    fontWeight: "600",
    fontSize: 13,
    color: "#1E6F73",
  },
  activeText: {
    color: "#fff",
  },
});
