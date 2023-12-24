export const clone = (obj: unknown) => {
	return obj ? JSON.parse(JSON.stringify(obj)) : null;
};
