import { round, mbyte, avg } from './math';

describe('math', () => {
    describe('round', () => {
        it('returns the input rounded up, with a floating point precision of 10', () => {
            expect(round(10.005123)).toBe(10.01);
        });

        it('returns NaN when inputting anything other than a number', () => {
            expect(round('not a number')).toBe(NaN);
        });
    });

    describe('mbyte', () => {
        it('converts byte to mbyte', () => {
            expect(mbyte(10000)).toBe(10000 * 1e-6);
        });
    });

    describe('avg', () => {
        // tbh i'm not sure if it should just be NaN instead
        it('returns 0 for an empty array', () => {
            expect(avg([])).toBe(0);
        });

        it('calculates the average of an array of numbers', () => {
            expect(avg([0, 10])).toBe(5);
        });

        it('ignores non numeric values in array', () => {
            expect(avg([0, undefined, 10])).toBe(5);
        });

        it('returns the input when not an array', () => {
            expect(avg(1)).toBe(1);
        });
    });
});
