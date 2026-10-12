import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Producto from './producto'; // Como el test está al lado de producto.jsx, se importa directo

<<<<<<< HEAD:src/test/producto.test.jsx
vi.mock('../context/AuthContext', () => ({
=======
// Mock de AuthContext ajustando la ruta a dos niveles arriba (src/context/...)
vi.mock('../../context/AuthContext', () => ({
>>>>>>> 6005ce5 (cambio de lugar los test):src/pages/producto/producto.test.jsx
  useAuth: () => ({
    productosLista: [{ id: '1', nombre: 'Torta de Mil Hojas', precio: 10000 }]
  })
}));

// Mock de CartContext subiendo dos niveles
vi.mock('../../context/CartContext', () => ({
  useCart: () => ({
    guardar: vi.fn()
  })
}));

<<<<<<< HEAD:src/test/producto.test.jsx
=======
// Simulamos useParams
>>>>>>> 6005ce5 (cambio de lugar los test):src/pages/producto/producto.test.jsx
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: () => ({ id: '1' }),
  };
});

describe('PU-006: Componente Producto - handleAgregar', () => {
  it('Simula clic en "Agregar al carro" desde el detalle de producto', () => {
    render(
      <BrowserRouter>
        <Producto />
      </BrowserRouter>
    );

    const botonAgregar = screen.getByRole('button', { name: /agregar al carro|añadir|comprar/i });
<<<<<<< HEAD:src/test/producto.test.jsx

=======
>>>>>>> 6005ce5 (cambio de lugar los test):src/pages/producto/producto.test.jsx
    fireEvent.click(botonAgregar);

    expect(botonAgregar).toBeInTheDocument();
  });
});
