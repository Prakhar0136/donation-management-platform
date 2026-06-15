import { Request, Response } from "express";
import { HealthService } from "../services/health.service";

export class HealthController {
    static getHealth(req: Request, res: Response) {
        const data = HealthService.getHealth();

        res.status(200).json(data);
    }
}