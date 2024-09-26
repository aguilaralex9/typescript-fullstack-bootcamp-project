import { render, screen, fireEvent } from '@testing-library/react';
import FilterButton from './FilterButton';
import '@testing-library/jest-dom';

describe('FilterButton', () => {
  test('renders button with correct text', () => {
    render(<FilterButton>Click Me</FilterButton>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  test('applies additional props', () => {
    const handleClick = jest.fn();
    
    render(<FilterButton onClick={handleClick}>Click Me</FilterButton>);

    const button = screen.getByRole('button', { name: /click me/i });
    
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('has correct default className', () => {
    render(<FilterButton>Click Me</FilterButton>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    
    expect(button).toHaveClass('hover:underline');
    expect(button).toHaveClass('hover:text-gray-600');
  });
});
