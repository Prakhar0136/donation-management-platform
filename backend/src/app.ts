import express from "express"
import healthRoutes from "./routes/health.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import authRoutes from "./routes/auth.routes";

const app = express()

app.use(express.json())

app.use("/api/v1/health", healthRoutes);

app.use("/api/v1/auth", authRoutes);

app.use(errorMiddleware);

export default app