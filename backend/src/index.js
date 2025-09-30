import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import routerIndex from './routers/index.router.js';
import cors from 'cors';

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Conexión a MongoDB
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/marcaciones';

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Error conectando MongoDB', err));
// --------------------------------------------------------

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Content Security Policy
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'none'; connect-src 'self' http://localhost:3030 ws://localhost:*; script-src 'self' 'unsafe-inline'"
  );
  next();
});

// API routes
app.use('/api', routerIndex);

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
