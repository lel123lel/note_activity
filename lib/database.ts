import * as SQLite from "expo-sqlite";

export type Note = {
  id: number;
  title: string;
  description: string;
  status: string;
};

const db = SQLite.openDatabaseSync("notes.db");

export function initDatabase() {
  try {
    db.execSync(`
            CREATE TABLE IF NOT EXISTS notes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                status TEXT NOT NULL
            );
        `);
  } catch (error) {
    console.error("There were problems initializing the database: ", error);
    throw error;
  }
}

export function addNote(title: string, description: string, status: string) {
  try {
    db.runSync(
      "INSERT INTO notes (title, description, status) VALUES (?, ?, ?)",
      [title, description, status],
    );
  } catch (error) {
    console.error("Error adding note: ", error);
    throw error;
  }
}

export function updateNote(
  id: number,
  title: string,
  description: string,
  status: string,
) {
  try {
    db.runSync(
      "UPDATE notes SET title = ?, description = ?, status = ? WHERE id = ?",
      [title, description, status, id],
    );
  } catch (error) {
    console.error("Error updating note: ", error);
    throw error;
  }
}

export function deleteNote(id: number) {
  try {
    db.runSync("DELETE FROM notes WHERE id = ?", [id]);
  } catch (error) {
    console.error("Error deleting note: ", error);
    throw error;
  }
}

export function getNotes(): Note[] {
  try {
    return db.getAllSync("SELECT * FROM notes ORDER BY id DESC") as Note[];
  } catch (error) {
    console.error("Error fetching notes: ", error);
    throw error;
  }
}
