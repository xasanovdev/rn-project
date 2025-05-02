import { openDatabaseSync } from "expo-sqlite";

const db = openDatabaseSync("mydb.db");

export const initDB = () => {
  db.withTransactionSync(() => {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL
      );
    `);
  });
};

export const insertItem = (title: string, callback: () => void) => {
  db.withTransactionSync(() => {
    db.runSync("INSERT INTO items (title) VALUES (?);", [title]);
    callback();
  });
};

export const fetchItems = (callback: (items: any[]) => void) => {
  db.withTransactionSync(() => {
    const result = db.getAllSync("SELECT * FROM items;");
    callback(result);
  });
};

export const deleteItem = (id: number, callback: () => void) => {
  db.withTransactionSync(() => {
    db.runSync("DELETE FROM items WHERE id = ?;", [id]);
    callback();
  });
};

export const updateItem = (id: number, title: string, callback: () => void) => {
  db.withTransactionSync(() => {
    db.runSync("UPDATE items SET title = ? WHERE id = ?;", [title, id]);
    callback();
  });
};
