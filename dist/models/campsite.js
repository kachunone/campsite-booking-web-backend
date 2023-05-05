"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const campsiteSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    region: { type: String, required: true },
    equipment: { type: [String], required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    bookings: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Booking",
        },
    ],
});
const Campsite = (0, mongoose_1.model)("Campsite", campsiteSchema);
exports.default = Campsite;
//# sourceMappingURL=campsite.js.map