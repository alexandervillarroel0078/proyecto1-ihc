import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { useEffect, useMemo, useRef } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import Header from "../components/home/Header"; // ✅ Reutiliza la barra superior

export default function PaymentScreen({ route, navigation }) {
  const { pedidoId, cliente, monto } = route.params ?? {};
  const viewShotRef = useRef(null);

  // 🔹 Generar el valor QR dinámico
  const qrValue = useMemo(() => {
    const payload = {
      tipo: "pago",
      pedidoId: pedidoId ?? "0",
      cliente: cliente ?? "Invitado",
      monto: monto ?? 500,
      fecha: new Date().toISOString(),
    };
    return JSON.stringify(payload);
  }, [pedidoId, cliente, monto]);

  // 🔹 Temporizador: a los 10 segundos pasa a “Perfil”
  useEffect(() => {
    const timer = setTimeout(() => {
      //navigation.navigate("Perfil");
      navigation.navigate("Main", { screen: "Ubicación" });
    }, 10000);
    return () => clearTimeout(timer);
  }, [navigation]);

  // 🔹 Descargar el QR
  const handleDownload = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso denegado", "Se necesita permiso para guardar en la galería.");
        return;
      }
      const uri = await viewShotRef.current.capture();
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("PIDE", asset, false).catch(() => {});
      Alert.alert("Descargado", "QR guardado en la galería ✅");
    } catch (e) {
      Alert.alert("Error", "No se pudo descargar el QR.");
    }
  };

  // 🔹 Compartir QR
  const handleShare = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert("No disponible", "Compartir no está disponible en este dispositivo.");
        return;
      }
      await Sharing.shareAsync(uri);
    } catch (e) {
      Alert.alert("Error", "No se pudo compartir el QR.");
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔹 Barra superior con mensaje y fondo blanco */}
      <Header mensaje="Tiempo estimado 30:00 min" colorFondo="#fff" />

      {/* 🔹 Contenido central */}
      <View style={styles.content}>
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>Pedido realizado con éxito !!</Text>
        </View>

        <ViewShot ref={viewShotRef} options={{ format: "png", quality: 1 }}>
          <View style={styles.qrContainer}>
            <QRCode value={qrValue} size={180} />
          </View>
        </ViewShot>

        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.button} onPress={handleDownload}>
            <Text style={styles.buttonText}>descargar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleShare}>
            <Text style={styles.buttonText}>compartir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  alertBox: {
    backgroundColor: "#FCD5B4",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 6,
    marginBottom: 25,
  },
  alertText: { color: "#333", fontWeight: "bold", fontSize: 15 },
  qrContainer: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#1E6F73",
    borderRadius: 8,
    padding: 18,
    marginBottom: 30,
  },
  buttonsRow: { flexDirection: "row", gap: 20 },
  button: {
    backgroundColor: "#1E6F73",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    elevation: 3,
  },
  buttonText: { color: "#fff", fontWeight: "bold", textTransform: "lowercase" },
});
