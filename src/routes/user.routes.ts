import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { login, register } from "../controllers/auth.controller";

const router = Router();

router.post('/login', login);
router.post('/register', register);

router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected profile route.', user: req.user });
})

export default router;