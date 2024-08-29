import {Router} from 'express';
import BasicRouter from './basic.routes';
import UserRouter from './user.routes';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).send('Hello, World!');
});


router.use('/basic', BasicRouter);
router.use('/user', UserRouter);

export default router;