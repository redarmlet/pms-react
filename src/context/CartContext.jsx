import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();
const LLAVE_CARRITO = "carrito";

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem(LLAVE_CARRITO);
    return guardado ? JSON.parse(guardado) : [];
  });

  const [carritoAbierto, setCarritoAbierto] = useState(false);

  useEffect(() => {
    localStorage.setItem(LLAVE_CARRITO, JSON.stringify(carrito));
  }, [carrito]);

  const precioANumero = (precio) => {
    return parseInt(String(precio).replace(/[^0-9]/g, ""), 10) || 0;
  };

  const guardar = (producto, cantidad = 1, mensaje = "") => {
    setCarrito(prev => {
      const existente = prev.find(item => item.id === producto.id && (item.mensaje || "") === mensaje);
      if (existente) {
        return prev.map(item =>
          item.id === producto.id && (item.mensaje || "") === mensaje
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        return [...prev, { ...producto, cantidad, mensaje }];
      }
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  const cambiarCantidad = (id, delta) => {
    setCarrito(prev => {
      return prev
        .map(item => item.id === id ? { ...item, cantidad: item.cantidad + delta } : item)
        .filter(item => item.cantidad > 0);
    });
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + precioANumero(item.precio) * item.cantidad, 0);
  };

  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

  const abrirCarrito = () => setCarritoAbierto(true);
  const cerrarCarrito = () => setCarritoAbierto(false);

  return (
    <CartContext.Provider
      value={{
        carrito,
        carritoAbierto,
        abrirCarrito,
        cerrarCarrito,
        guardar,
        eliminarDelCarrito,
        cambiarCantidad,
        limpiarCarrito,
        calcularTotal,
        totalItems,
        precioANumero
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
