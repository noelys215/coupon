import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App'; // Adjust the import according to your file structure

test('input fields work and display correct percentage', () => {
	render(<App />);

	// Find the input field
	const inputField = screen.getByPlaceholderText('Enter Subtotal');

	// Type a value into the input field
	fireEvent.change(inputField, { target: { value: '2500' } });

	// Check if the result and percentage are displayed correctly
	expect(screen.getByText('250.00')).toBeInTheDocument();
	expect(screen.getByText('10%')).toBeInTheDocument();

	// Test with another value
	fireEvent.change(inputField, { target: { value: '4500' } });

	// Check if the result and percentage are updated correctly
	expect(screen.getByText('675.00')).toBeInTheDocument();
	expect(screen.getByText('15%')).toBeInTheDocument();
});
