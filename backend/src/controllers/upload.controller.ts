import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import { exec } from "child_process";

// Define storage for the uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.resolve(__dirname, "../../backend/data");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Create the multer upload instance
const upload = multer({ storage });

// Function to handle file deletion
const deleteExistingFiles = (uploadPath: string, callback: (error: Error | null) => void) => {
  fs.readdir(uploadPath, (err, files) => {
    if (err) {
      console.error("Failed to read directory:", err);
      return callback(err);
    }

    const pdfFiles = files.filter(f => f.endsWith(".pdf"));
    if (pdfFiles.length >= 2) {
      let deleteCount = 0;
      pdfFiles.forEach(pdfFile => {
        fs.unlink(path.join(uploadPath, pdfFile), err => {
          if (err) {
            console.error("Failed to delete file:", err);
          }
          deleteCount++;
          if (deleteCount === pdfFiles.length) {
            callback(null); // All files have been processed
          }
        });
      });
    } else {
      callback(null); // No need to delete files
    }
  });
};

// Middleware to handle the file upload
const uploadMiddleware = upload.single('file');

// Controller to handle the file upload
export const uploadFile = [
  (req: Request, res: Response, next) => {
    const uploadPath = path.resolve(__dirname, "../../backend/data");
    deleteExistingFiles(uploadPath, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to clean directory' });
      }
      next(); // Proceed to the next middleware
    });
  },
  uploadMiddleware,
  (req: Request, res: Response) => {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    // Execute generate.ts script
    exec("tsx src/controllers/engine/generate.ts", (err, stdout, stderr) => {
      if (err) {
        console.error("Failed to execute generate.ts:", err);
        return res.status(500).json({ error: 'Failed to generate storage' });
      }
      console.log(stdout);
      if (stderr) {
        console.error(stderr);
      }
      res.json({ message: 'File uploaded and processed successfully', filename: file.filename });
    });
  }
];
