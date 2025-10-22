// screens/CarritoScreen.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

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
  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState([]);
  const [carritoCargado, setCarritoCargado] = useState(false);

  // 🔹 Cargar productos
  useEffect(() => {
    const dataConImagen = productosData.map((p) => ({
      ...p,
      img: imageMap[p.nombre],
    }));
    setProductos(dataConImagen);
  }, []);

  // 🔹 Cargar carrito
  useEffect(() => {
    const cargarCarrito = async () => {
      try {
        const data = await AsyncStorage.getItem("carrito");
        if (data) {
          setCarrito(JSON.parse(data));
          console.log("📦 Carrito cargado:", JSON.parse(data));
        } else console.log("⚠️ Sin carrito previo");
      } catch (err) {
        console.error("Error al cargar carrito:", err);
      } finally {
        setCarritoCargado(true);
      }
    };
    cargarCarrito();
  }, []);

  // 🔹 Guardar carrito cuando cambie
  useEffect(() => {
    if (carritoCargado) {
      AsyncStorage.setItem("carrito", JSON.stringify(carrito));
      console.log("💾 Guardado en AsyncStorage:", carrito);
    }
  }, [carrito]);

  // 🛒 Agregar o aumentar producto existente
  const agregarProducto = (p) => {
    console.log("🛒 Intentando agregar:", p);

    setCarrito((prev) => {
      // Verificar si ya existe
      const existente = prev.find((item) => item.nombre === p.nombre);

      if (existente) {
        // Si existe, aumentar cantidad
        console.log("🔁 Producto ya existe, aumentando cantidad...");
        return prev.map((item) =>
          item.nombre === p.nombre
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item
        );
      } else {
        // Si no existe, agregar con cantidad = 1
        console.log("🆕 Nuevo producto agregado.");
        return [...prev, { ...p, id: Date.now(), cantidad: 1 }];
      }
    });
  };

  // 🗑️ Eliminar producto
  const eliminarProducto = (id) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  // 🚀 Agregar directo desde Home (solo si el carrito ya está cargado)
  useEffect(() => {
    if (carritoCargado && route.params?.producto && route.params?.agregarDirecto) {
      const nuevo = route.params.producto;
      agregarProducto(nuevo);
      route.params.agregarDirecto = false;
    }
  }, [route.params, carritoCargado]);

  return (
    <View style={styles.container}>
      <CarritoLista productos={carrito} onEliminar={eliminarProducto} />
      <CarritoResumen productos={carrito} />
      <ProductList productos={productos} modo="carrito" onAgregar={agregarProducto} />
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
