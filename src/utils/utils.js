export const calculatePercentage = (value) => {
	let percentage = 0;
	if (value < 2000) {
		percentage = 5;
	} else if (value <= 4000) {
		percentage = 10;
	} else {
		percentage = 15;
	}
	const discountedAmount = (value * percentage) / 100;
	return { discountedAmount, percentage };
};
