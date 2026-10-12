import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import Registro from './registro';

describe('Página de Registro', () => {
  it('bloquea el registro y muestra error si las contraseñas no coinciden', async () => {
    
    const usuarioSimulado = userEvent.setup();

    render(
      <BrowserRouter>
        <AuthProvider>
          <Registro />
        </AuthProvider>
      </BrowserRouter>
    );

    await usuarioSimulado.type(screen.getByLabelText('Nombre'), 'Juan');
    await usuarioSimulado.type(screen.getByLabelText('Apellido'), 'Pérez');
    await usuarioSimulado.type(screen.getByLabelText('Fecha de nacimiento'), '1990-01-01');
    await usuarioSimulado.type(screen.getByLabelText('Correo electrónico'), 'juan@ejemplo.cl');
    
    await usuarioSimulado.selectOptions(screen.getByRole('combobox'), 'Santiago');
    
    await usuarioSimulado.type(screen.getByLabelText('Calle'), 'Independencia');
    await usuarioSimulado.type(screen.getByLabelText('Número'), '123');

    await usuarioSimulado.type(screen.getByLabelText('Contraseña'), '123456');
    await usuarioSimulado.type(screen.getByLabelText('Confirmar contraseña'), '123123');

    const btnCrear = screen.getByRole('button', { name: /Crear cuenta/i });
    await usuarioSimulado.click(btnCrear);

    const mensajeError = screen.getByText('Las contraseñas no coinciden.');
    expect(mensajeError).toBeInTheDocument();
  });
});