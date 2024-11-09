"use client";
import React from "react";
import { generateUploadButton } from "@uploadthing/react";
import { toast } from "../services/toast";

const UploadthingButton = generateUploadButton({
  url: process.env.NEXT_PUBLIC_UPLOADTHING_ENDPOINT,
});

interface UploadButtonProps {
  onComplete: (url: string) => void;
}

const UploadButton = ({ onComplete }: UploadButtonProps) => {
  return (
    <UploadthingButton
      className="mt-4 text-sm ut-button:bg-accent ut-button:ut-readying:bg-purple-500/50"
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        toast.success("Upload Completed");
        onComplete(res[0].url);
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
