import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TermsCheckbox({ checked, onToggle }) {
  return (
    <TouchableOpacity style={styles.row} onPress={onToggle}>
      <View style={[styles.box, checked && styles.active]} />
      <Text style={styles.text}>Aceptar términos y condiciones</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row:{flexDirection:"row",alignItems:"center",marginBottom:20},
  box:{width:20,height:20,borderWidth:1.5,borderColor:"#1E6F73",borderRadius:3,marginRight:10},
  active:{backgroundColor:"#1E6F73"},
  text:{color:"#333"},
});
