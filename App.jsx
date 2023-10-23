import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Input } from '@nextui-org/react';

export default function App() {
	const [number, setNumber] = useState('');
	const [result, setResult] = useState(null);
	const [percentage, setPercentage] = useState(null);
	const [showClickedText, setShowClickedText] = useState(false);
	const [showUpcText, setShowUpcText] = useState(false);
	// Current UPC
	const upc = 'BMSM EOQ - 98153000004823328273281008';

	const calculatePercentage = (value) => {
		// Initialize the percentage variable to store the discount rate
		let percentage = 0;
		// If the value is less than 2000, set the discount rate to 5%
		if (value < 2000) {
			percentage = 5;
			// If the value is between 2000 and 4000 (inclusive), set the discount rate to 10%
		} else if (value >= 2000 && value <= 4000) {
			percentage = 10;
			// If the value is greater than 4000, set the discount rate to 15%
		} else if (value > 4000) {
			percentage = 15;
		}
		// Update the percentage state with the calculated discount rate
		setPercentage(percentage);
		// Calculate and return the discounted amount by applying the discount rate to the input value
		return (value * percentage) / 100;
	};

	const handleChange = (event) => {
		const inputValue = event.target.value;
		const numericValue = parseFloat(inputValue);
		if (!isNaN(numericValue) && numericValue.toString() === inputValue) {
			setNumber(inputValue);
			const calculatedResult = calculatePercentage(numericValue);
			setResult(calculatedResult);
		} else if (inputValue === '') {
			setNumber('');
			setResult(null);
			setPercentage(null);
		}
	};

	const handleResultClick = () => {
		navigator.clipboard.writeText(result?.toFixed(2));
		setShowClickedText(true);
		setTimeout(() => setShowClickedText(false), 200);
	};

	const handleUpcClick = () => {
		navigator.clipboard.writeText(upc);
		setShowUpcText(true);
		setTimeout(() => setShowUpcText(false), 200);
	};

	return (
		<Card className="w-[400px]">
			<CardHeader className="flex gap-2 justify-center">
				<p style={{ fontSize: '1.3rem' }}>Percentage:</p> {!percentage && '🏴‍☠️'}
				<div className="flex flex-col">
					<p>{percentage !== null && <span>{percentage}%</span>}</p>
				</div>
			</CardHeader>
			<Divider />
			<CardBody className="flex gap-3">
				{/* Input Subtotal Here */}
				<Input
					style={{ textAlign: 'center' }}
					type="number"
					value={number}
					onChange={handleChange}
					placeholder="Enter Subtotal"
					variant="bordered"
				/>
				{/* Result Displayed Here */}
				<Input
					color="primary"
					style={{ textAlign: 'center', cursor: 'pointer' }}
					type="number"
					value={showClickedText ? 'copied' : result?.toFixed(2)}
					placeholder={showClickedText ? 'COPIED' : 'Result'}
					readOnly
					onClick={handleResultClick}
				/>
			</CardBody>
			<Divider />

			<CardFooter className="justify-center">
				<Input
					color="primary"
					style={{ textAlign: 'center', cursor: 'pointer' }}
					type="text"
					value={showUpcText ? 'COPIED' : upc}
					placeholder={showUpcText ? 'COPIED' : upc}
					readOnly
					onClick={handleUpcClick}
				/>
			</CardFooter>
			<Divider />
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
