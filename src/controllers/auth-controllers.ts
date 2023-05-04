import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import User from "../models/user";
import HttpError from "../models/http-error";
import jwt from "jsonwebtoken";

type DecodedToken = {
  userId: string;
  iat: number;
  exp: number;
};

export class AuthController {
  private static generateToken(userId: string) {
    return jwt.sign({ userId: userId }, "mysecret", { expiresIn: "1h" });
  }

  public static verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, "mysecret", (err, decoded: DecodedToken) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }
      req.userId = decoded.userId;
      next();
    });
  }

  static async signup(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError("Invalid inputs passed, please check you data.", 422)
      );
    }

    const { name, email, password } = req.body;
    try {
      const createdUser = new User({ name, email, password });
      await createdUser.save();
      res.status(201).json({ user: createdUser.toObject({ getters: true }) });
    } catch (err) {
      let errorMsg = "Signing up failed, please try again later";
      if (err.errors["email"]) {
        errorMsg = "Email already exists";
      }
      const error = new HttpError(errorMsg, 500);
      return next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError("Invalid inputs passed, please check you data.", 422)
      );
    }

    const { email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email: email });
      if (!existingUser || existingUser.password !== password) {
        return next(
          new HttpError("Invalid credentials, could not log you in.", 401)
        );
      }
      console.log(existingUser);
      const userToken = AuthController.generateToken(existingUser.id);
      console.log(userToken);
      res.json({ message: "Logged In!", token: userToken });
    } catch (err) {
      console.log(err);
      const error = new HttpError(
        "Logging in failed, please try again later",
        500
      );
      return next(error);
    }
  }

  static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      return next(new HttpError("Cannot fetch users.", 401));
    }
  }
}
