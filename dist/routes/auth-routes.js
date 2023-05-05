"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const auth_controllers_1 = require("../controllers/auth-controllers");
const router = express_1.default.Router();
router.get("/users", auth_controllers_1.AuthController.verifyToken, auth_controllers_1.AuthController.getUsers);
router.post("/login", [
    (0, express_validator_1.check)("email").normalizeEmail().isEmail(),
    (0, express_validator_1.check)("password").isLength({ min: 6 }),
], auth_controllers_1.AuthController.login);
router.post("/signup", [
    (0, express_validator_1.check)("name").not().isEmpty(),
    (0, express_validator_1.check)("email").normalizeEmail().isEmail(),
    (0, express_validator_1.check)("password").isLength({ min: 6 }),
], auth_controllers_1.AuthController.signup);
exports.default = router;
//# sourceMappingURL=auth-routes.js.map