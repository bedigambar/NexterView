import arcjet, { tokenBucket } from "@arcjet/next";

const arcjetKey = process.env.ARCJET_KEY;

export const interviewLimiter = arcjetKey
  ? arcjet({
      key: arcjetKey,
      characteristics: ["userId"],
      rules: [
        tokenBucket({
          mode: "LIVE",
          refillRate: 6,
          interval: 8400,
          capacity: 6,
        }),
      ],
    })
  : null;

export const retakeLimiter = arcjetKey
  ? arcjet({
      key: arcjetKey,
      characteristics: ["userId"],
      rules: [
        tokenBucket({
          mode: "LIVE",
          refillRate: 4,
          interval: 86400,
          capacity: 4,
        }),
      ],
    })
  : null;
