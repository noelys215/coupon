import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Input } from '@nextui-org/react';

export default function App() {
	const [number, setNumber] = useState('');
	const [result, setResult] = useState(null);
	const [percentage, setPercentage] = useState(null);
	let upc = 'BMSM EOQ - 98153000004823328273281008';

	const calculatePercentage = (value) => {
		let percentage = 0;
		if (value < 2000) {
			percentage = 5;
		} else if (value >= 2000 && value <= 4000) {
			percentage = 10;
		} else if (value > 4000) {
			percentage = 15; // Updated from 10 to 15 for values greater than 4000
		}
		setPercentage(percentage);
		return (value * percentage) / 100;
	};

	const handleChange = (event) => {
		const inputValue = event.target.value;
		setNumber(inputValue);
		if (inputValue) {
			const calculatedResult = calculatePercentage(Number(inputValue));
			setResult(calculatedResult);
		} else {
			setResult(null);
			setPercentage(null);
		}
	};
	return (
		<Card className="w-[400px]">
			<CardHeader className="flex gap-2 justify-center">
				<p className="text-lg">Percentage: </p>
				<div className="flex flex-col">
					<p>{percentage !== null && <span>{percentage}%</span>}</p>
				</div>
			</CardHeader>
			<Divider />
			<CardBody className="flex gap-3">
				<Input
					style={{ textAlign: 'center' }}
					type="number"
					value={number}
					onChange={handleChange}
					placeholder="Enter Subtotal"
					variant="bordered"
				/>
				<Input
					style={{ textAlign: 'center' }}
					type="number"
					value={result.toFixed(2)}
					placeholder="Result"
					readOnly
					onClick={() => navigator.clipboard.writeText(result.toFixed(2))}
				/>
			</CardBody>
			<Divider />

			<CardFooter className="justify-center">
				<Input
					style={{ textAlign: 'center' }}
					type="text"
					value={upc}
					readOnly
					onClick={() => navigator.clipboard.writeText(upc)}
				/>
			</CardFooter>
			<Divider />
			<CardFooter
				className="justify-center"
				style={{ textAlign: 'center', textTransform: 'uppercase' }}>
				no affiliation with any company, any upc similarities are pure coincidence
			</CardFooter>
		</Card>
	);
}
