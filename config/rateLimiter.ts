import rateLimit from "express-rate-limit";

// Default rate limiting configuration
export const defaultRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  limit: 3000, // Limit each IP to 3000 requests per `window` (here, per 1 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message: "You have exceeded the requests limit!",
  // store: ... , // Use an external store for consistency across multiple server instances.
});
