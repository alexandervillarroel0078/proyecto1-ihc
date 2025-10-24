
// // // components/carrito/CarritoLista.jsx
// // import { Ionicons } from "@expo/vector-icons";
// // import { ScrollView, StyleSheet, View } from "react-native";
// // import CarritoItem from "./CarritoItem";

// // export default function CarritoLista({ productos, onEliminar }) {
// //   return (
// //     <View style={styles.container}>
// //       <ScrollView
// //         style={styles.scroll}
// //         contentContainerStyle={styles.scrollContent}
// //         showsVerticalScrollIndicator={true} // 🔹 muestra scroll visible
// //       >
// //         {productos.length > 0 ? (
// //           productos.map((p) => (
// //             <CarritoItem
// //               key={p.id}
// //               producto={p}
// //               onEliminar={() => onEliminar(p.id)}
// //             />
// //           ))
// //         ) : (
// //           <View style={styles.empty}>
// //             <Ionicons name="cart-outline" size={130} color="#DADADA" />
// //           </View>
// //         )}
// //       </ScrollView>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     height: 440, // 🔹 cuadro fijo con borde
// //     borderWidth: 1.5,
// //     borderColor: "#DADADA",
// //     borderRadius: 10,
// //     marginHorizontal: 10,
// //     marginBottom: 15,
// //     marginTop: 40,
// //     backgroundColor: "#fff",
// //   },
// //   scroll: {
// //     paddingHorizontal: 10,
// //   },
// //   scrollContent: {
// //     paddingVertical: 10,
// //   },
// //   empty: {
// //     alignItems: "center",
// //     justifyContent: "center",
// //     height: "100%",
// //   },
// // });
// // components/carrito/CarritoLista.jsx
// import { Ionicons } from "@expo/vector-icons";
// import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import CarritoItem from "./CarritoItem";

// export default function CarritoLista({ productos, onEliminar, onVaciar }) {
//   return (
//     <View style={styles.container}>
//       {/* 🔹 Barra interna arriba de la lista */}
//       <View style={styles.barInside}>
//         <View style={styles.leftSide}>
//           <Ionicons name="cart-outline" size={22} color="#1E6F73" />
//           <Text style={styles.barText}>Carrito ({productos.length})</Text>
//         </View>

//         {productos.length > 0 && (
//           <TouchableOpacity style={styles.btnVaciar} onPress={onVaciar}>
//             <Ionicons name="trash-outline" size={18} color="#fff" />
//             <Text style={styles.vaciarText}>Vaciar</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* 🔹 Lista de productos */}
//       <ScrollView
//         style={styles.scroll}
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={true}
//       >
//         {productos.length > 0 ? (
//           productos.map((p) => (
//             <CarritoItem
//               key={p.id}
//               producto={p}
//               onEliminar={() => onEliminar(p.id)}
//             />
//           ))
//         ) : (
//           <View style={styles.empty}>
//             <Ionicons name="cart-outline" size={130} color="#DADADA" />
//             <Text style={{ color: "#A0A0A0", marginTop: 10, fontSize: 16 }}>
//               Tu carrito está vacío
//             </Text>
//           </View>
//         )}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     height: 440, // 🔹 cuadro fijo con borde
//     borderWidth: 1.5,
//     borderColor: "#DADADA",
//     borderRadius: 10,
//     marginHorizontal: 10,
//     marginBottom: 15,
//     marginTop: 40,
//     backgroundColor: "#fff",
//     overflow: "hidden", // 🔹 para que la barra siga el borde del contenedor
//   },

//   // 🔸 Barra superior interna
//   barInside: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "#F1F5F4",
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     borderBottomWidth: 1.5,
//     borderColor: "#DADADA",
//   },
//   leftSide: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   barText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#1E6F73",
//     marginLeft: 6,
//   },
//   btnVaciar: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#1E6F73",
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 8,
//   },
//   vaciarText: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "600",
//     marginLeft: 4,
//   },

//   // 🔸 Scroll y contenido
//   scroll: {
//     paddingHorizontal: 10,
//   },
//   scrollContent: {
//     paddingVertical: 10,
//   },

//   // 🔸 Estado vacío
//   empty: {
//     alignItems: "center",
//     justifyContent: "center",
//     height: "100%",
//   },
// });
// components/carrito/CarritoLista.jsx
import { Ionicons } from "@expo/vector-icons";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CarritoItem from "./CarritoItem";

export default function CarritoLista({ productos, onEliminar, onVaciar }) {
  // ⚙️ Confirmación antes de vaciar
  const handleVaciar = () => {
    if (productos.length === 0) return;
    Alert.alert(
      "Vaciar carrito",
      "¿Seguro que deseas eliminar todos los productos?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sí, vaciar", onPress: onVaciar },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* 🔹 Barra superior interna */}
      <View style={styles.barInside}>
        <View style={styles.leftSide}>
          <Ionicons name="cart-outline" size={22} color="#1E6F73" />
          <Text style={styles.barText}>Carrito ({productos.length})</Text>
        </View>

        {productos.length > 0 && (
          <TouchableOpacity style={styles.btnVaciar} onPress={handleVaciar}>
            <Ionicons name="trash-outline" size={18} color="#fff" />
            <Text style={styles.vaciarText}>Vaciar</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 🔹 Lista de productos */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        {productos.length > 0 ? (
          productos.map((p) => (
            <CarritoItem
              key={p.id}
              producto={p}
              onEliminar={() => onEliminar(p.id)}
            />
          ))
        ) : (
          <View style={styles.empty}>
            <Ionicons name="cart-outline" size={130} color="#DADADA" />
            <Text style={{ color: "#A0A0A0", marginTop: 10, fontSize: 16 }}>
              Tu carrito está vacío
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 440,
    borderWidth: 1.5,
    borderColor: "#DADADA",
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 15,
    marginTop: 40,
    backgroundColor: "#fff",
    overflow: "hidden",
  },

  barInside: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F1F5F4",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderBottomWidth: 1.5,
    borderColor: "#DADADA",
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
  },
  barText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E6F73",
    marginLeft: 6,
  },
  btnVaciar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E6F73",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  vaciarText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
  scroll: {
    paddingHorizontal: 10,
  },
  scrollContent: {
    paddingVertical: 10,
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
