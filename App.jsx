import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Input } from '@nextui-org/react';

export default function App() {
	const [state, setState] = useState({
		number: '',
		result: null,
		percentage: null,
		showClickedText: false,
		showUpcText: false,
	});

	// Current UPC
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
		const inputValue = event.target.value;
		const numericValue = parseFloat(inputValue);
		if (!isNaN(numericValue) && numericValue.toString() === inputValue) {
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
			navigator.clipboard.writeText(state.result.toFixed(2));
			setState((prev) => ({ ...prev, showClickedText: true }));
			resultTimeoutId.current = setTimeout(
				() => setState((prev) => ({ ...prev, showClickedText: false })),
				200
			);
		}
	};

	const handleUpcClick = () => {
		navigator.clipboard.writeText(upc);
		setState((prev) => ({ ...prev, showUpcText: true }));
		upcTimeoutId.current = setTimeout(
			() => setState((prev) => ({ ...prev, showUpcText: false })),
			200
		);
	};

	return (
		<Card className="w-[400px]">
			<CardHeader className="flex gap-2 justify-center">
				<p style={{ fontSize: '1.3rem' }}>Percentage:</p> {!state?.percentage && '🏴‍☠️'}
				<div className="flex flex-col">
					<p>{state?.percentage !== null && <span>{state?.percentage}%</span>}</p>
				</div>
			</CardHeader>
			<Divider />
			<CardBody className="flex gap-3">
				{/* Input Subtotal Here */}
				<Input
					style={{ textAlign: 'center' }}
					type="number"
					value={state?.number}
					onChange={handleChange}
					placeholder="Enter Subtotal"
					variant="bordered"
				/>
				{/* Result Displayed Here */}
				<Input
					color="primary"
					style={{ textAlign: 'center', cursor: 'pointer' }}
					type="number"
					value={state?.showClickedText ? 'copied' : state?.result?.toFixed(2)}
					placeholder={state?.showClickedText ? 'COPIED' : 'Result'}
					readOnly
					onClick={handleResultClick}
				/>
			</CardBody>
			<Divider />
			{/* UPC */}
			<CardFooter className="justify-center">
				<Input
					color="primary"
					style={{ textAlign: 'center', cursor: 'pointer' }}
					type="text"
					value={state?.showUpcText ? 'COPIED' : upc}
					placeholder={state?.showUpcText ? 'COPIED' : upc}
					readOnly
					onClick={handleUpcClick}
				/>
			</CardFooter>
			<Divider />
			{/* Disclaimer */}
			<CardFooter
				className="justify-center"
				style={{ textAlign: 'center', textTransform: 'uppercase' }}>
				<p>
					no affiliation with any company{<br />}
					any upc similarities are pure coincidence
				</p>
			</CardFooter>
		</Card>
	);
}
