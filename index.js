import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8080;
const ip = "https://cs1332-exam-timer-407797320918.us-east1.run.app";

app.use(cors({
    origin: 'https://cs1332-exam-timer-407797320918.us-east1.run.app'
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'exam-timer/dist')));

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
  const { newBeforeInstructionsText, newDuringInstructionsText } = req.body;
  if (newBeforeInstructionsText !== undefined) instructions.before = newBeforeInstructionsText;
  if (newDuringInstructionsText !== undefined) instructions.during = newDuringInstructionsText;
  res.json(instructions);
});

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'exam-timer', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on ${ip}:${port}`);
});