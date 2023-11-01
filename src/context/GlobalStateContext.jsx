import React, { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
	const [state, setState] = useState({
		number: '',
		result: null,
		percentage: null,
		showClickedText: false,
		showUpcText: false,
	});

	return (
		<GlobalStateContext.Provider value={[state, setState]}>
			{children}
		</GlobalStateContext.Provider>
	);
};

export const useGlobalState = () => {
	const context = useContext(GlobalStateContext);
	if (!context) {
		throw new Error('useGlobalState must be used within a GlobalStateProvider');
	}
	return context;
};
