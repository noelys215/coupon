import React, { useEffect, useRef } from 'react';
import { Button } from '@nextui-org/react';
import { upc } from '../utils/utils';
import { useGlobalState } from '../context/GlobalStateContext';

export default function UpcButton({ showUpcText }) {
	// Global States
	const [state, setState] = useGlobalState();

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
