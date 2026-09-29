import React, { createContext, useContext, useState, useEffect } from 'react';
import { CUENTAS_INICIALES, productos as PRODUCTOS_INICIALES } from '../data/datos';

const AuthContext = createContext();

const LLAVE_USUARIOS = "pms_usuarios";
const LLAVE_SESION = "pms_sesion";
const LLAVE_COMPRAS = "pms_compras";
const LLAVE_PRODUCTOS = "pms_productos";

export const AuthProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState(() => {
    const guardados = JSON.parse(localStorage.getItem(LLAVE_USUARIOS) || "[]");
    CUENTAS_INICIALES.forEach(cuenta => {
      if (!guardados.some(u => u.id === cuenta.id)) {
        guardados.unshift(cuenta);
      }
    });
    localStorage.setItem(LLAVE_USUARIOS, JSON.stringify(guardados));
    return guardados;
  });

  const [sesion, setSesion] = useState(() => {
    const datos = localStorage.getItem(LLAVE_SESION);
    return datos ? JSON.parse(datos) : null;
  });

  const [compras, setCompras] = useState(() => {
    return JSON.parse(localStorage.getItem(LLAVE_COMPRAS) || "[]");
  });

  const [productosLista, setProductosLista] = useState(() => {
    const guardados = JSON.parse(localStorage.getItem(LLAVE_PRODUCTOS) || "[]");
    if (guardados.length === 0) {
      localStorage.setItem(LLAVE_PRODUCTOS, JSON.stringify(PRODUCTOS_INICIALES));
      return PRODUCTOS_INICIALES;
    }
    return guardados;
  });

  const guardarUsuario = (usuario) => {
    setUsuarios(prev => {
      const nueva = [...prev, usuario];
      localStorage.setItem(LLAVE_USUARIOS, JSON.stringify(nueva));
      return nueva;
    });
  };

  const actualizarUsuario = (usuarioActualizado) => {
    setUsuarios(prev => {
      const nueva = prev.map(u => u.id === usuarioActualizado.id ? usuarioActualizado : u);
      localStorage.setItem(LLAVE_USUARIOS, JSON.stringify(nueva));
      return nueva;
    });
    if (sesion && sesion.id === usuarioActualizado.id) {
      setSesion(usuarioActualizado);
      localStorage.setItem(LLAVE_SESION, JSON.stringify(usuarioActualizado));
    }
  };

  const iniciarSesion = (usuario) => {
    setSesion(usuario);
    localStorage.setItem(LLAVE_SESION, JSON.stringify(usuario));
  };

  const cerrarSesion = () => {
    setSesion(null);
    localStorage.removeItem(LLAVE_SESION);
  };

  const guardarCompra = (compra) => {
    setCompras(prev => {
      const nueva = [...prev, compra];
      localStorage.setItem(LLAVE_COMPRAS, JSON.stringify(nueva));
      return nueva;
    });
  };

  const actualizarCompra = (compraActualizada) => {
    setCompras(prev => {
      const nueva = prev.map(c => c.id === compraActualizada.id ? compraActualizada : c);
      localStorage.setItem(LLAVE_COMPRAS, JSON.stringify(nueva));
      return nueva;
    });
  };

  const guardarProducto = (producto) => {
    setProductosLista(prev => {
      const nueva = [...prev, producto];
      localStorage.setItem(LLAVE_PRODUCTOS, JSON.stringify(nueva));
      return nueva;
    });
  };

  const actualizarProducto = (productoActualizado) => {
    setProductosLista(prev => {
      const nueva = prev.map(p => p.id === productoActualizado.id ? productoActualizado : p);
      localStorage.setItem(LLAVE_PRODUCTOS, JSON.stringify(nueva));
      return nueva;
    });
  };

  const calcularEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return 0;
    const hoy = new Date();
    const nac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nac.getFullYear();
    const m = hoy.getMonth() - nac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;
    return edad;
  };

  const esMayorDe50 = (usuario) => {
    if (!usuario || !usuario.fechaNacimiento) return false;
    return calcularEdad(usuario.fechaNacimiento) >= 50;
  };

  const tieneCodigo = (usuario) => {
    return !!(usuario && (usuario.codigoReferencia || "").toUpperCase() === "FELICES50");
  };

  const esDuoc = (usuario) => {
    return !!(usuario && usuario.correo && usuario.correo.toLowerCase().endsWith("@duocuc.cl"));
  };

  const esCumpleaniosHoy = (usuario) => {
    if (!usuario || !usuario.fechaNacimiento) return false;
    const hoy = new Date();
    const nac = new Date(usuario.fechaNacimiento);
    return hoy.getMonth() === nac.getMonth() && hoy.getDate() === nac.getDate();
  };

  const obtenerDescuento = (usuario) => {
    if (!usuario) return { porcentaje: 0, descripcion: "" };
    if (esMayorDe50(usuario)) {
      return { porcentaje: 50, descripcion: "Descuento 50% (mayor de 50 años)" };
    }
    if (tieneCodigo(usuario)) {
      return { porcentaje: 10, descripcion: "Descuento 10% (código FELICES50)" };
    }
    return { porcentaje: 0, descripcion: "" };
  };

  const tieneTortaGratis = (usuario) => {
    return esDuoc(usuario) && esCumpleaniosHoy(usuario);
  };

  return (
    <AuthContext.Provider
      value={{
        usuarios,
        sesion,
        compras,
        productosLista,
        iniciarSesion,
        cerrarSesion,
        guardarUsuario,
        actualizarUsuario,
        guardarCompra,
        actualizarCompra,
        guardarProducto,
        actualizarProducto,
        calcularEdad,
        esMayorDe50,
        tieneCodigo,
        esDuoc,
        esCumpleaniosHoy,
        obtenerDescuento,
        tieneTortaGratis
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
