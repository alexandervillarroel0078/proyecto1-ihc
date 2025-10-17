import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

export default function SearchBar() {
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={22} color="#1E6F73" style={styles.iconLeft} />
      <TextInput
        placeholder="¿Qué vas a pedir hoy?"
        placeholderTextColor="#1E6F73"
        style={styles.searchInput}
      />
      <Ionicons name="mic" size={22} color="#1E6F73" style={styles.iconRight} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6F2EF", // 🔹 verde claro, como en tu imagen
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 15,
    marginTop: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#1E6F73",
    fontWeight: "500",
  },
  iconLeft: {
    marginRight: 5,
  },
  iconRight: {
    marginLeft: 5,
  },
});
