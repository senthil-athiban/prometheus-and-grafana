import { Request, Response, NextFunction } from "express"
import { reqCounter, reqGauge } from "./requestCount";

export function requestGaugeMiddleWare(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    reqGauge.inc();
    res.on('finish', () => {
        const endTime = Date.now();
        const timeTaken = endTime - startTime;
        console.log(`Request to ${req.path} took ${timeTaken}ms`);
        
        reqCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        })
        reqGauge.dec();
    });

    next();
}
