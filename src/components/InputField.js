import React from 'react';
import { Input, Button } from '@nextui-org/react';

export default function InputField({ value, handleChange, handlePasteClearClick, number }) {
	return (
		<div style={{ display: 'flex', gap: 10 }}>
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
		</div>
	);
}
