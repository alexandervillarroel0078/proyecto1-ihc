// screens/ProfileScreen.js
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useUser } from "../navigation/context/UserContext";

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useUser();
  const handleLogout = () => logout();

  if (!user) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="person-circle-outline" size={120} color="#ccc" />
        <Text style={styles.emptyTitle}>Sin sesión activa</Text>
        <Text style={styles.emptySubtitle}>Inicia sesión para acceder a tu perfil.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 🔹 Encabezado con gradiente */}
      <LinearGradient colors={["#1E6F73", "#2FAEA5"]} style={styles.headerGradient}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.nombre}</Text>
        <Text style={styles.email}>{user.correo}</Text>
      </LinearGradient>

      {/* 🔹 Contenido con scroll */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
        
        {/* 🔸 Sección principal */}
        <View style={styles.cardSection}>
          <Text style={styles.sectionTitle}>Cuenta</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.option}>
              <View style={[styles.iconCircle, { backgroundColor: "#EAF7F6" }]}>
                <MaterialIcons name="shopping-bag" size={24} color="#1E6F73" />
              </View>
              <Text style={styles.optionText}>Mis pedidos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
              <View style={[styles.iconCircle, { backgroundColor: "#FCE9D9" }]}>
                <Ionicons name="heart-outline" size={24} color="#F28C56" />
              </View>
              <Text style={styles.optionText}>Favoritos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
              <View style={[styles.iconCircle, { backgroundColor: "#E6F1FC" }]}>
                <Ionicons name="wallet-outline" size={24} color="#1E6F73" />
              </View>
              <Text style={styles.optionText}>Métodos de pago</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
              <View style={[styles.iconCircle, { backgroundColor: "#F3E5F5" }]}>
                <Ionicons name="settings-outline" size={24} color="#8E44AD" />
              </View>
              <Text style={styles.optionText}>Configuración</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 🔸 Sección soporte */}
        <View style={styles.cardSection}>
          <Text style={styles.sectionTitle}>Soporte</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.option}>
              <View style={[styles.iconCircle, { backgroundColor: "#FFF2CC" }]}>
                <Ionicons name="help-circle-outline" size={24} color="#C27C0E" />
              </View>
              <Text style={styles.optionText}>Centro de ayuda</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
              <View style={[styles.iconCircle, { backgroundColor: "#E4F7E1" }]}>
                <Ionicons name="chatbubbles-outline" size={24} color="#2E7D32" />
              </View>
              <Text style={styles.optionText}>Contáctanos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
              <View style={[styles.iconCircle, { backgroundColor: "#F8D7DA" }]}>
                <Ionicons name="information-circle-outline" size={24} color="#C82333" />
              </View>
              <Text style={styles.optionText}>Acerca de la app</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 🔹 Botón cerrar sesión */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LinearGradient colors={["#F0624D", "#D9534F"]} style={styles.logoutGradient}>
              <Ionicons name="log-out-outline" size={22} color="#fff" />
              <Text style={styles.logoutText}>Cerrar sesión</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F9FB" },
  headerGradient: {
    alignItems: "center",
    paddingVertical: 40,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 10,
  },
  name: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  email: { color: "#F0F0F0", fontSize: 14 },
  cardSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#1E6F73",
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 0.6,
    borderColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E6F73",
    marginLeft: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8F3F2",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  logoutGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
});
