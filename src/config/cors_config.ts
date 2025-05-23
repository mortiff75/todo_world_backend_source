import { CorsOptions, CorsOptionsDelegate, CorsRequest } from "cors";

// لیست دامنه‌های مجاز
export const whitelist = ["http://localhost:4000"];

export const corsOptionsDelegate: CorsOptionsDelegate<CorsRequest> = (
  req,
  callback
) => {
  let corsOptions: CorsOptions;

  console.log(req.headers.origin);

  if (whitelist.includes(req.headers.origin!)) {
    corsOptions = {
      origin: req.headers.origin, // استفاده از مبدا دقیق
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    };
  } else {
    console.log(req.headers.origin);

    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};
