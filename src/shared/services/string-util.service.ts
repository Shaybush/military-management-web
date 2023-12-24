export const isStringEmptyUtil = (str: string) => {
	return str === undefined || str === null || !str.trim();
};
