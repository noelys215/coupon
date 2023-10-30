import React from 'react';
import { Button } from '@nextui-org/react';

export default function UpcButton({ showUpcText, upc, handleUpcClick }) {
	return (
		<Button onClick={handleUpcClick} color="secondary" style={{ color: '#FFFFF0' }}>
			{showUpcText ? 'COPIED' : upc}
		</Button>
	);
}
