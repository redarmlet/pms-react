import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import Perfil from './perfil';

const crearFechaNacimiento = (edad) => {
  const fecha = new Date();
  fecha.setFullYear(fecha.getFullYear() - edad);

  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');

  return `${anio}-${mes}-${dia}`;
};

const renderPerfilConEdad = (edad) => {
  localStorage.setItem(
    'pms_sesion',
    JSON.stringify({
      id: 'usuario-prueba',
      nombre: 'Usuario',
      apellido: 'Prueba',
      correo: 'usuario@ejemplo.cl',
      fechaNacimiento: crearFechaNacimiento(edad),
      direccion: {},
    }),
  );

  return render(
    <MemoryRouter>
      <AuthProvider>
        <Perfil />
      </AuthProvider>
    </MemoryRouter>,
  );
};

describe('Beneficios especiales del perfil', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('muestra el beneficio para un usuario mayor de 50 años', () => {
    renderPerfilConEdad(55);

    expect(
      screen.getByText(/50% de descuento en todos los productos/i),
    ).toBeInTheDocument();
    expect(screen.getByText('+50 años')).toBeInTheDocument();
  });

  it('no muestra el beneficio para un usuario de 50 años o menos', () => {
    renderPerfilConEdad(30);

    expect(
      screen.queryByText(/50% de descuento en todos los productos/i),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('+50 años')).not.toBeInTheDocument();
  });
});
