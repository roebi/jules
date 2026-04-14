import React, { useState, useEffect, useMemo } from 'react';
import { useDatabase } from './hooks/useDatabase';
import { useGame } from './hooks/useGame';
import { LevelSelect } from './components/LevelSelect';
import { GameBoard } from './components/GameBoard';
import { LevelComplete } from './components/LevelComplete';

const App: React.FC = () => {
    const { db, loading, updateLevelProgress } = useDatabase();
    const [currentLevelData, setCurrentLevelData] = useState<any>(null);
    const [currentGroupIdx, setCurrentGroupIdx] = useState(0);
    const [levels, setLevels] = useState<any[]>([]);

    const { gameState, grid, playerScore, currentRow, pressedTiles, availableTiles, stars, startLevel, handleTileClick, setGameState } = useGame(currentLevelData);

    useEffect(() => {
        if (!db) return;
        const sub = db.levels.find().sort({ groupIndex: 'asc', levelIndex: 'asc' }).$.subscribe(docs => {
            setLevels(docs.map(d => d.toJSON()));
        });
        return () => sub.unsubscribe();
    }, [db]);

    const groups = useMemo(() => {
        const g = [];
        for (let i = 0; i < 8; i++) g.push({ levels: levels.filter(l => l.groupIndex === i) });
        return g;
    }, [levels]);

    useEffect(() => { if (currentLevelData && gameState === 'IDLE') startLevel(); }, [currentLevelData, gameState, startLevel]);
    useEffect(() => { if (gameState === 'WON' && currentLevelData) updateLevelProgress(currentLevelData.id, stars, playerScore); }, [gameState]);

    const handleRetry = () => startLevel();
    const handleNext = () => {
        const idx = levels.findIndex(l => l.id === currentLevelData.id);
        if (idx !== -1 && idx < levels.length - 1) { setCurrentLevelData(levels[idx + 1]); setGameState('IDLE'); }
    };
    const handleBack = () => { setCurrentLevelData(null); setGameState('IDLE'); };

    if (loading) return <div className="flex items-center justify-center h-screen bg-gray-50">Loading Game...</div>;

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            {!currentLevelData ? (
                <LevelSelect groups={groups} currentGroup={currentGroupIdx} onSelectGroup={setCurrentGroupIdx} onSelectLevel={setCurrentLevelData} />
            ) : (
                <div className="flex flex-col items-center py-8">
                    <div className="w-full max-w-2xl px-4 flex justify-between items-center mb-4">
                        <button onClick={handleBack} className="text-purple-600 font-bold flex items-center"><svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>Back</button>
                        <div className="text-center"><h2 className="text-xl font-bold">Level {currentLevelData.id}</h2><p className="text-gray-500 text-sm">Score: {playerScore}</p></div>
                        <button onClick={handleRetry} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"><svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg></button>
                    </div>
                    <GameBoard grid={grid} cols={currentLevelData.cols} rows={currentLevelData.rows} pressedTiles={pressedTiles} availableTiles={availableTiles} onTileClick={handleTileClick} currentRow={currentRow} />
                    {gameState === 'WON' && <LevelComplete score={playerScore} stars={stars} isLastLevel={levels.indexOf(currentLevelData) === levels.length - 1} onRetry={handleRetry} onNext={handleNext} onLevelSelect={handleBack} />}
                </div>
            )}
        </div>
    );
};
export default App;
