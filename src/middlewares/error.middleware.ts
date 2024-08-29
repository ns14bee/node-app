import {Request, Response, NextFunction} from 'express'

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.message);

  res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: err.message,
  });
};