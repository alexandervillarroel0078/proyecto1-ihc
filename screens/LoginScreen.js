// screens/LoginScreen.js
import { useState } from "react";
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import users from "../data/users.json";
import { useUser } from "../navigation/context/UserContext";

const { height } = Dimensions.get("window");

export default function LoginScreen({ navigation }) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();

   const handleLogin = () => {
     const user = users.find(
       (u) => u.correo === correo.trim() && u.password === password.trim()
     );

     if (user) {
       login(user);
     } else {
       Alert.alert("Error", "Correo o contraseña incorrectos");
     }
   };
  // const handleLogin = () => {
  //   const user = users.find(
  //     (u) => u.correo === correo.trim() && u.password === password.trim()
  //   );

  //   // Si encuentra usuario o si los campos están vacíos, entra igual
  //   if (user || (correo === "" && password === "")) {
  //     const usuario = user || { nombre: "Invitado", correo: "invitado@pide.com" };
  //     login(usuario);
  //   } else {
  //     Alert.alert("Error", "Correo o contraseña incorrectos");
  //   }
  // };
  return (
    <View style={styles.container}>
      {/* 🟧 Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>PIDE</Text>
      </View>

      {/* 🟩 Cuerpo Scrollable (para pantallas pequeñas) */}
      <ScrollView contentContainerStyle={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="correo........@gmail.com"
          placeholderTextColor="#1E6F73"
          value={correo}
          onChangeText={setCorreo}
        />

        <TextInput
          style={styles.input}
          placeholder="contraseña"
          placeholderTextColor="#1E6F73"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>ingresar</Text>
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          <TouchableOpacity>
            <Text style={styles.link}>olvide contraseña</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.link}>crear cuenta</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.altButton}>
          <Text style={styles.altText}>facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.altButton}>
          <Text style={styles.altText}>telefono</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#F7B48A",
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.28, // ocupa aprox. 1/4 de la pantalla
  },
  title: {
    fontSize: 48,
    fontWeight: "900",
    color: "#1E6F73",
    letterSpacing: 1,
  },
  form: {
    paddingHorizontal: 30,
    paddingTop: 35,
    paddingBottom: 60,
    alignItems: "stretch",
  },
  input: {
    borderWidth: 1.2,
    borderColor: "#1E6F73",
    borderRadius: 2,
    paddingVertical: 13,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 15,
    color: "#1E6F73",
  },
  loginButton: {
    backgroundColor: "#1E6F73",
    paddingVertical: 15,
    borderRadius: 20, // ovalado como el de la imagen
    alignItems: "center",
    marginBottom: 25,
  },
  loginText: {
    color: "#fff",
    fontWeight: "600",
    textTransform: "lowercase",
    letterSpacing: 1,
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    paddingHorizontal: 4,
  },
  link: {
    color: "#1E6F73",
    fontStyle: "italic",
    fontSize: 14.5,
    textDecorationLine: "underline",
  },
  altButton: {
    backgroundColor: "#1E6F73",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  altText: {
    color: "#fff",
    fontWeight: "600",
    textTransform: "lowercase",
    letterSpacing: 0.5,
  },
});
