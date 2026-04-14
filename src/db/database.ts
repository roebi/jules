import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { levelSchema, type LevelDoc } from './schema';

addRxPlugin(RxDBQueryBuilderPlugin);

export const initDB = async () => {
    const db = await createRxDatabase({
        name: 'roebigamedb',
        storage: getRxStorageDexie()
    });

    await db.addCollections({
        levels: {
            schema: levelSchema
        }
    });

    const count = await db.levels.count().exec();
    if (count === 0) {
        const initialLevels: LevelDoc[] = [];
        for (let g = 0; g < 6; g++) {
            const cols = g + 2;
            for (let r = cols + 1; r <= 9; r++) {
                initialLevels.push({
                    id: `${g+1}-${r-cols}`,
                    groupIndex: g,
                    levelIndex: r - cols - 1,
                    cols,
                    rows: r,
                    highScore: 0,
                    stars: 0,
                    unlocked: (g === 0 && r === 3)
                });
            }
        }
        initialLevels.push({ id: `7-1`, groupIndex: 6, levelIndex: 0, cols: 8, rows: 9, highScore: 0, stars: 0, unlocked: true });
        initialLevels.push({ id: `8-1`, groupIndex: 7, levelIndex: 0, cols: 9, rows: 9, highScore: 0, stars: 0, unlocked: true });

        await db.levels.bulkInsert(initialLevels);
    }
    return db;
};
