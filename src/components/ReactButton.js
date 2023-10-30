import React from 'react';
import { Button } from '@nextui-org/react';

export default function ResultButton({ result, showClickedText, handleResultClick }) {
	return (
		<Button
			onClick={handleResultClick}
			color={!result ? 'danger' : 'success'}
			disabled={!result}
			style={{ color: '#FFFFF0' }}>
			{showClickedText ? 'COPIED' : result ? '-' + result.toFixed(2) : 'DISCOUNT'}
		</Button>
	);
}
