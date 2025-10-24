import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HeaderTitle from "./HeaderTitle";

export default function Header({
  nombre,
  mensaje,
  colorFondo = "#1E6F73",
  showCart = true,
  showBell = true,
}) {
  const navigation = useNavigation();
  const [showNoti, setShowNoti] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // 🔹 animador de opacidad

 const onCartPress = () => {
  // Verificar contexto de navegación
  const parentNav = navigation.getParent();

  console.log("🧭 Navigation actual:", navigation.getState());
  console.log("🧭 Parent navigation:", parentNav ? parentNav.getState() : "❌ No hay parent navigator");

  if (parentNav) {
    console.log("➡️ Navegando vía parentNav hacia: Tabs → Pedidos");
    parentNav.navigate("Tabs", { screen: "Pedidos" });
  } else {
    console.log("➡️ Navegando directamente hacia: Pedidos");
    navigation.navigate("Pedidos");
  }
};


  const toggleNotifications = () => setShowNoti(!showNoti);

  useEffect(() => {
    if (showNoti) {
      // 🔹 Aparece suavemente
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();

      // 🔹 Después de 4 seg, desaparece suavemente
      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }).start(() => setShowNoti(false)); // oculta tras animar
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showNoti]);

  return (
    <View style={[styles.header, { backgroundColor: colorFondo }]}>
      <View style={styles.row}>
        {/* 🔔 Notificaciones */}
        {showBell && (
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={toggleNotifications}
          >
            <Ionicons name="notifications" size={26} color="#fff" />
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

      {/* 🔹 Notificaciones flotantes animadas */}
      {showNoti && (
        <Animated.View style={[styles.notificationBox, { opacity: fadeAnim }]}>
          <Text style={styles.notiTitle}>🔔 Notificaciones</Text>
          <Text style={styles.notiItem}>Tu pedido #123 fue entregado.</Text>
          <Text style={styles.notiItem}>Nuevo descuento disponible 🎉</Text>
          <Text style={styles.notiItem}>Cupón válido hasta mañana</Text>
        </Animated.View>
      )}
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
    position: "relative",
    zIndex: 10,
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
  notificationBox: {
    position: "absolute",
    top: 85,
    right: 150,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: 250,
    padding: 10,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  notiTitle: {
    fontWeight: "bold",
    color: "#1E6F73",
    marginBottom: 6,
  },
  notiItem: {
    fontSize: 13,
    color: "#333",
    paddingVertical: 3,
    borderBottomWidth: 0.4,
    borderColor: "#EEE",
  },
});
