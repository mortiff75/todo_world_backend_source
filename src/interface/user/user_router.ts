import express, { Router } from "express";
import { userController } from "../../config/di";
import { protect_auth } from "../../utils/authorize_secure";

const router: Router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/", protect_auth, (req, res, next) => {
  const { user } = req;
  res.json(user);
});
router.get("/logout", userController.logout);
export default router;
