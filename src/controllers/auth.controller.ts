import { Request, Response } from "express";
import { authenticateUser, registerUser } from "../services/auth.service";

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  const token = await authenticateUser(username, password);
  if (!token) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }

  return res.json({ token })
}

export const register = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  const token = await registerUser(username, password);
  return res.json({ token });
}