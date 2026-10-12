import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import Login from './login';

describe('Página de Login', () => {
  it('muestra mensaje de error con credenciales incorrectas', async () => {
    
    const usuarioSimulado = userEvent.setup();

    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    const inputCorreo = screen.getByLabelText(/Correo electrónico/i);
    const inputPassword = screen.getByLabelText(/Contraseña/i);
    const btnIngresar = screen.getByRole('button', { name: /Ingresar/i });

    await usuarioSimulado.type(inputCorreo, 'falso@a.cl');
    await usuarioSimulado.type(inputPassword, '123');
    await usuarioSimulado.click(btnIngresar);

    const mensajeError = screen.getByText(/Correo o contraseña incorrectos/i);
    expect(mensajeError).toBeInTheDocument();
  });
});