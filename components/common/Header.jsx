import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import HeaderTitle from "./HeaderTitle";

export default function Header({
  nombre,
  mensaje,
  colorFondo = "#1E6F73",
  showCart = true,
  showBell = true,
}) {
  const navigation = useNavigation();

  const onCartPress = () => navigation.navigate("ConfirmarPedido");
  const onNotificationsPress = () => console.log("🔔 Notificaciones");

  const textColor = colorFondo === "#fff" ? "#1E6F73" : "#fff";

  return (
    <View style={[styles.header, { backgroundColor: colorFondo }]}>
      <View style={styles.row}>
        {/* 🔔 Notificaciones */}
        {showBell && (
          <TouchableOpacity style={styles.iconWrapper} onPress={onNotificationsPress}>
            <Ionicons name="notifications-outline" size={26} color="#fff" />
            <View style={styles.badge}>
              <View style={styles.badgeCircle}>
                <View style={styles.badgeDot} />
              </View>
            </View>
          </TouchableOpacity>
        )}

        {/* 💬 Título central */}
        <HeaderTitle nombre={nombre} mensaje={mensaje} />

        {/* 🛒 Carrito */}
        {showCart && (
          <TouchableOpacity style={styles.iconWrapper} onPress={onCartPress}>
            <Ionicons name="cart-outline" size={26} color="#fff" />
            <View style={styles.badge}>
              <View style={styles.badgeCircle}>
                <View style={styles.badgeDot} />
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1E6F73",
    paddingTop: 45,
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  iconWrapper: {
    position: "relative",
    padding: 5,
  },
  badge: {
    position: "absolute",
    top: 2,
    right: 2,
  },
  badgeCircle: {
    width: 16,
    height: 16,
    backgroundColor: "#FAA700",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#fff",
  },
});
