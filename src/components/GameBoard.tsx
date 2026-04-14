import React from 'react';

export const GameBoard = ({ grid, cols, rows, pressedTiles, availableTiles, onTileClick, currentRow }: any) => {
    const isPressed = (c: number, r: number) => pressedTiles.some((t: any) => t.col === c && t.row === r);
    const isAvailable = (c: number, r: number) => availableTiles.some((t: any) => t.col === c && t.row === r);
    if (!grid || grid.length === 0) return <div className="p-8 text-white">Loading Board...</div>;

    return (
        <div className="flex flex-col items-center w-full px-2 py-4">
            <div data-testid="game-board" className="grid gap-1 bg-gray-300 p-1 rounded-lg shadow-inner w-full max-w-[90vw] md:max-w-2xl aspect-square" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}>
                {Array.from({ length: rows }).map((_, rIdx) => Array.from({ length: cols }).map((_, cIdx) => {
                    const p = isPressed(cIdx, rIdx);
                    const a = isAvailable(cIdx, rIdx);
                    const cur = (rows - 1 - currentRow) === rIdx;
                    return (
                        <button key={`${cIdx}-${rIdx}`} onClick={() => a && onTileClick(cIdx, rIdx)} disabled={!a} className={`flex items-center justify-center text-lg md:text-2xl font-bold rounded transition-all duration-200 ${p ? 'bg-green-500 text-white shadow-inner' : a ? 'bg-yellow-200 text-gray-800 hover:bg-yellow-300 cursor-pointer animate-pulse' : 'bg-white text-gray-400'} ${cur && !a && !p ? 'ring-2 ring-yellow-400 ring-inset' : ''}`}>
                            {grid[cIdx] ? grid[cIdx][rIdx] : ''}
                        </button>
                    );
                }))}
            </div>
            <div className="grid gap-1 w-full max-w-[90vw] md:max-w-2xl mt-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
                {Array.from({ length: cols }).map((_, i) => <div key={i} className="text-center text-xl font-bold text-gray-400">^</div>)}
            </div>
        </div>
    );
};
