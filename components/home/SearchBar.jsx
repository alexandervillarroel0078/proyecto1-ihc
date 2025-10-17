 
// import { Ionicons } from "@expo/vector-icons";
// import { useRef, useState } from "react";
// import {
//   Animated,
//   StyleSheet,
//   TextInput,
//   TouchableWithoutFeedback,
//   View,
// } from "react-native";

// export default function SearchBar() {
//   const scaleSearch = useRef(new Animated.Value(1)).current;
//   const scaleMic = useRef(new Animated.Value(1)).current;
//   const [activeIcon, setActiveIcon] = useState(null);

//   // 🔹 Efecto de zoom
//   const handlePress = (anim, iconName) => {
//     Animated.sequence([
//       Animated.timing(anim, {
//         toValue: 1.25,
//         duration: 120,
//         useNativeDriver: true,
//       }),
//       Animated.timing(anim, {
//         toValue: 1,
//         duration: 120,
//         useNativeDriver: true,
//       }),
//     ]).start();

//     // 🔹 Alternar estado activo (mantener o desactivar)
//     setActiveIcon((prev) => (prev === iconName ? null : iconName));
//   };

//   return (
//     <View style={styles.searchContainer}>
//       {/* 🔍 Lupa */}
//       <TouchableWithoutFeedback
//         onPress={() => handlePress(scaleSearch, "search")}
//       >
//         <Animated.View
//           style={[
//             styles.iconWrapper,
//             activeIcon === "search" && styles.iconWrapperActive,
//             { transform: [{ scale: scaleSearch }] },
//           ]}
//         >
//           <Ionicons
//             name="search"
//             size={22}
//             color={activeIcon === "search" ? "#fff" : "#1E6F73"}
//           />
//         </Animated.View>
//       </TouchableWithoutFeedback>

//       <TextInput
//         placeholder="¿Qué vas a pedir hoy?"
//         placeholderTextColor="#1E6F73"
//         style={styles.searchInput}
//       />

//       {/* 🎤 Micrófono */}
//       <TouchableWithoutFeedback onPress={() => handlePress(scaleMic, "mic")}>
//         <Animated.View
//           style={[
//             styles.iconWrapper,
//             activeIcon === "mic" && styles.iconWrapperActive,
//             { transform: [{ scale: scaleMic }] },
//           ]}
//         >
//           <Ionicons
//             name="mic"
//             size={22}
//             color={activeIcon === "mic" ? "#fff" : "#1E6F73"}
//           />
//         </Animated.View>
//       </TouchableWithoutFeedback>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#E6F2EF",
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     marginHorizontal: 15,
//     marginTop: 10,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 2,
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 10,
//     fontSize: 15,
//     color: "#1E6F73",
//     fontWeight: "500",
//   },
//   iconWrapper: {
//     width: 34,
//     height: 34,
//     borderRadius: 17,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   iconWrapperActive: {
//     backgroundColor: "#1E6F73",
//   },
// });
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function SearchBar() {
  const scaleSearch = useRef(new Animated.Value(1)).current;
  const scaleMic = useRef(new Animated.Value(1)).current;
  const [activeIcon, setActiveIcon] = useState(null);

  // 🔹 Efecto al presionar ícono
  const handlePress = (anim, iconName) => {
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setActiveIcon((prev) => (prev === iconName ? null : iconName));
  };

  return (
    <View style={styles.searchContainer}>
      {/* 🔍 Lupa */}
      <TouchableWithoutFeedback
        onPress={() => handlePress(scaleSearch, "search")}
      >
        <Animated.View
          style={[
            styles.iconWrapper,
            activeIcon === "search" && styles.iconWrapperActive,
            { transform: [{ scale: scaleSearch }] },
          ]}
        >
          <Ionicons
            name="search"
            size={22}
            color={activeIcon === "search" ? "#fff" : "#1E6F73"}
          />
        </Animated.View>
      </TouchableWithoutFeedback>

      {/* 🔸 Campo de búsqueda */}
      <TextInput
        placeholder="¿Qué vas a pedir hoy?"
        placeholderTextColor="#1E6F73"
        style={styles.searchInput}
      />

      {/* 🎤 Micrófono */}
      <TouchableWithoutFeedback onPress={() => handlePress(scaleMic, "mic")}>
        <Animated.View
          style={[
            styles.iconWrapper,
            activeIcon === "mic" && styles.iconWrapperActive,
            { transform: [{ scale: scaleMic }] },
          ]}
        >
          <Ionicons
            name="mic"
            size={22}
            color={activeIcon === "mic" ? "#fff" : "#1E6F73"}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3FBEF", // 🔹 más claro, casi blanco verdoso
    borderRadius: 30,           // 🔹 forma más redondeada como en la imagen
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginHorizontal: 15,
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: "#D6EAE2", // 🔹 borde sutil
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 15,
    color: "#1E6F73",
    fontWeight: "600",
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E6F2EF", // 🔹 fondo más visible alrededor del ícono
  },
  iconWrapperActive: {
    backgroundColor: "#1E6F73", // 🔹 color verde oscuro al presionar
  },
});
