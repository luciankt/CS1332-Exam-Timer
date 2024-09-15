import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert __dirname to work with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8080;
const ip = "https://cs1332-exam-timer-407797320918.us-central1.run.app";

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'exam-timer/build')));

// Initialize two string messages
const configPath = path.join(__dirname, './config.json');
const defaultInstructions = JSON.parse(fs.readFileSync(configPath, 'utf8'));
let instructions = {
  before: defaultInstructions.Before_Exam,
  during: defaultInstructions.During_Exam,
  after: defaultInstructions.After_Exam,
};

// GET endpoint to retrieve the messages
app.get('/messages', (req, res) => {
  res.json(instructions);
});

// POST endpoint to modify the messages
app.post('/messages', (req, res) => {
  const { before, during, after } = req.body;
  instructions = { before, during, after };
  res.json({ message: 'Instructions updated successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on ${ip}:${port}`);
});