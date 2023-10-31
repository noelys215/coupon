import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider } from '@nextui-org/react';
import UpcButton from './UpcButton';
import ResultButton from './ResultButton';
import InputField from './InputField';

export default function PercentageCalc() {
	const [state, setState] = useState({
		number: '',
		result: null,
		percentage: null,
		showClickedText: false,
		showUpcText: false,
	});

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
					<InputField
						state={state}
						setState={setState}
						value={state?.number}
						number={state?.number}
					/>
				</div>

				{/* Result Displayed Here */}
				<ResultButton
					result={state?.result}
					showClickedText={state?.showClickedText}
					state={state}
					setState={setState}
				/>

				{/* UPC */}
				<Divider />
				<UpcButton showUpcText={state?.showUpcText} setState={setState} />
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
