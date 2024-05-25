"use client";

import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi"; // Importing back arrow icon from react-icons
import Header from "@/app/components/header";
import ChatSection from "./components/chat-section";
import FileUploader from "../app/components/ui/file-uploader";
import { Button } from "../app/components/ui/button"; // Importing Button from your button.tsx file

export default function Home() {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileUploaded2, setFileUploaded2] = useState(false);
  const [showChatSection, setShowChatSection] = useState(false);

  const handleFileUpload = async (file: File): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setFileUploaded(true);
        resolve();
      }, 1000); // Simulate a delay for file upload
    });
  };

  const handleFileUpload2 = async (file: File): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setFileUploaded2(true);
        setShowChatSection(true);
        resolve();
      }, 1000); // Simulate a delay for file upload
    });
  };

  const handleFileError = (errMsg: string) => {
    alert(errMsg);
  };

  const handleContinue = () => {
    setShowChatSection(true);
  };

  const handleBack = () => {
    if (showChatSection) {
      setShowChatSection(false);
      setFileUploaded2(false);
    } else if (fileUploaded) {
      setFileUploaded(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24 background-gradient">
      <div className="w-full max-w-5xl mx-auto flex items-center mb-8">
        {(fileUploaded || showChatSection) && (
          <FiArrowLeft
            size={24}
            className="cursor-pointer mr-4"
            onClick={handleBack}
          />
        )}
        <Header />
      </div>
      <div className="w-full max-w-5xl mx-auto">
        {showChatSection ? (
          <ChatSection />
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {!fileUploaded ? (
              <>
                <p className="text-lg font-large">
                  Please upload <b>paper or book</b> files to use the Rechat - Research Chat. <b>1MB Limit file upload</b>
                </p>
                <FileUploader
                  config={{ disabled: false }}
                  onFileUpload={handleFileUpload}
                  onFileError={handleFileError}
                />
              </>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <p className="text-lg font-large">
                  Please upload <b> bibliography</b> files, otherwise click Continue. <b>1MB Limit file upload</b>
                </p>
                <div className="flex items-center gap-x-4">
                  <FileUploader
                    config={{ disabled: false }}
                    onFileUpload={handleFileUpload2}
                    onFileError={handleFileError}
                  />
                  <Button variant="default" size="lg" onClick={handleContinue}>
                    Continue
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
