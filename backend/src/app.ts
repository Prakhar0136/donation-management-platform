import express from "express"
import healthRoutes from "./routes/health.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express()

app.use(express.json())

app.use("/api/v1/health", healthRoutes);

app.use(errorMiddleware);

export default app