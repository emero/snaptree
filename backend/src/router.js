import { createUploadthing } from "uploadthing/express";

const f = createUploadthing();
const config = {
  maxFileSize: "4MB",
  minFileCount: 1,
  maxFileCount: 1,
};

export const uploadRouter = {
  imageUploader: f({
    "image/png": config,
    "image/jpeg": config,
  }).onUploadComplete((data) => {
    console.log("upload completed", data);
  }),
};
