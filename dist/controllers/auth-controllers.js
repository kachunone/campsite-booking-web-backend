"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("../models/user"));
const http_error_1 = __importDefault(require("../models/http-error"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    static generateToken(userId) {
        return jsonwebtoken_1.default.sign({ userId: userId }, "mysecret", { expiresIn: "1h" });
    }
    static verifyToken(req, res, next) {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        jsonwebtoken_1.default.verify(token, "mysecret", (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Forbidden" });
            }
            req.userId = decoded.userId;
            next();
        });
    }
    static async signup(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return next(new http_error_1.default("Invalid inputs passed, please check you data.", 422));
        }
        const { name, email, password } = req.body;
        try {
            const createdUser = new user_1.default({ name, email, password });
            await createdUser.save();
            res.status(201).json({ user: createdUser.toObject({ getters: true }) });
        }
        catch (err) {
            let errorMsg = "Signing up failed, please try again later";
            if (err.errors["email"]) {
                errorMsg = "Email already exists";
            }
            const error = new http_error_1.default(errorMsg, 500);
            return next(error);
        }
    }
    static async login(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return next(new http_error_1.default("Invalid inputs passed, please check you data.", 422));
        }
        const { email, password } = req.body;
        try {
            const existingUser = await user_1.default.findOne({ email: email });
            if (!existingUser || existingUser.password !== password) {
                return next(new http_error_1.default("Invalid credentials, could not log you in.", 401));
            }
            console.log(existingUser);
            const userToken = AuthController.generateToken(existingUser.id);
            console.log(userToken);
            res.json({ message: "Logged In!", token: userToken });
        }
        catch (err) {
            console.log(err);
            const error = new http_error_1.default("Logging in failed, please try again later", 500);
            return next(error);
        }
    }
    static async getUsers(req, res, next) {
        try {
            const users = await user_1.default.find({});
            res.json(users);
        }
        catch (err) {
            return next(new http_error_1.default("Cannot fetch users.", 401));
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth-controllers.js.map