import { useState, useEffect } from 'react';
import { initDB } from '../db/database';
import { type RxDatabase } from 'rxdb';

export const useDatabase = () => {
    const [db, setDb] = useState<RxDatabase | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => { initDB().then(database => { setDb(database); setLoading(false); }); }, []);

    const updateLevelProgress = async (id: string, stars: number, score: number) => {
        if (!db) return;
        const levelDoc = await db.levels.findOne(id).exec();
        if (levelDoc) {
            await levelDoc.patch({ stars: Math.max(levelDoc.stars, stars), highScore: Math.max(levelDoc.highScore, score) });
            if (stars >= 2) {
                const parts = id.split('-');
                const g = parseInt(parts[0]);
                const l = parseInt(parts[1]);
                const nextInGroup = await db.levels.findOne(`${g}-${l + 1}`).exec();
                if (nextInGroup) await nextInGroup.patch({ unlocked: true });
                else {
                    const nextGroup = await db.levels.findOne(`${g + 1}-1`).exec();
                    if (nextGroup) await nextGroup.patch({ unlocked: true });
                }
            }
        }
    };
    return { db, loading, updateLevelProgress };
};
