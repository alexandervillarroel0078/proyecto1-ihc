import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CouponInput({ value, onChange, onApply }) {
  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        placeholder="¿Tienes un cupón?"
        value={value}
        onChangeText={onChange}
      />
      <TouchableOpacity style={styles.button} onPress={onApply}>
        <Text style={styles.text}>Aplicar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row:{flexDirection:"row",alignItems:"center",marginBottom:15},
  input:{flex:1,borderWidth:1,borderColor:"#ccc",borderRadius:6,padding:10,backgroundColor:"#fff"},
  button:{backgroundColor:"#FCD5B4",paddingVertical:10,paddingHorizontal:12,borderRadius:6,marginLeft:6},
  text:{fontWeight:"700",color:"#333"},
});
