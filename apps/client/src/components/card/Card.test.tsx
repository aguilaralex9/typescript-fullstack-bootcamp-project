import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import '@testing-library/jest-dom';

jest.mock('@tanstack/react-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('Card Component', () => {
  const cardProps = {
    id: '123',
    image: 'https://via.placeholder.com/150',
    name: 'Test Product',
    price: '1999',
    description: 'This is a test product',
  };

  it('renders card component with correct props', () => {
    render(<Card {...cardProps} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('This is a test product')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
    
    const productImage = screen.getByAltText('Test Product');
    expect(productImage).toHaveAttribute('src', 'https://via.placeholder.com/150');
  });

  it('displays the formatted price correctly', () => {
    render(<Card {...cardProps} />);
    expect(screen.getByText('$19.99')).toBeInTheDocument();
  });
});
