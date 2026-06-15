export class HealthService {
    static getHealth() {
        return {
            success: true,
            message: "Server is healthy",
            timestamp: new Date().toISOString(),
        };
    }
}