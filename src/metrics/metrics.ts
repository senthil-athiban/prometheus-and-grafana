import client from "prom-client";
import { NextFunction, Response, Request } from "express";

const reqCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Number of HTTP  requests Made',
    labelNames: ['method', 'route', 'status_code']
})

export function requestMiddleware(req: Request, res: Response, next: NextFunction){
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