import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function Header({ nombre }) {
  return (
    <View style={styles.header}>
      {/* 🔹 Íconos izquierda y derecha */}
      <View style={styles.iconRow}>
        <View style={styles.iconWrapper}>
          <Ionicons name="notifications-outline" size={26} color="#fff" />
          <View style={styles.badge} />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.headerText}>¡Hola {nombre}! 👋</Text>
        </View>

        <View style={styles.iconWrapper}>
          <Ionicons name="cart-outline" size={26} color="#fff" />
          <View style={styles.badge} />
        </View>
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
    backgroundColor: "#FAA700", // naranja
  },

  titleContainer: {
    backgroundColor: "#fff",
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
    color: "#1E6F73",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
