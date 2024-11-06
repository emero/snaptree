import dotenv from "dotenv";
dotenv.config();

import express from "express";
import asyncHandler from "express-async-handler";

const app = express();

app.get(
  "/",
  asyncHandler(async (req, res) => {
    res.json({ hello: "world" });
  })
);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
