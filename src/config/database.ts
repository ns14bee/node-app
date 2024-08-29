import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const initializeDatabase = async () => {
  try {
      const tableCheckQuery = `
          SELECT EXISTS (
              SELECT FROM information_schema.tables 
              WHERE table_name = 'users'
          );
      `;
      const result = await pool.query(tableCheckQuery);
      const tableExists = result.rows[0].exists;

      if (!tableExists) {
          const createTableQuery = `
              CREATE TABLE users (
                  id SERIAL PRIMARY KEY,
                  username VARCHAR(255) UNIQUE NOT NULL,
                  password VARCHAR(255) NOT NULL
              );
          `;
          await pool.query(createTableQuery);
          console.log('Users table created successfully.');
      } 
  } catch (err) {
      console.error('Error initializing database:', err);
  }
};

export default pool;