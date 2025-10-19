import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import users from '../data/users.json'; // 👈 importa el JSON
import { useUser } from '../navigation/context/UserContext';

export default function LoginScreen({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();

  const handleLogin = () => {
    const user = users.find(
      (u) => u.correo === correo.trim() && u.password === password.trim()
    );

    if (user) {
      login(user);
      //navigation.navigate("Main", { screen: "Inicio" });// no necesario ya navega automaticamente al homesscreen....
    } else {
      Alert.alert('Error', 'Correo o contraseña incorrectos');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>PIDE</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="correo........@gmail.com"
          placeholderTextColor="#666"
          value={correo}
          onChangeText={setCorreo}
        />
        <TextInput
          style={styles.input}
          placeholder="contraseña"
          placeholderTextColor="#666"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ingresar</Text>
        </TouchableOpacity>

        <View style={styles.links}>
          <Text style={styles.linkText}>olvide contraseña</Text>
          <Text style={styles.linkText}>crear cuenta</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7F8',
  },
  header: {
    backgroundColor: '#F7B48A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: '#1E6F73',
  },
  form: {
    padding: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#1E6F73',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  linkText: {
    color: '#999',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  altButton: {
    backgroundColor: '#1E6F73',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  altButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'lowercase',
  },
});
