// screens/CarritoScreen.js
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import {
  addToCart,
  calcularResumen,
  clearCart,
  getCart,
  removeFromCart,
  updateQuantity,
} from "../utils/carritoStorage";

import CarritoLista from "../components/carrito/CarritoLista";
import CarritoResumen from "../components/carrito/CarritoResumen";
import ProductList from "../components/productos/ProductList";
import productosData from "../data/producto.json";

const imageMap = {
  Ace: require("../assets/productos/ace.png"),
  Leche: require("../assets/productos/leche.png"),
  Manzanilla: require("../assets/productos/mansanilla.png"),
  Mermelada: require("../assets/productos/mermelada.png"),
  Pollo: require("../assets/productos/pollo.png"),
  Queso: require("../assets/productos/queso.png"),
};

export default function CarritoScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState([]);
  const [resumen, setResumen] = useState(null);
  const [carritoCargado, setCarritoCargado] = useState(false);

  // 🟢 Cargar productos con imágenes locales
  useEffect(() => {
    const dataConImagen = productosData.map((p) => ({
      ...p,
      img: imageMap[p.nombre],
    }));
    setProductos(dataConImagen);
    console.log("🖼️ Productos cargados:", dataConImagen.map((p) => p.nombre));
  }, []);

  // 🟢 Cargar carrito desde AsyncStorage
  useEffect(() => {
    const cargar = async () => {
      console.log("📦 Intentando cargar carrito desde AsyncStorage...");
      const data = await getCart();
      console.log("✅ Carrito obtenido:", data);
      setCarrito(data);
      setResumen(calcularResumen(data));
      setCarritoCargado(true);
    };
    cargar();
  }, []);

  // 🟢 Agregar producto
  const agregarProducto = async (p) => {
    console.log("➕ Solicitando agregar producto:", p.nombre);
    await addToCart(p);
    const actualizado = await getCart();
    console.log("📦 Carrito tras agregar:", actualizado);
    setCarrito(actualizado);
    setResumen(calcularResumen(actualizado));
  };

  // 🗑️ Eliminar producto individual
  const eliminarProducto = async (id) => {
    console.log("🗑️ Eliminando producto con id:", id);
    const actualizado = await removeFromCart(id);
    console.log("📦 Carrito tras eliminar:", actualizado);
    setCarrito(actualizado);
    setResumen(calcularResumen(actualizado));
  };

  // 🔄 Actualizar cantidad manualmente
  const actualizarCantidad = async (id, nuevaCantidad) => {
    console.log(`🔢 Actualizando cantidad (id: ${id}) → ${nuevaCantidad}`);
    const actualizado = await updateQuantity(id, nuevaCantidad);
    console.log("📦 Carrito tras actualizar cantidad:", actualizado);
    setCarrito(actualizado);
    setResumen(calcularResumen(actualizado));
  };

  // 🧹 Vaciar todo el carrito
  const vaciarCarrito = async () => {
    console.log("⚠️ Vaciando carrito completo...");
    await clearCart();
    setCarrito([]);
    setResumen(calcularResumen([]));
    console.log("✅ Carrito vaciado correctamente");
  };

  // 🚀 Agregar directo desde Home (evita duplicar)
useEffect(() => {
  if (
    carritoCargado &&
    route.params?.producto &&
    route.params?.agregarDirecto
  ) {
    const producto = route.params.producto;

    console.log("🚀 Recibido producto desde Home:", producto.nombre);

    agregarProducto(producto);

    // 🧩 Previene doble ejecución inmediata
    setTimeout(() => {
      navigation.setParams({ producto: null, agregarDirecto: false });
    }, 200);
  }
}, [carritoCargado]); // ❌ No incluyas route.params aquí


  // 👀 Debug general del estado del carrito
  useEffect(() => {
    if (carrito.length > 0)
      console.log(
        "🧾 Carrito actualizado:",
        carrito.map((p) => `${p.nombre} x${p.cantidad}`)
      );
    else console.log("🛒 Carrito vacío actualmente");
  }, [carrito]);

  return (
    <View style={styles.container}>
      <CarritoLista
        productos={carrito}
        onEliminar={eliminarProducto}
        onCantidadChange={actualizarCantidad}
      />

      <CarritoResumen productos={carrito} resumen={resumen} />

      <ProductList
        productos={productos}
        modo="carrito"
        onAgregar={agregarProducto}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8F9",
    paddingVertical: 10,
    paddingBottom: 80,
  },
});
