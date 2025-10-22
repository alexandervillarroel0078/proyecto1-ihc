import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

  return (
    <View style={styles.box}>
      <Text style={styles.title}>📍 DIRECCIÓN DE ENTREGA</Text>

      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(reg) => setRegion(reg)}
        showsUserLocation
      >
        <Marker
          coordinate={marker}
          draggable
          onDragEnd={(e) => setMarker(e.nativeEvent.coordinate)}
          title="Tu ubicación"
        />
      </MapView>

      <View style={{ marginTop: 10 }}>
        <Text>Fecha prevista: 06 de Octubre de 2025</Text>
        <Text>Hora estimada: 18:30 - 19:00</Text>
      </View>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>agregar especificaciones</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  box:{borderWidth:1,borderColor:"#ddd",borderRadius:8,padding:15,marginBottom:15,backgroundColor:"#fff"},
  title:{color:"#A85B2D",fontWeight:"700",marginBottom:8},
  map:{width:"100%",height:140,borderRadius:10,marginTop:8},
  btn:{backgroundColor:"#F7B48A",borderRadius:8,paddingVertical:10,alignItems:"center",marginTop:12},
  btnText:{color:"#013A3F",fontWeight:"700",textTransform:"lowercase"},
});
