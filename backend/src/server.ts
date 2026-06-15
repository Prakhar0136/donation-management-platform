import app from "./app";
import { connectDatabase, env } from "./config";

const startServer = async () => {
    try {
        await connectDatabase();

        const PORT = Number(env.PORT);

        app.listen(PORT, () => {
            console.log(`
=================================
🚀 Threads of Hope AI Backend
🌍 Environment: ${env.NODE_ENV}
📡 Port: ${PORT}
=================================
`);
        });
    } catch (error) {
        console.error("Server startup failed");
    }
};

startServer();