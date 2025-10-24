import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "carrito";

/* 🔹 Obtener carrito completo */
export const getCart = async () => {
  try {
    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("❌ Error al obtener carrito:", err);
    return [];
  }
};

/* 🔹 Guardar carrito actualizado */
const saveCart = async (carrito) => {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(carrito));
  } catch (err) {
    console.error("❌ Error al guardar carrito:", err);
  }
};

/* 🔹 Agregar producto (sin duplicar) */
export const addToCart = async (producto) => {
  const carrito = await getCart();
  const index = carrito.findIndex(
    (p) => p.id === producto.id || p.nombre === producto.nombre
  );

  if (index !== -1) {
    carrito[index].cantidad = (carrito[index].cantidad || 1) + 1;
  } else {
    carrito.push({
      ...producto,
      id: producto.id || Date.now(),
      cantidad: 1,
    });
  }

  await saveCart(carrito);
  return carrito;
};

/* 🔹 Actualizar cantidad de un producto */
export const updateQuantity = async (id, cantidad) => {
  const carrito = await getCart();
  const actualizado = carrito.map((p) =>
    p.id === id ? { ...p, cantidad } : p
  );
  await saveCart(actualizado);
  return actualizado;
};

/* 🔹 Eliminar producto individual */
export const removeFromCart = async (id) => {
  const carrito = await getCart();
  const filtrado = carrito.filter((p) => p.id !== id);
  await saveCart(filtrado);
  return filtrado;
};

/* 🔹 Vaciar carrito completo */
export const clearCart = async () => {
  await AsyncStorage.removeItem(KEY);
};

/* 🔹 Calcular resumen de compra */
export const calcularResumen = (
  carrito,
  cupon = null,
  impuestos = 0.13
) => {
  const subtotal = carrito.reduce(
    (acc, p) => acc + (Number(p.precio) || 0) * (p.cantidad || 1),
    0
  );

  const descuento = cupon ? subtotal * (cupon.descuento / 100) : 0;
  const totalConImpuesto = (subtotal - descuento) * (1 + impuestos);

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    descuento: parseFloat(descuento.toFixed(2)),
    impuestos: parseFloat((subtotal * impuestos).toFixed(2)),
    total: parseFloat(totalConImpuesto.toFixed(2)),
  };
};

/* 🔹 Reiniciar carrito (para debug o logout) */
export const resetCart = async (productos = []) => {
  await saveCart(productos);
};
