import express from "express"

const app = express()

app.use(express.json())

app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "server is healthy",
        timestamp: new Date().toISOString()
    });
});

export default app