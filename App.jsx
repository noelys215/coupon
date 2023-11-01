import React from 'react';
import PercentageCalc from './src/components/PercentageCalc';
import { GlobalStateProvider } from './src/context/GlobalStateContext';
export default function App() {
	return (
		<GlobalStateProvider>
			<PercentageCalc />
		</GlobalStateProvider>
	);
}
