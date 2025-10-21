import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Header({ nombre, mensaje, colorFondo = "#fff" }) {
  const navigation = useNavigation();
  // 🟢 Si hay mensaje, se muestra solo ese
  const texto = mensaje ? mensaje : `¡Hola ${nombre || "Usuario"}! 👋`;

  //solo prueba....
  const onCartPress = () => {
    navigation.navigate("Checkout");
  };

  return (
    <View style={styles.header}>
      <View style={styles.iconRow}>
        {/* 🔹 Ícono izquierda */}
        <View style={styles.iconWrapper}>
          <Ionicons name="notifications-outline" size={26} color="#fff" />
          <View style={styles.badge} />
        </View>

        {/* 🔹 Texto central */}
        <View style={[styles.titleContainer, { backgroundColor: colorFondo }]}>
          <Text
            style={[
              styles.headerText,
              { color: colorFondo === "#fff" ? "#1E6F73" : "#fff" },
            ]}
          >
            {texto}
          </Text>
        </View>

        {/* 🔹 Ícono derecha */}
        <TouchableOpacity  style={styles.iconWrapper} onPress={onCartPress}>
          <Ionicons name="cart-outline" size={26} color="#fff" />
          <View style={styles.badge} />
        </TouchableOpacity >
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1E6F73",
    paddingTop: 45,
    paddingBottom: 15,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconWrapper: {
    position: "relative",
    padding: 5,
  },
  badge: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FAA700",
  },
  titleContainer: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
