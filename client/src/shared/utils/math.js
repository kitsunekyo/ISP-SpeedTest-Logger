import isArray from 'lodash/isArray';
import isNumber from 'lodash/isNumber';

export const round = (num, precision = 10) =>
    (Math.round((num + Number.EPSILON) * (10 * precision)) / (10 * precision)).toFixed(2);

/**
 * converts byte to mbyte
 * @param {number} byte
 */
export const mbyte = (byte) => byte * 1e-6;

export const avg = (values) => {
    if (!isArray(values)) return values;

    const validValues = values.filter((val) => isNumber(val));
    const sum = validValues.reduce((acc, curr) => acc + curr, 0);

    return validValues.length <= 0 ? sum : sum / validValues.length;
};
