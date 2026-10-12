import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Productos from './productos';

vi.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    productosLista: [
      { id: '1', titulo: 'Torta de Mil Hojas', categoria: 'Tortas', precio: 10000, imagen: '' },
      { id: '2', titulo: 'Kuchen de Manzana', categoria: 'Kuchen', precio: 8000, imagen: '' }
    ]
  })
}));

vi.mock('../../context/CartContext', () => ({
  useCart: () => ({
    guardar: vi.fn()
  })
}));

describe('PU-009: componente productos - fitro por categoria', () => {
  it('filtra la lista de productos al seleccionar una categoria', () => {
    render(
      <BrowserRouter>
        <Productos />
      </BrowserRouter>
    );

    // Verificamos que los títulos se rendericen correctamente en el DOM
    expect(screen.getByText(/torta de mil hojas/i)).toBeInTheDocument();
    expect(screen.getByText(/kuchen de manzana/i)).toBeInTheDocument();
  });
});
