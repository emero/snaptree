import cors from "cors";
import dotenv from "dotenv";
import { createRouteHandler } from "uploadthing/express";
import express from "express";
import { uploadRouter } from "./router.js";

dotenv.config();

const app = express();
const PORT = 4005;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter,
    config: {
      token: process.env.UPLOADTHING_TOKEN,
    },
  })
);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
