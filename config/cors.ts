import { CorsOptions } from "cors";

// cors
export const allowedCorsOrigins = ["http://localhost:5173"]; // Array of allowed URLs
export const allowedCorsMethods = ["GET", "POST", "PUT", "DELETE"]; // Array of allowed HTTP methods
export const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedCorsOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: allowedCorsMethods.join(), // Join the array of methods into a comma-separated string
  credentials: true,
};
