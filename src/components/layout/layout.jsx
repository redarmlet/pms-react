import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import Carrito from '../carrito/carrito';

export default function Layout() {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>
      <Carrito />
      <Footer />
    </>
  );
}
