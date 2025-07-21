import { render, screen } from '@testing-library/react';
import React from 'react';
import Button from './Button';
import { fireEvent } from "@testing-library/react";


const mockChild = "Click me!!!"
const mockOnClick = jest.fn()
const mockAriaLabel = "Mock aria label"

describe('Button Component', () => {
    it('should render the button children', () => {
        render(<Button ariaLabel={mockAriaLabel} onClick={mockOnClick}>{mockChild}</Button>);
        const button = screen.getByText(mockChild);
        expect(button).toBeTruthy()
    });

    it('onclick should be called if button is clicked', () => {
        render(<Button ariaLabel={mockAriaLabel} onClick={mockOnClick}>{mockChild}</Button>);
        const button = screen.getByText(mockChild);
        fireEvent.click(button);
        expect(mockOnClick).toHaveBeenCalled()
    });

    it('aria label is set', () => {
        render(<Button ariaLabel={mockAriaLabel} onClick={mockOnClick}>{mockChild}</Button>);
        const button = screen.getByLabelText(mockAriaLabel);
        expect(button).toBeTruthy()
    });
});
