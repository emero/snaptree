import cors from "cors";
import dotenv from "dotenv";
import { createRouteHandler } from "uploadthing/express";
import express from "express";
import asyncHandler from "express-async-handler";
import { uploadRouter } from "./router.js";

dotenv.config();

const app = express();

app.use(cors());

app.get(
  "/",
  asyncHandler(async (req, res) => {
    res.json({ hello: "world" });
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

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
