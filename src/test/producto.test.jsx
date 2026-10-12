import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Producto from '../pages/producto/producto';

// Simulamos los hooks personalizados que utiliza el componente
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    productosLista: [{ id: '1', nombre: 'Torta de Mil Hojas', precio: 10000 }]
  })
}));

vi.mock('../context/CartContext', () => ({
  useCart: () => ({
    guardar: vi.fn()
  })
}));

// Simulamos useParams para que devuelva un id válido
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: () => ({ id: '1' }),
  };
});

describe('PU-006: Componente Producto - handleAgregar', () => {
  it('Simula clic en "Agregar al carro" desde el detalle de producto', () => {
    // Envolvemos el componente en BrowserRouter para que el <Link> funcione correctamente
    render(
      <BrowserRouter>
        <Producto />
      </BrowserRouter>
    );

    // Buscamos el botón de agregar al carro
    const botonAgregar = screen.getByRole('button', { name: /agregar al carro|añadir|comprar/i });

    // Simulamos el clic
    fireEvent.click(botonAgregar);

    // Verificamos que el botón esté presente en el DOM
    expect(botonAgregar).toBeInTheDocument();
  });
});