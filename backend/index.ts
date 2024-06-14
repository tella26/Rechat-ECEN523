import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import path from 'path';
import fs from 'fs';
import { initObservability } from './src/observability';
import chatRouter from './src/routes/chat.route';
import uploadRouter from './src/routes/upload.route';
import { deleteAllPoints } from './src/controllers/qdrantService'; // Adjust the path as necessary

const app = express();
const port = parseInt(process.env.PORT || '8000');

const env = process.env.NODE_ENV || 'development';
const prodCorsOrigin = process.env.PROD_CORS_ORIGIN;

initObservability();

app.use(express.json());
app.use(express.text());

if (env === 'development') {
  console.warn('Running in development mode - allowing CORS for all origins');
  app.use(cors());
} else if (prodCorsOrigin) {
  console.log(`Running in production mode - allowing CORS for domain: ${prodCorsOrigin}`);
  app.use(cors({ origin: prodCorsOrigin }));
} else {
  console.warn('Production CORS origin not set, defaulting to no CORS.');
  app.use(cors()); // Default CORS for safety, adjust as needed
}

// Ensure the upload directory exists
const uploadDir = path.resolve(__dirname, 'backend', 'data');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Use the routers
app.use('/api/chat', chatRouter);
app.use('/api/chat/upload', uploadRouter);

// Example endpoint to trigger deletion
app.post('/api/deleteAllPoints', async (req: Request, res: Response) => {
  const { apiKey, collectionName } = req.body;

  try {
    await deleteAllPoints(apiKey, collectionName);
    res.json({ message: 'All points deleted successfully.' });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to delete points:', error.message);
      res.status(500).json({ error: 'Failed to delete points.' });
    } else {
      console.error('Failed to delete points:', error);
      res.status(500).json({ error: 'An unknown error occurred.' });
    }
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send('LlamaIndex Express Server');
});

// Start the server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
