export const isArrayEmpty = (arr: unknown[]): boolean => {
	return arr === undefined || arr === null || arr.length === 0;
};
