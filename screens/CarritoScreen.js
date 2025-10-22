// screens/CarritoScreen.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import CarritoLista from "../components/carrito/CarritoLista";
import CarritoResumen from "../components/carrito/CarritoResumen";
import ProductList from "../components/productos/ProductList";
import productosData from "../data/producto.json"; // ✅ RUTA CORRECTA según tu estructura

// 🔹 Mapa de imágenes (React Native no permite require dinámico en JSON)
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
  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState([]);

  // 🔹 Cargar productos desde JSON y asignar imagen correspondiente
  useEffect(() => {
    const dataConImagen = productosData.map((p) => ({
      ...p,
      img: imageMap[p.nombre],
    }));
    setProductos(dataConImagen);
  }, []);

  // 🔹 Cargar carrito guardado
  useEffect(() => {
    const cargarCarrito = async () => {
      try {
        const data = await AsyncStorage.getItem("carrito");
        if (data) setCarrito(JSON.parse(data));
      } catch (error) {
        console.error("Error al cargar carrito:", error);
      }
    };
    cargarCarrito();
  }, []);

  // 🔹 Guardar carrito cuando cambie
  useEffect(() => {
    AsyncStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // 🔹 Agregar producto
  const agregarProducto = (p) =>
    setCarrito((prev) => [...prev, { ...p, id: Date.now() }]);

  // 🔹 Eliminar producto
  const eliminarProducto = (id) =>
    setCarrito((prev) => prev.filter((p) => p.id !== id));

  // 🔹 Agregar desde Home (si viene por route.params)
  useEffect(() => {
    if (route.params?.producto) {
      const nuevo = route.params.producto;
      if (!carrito.find((p) => p.nombre === nuevo.nombre)) {
        agregarProducto(nuevo);
      }
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <CarritoLista productos={carrito} onEliminar={eliminarProducto} />
      <CarritoResumen productos={carrito} />
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
    paddingBottom: 80, // 🔹 espacio para el resumen o botón fijo
  },
});
