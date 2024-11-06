"use client";
import React from "react";
import { generateUploadButton } from "@uploadthing/react";
import { toast } from "../services/toast";

const UploadthingButton = generateUploadButton({
  url: "http://localhost:4005/api/uploadthing",
});

const UploadButton = () => {
  return (
    <UploadthingButton
      className="mt-4 text-sm ut-button:bg-purple-500 ut-button:ut-readying:bg-purple-500/50"
      endpoint="imageUploader"
      onClientUploadComplete={() => {
        toast.success("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        toast.error(error.message);
      }}
      onBeforeUploadBegin={(files) => {
        return files.map(
          (f) => new File([f], "snaptree-" + f.name, { type: f.type })
        );
      }}
    />
  );
};

export default UploadButton;
