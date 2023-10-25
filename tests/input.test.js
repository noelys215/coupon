import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('App component', () => {
	test('handles input change and calculates percentage', () => {
		render(<App />);
		const input = screen.getByPlaceholderText('Enter Subtotal');
		const resultButton = screen.getByText('DISCOUNT');

		// Test input with a value less than 2000
		fireEvent.change(input, { target: { value: '1500' } });
		expect(input.value).toBe('1500');
		expect(resultButton.textContent).toBe('-75.00');

		// Test input with a value between 2000 and 4000
		fireEvent.change(input, { target: { value: '3500' } });
		expect(input.value).toBe('3500');
		expect(resultButton.textContent).toBe('-350.00');

		// Test input with a value greater than 4000
		fireEvent.change(input, { target: { value: '5000' } });
		expect(input.value).toBe('5000');
		expect(resultButton.textContent).toBe('-750.00');

		// Test input with a non-numeric value
		fireEvent.change(input, { target: { value: 'abcd' } });
		expect(input.value).toBe('');
		expect(resultButton.textContent).toBe('DISCOUNT');
	});
});
