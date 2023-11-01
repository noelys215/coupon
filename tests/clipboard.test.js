import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { upc } from '../src/utils/utils';
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

	const upcButton = screen.getByText(upc);
	fireEvent.click(upcButton);

	expect(mockClipboard.writeText).toHaveBeenCalledWith(upc);
	expect(screen.getByText('COPIED')).toBeInTheDocument();
});

test('handleResultClick copies the result to the clipboard', () => {
	render(<App />);

	const inputField = screen.getByPlaceholderText('Enter Subtotal');
	fireEvent.change(inputField, { target: { value: '2500' } });

	const resultButton = screen.getByText('-250.00');
	fireEvent.click(resultButton);

	expect(mockClipboard.writeText).toHaveBeenCalledWith('-250.00');
	expect(screen.getByText('COPIED')).toBeInTheDocument();
});
