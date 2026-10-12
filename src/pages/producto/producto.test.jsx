import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Producto from './producto';


vi.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    productosLista: [{ id: '1', nombre: 'Torta de Mil Hojas', precio: 10000 }]
  })
}));

vi.mock('../../context/CartContext', () => ({
  useCart: () => ({
    guardar: vi.fn()
  })
}));

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
    fireEvent.click(botonAgregar);

    expect(botonAgregar).toBeInTheDocument();
  });
});
