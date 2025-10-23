// import { Ionicons } from "@expo/vector-icons";
// import { useEffect, useState } from "react";
// import { StyleSheet, Text, View } from "react-native";

// export default function HeaderCheckout({ initialTime = 300 }) {
//   // ⏳ tiempo en segundos (5 min = 300s)
//   const [timeLeft, setTimeLeft] = useState(initialTime);

//   useEffect(() => {
//     if (timeLeft <= 0) return;

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   // 🕒 Formatear en mm:ss
//   const formatTime = (seconds) => {
//     const m = Math.floor(seconds / 60);
//     const s = seconds % 60;
//     return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
//   };

//   // 🟠 Determinar colores dinámicos
//   const isEnding = timeLeft <= 60; // menos de 1 min
//   const bubbleColor = isEnding ? "#FFEBE8" : "#FFFFFF";
//   const textColor = isEnding ? "#D63031" : "#1E6F73";

//   return (
//     <View style={styles.container}>
//       <View style={[styles.bubble, { backgroundColor: bubbleColor }]}>
//         <Ionicons
//           name={timeLeft > 0 ? "time-outline" : "alert-circle-outline"}
//           size={20}
//           color={textColor}
//           style={{ marginRight: 6 }}
//         />
//         {timeLeft > 0 ? (
//           <Text style={[styles.text, { color: textColor }]}>
//             Tiempo restante: {formatTime(timeLeft)}
//           </Text>
//         ) : (
//           <Text style={[styles.text, { color: "#B00020" }]}>
//             ⚠️ Tiempo expirado
//           </Text>
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#F77E68",
//     paddingTop: 55,
//     paddingBottom: 20,
//     alignItems: "center",
//     borderBottomLeftRadius: 22,
//     borderBottomRightRadius: 22,
//     elevation: 4,
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 3 },
//   },
//   bubble: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 6,
//     paddingHorizontal: 15,
//     borderRadius: 25,
//     elevation: 2,
//   },
//   text: {
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

export default function HeaderCheckout({ initialTime = 300 }) {
  // ⏳ tiempo total (5 minutos por defecto)
  const [timeLeft, setTimeLeft] = useState(initialTime);

  // 💓 animación de escala (latido)
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // 🧭 Si queda menos de 60 segundos → activar el efecto “latido”
  useEffect(() => {
    if (timeLeft <= 60 && timeLeft > 0) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else if (timeLeft === 0) {
      pulseAnim.stopAnimation();
    }
  }, [timeLeft]);

  // 🕒 Formatear mm:ss
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // 🎨 Colores según estado
  const isEnding = timeLeft <= 60 && timeLeft > 0;
  const bubbleColor = isEnding ? "#FFE3E0" : "#FFFFFF";
  const textColor = isEnding ? "#D63031" : "#1E6F73";

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.bubble,
          { backgroundColor: bubbleColor, transform: [{ scale: pulseAnim }] },
        ]}
      >
        <Ionicons
          name={timeLeft > 0 ? "time-outline" : "alert-circle-outline"}
          size={20}
          color={textColor}
          style={{ marginRight: 6 }}
        />
        {timeLeft > 0 ? (
          <Text style={[styles.text, { color: textColor }]}>
            Tiempo restante: {formatTime(timeLeft)}
          </Text>
        ) : (
          <Text style={[styles.text, { color: "#B00020" }]}>
            ⚠️ Tiempo expirado
          </Text>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F77E68",
    paddingTop: 55,
    paddingBottom: 20,
    alignItems: "center",
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
  },
  bubble: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 25,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
