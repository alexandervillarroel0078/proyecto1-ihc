// components/checkout/DeliveryAddress.jsx
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function DeliveryAddress() {
  const [region, setRegion] = useState({
    latitude: -17.7833,
    longitude: -63.1821,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [marker, setMarker] = useState({
    latitude: -17.7833,
    longitude: -63.1821,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [specifications, setSpecifications] = useState("");

  // 🕒 Fecha y hora actuales simuladas
  const now = new Date();
  const estimated = new Date(now.getTime() + 60 * 60 * 1000); // +1 hora
  const [fecha, setFecha] = useState(estimated);
  const [horaInicio, setHoraInicio] = useState(estimated);
  const [horaFin, setHoraFin] = useState(new Date(estimated.getTime() + 30 * 60 * 1000)); // +30min

  // 🧩 Picker states
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState("date");

  const showDateTimePicker = (type) => {
    setMode(type);
    setShowPicker(true);
  };

  const onChangePicker = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      if (mode === "date") setFecha(selectedDate);
      else setHoraInicio(selectedDate);
    }
  };

  // 🧮 Helper para formatear
  const formatDate = (date) =>
    date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const formatTime = (date) =>
    date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  return (
    <View style={styles.box}>
      <Text style={styles.title}>📍 DIRECCIÓN DE ENTREGA</Text>

      <MapView
  style={styles.map}
  region={region}
  onRegionChangeComplete={setRegion}
  onPress={(e) => setMarker(e.nativeEvent.coordinate)}   // 👈 al tocar el mapa, mueve el marcador
  showsUserLocation
>
  <Marker
    coordinate={marker}
    draggable
    onDragEnd={(e) => setMarker(e.nativeEvent.coordinate)}
    title="Tu ubicación"
  />
</MapView>


      {/* 🔹 Fecha y hora previstas */}
      <View style={styles.infoBox}>
        <View>
          <Text style={styles.text}>
            📅 Fecha prevista: {formatDate(fecha)}
          </Text>
          <Text style={styles.text}>
            🕒 Hora estimada: {formatTime(horaInicio)} - {formatTime(horaFin)}
          </Text>
        </View>


      </View>
      <View style={styles.infoBox}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => showDateTimePicker("date")}
        >
          <Ionicons name="calendar-outline" size={18} color="#1E6F73" />
          <Text style={styles.editText}>Personalizar entrega</Text>
        </TouchableOpacity>
      </View>
      {/* Especificaciones */}
      {specifications ? (
        <View style={styles.noteBox}>
          <Ionicons name="document-text-outline" size={16} color="#1E6F73" />
          <Text style={styles.noteText}>{specifications}</Text>
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.btn}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.btnText}>agregar especificaciones</Text>
      </TouchableOpacity>

      {/* Modal especificaciones */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>📝 Agregar especificaciones</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Dejar en portería, tocar timbre, piso 3..."
              multiline
              value={specifications}
              onChangeText={setSpecifications}
            />
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.saveText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* DateTimePicker */}
      {showPicker && (
        <DateTimePicker
          value={mode === "date" ? fecha : horaInicio}
          mode={mode}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChangePicker}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  title: { color: "#A85B2D", fontWeight: "700", marginBottom: 8 },
  map: { width: "100%", height: 140, borderRadius: 10, marginTop: 8 },
  infoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  text: { color: "#333" },
  editBtn: { flexDirection: "row", alignItems: "center" },
  editText: { marginLeft: 4, color: "#1E6F73", fontWeight: "600" },
  noteBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF7F8",
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
  },
  noteText: { marginLeft: 6, color: "#1E6F73", fontSize: 13 },
  btn: {
    backgroundColor: "#F7B48A",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 12,
  },
  btnText: { color: "#013A3F", fontWeight: "700", textTransform: "lowercase" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "85%",
  },
  modalTitle: { fontWeight: "700", color: "#1E6F73", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    minHeight: 70,
    textAlignVertical: "top",
  },
  saveBtn: {
    marginTop: 12,
    backgroundColor: "#1E6F73",
    paddingVertical: 10,
    borderRadius: 8,
  },
  saveText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});
