import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Nosotros from './nosotros';
describe('PU-003: componente nosotros - valores de la Empresa', () => {
  it('comprueba la carga de los tres valores de la empresa', () => {
    render(<Nosotros />);

    const valorCalidad = screen.getByText('Calidad');
    const valorTradicion = screen.getByText('Tradición');
    const valorInnovacion = screen.getByText('Innovación');

    expect(valorCalidad).toBeInTheDocument();
    expect(valorTradicion).toBeInTheDocument();
    expect(valorInnovacion).toBeInTheDocument();
  });
});