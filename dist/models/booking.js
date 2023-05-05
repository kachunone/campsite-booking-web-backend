"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_1 = __importDefault(require("./user"));
const campsite_1 = __importDefault(require("./campsite"));
const bookingSchema = new mongoose_1.Schema({
    createDate: { type: Date, required: true },
    campsite: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: campsite_1.default.modelName,
        required: true,
    },
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: user_1.default.modelName,
        required: true,
    },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
});
const Booking = (0, mongoose_1.model)("Booking", bookingSchema);
exports.default = Booking;
//# sourceMappingURL=booking.js.map