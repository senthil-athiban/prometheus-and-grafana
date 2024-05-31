import client from "prom-client";
export const reqCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Number of HTTP  requests Made',
    labelNames: ['method', 'route', 'status_code']
})

export const reqGauge = new client.Gauge({
    name: 'http_requests_in_progress',
    help: 'Number of active requests in progress',
    labelNames: ['method', 'route', 'status_code']
})