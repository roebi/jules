import { type RxJsonSchema } from 'rxdb';

export interface LevelDoc {
    id: string;
    groupIndex: number;
    levelIndex: number;
    cols: number;
    rows: number;
    highScore: number;
    stars: number;
    unlocked: boolean;
}

export const levelSchema: RxJsonSchema<LevelDoc> = {
    title: 'level schema',
    version: 0,
    description: 'describes a game level',
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: { type: 'string', maxLength: 10 },
        groupIndex: { type: 'number' },
        levelIndex: { type: 'number' },
        cols: { type: 'number' },
        rows: { type: 'number' },
        highScore: { type: 'number' },
        stars: { type: 'number' },
        unlocked: { type: 'boolean' }
    },
    required: ['id', 'groupIndex', 'levelIndex', 'cols', 'rows', 'highScore', 'stars', 'unlocked']
};
