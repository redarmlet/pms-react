import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import { CartProvider } from '../../context/CartContext';
import Navbar from './navbar';

describe('Componente Navbar', () => {
  
  beforeEach(() => {
    localStorage.clear();
  });

  it('muestra el nombre del usuario y la opción "Cerrar Sesión" con sesión activa', async () => {
    
    const usuarioSimulado = userEvent.setup();

    const usuarioFalso = {
      id: 'USR-TEST',
      nombre: 'AdminTest',
      tipo: 'admin'
    };
    localStorage.setItem('pms_sesion', JSON.stringify(usuarioFalso));

    render(
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Navbar />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    );

    const nombreUsuario = screen.getByText('AdminTest');
    expect(nombreUsuario).toBeInTheDocument();

    await usuarioSimulado.click(nombreUsuario);

    const btnCerrarSesion = screen.getByText(/Cerrar Sesión/i);
    expect(btnCerrarSesion).toBeInTheDocument();
  });
});