"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_error_1 = __importDefault(require("./models/http-error"));
const auth_routes_1 = __importDefault(require("./routes/auth-routes"));
const campsite_routes_1 = __importDefault(require("./routes/campsite-routes"));
const booking_routes_1 = __importDefault(require("./routes/booking-routes"));
const auth_controllers_1 = require("./controllers/auth-controllers");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ credentials: true }));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use("/api/auth", auth_routes_1.default);
app.use("/api/campsite", campsite_routes_1.default);
app.use("/api/booking", auth_controllers_1.AuthController.verifyToken, booking_routes_1.default);
// This middleware will be reached when no response from the previous one
app.use(() => {
    throw new http_error_1.default("Could not find this route.", 404);
});
// Catch error from the previous middlewares
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    res
        .status(error.code || 500)
        .json({ message: error.message || "An unknow error occurred!" });
});
mongoose_1.default
    .connect("mongodb+srv://morriswan:morriswan@cluster0.hyliclo.mongodb.net/campsite-booking")
    .then(() => {
    console.log("connected to MongoDB!!");
    app.listen(8080, () => {
        console.log("Server running on http://localhost:8080/");
    });
})
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=app.js.map