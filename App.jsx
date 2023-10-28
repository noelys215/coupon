import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Input, Button } from '@nextui-org/react';

export default function App() {
	const [state, setState] = useState({
		number: '',
		result: null,
		percentage: null,
		showClickedText: false,
		showUpcText: false,
	});

	// Current UPC -
	//TODO Will Be Replaced
	const upc = 'BMSM EOQ - 98153000004823328273281008';
	//
	const resultTimeoutId = useRef(null);
	const upcTimeoutId = useRef(null);

	useEffect(() => {
		// Cleanup timeouts when component unmounts
		return () => {
			if (resultTimeoutId.current) clearTimeout(resultTimeoutId.current);
			if (upcTimeoutId.current) clearTimeout(upcTimeoutId.current);
		};
	}, []);

	const calculatePercentage = (value) => {
		let percentage = 0;
		if (value < 2000) {
			percentage = 5;
		} else if (value <= 4000) {
			percentage = 10;
		} else {
			percentage = 15;
		}
		const discountedAmount = (value * percentage) / 100;
		setState((prev) => ({ ...prev, result: discountedAmount, percentage }));
	};

	const handleChange = (event) => {
		let inputValue = event.target.value;

		// Remove any non-numeric characters except for the decimal point
		inputValue = inputValue.replace(/[^\d.]/g, '');

		const numericValue = parseFloat(inputValue);

		if (!isNaN(numericValue)) {
			setState((prev) => ({ ...prev, number: inputValue }));
			calculatePercentage(numericValue);
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

	const handleResultClick = () => {
		if (state.result !== null) {
			navigator.clipboard.writeText('-' + state.result.toFixed(2));
			setState((prev) => ({ ...prev, showClickedText: true }));
			resultTimeoutId.current = setTimeout(
				() => setState((prev) => ({ ...prev, showClickedText: false })),
				350
			);
		}
	};

	const handleUpcClick = () => {
		navigator.clipboard.writeText(upc);
		setState((prev) => ({ ...prev, showUpcText: true }));
		upcTimeoutId.current = setTimeout(
			() => setState((prev) => ({ ...prev, showUpcText: false })),
			350
		);
	};

	//
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
		<Card
			className="w-[400px]"
			style={{ border: 'solid 2px #FFFFF0', fontFamily: 'Inter', fontWeight: 200 }}>
			<CardHeader className="flex gap-2 justify-center">
				<p style={{ fontSize: '1.3rem', color: '#FFFFF0' }}>Percentage:</p>{' '}
				{!state?.percentage && '🏴‍☠️'}
				<div className="flex flex-col">
					<p>{state?.percentage !== null && <span>{state?.percentage}%</span>}</p>
				</div>
			</CardHeader>
			<Divider />
			<CardBody className="flex gap-3">
				<div style={{ display: 'flex', gap: 10 }}>
					{/* Input Subtotal Here */}
					<Input
						style={{ textAlign: 'center' }}
						type="text"
						value={state?.number}
						onChange={handleChange}
						placeholder="Enter Subtotal"
						variant="bordered"
					/>
					<Button
						onClick={handlePasteClearClick}
						variant={state?.number ? 'ghost' : 'solid'}
						color="warning">
						{state.number ? 'CLEAR' : 'PASTE'}
					</Button>
				</div>

				{/* Result Displayed Here */}
				<Button
					onClick={handleResultClick}
					color={!state.result ? 'danger' : 'success'}
					disabled={!state?.result}
					style={{ color: '#FFFFF0' }}>
					{state?.showClickedText
						? 'COPIED'
						: state?.result
						? '-' + state?.result.toFixed(2)
						: 'DISCOUNT'}
				</Button>

				{/* UPC */}
				<Divider />
				<Button onClick={handleUpcClick} color="secondary" style={{ color: '#FFFFF0' }}>
					{state?.showUpcText ? 'COPIED' : upc}
				</Button>
			</CardBody>
			<Divider />

			{/* Disclaimer */}
			<CardFooter
				className="justify-center"
				style={{
					textAlign: 'center',
					color: '#FFFFF0',
					fontSize: '.9rem',
				}}>
				<p>
					Not associated with any corporation.{<br />}
					Any UPC resemblances are entirely coincidental.
				</p>
			</CardFooter>
		</Card>
	);
}
