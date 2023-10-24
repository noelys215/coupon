import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

const mockClipboard = {
	writeText: jest.fn(),
};
global.navigator.clipboard = mockClipboard;

beforeEach(() => {
	jest.clearAllMocks();
});

test('handleUpcClick copies the UPC to the clipboard', () => {
	render(<App />);

	const upcButton = screen.getByText('BMSM EOQ - 98153000004823328273281008');
	fireEvent.click(upcButton);

	expect(mockClipboard.writeText).toHaveBeenCalledWith('BMSM EOQ - 98153000004823328273281008');
	expect(screen.getByText('COPIED')).toBeInTheDocument();
});

test('handleResultClick copies the result to the clipboard', () => {
	render(<App />);

	const inputField = screen.getByPlaceholderText('Enter Subtotal');
	fireEvent.change(inputField, { target: { value: '2500' } });

	const resultButton = screen.getByText('250.00');
	fireEvent.click(resultButton);

	expect(mockClipboard.writeText).toHaveBeenCalledWith('250.00');
	expect(screen.getByText('COPIED')).toBeInTheDocument();
});
