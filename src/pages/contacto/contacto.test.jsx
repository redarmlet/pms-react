
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';
import Contacto from './Contacto';

describe('Prueba de Estado en Campos de Formulario', () => {
  it('verifica que el campo nombre permite escribir', () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );

    const inputNombre = screen.getByLabelText(/nombre completo/i);

    expect(inputNombre).toHaveValue('');

    fireEvent.change(inputNombre, {
      target: { value: 'Frantz Arthur' },
    });

    expect(inputNombre).toHaveValue('Frantz Arthur');
  });
});
