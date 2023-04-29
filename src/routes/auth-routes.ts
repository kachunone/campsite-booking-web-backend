import express, { Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import { AuthController } from "../controllers/auth-controllers";

const router = express.Router();

router.get("/users", AuthController.verifyToken, AuthController.getUsers);

router.get(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  AuthController.login
);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  AuthController.signup
);

export default router;
