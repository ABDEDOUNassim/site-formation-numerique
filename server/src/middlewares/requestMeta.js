import { randomUUID } from "node:crypto";

export function requestMeta(req, res, next) {
  const requestId = randomUUID();
  const start = process.hrtime.bigint();

  req.requestId = requestId;
  res.setHeader("x-request-id", requestId);

  res.on("finish", () => {
    const durationMs = Number(process.hrtime.bigint() - start) / 1_000_000;
    console.log(
      JSON.stringify({
        type: "http_request",
        requestId,
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        durationMs: Number(durationMs.toFixed(1)),
        ip: req.ip
      })
    );
  });

  next();
}
