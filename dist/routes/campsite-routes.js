"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const campsite_controllers_1 = __importDefault(require("../controllers/campsite-controllers"));
const router = express_1.default.Router();
router.get("/", campsite_controllers_1.default.getCampsites);
router.get("/write", campsite_controllers_1.default.writeCampsites);
exports.default = router;
//# sourceMappingURL=campsite-routes.js.map