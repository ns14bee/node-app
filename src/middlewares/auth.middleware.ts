import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer', '');
  console.log(token)
  if(!token){
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try{
    const secretKey = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  }catch(err){
    res.status(400).json({ message: 'Invalid token.' });
  }
};