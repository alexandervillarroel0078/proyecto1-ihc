import { StyleSheet, Text, View } from "react-native";

export default function PurchaseSummary({ subtotal, descuento, envio, impuestos }) {
  const total = subtotal - descuento + envio + impuestos;

  return (
    <View style={styles.box}>
      <Text style={styles.title}>📦 RESUMEN DE COMPRA</Text>
      <View style={styles.row}><Text>Subtotal</Text><Text>Bs. {subtotal.toFixed(2)}</Text></View>
      <View style={styles.row}><Text>Descuento</Text><Text>Bs. {descuento.toFixed(2)}</Text></View>
      <View style={styles.row}><Text>Envío</Text><Text>Bs. {envio.toFixed(2)}</Text></View>
      <View style={styles.row}><Text>Impuestos</Text><Text>Bs. {impuestos.toFixed(2)}</Text></View>
      <View style={styles.separator}/>
      <View style={[styles.row,{marginTop:4}]}>
        <Text style={{fontWeight:"bold"}}>Total</Text>
        <Text style={{fontWeight:"bold"}}>Bs. {total.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box:{backgroundColor:"#fff",borderWidth:1,borderColor:"#ddd",borderRadius:8,padding:15,marginBottom:15},
  title:{color:"#A85B2D",fontWeight:"700",marginBottom:8},
  row:{flexDirection:"row",justifyContent:"space-between",marginVertical:2},
  separator:{height:1,backgroundColor:"#ddd",marginVertical:6},
});
