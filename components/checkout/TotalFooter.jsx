import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TotalFooter({ total, disabled, onPay }) {
  return (
    <View style={styles.row}>
      <Text style={styles.total}>Total Bs. {total.toFixed(2)}</Text>
      <TouchableOpacity
        style={[styles.button, disabled && { opacity: 0.5 }]}
        disabled={disabled}
        onPress={onPay}
      >
        <Text style={styles.buttonText}>botón de pagar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginBottom:30},
  total:{fontWeight:"bold",color:"#333",fontSize:16},
  button:{backgroundColor:"#1E6F73",paddingVertical:10,paddingHorizontal:20,borderRadius:8},
  buttonText:{color:"#fff",fontWeight:"bold"},
});
