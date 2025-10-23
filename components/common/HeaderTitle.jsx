import { StyleSheet, Text, View } from "react-native";

export default function HeaderTitle({ nombre, mensaje }) {


  const texto = mensaje ? mensaje : `¡Hola ${nombre || "Usuario"}! 👋`;

  return (
    <View style={styles.bubble}>
      <Text style={styles.text}>{texto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 70,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1E6F73",
    textAlign: "center",
  },
});
