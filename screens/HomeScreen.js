// 📦 Importamos el componente principal "Home" que contiene toda la interfaz de la pantalla principal
import Home from "../components/home/Home";
import { useUser } from "../navigation/context/UserContext";

// 🔹 Definimos la pantalla principal que se usa dentro del navegador de pestañas (AppNavigator)
export default function HomeScreen({ route, navigation }) {
  // obtener usuario desde el contexto general
  const { user } = useUser();

  // 🗺️ Función para navegar hacia la pestaña de "Ubicación"
  const handleLocation = () => navigation.navigate("Ubicación");

  // 🛒 Función para navegar hacia la pestaña de "Pedidos"
  const handlePedidos = () => navigation.navigate("Pedidos");

  // 🧃 Lista de categorías mostradas en la sección "CATEGORÍAS" del Home
  const categorias = [
    { nombre: "Bebidas", icon: require("../assets/icons/bebidas.png"), color: "#fcebd9" },
    { nombre: "Lácteos", icon: require("../assets/icons/lacteos.png"), color: "#e5ecf8" },
    { nombre: "Carnes", icon: require("../assets/icons/carnes.png"), color: "#fbe1e3" },
    { nombre: "Verduras", icon: require("../assets/icons/verduras.png"), color: "#e0f2e0" },
  ];

  // 🛍️ Lista de productos que se muestran en la sección "Recomendados"
  const productos = [
    { nombre: "Mermelada", precio: "49.99", img: require("../assets/productos/mermelada.png") },
    { nombre: "Pollo", precio: "29.99", img: require("../assets/productos/pollo.png") },
    { nombre: "Queso", precio: "199.99", img: require("../assets/productos/queso.png") },
    { nombre: "Leche", precio: "49.99", img: require("../assets/productos/leche.png") },
    { nombre: "Manzanilla", precio: "15.99", img: require("../assets/productos/mansanilla.png") },
    { nombre: "Ace", precio: "25.99", img: require("../assets/productos/ace.png") },
  ];

  // 🧩 Render principal — pasamos todos los datos y funciones al componente <Home />
  return (
    <Home
      nombre={user?.nombre || "Usuario"}                 // 👤 Muestra el saludo con el nombre del usuario
      categorias={categorias}         // 🧃 Muestra la lista de categorías
      productos={productos}           // 🛍️ Muestra los productos recomendados
      onLocationPress={handleLocation} // 🗺️ Se ejecuta al pulsar algo que lleve a "Ubicación"
      onPedidosPress={handlePedidos}   // 🛒 Se ejecuta al pulsar "Ver pedidos"
    />
  );
}
