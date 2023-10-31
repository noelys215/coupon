import React, { useEffect, useRef } from 'react';
import { Button } from '@nextui-org/react';

export default function UpcButton({ showUpcText, setState }) {
	//TODO Current UPC
	const upc = 'BMSM EOQ - 98153000004823328273281008';
	const upcTimeoutId = useRef(null);

	useEffect(() => {
		// Cleanup timeouts when component unmounts
		return () => {
			if (upcTimeoutId.current) clearTimeout(upcTimeoutId.current);
		};
	}, []);

	// Displays Current UPC and Copies To Clipboard when clicked
	const handleUpcClick = () => {
		navigator.clipboard.writeText(upc);
		setState((prev) => ({ ...prev, showUpcText: true }));
		upcTimeoutId.current = setTimeout(
			() => setState((prev) => ({ ...prev, showUpcText: false })),
			350
		);
	};

	return (
		<Button onClick={handleUpcClick} color="secondary" style={{ color: '#FFFFF0' }}>
			{showUpcText ? 'COPIED' : upc}
		</Button>
	);
}
