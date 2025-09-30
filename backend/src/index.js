import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './db.js';
import routerIndex from './routers/index.router.js';
import cors from 'cors';


// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

db();
const app = express();

app.use(cors());

// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Set Content Security Policy headers
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'none'; connect-src 'self' http://localhost:3030 ws://localhost:*; script-src 'self' 'unsafe-inline'"
  );
  next();
});

// Use the router for API endpoints
app.use('/api', routerIndex);

// Serve the HTML file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});