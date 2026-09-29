import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout/layout';

import Inicio from './pages/inicio/inicio';
import Productos from './pages/productos/productos';
import DetalleProducto from './pages/producto/producto';
import Blog from './pages/blog/blog';
import PmsDestacado from './pages/pmsdestacado/pmsdestacado';
import PmsTortaMilHojas from './pages/pmstortamilhojas/pmstortamilhojas';
import PmsLineaNoAzucar from './pages/pmslineanoazucar/pmslineanoazucar';
import UserPost from './pages/userpost/userpost';
import Nosotros from './pages/nosotros/nosotros';
import Contacto from './pages/contacto/contacto';
import Login from './pages/login/login';
import Registro from './pages/registro/registro';
import Perfil from './pages/perfil/perfil';
import Pago from './pages/pago/pago';
import Admin from './pages/admin/admin';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="productos" element={<Productos />} />
        <Route path="producto/:id" element={<DetalleProducto />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/pmsdestacado" element={<PmsDestacado />} />
        <Route path="blog/pmstortamilhojas" element={<PmsTortaMilHojas />} />
        <Route path="blog/pmslineanoazucar" element={<PmsLineaNoAzucar />} />
        <Route path="blog/userpost" element={<UserPost />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="pago" element={<Pago />} />
        <Route path="admin" element={<Admin />} />
        {/* Ruta comodín */}
        <Route path="*" element={<Inicio />} />
      </Route>
    </Routes>
  );
}