import React from 'react';

const Star = ({ filled }: { filled: boolean }) => (
    <svg className={`w-6 h-6 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

export const LevelSelect = ({ groups, currentGroup, onSelectGroup, onSelectLevel }: any) => {
    const group = groups[currentGroup];
    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">Select Level</h1>
            <div className="flex justify-between items-center mb-6 overflow-x-auto pb-2 space-x-2">
                {groups.map((_: any, idx: number) => (
                    <button key={idx} onClick={() => onSelectGroup(idx)} className={`px-4 py-2 rounded-full whitespace-nowrap ${currentGroup === idx ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        Group {idx + 1}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {group?.levels.map((level: any) => (
                    <button key={level.id} onClick={level.unlocked ? () => onSelectLevel(level) : undefined} className={`p-4 rounded-lg shadow-md transition-all ${level.unlocked ? 'bg-white hover:bg-purple-50 cursor-pointer border-2 border-transparent hover:border-purple-300' : 'bg-gray-100 cursor-not-allowed grayscale'}`}>
                        <div className="text-lg font-bold text-gray-800">Level {level.id}</div>
                        <div className="text-sm text-gray-500 mb-2">{level.cols}x{level.rows}</div>
                        <div className="flex justify-center space-x-1">{[0, 1, 2].map(i => <Star key={i} filled={i < level.stars} />)}</div>
                    </button>
                ))}
            </div>
        </div>
    );
};
