
import { NextFunction, Response, Request } from "express";
import { reqCounter } from "./requestCount";


export function requestCounterMiddleware(req: Request, res: Response, next: NextFunction){
    const startTime = Date.now();

    res.on('finish', ()=>{
        const endTime = Date.now();
        console.log(`time taken for per request ${endTime - startTime} ms`)
        reqCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        })
    })
    
    next();
}