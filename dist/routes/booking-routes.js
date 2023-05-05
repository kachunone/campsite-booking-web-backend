"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_controllers_1 = __importDefault(require("../controllers/booking-controllers"));
const router = express_1.default.Router();
router.post("/", booking_controllers_1.default.createBooking);
router.get("/", booking_controllers_1.default.getBookingsById);
router.put("/", booking_controllers_1.default.updateBooking);
router.delete("/:bid", booking_controllers_1.default.deleteBooking);
exports.default = router;
//# sourceMappingURL=booking-routes.js.map