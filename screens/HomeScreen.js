// import { Text, View } from 'react-native';

// export default function HomeScreen({ route }) {
//   const { nombre } = route.params || { nombre: 'Usuario' };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1E6F73' }}>
//         ¡Hola {nombre}! 👋
//       </Text>
//     </View>
//   );
// }
import { Ionicons } from '@expo/vector-icons';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen({ route }) {
  const { nombre } = route.params || { nombre: 'Usuario' };

  // Categorías con iconos locales
  const categorias = [
    { nombre: 'Bebidas', icon: require('../assets/icons/bebidas.png'), color: '#fcebd9' },
    { nombre: 'Lacteos', icon: require('../assets/icons/lacteos.png'), color: '#e5ecf8' },
    { nombre: 'Carnes', icon: require('../assets/icons/carnes.png'), color: '#fbe1e3' },
    { nombre: 'Verduras', icon: require('../assets/icons/verduras.png'), color: '#e0f2e0' },
  ];

  // Productos recomendados
  const productos = [
    { nombre: 'Mermelada', precio: '49.99', img: require('../assets/productos/mermelada.png') },
    { nombre: 'Pollo', precio: '29.99', img: require('../assets/productos/pollo.png') },
    { nombre: 'Queso', precio: '199.99', img: require('../assets/productos/queso.png') },
    { nombre: 'Leche', precio: '49.99', img: require('../assets/productos/leche.png') },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* 🔹 Header superior */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Ionicons name="cart-outline" size={24} color="#fff" />
          <Text style={styles.headerText}>¡Hola {nombre}! 👋</Text>
          <Ionicons name="notifications-outline" size={22} color="#fff" />
        </View>

        {/* 🔹 Barra de búsqueda */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={18} color="#1E6F73" />
          <TextInput placeholder="¿Qué vas a pedir hoy?" style={styles.searchInput} />
          <Ionicons name="mic-outline" size={18} color="#1E6F73" />
        </View>
      </View>

      {/* 🔹 Banner */}
      <Image
        source={{ uri: 'https://i.ibb.co/3fVtvpW/listerine-banner.png' }} // puedes reemplazarlo por tu local
        style={styles.banner}
      />

      {/* 🔹 Sección de categorías */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>CATEGORÍAS</Text>
        <Text style={styles.sectionLink}>ver más</Text>
      </View>

      <View style={styles.categoryContainer}>
        {categorias.map((c, i) => (
          <TouchableOpacity key={i} style={[styles.categoryBox, { backgroundColor: c.color }]}>
            <Image source={c.icon} style={styles.categoryIcon} />
            <Text style={styles.categoryText}>{c.nombre}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 🔹 Sección de recomendados */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>RECOMENDADOS</Text>
        <Text style={styles.sectionLink}>ver más</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {productos.map((p, i) => (
          <View key={i} style={styles.productCard}>
            <Image source={p.img} style={styles.productImg} />
            <Text style={styles.productName}>{p.nombre}</Text>
            <Text style={styles.productPrice}>Bs. {p.precio}</Text>
            <TouchableOpacity style={styles.addBtn}>
              <Text style={styles.addText}>agregar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* 🔹 Barra inferior de navegación */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#fff" />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="cart" size={24} color="#fff" />
          <Text style={styles.navText}>Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color="#fff" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6f6' },

  header: {
    backgroundColor: '#1E6F73',
    paddingTop: 45,
    paddingBottom: 15,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchInput: { flex: 1, marginLeft: 8, color: '#333' },

  banner: {
    width: '100%',
    height: 130,
    borderRadius: 12,
    marginVertical: 15,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginBottom: 5,
  },
  sectionTitle: { color: '#1E6F73', fontWeight: 'bold', fontSize: 16 },
  sectionLink: { color: '#f28c56', fontSize: 12 },

  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  categoryBox: {
    width: 70,
    height: 70,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIcon: { width: 32, height: 32, marginBottom: 5 },
  categoryText: { fontSize: 12, fontWeight: '600', color: '#333' },

  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginLeft: 10,
    width: 130,
  },
  productImg: { width: 80, height: 80, borderRadius: 10 },
  productName: { fontWeight: 'bold', marginTop: 6 },
  productPrice: { color: '#777', marginBottom: 6 },
  addBtn: {
    backgroundColor: '#1E6F73',
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  addText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },

  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1E6F73',
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 20,
  },
  navItem: { alignItems: 'center' },
  navText: { color: '#fff', fontSize: 12, marginTop: 2 },
});
