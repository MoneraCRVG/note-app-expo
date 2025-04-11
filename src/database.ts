import { Note } from "./datatypes";
import * as SQLite from 'expo-sqlite';

export async function pushNote(note: Note) {
    try {
        const db = await SQLite.openDatabaseAsync('notes');
        
        (await db).runAsync(
            'INSERT INTO notes (id, content) VALUES (?, ?)',
        note.id, note.content
           );
        
    } catch (error) {
        console.log(error)
    }
}

export function createDatabase() {
    try {
        const db = SQLite.openDatabaseSync('notes');
        
        (db).execSync(
            `
            CREATE TABLE IF NOT EXISTS notes (
                id INTEGER PRIMARY KEY NOT NULL,
                content TEXT NOT NULL
            )`,
        );
        
    } catch (error) {
        console.log(error)
    }
}

export async function readDatabase(): Promise<Note[]> {
    try {
        const db = SQLite.openDatabaseAsync('notes');
        
        const results = (await db).getAllAsync(
            `SELECT id, content FROM notes`,
        );

        let notes: Note[] = (await results).map((row: any) => ({
            id: row.id,
            content: row.content,
          }));

        return notes;
          
        
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function deleteNote(id: number) {
    try {
        const db = SQLite.openDatabaseAsync('notes');
        
        (await db).runAsync(
            `DELETE FROM notes WHERE id = ?`, id
        );
        
    } catch (error) {
        console.log(error)
    }
}