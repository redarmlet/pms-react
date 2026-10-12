import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Footer from './footer';

describe('Componente Footer', () => {
  it('renderiza correctamente e imprime su HTML en consola', () => {
    
    const componente = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    console.log("||HTML DEL FOOTER||");
    componente.debug(); 

    const textoDerechos = screen.getByText(/2026 - todos los derechos reservados/i);
    
    expect(textoDerechos).toBeInTheDocument();
  });
});