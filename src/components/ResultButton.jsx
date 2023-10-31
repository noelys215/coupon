import React, { useEffect, useRef } from 'react';
import { Button } from '@nextui-org/react';

export default function ResultButton({ result, showClickedText, setState, state }) {
	const resultTimeoutId = useRef(null);
	useEffect(() => {
		// Cleanup timeouts when component unmounts
		return () => {
			if (resultTimeoutId.current) clearTimeout(resultTimeoutId.current);
		};
	}, []);

	// Displays Result and Copies To Clipboard when clicked
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
