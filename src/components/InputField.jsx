import React from 'react';
import { Input, Button } from '@nextui-org/react';
import { calculatePercentage } from '../utils/utils';
import { useGlobalState } from '../context/GlobalStateContext';

export default function InputField({ value, number }) {
	// Global States
	const [state, setState] = useGlobalState();
	//
	const handleChange = (event) => {
		let inputValue = event.target.value;

		// Remove any non-numeric characters except for the decimal point
		inputValue = inputValue.replace(/[^\d.]/g, '');

		const numericValue = parseFloat(inputValue);

		if (!isNaN(numericValue)) {
			const { discountedAmount, percentage } = calculatePercentage(numericValue);
			setState((prev) => ({
				...prev,
				number: inputValue,
				result: discountedAmount,
				percentage,
			}));
		} else if (inputValue === '') {
			setState({
				number: '',
				result: null,
				percentage: null,
				showClickedText: false,
				showUpcText: false,
			});
		}
	};

	// Handles Paste/Clear, toggles between pasting from clipboard and clearing the input
	const handlePasteClearClick = async () => {
		if (state.number) {
			// If there is something in the input, clear it
			setState({
				...state,
				number: '',
				result: null,
				percentage: null,
			});
		} else {
			// If the input is empty, try to paste from the clipboard
			try {
				const text = await navigator.clipboard.readText();
				// Remove $ signs, commas, and any non-numeric characters except for the decimal point
				const cleanedText = text.replace(/[$,]/g, '').replace(/[^\d.]/g, '');
				const numericValue = parseFloat(cleanedText);

				if (!isNaN(numericValue)) {
					setState({
						...state,
						number: cleanedText,
						result: null,
						percentage: null,
					});
					calculatePercentage(numericValue);
				}
			} catch (err) {
				console.error('Failed to read clipboard contents: ', err);
			}
		}
	};

	return (
		<>
			<Input
				style={{ textAlign: 'center' }}
				type="text"
				value={value}
				onChange={handleChange}
				placeholder="Enter Subtotal"
				variant="bordered"
			/>
			<Button
				onClick={handlePasteClearClick}
				variant={number ? 'ghost' : 'solid'}
				color="warning">
				{number ? 'CLEAR' : 'PASTE'}
			</Button>
		</>
	);
}
