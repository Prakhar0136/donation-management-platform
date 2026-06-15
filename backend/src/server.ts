import app from "./app";
import dotenv from "dotenv"
import { env } from "./config";

dotenv.config()

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`
=================================
🚀 Threads of Hope AI Backend
🌍 Environment: ${env.NODE_ENV}
📡 Port: ${PORT}
=================================
`);
});