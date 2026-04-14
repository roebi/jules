export const generateGrid = (cols: number, rows: number): number[][] => {
    const grid: number[][] = [];
    for (let i = 0; i < cols; i++) {
        grid[i] = [];
        for (let j = 0; j < rows; j++) {
            grid[i][j] = Math.floor(Math.random() * 9) + 1;
        }
    }
    return grid;
};

export const calculateMaxScore = (grid: number[][], cols: number, rows: number): number => {
    if (!grid || grid.length === 0) return 0;
    const memo: Map<string, number> = new Map();
    const findMax = (col: number, row: number): number => {
        if (row < 0) return 0;
        const key = `${col}-${row}`;
        if (memo.has(key)) return memo.get(key)!;
        let currentVal = grid[col][row];
        let maxNext = findMax(col, row - 1);
        if (col > 0) maxNext = Math.max(maxNext, findMax(col - 1, row - 1));
        if (col < cols - 1) maxNext = Math.max(maxNext, findMax(col + 1, row - 1));
        const result = currentVal + maxNext;
        memo.set(key, result);
        return result;
    };
    let maxOverall = 0;
    for (let i = 0; i < cols; i++) maxOverall = Math.max(maxOverall, findMax(i, rows - 1));
    return maxOverall;
};

export const calculateMinScore = (grid: number[][], cols: number, rows: number): number => {
    if (!grid || grid.length === 0) return 0;
    const memo: Map<string, number> = new Map();
    const findMin = (col: number, row: number): number => {
        if (row < 0) return 0;
        const key = `${col}-${row}`;
        if (memo.has(key)) return memo.get(key)!;
        let currentVal = grid[col][row];
        let minNext = findMin(col, row - 1);
        if (col > 0) minNext = Math.min(minNext, findMin(col - 1, row - 1));
        if (col < cols - 1) minNext = Math.min(minNext, findMin(col + 1, row - 1));
        const result = currentVal + minNext;
        memo.set(key, result);
        return result;
    };
    let minOverall = Infinity;
    for (let i = 0; i < cols; i++) minOverall = Math.min(minOverall, findMin(i, rows - 1));
    return minOverall;
};

export const getAvailableTiles = (cols: number, rows: number, lastTile: { col: number, row: number } | null): { col: number, row: number }[] => {
    if (!lastTile) return Array.from({ length: cols }, (_, i) => ({ col: i, row: rows - 1 }));
    const { col, row } = lastTile;
    if (row === 0) return [];
    const nextRow = row - 1;
    const available = [{ col, row: nextRow }];
    if (col > 0) available.push({ col: col - 1, row: nextRow });
    if (col < cols - 1) available.push({ col: col + 1, row: nextRow });
    return available;
};

export const calculateStars = (score: number, minScore: number, maxScore: number): number => {
    if (maxScore === minScore) return 3;
    const performancePercentage = ((score - minScore) / (maxScore - minScore)) * 100;
    return Math.min(3, Math.floor(performancePercentage / 50) + 1);
};
