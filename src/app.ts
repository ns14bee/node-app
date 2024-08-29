import express, {Application} from 'express';
import routes from './routes'; 
import { errorMiddleware } from './middlewares/error.middleware';
import { loggerMiddleware } from './middlewares/logger.middleware';
import pool, { initializeDatabase } from './config/database';

const app: Application = express();
app.use(express.json());

pool.connect(async (err) => {
  if (err) {
      console.error('Database connection error:', err.stack);
  } else {
      console.log('Database connected!');
      await initializeDatabase();
  }
});

app.use(loggerMiddleware);

app.use('/api', routes);

app.use(errorMiddleware);

export default app;