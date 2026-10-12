
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';
import Inicio from './inicio';

describe('Pruebas de la página Inicio', () => {
  it('debe mostrar el título principal Mil Sabores', () => {
    render(
      <MemoryRouter>
        <Inicio />
      </MemoryRouter>
    );

    const tituloPrincipal = screen.getByRole('heading', {
      level: 1,
    });

    expect(tituloPrincipal).toBeInTheDocument();
    expect(tituloPrincipal).toHaveTextContent(/mil sabores/i);
  });
});
