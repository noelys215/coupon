import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';

// Mocking navigator.clipboard
const mockClipboard = {
	writeText: jest.fn(),
	readText: jest.fn(),
};

Object.defineProperty(global.navigator, 'clipboard', {
	value: mockClipboard,
});

describe('App', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should copy to clipboard and clear input on button click', async () => {
		const { getByPlaceholderText, getByText, queryByText } = render(<App />);

		const input = getByPlaceholderText('Enter Subtotal');
		const pasteButton = getByText('PASTE');

		// Set clipboard data
		mockClipboard.readText.mockResolvedValue('1234.56');

		// Act on the input field to make sure something is there before clearing
		await act(async () => {
			fireEvent.change(input, { target: { value: '1234.56' } });
		});

		// Check if the CLEAR button is rendered
		const clearButton = queryByText('CLEAR');
		expect(clearButton).toBeInTheDocument();

		// Act on the CLEAR button
		await act(async () => {
			fireEvent.click(clearButton);
		});

		// Assert that the input field is cleared
		expect(input.value).toBe('');

		// Act on the PASTE button
		await act(async () => {
			fireEvent.click(pasteButton);
		});

		// Assert that the input field is filled with clipboard data
		expect(input.value).toBe('1234.56');
	});
});
