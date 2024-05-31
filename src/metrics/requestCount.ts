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

export const reqHistogram = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.1, 0.5, 1, 3, 5, 10, 25, 50, 100, 200, 400, 500, 700]
})