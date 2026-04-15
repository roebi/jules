import { useState, useCallback } from 'react';
import { generateGrid, calculateMaxScore, calculateMinScore, getAvailableTiles, calculateStars } from '../logic/gameLogic';

export const useGame = (level: any) => {
    const [gameState, setGameState] = useState<'PLAYING' | 'WON' | 'IDLE'>('IDLE');
    const [grid, setGrid] = useState<number[][]>([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [currentRow, setCurrentRow] = useState(0);
    const [pressedTiles, setPressedTiles] = useState<{ col: number; row: number }[]>([]);
    const [availableTiles, setAvailableTiles] = useState<{ col: number; row: number }[]>([]);
    const [minScore, setMinScore] = useState(0);
    const [maxScore, setMaxScore] = useState(0);
    const [stars, setStars] = useState(0);

    const startLevel = useCallback(() => {
        if (!level) return;
        const newGrid = generateGrid(level.cols, level.rows);
        setGrid(newGrid);
        setPlayerScore(0);
        setCurrentRow(0);
        setPressedTiles([]);
        setAvailableTiles(getAvailableTiles(level.cols, level.rows, null));
        setMinScore(calculateMinScore(newGrid, level.cols, level.rows));
        setMaxScore(calculateMaxScore(newGrid, level.cols, level.rows));
        setGameState('PLAYING');
        setStars(0);
    }, [level]);

    const handleTileClick = useCallback((col: number, row: number) => {
        if (gameState !== 'PLAYING' || !level) return;
        const val = grid[col][row];
        const newScore = playerScore + val;
        const nextRow = currentRow + 1;
        const newPressed = [...pressedTiles, { col, row }];
        setPlayerScore(newScore);
        setPressedTiles(newPressed);
        setCurrentRow(nextRow);
        if (nextRow === level.rows) {
            setStars(calculateStars(newScore, minScore, maxScore));
            setGameState('WON');
            setAvailableTiles([]);
        } else {
            setAvailableTiles(getAvailableTiles(level.cols, level.rows, { col, row }));
        }
    }, [gameState, grid, playerScore, currentRow, pressedTiles, level, minScore, maxScore]);

    return { gameState, grid, playerScore, currentRow, pressedTiles, availableTiles, stars, startLevel, handleTileClick, setGameState };
};
