import { describe, it, expect } from 'vitest';
import { calculateMaxScore, calculateMinScore, getAvailableTiles, calculateStars } from './gameLogic';

describe('gameLogic', () => {
    const grid = [
        [1, 2, 3], // col 0
        [4, 5, 6]  // col 1
    ];

    it('calculates max score correctly', () => {
        expect(calculateMaxScore(grid, 2, 3)).toBe(15);
    });

    it('calculates min score correctly', () => {
        expect(calculateMinScore(grid, 2, 3)).toBe(6);
    });

    it('gets initial available tiles', () => {
        const available = getAvailableTiles(2, 3, null);
        expect(available).toEqual([{ col: 0, row: 2 }, { col: 1, row: 2 }]);
    });

    it('gets next available tiles', () => {
        const available = getAvailableTiles(2, 3, { col: 0, row: 2 });
        expect(available).toEqual([{ col: 0, row: 1 }, { col: 1, row: 1 }]);
    });

    it('calculates stars correctly', () => {
        expect(calculateStars(6, 6, 15)).toBe(1);
        expect(calculateStars(11, 6, 15)).toBe(2);
        expect(calculateStars(15, 6, 15)).toBe(3);
    });
});
