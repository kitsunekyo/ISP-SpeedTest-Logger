export const round = (num, precision = 10) =>
	Math.round((num + Number.EPSILON) * (10 * precision)) / (10 * precision);
export const mbyte = byte => byte * 1e-6;
export const avg = values =>
	values.length ? values.reduce((acc, curr) => acc + curr) / values.length : null;
