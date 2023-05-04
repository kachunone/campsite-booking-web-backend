import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import HttpError from "./models/http-error";
import { Request, Response, NextFunction } from "express";
import authRoutes from "./routes/auth-routes";
import campsiteRoutes from "./routes/campsite-routes";
import bookingRoutes from "./routes/booking-routes";
import { AuthController } from "./controllers/auth-controllers";

const app = express();

declare global {
  namespace Express {
    interface Request {
      userId: string;
      campsiteId: string;
    }
  }
}

app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/campsite", campsiteRoutes);
app.use("/api/booking", AuthController.verifyToken, bookingRoutes);

// This middleware will be reached when no response from the previous one
app.use(() => {
  throw new HttpError("Could not find this route.", 404);
});

// Catch error from the previous middlewares
app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknow error occurred!" });
});

mongoose
  .connect(
    "mongodb+srv://morriswan:morriswan@cluster0.hyliclo.mongodb.net/campsite-booking"
  )
  .then(() => {
    console.log("connected to MongoDB!!");
    app.listen(8080, () => {
      console.log("Server running on http://localhost:8080/");
    });
  })
  .catch((err) => {
    console.log(err);
  });
