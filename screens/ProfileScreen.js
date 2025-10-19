import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useUser } from "../navigation/context/UserContext";

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    //navigation.navigate("Login");
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>👤 Perfil del usuario</Text>
        <Text style={styles.subtitle}>No has iniciado sesión.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Perfil del usuario</Text>
      <View style={styles.card}>
        <Text style={styles.infoLabel}>Nombre: </Text>
        <Text style={styles.infoValue}>{user.nombre}</Text>

        <Text style={styles.infoLabel}>Correo: </Text>
        <Text style={styles.infoValue}>{user.correo}</Text>
      </View>
      <TouchableOpacity style={styles.LogoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E6F73",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 30,
  },
  infoLabel: {
    color: "#777",
    fontSize: 14,
    marginTop: 8,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#D9534F",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
