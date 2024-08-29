import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database';
import { User } from '../models/user.model';

export const registerUser = async(username: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(`
      INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username
    `, [username, hashedPassword]);

  const user = result.rows[0];
  return generateToken(user)
}

export const authenticateUser = async(username:string, password: string) => {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  const user: User = result.rows[0];
  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  return generateToken(user);
}

const generateToken = (user: User): string => {
  const secretKey = process.env.JWT_SECRET as string;
  return jwt.sign({ id: user.id, username: user.username }, secretKey);
};