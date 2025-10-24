import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { useEffect, useMemo, useRef } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import Header from "../components/common/Header";


export default function PaymentSuccessScreen({ route, navigation }) {
  const { pedidoId, cliente, monto } = route.params ?? {};
  const viewShotRef = useRef(null);

  // 🔹 Datos del QR
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

  // ⏳ Espera 25 segundos antes de volver
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Main", { screen: "Ubicación" });
    }, 100000);
    return () => clearTimeout(timer);
  }, [navigation]);

  // 💾 Descargar QR
  const handleDownload = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso denegado", "Se necesita permiso para guardar en la galería.");
        return;
      }
      const uri = await viewShotRef.current.capture();
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("PedidosApp", asset, false).catch(() => { });
      Alert.alert("Descargado", "QR guardado en la galería ✅");
    } catch {
      Alert.alert("Error", "No se pudo descargar el QR.");
    }
  };

  // 📤 Compartir QR
  const handleShare = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert("No disponible", "Compartir no está disponible en este dispositivo.");
        return;
      }
      await Sharing.shareAsync(uri);
    } catch {
      Alert.alert("Error", "No se pudo compartir el QR.");
    }
  };

  return (
    <View style={styles.container}>
      <Header mensaje="Pago confirmado" colorFondo="#1E6F73" />

      <View style={styles.content}>
        {/* 🔶 Alerta superior */}
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>Pedido realizado con éxito !!</Text>
        </View>

        {/* 🔷 QR */}
        <ViewShot ref={viewShotRef} options={{ format: "png", quality: 1 }}>
          <View style={styles.qrContainer}>
            <QRCode value={qrValue} size={180} />
          </View>
        </ViewShot>

        {/* 🔸 Botones */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.button} onPress={handleDownload}>
            <Text style={styles.buttonText}>descargar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleShare}>
            <Text style={styles.buttonText}>compartir</Text>
          </TouchableOpacity>
        </View>

        
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#1E6F73", marginTop: 30 }]}
          onPress={() =>
            navigation.navigate("Main", {
              screen: "Tabs",
              params: {
                screen: "Ubicación",
              },
            })
          }
        >
          <Text style={[styles.buttonText, { color: "#fff" }]}>
            Ver seguimiento del pedido
          </Text>
        </TouchableOpacity>




      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  alertBox: {
    backgroundColor: "#FCD5B4",
    borderWidth: 1,
    borderColor: "#D9A97A",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 4,
    marginBottom: 35,
  },
  alertText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 15,
  },
  qrContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 4,
    padding: 16,
    marginBottom: 40,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 18,
  },
  button: {
    backgroundColor: "#1E6F73",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "lowercase",
  },
});
