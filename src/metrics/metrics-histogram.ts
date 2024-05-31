import { Request, Response, NextFunction } from "express";
import { reqCounter, reqGauge, reqHistogram } from "./requestCount";


export function reqHistogramMiddleWare(req: Request, res: Response, next: NextFunction){
    const startTime = Date.now();
    reqGauge.inc();
    res.on('finish', () => {
        const endTime = Date.now();
        const timetaken = endTime - startTime;
        console.log(`time taken for each request ${timetaken} ms`);

        reqCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        })
        reqHistogram.observe({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode,
        }, timetaken);
        reqGauge.dec();
    })
    next();
}