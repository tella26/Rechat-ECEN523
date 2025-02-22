"use client";

import { Loader2, Paperclip } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { buttonVariants } from "./button";
import { cn } from "./lib/utils";

export interface FileUploaderProps {
  config?: {
    inputId?: string;
    fileSizeLimit?: number;
    allowedExtensions?: string[];
    checkExtension?: (extension: string) => string | null;
    disabled?: boolean;
  };
  onFileUpload?: (file: File) => Promise<void>;
  onFileError?: (errMsg: string) => void;
}

const DEFAULT_INPUT_ID = "fileInput";
const DEFAULT_FILE_SIZE_LIMIT = 1024 * 1024; // 1MB

export default function FileUploader({
  config,
  onFileUpload,
  onFileError,
}: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const inputId = config?.inputId || DEFAULT_INPUT_ID;
  const fileSizeLimit = config?.fileSizeLimit || DEFAULT_FILE_SIZE_LIMIT;
  const allowedExtensions = config?.allowedExtensions;
  const defaultCheckExtension = (extension: string) => {
    if (allowedExtensions && !allowedExtensions.includes(extension)) {
      return `Invalid file type. Please select a file with one of these formats: ${allowedExtensions!.join(
        ","
      )}`;
    }
    return null;
  };
  const checkExtension = config?.checkExtension ?? defaultCheckExtension;

  const isFileSizeExceeded = (file: File) => {
    return file.size > fileSizeLimit;
  };

  const resetInput = () => {
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
    fileInput.value = "";
  };

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    await handleUpload(file);
    resetInput();
    setUploading(false);
  };

  const handleUpload = async (file: File) => {
    const onFileUploadError = onFileError || window.alert;
    const fileExtension = file.name.split(".").pop() || "";
    const extensionFileError = checkExtension(fileExtension);
    if (extensionFileError) {
      return onFileUploadError(extensionFileError);
    }

    if (isFileSizeExceeded(file)) {
      return onFileUploadError(
        `File size exceeded. Limit is ${fileSizeLimit / 1024 / 1024} MB`
      );
    }

    // Create form data
    const formData = new FormData();
    formData.append("file", file);

    // Send the file to the backend
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_CHAT_API + '/upload', {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload file: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("File uploaded successfully:", data);

      // Call onFileUpload callback if provided
      if (onFileUpload) {
        await onFileUpload(file);
      }
    } catch (error: any) {
      onFileUploadError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <input
        type="file"
        id={inputId}
        style={{ display: "none" }}
        onChange={onFileChange}
        accept={allowedExtensions?.join(",")}
        disabled={config?.disabled || uploading}
      />
      <label
        htmlFor={inputId}
        className={cn(
          buttonVariants({ variant: "secondary", size: "lg" }),
          "cursor-pointer",
          uploading && "opacity-50"
        )}
      >
        {uploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <div className="flex flex-col items-center">
            <Paperclip className="-rotate-45 w-6 h-6 mb-2" />
            <span></span>
          </div>
        )}
      </label>
    </div>
  );
}
