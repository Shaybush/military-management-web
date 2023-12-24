export const getDaysBetweenDates = (start: Date, end: Date): number => {
	if (!start || !end) {
		return 0;
	} else {
		return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
	}
};

export const getMinutesBetweenDates = (start: Date, end: Date): number => {
	if (!start || !end) {
		return 0;
	} else {
		const hourDiff = end.getTime() - start.getTime();
		return Math.floor(hourDiff / 60 / 1000);
	}
};

export const getTimeFromCurrentUnix = (unixTimestamp: number): string => {
	// Check if the input is a valid non-negative integer
	if (!Number.isInteger(unixTimestamp) || unixTimestamp < 0) {
		throw new Error('Invalid Unix timestamp');
	}
	// add 2 hours
	const hoursToAdd = 2 * 60 * 60 * 1000;
	// Create a Date object using the provided Unix timestamp (assumed to be in UTC)
	const dateObject = new Date(unixTimestamp + hoursToAdd);

	// Extract hours and minutes and ensure they have two digits (e.g., 03 instead of 3)
	const formattedTime = `${`0${dateObject.getUTCHours()}`.slice(-2)}:${`0${dateObject.getUTCMinutes()}`.slice(-2)}`;

	// Return the formatted time string
	return formattedTime;
};

export const getUplTimezone = () => {
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
};
