import React from 'react';

export const LevelComplete = ({ score, stars, isLastLevel, onRetry, onNext, onLevelSelect }: any) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center scale-in duration-300">
                <h2 className="text-3xl font-extrabold mb-4 text-gray-800">Level Complete!</h2>
                <div className="flex justify-center space-x-2 mb-6">
                    {[1, 2, 3].map(i => (
                        <svg key={i} className={`w-12 h-12 ${i <= stars ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
                <p className="text-2xl font-bold text-purple-600 mb-8">Score: {score}</p>
                <div className="flex flex-col space-y-3">
                    {stars >= 2 && !isLastLevel && <button onClick={onNext} className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold text-lg hover:bg-purple-700 transition">Next Level</button>}
                    <button onClick={onRetry} className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-200 transition">Retry</button>
                    <button onClick={onLevelSelect} className="w-full py-3 border-2 border-gray-200 text-gray-500 rounded-xl font-bold text-lg hover:bg-gray-50 transition">Level Select</button>
                </div>
            </div>
        </div>
    );
};
