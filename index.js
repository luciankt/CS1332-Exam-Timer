import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Initialize variables
const configPath = path.join(__dirname, './config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const ip = config.ip;
const port = config.port;
let allInstructions = config.allInstructions;

// Initialize express
app.use(cors({ origin: ip }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'exam-timer/dist')));

// GET endpoint to retrieve the messages
app.get('/messages', (req, res) => {
  let passcode = req.query.passcode;
  if (!passcode || passcode == '') {
    // res.json(allInstructions); // WARNING: INSECURE, DO NOT USE IN PRODUCTION
    passcode = '*';
  }
  else if (!allInstructions[passcode]) {
    allInstructions[passcode] = allInstructions['*'];
    allInstructions[passcode].lastChange = new Date().getTime();
  }
  res.json(allInstructions[passcode]);
});

// POST endpoint to modify the messages
app.post('/messages', (req, res) => {
  const { passcode, newBeforeInstructionsText, newDuringInstructionsText } = req.body;
  if (!allInstructions[passcode]) {
    allInstructions[passcode] = allInstructions['*'];
    allInstructions[passcode].lastChange = new Date().getTime();
  }
  
  let instructions = allInstructions[passcode];
 
  if (newBeforeInstructionsText !== undefined) {
    instructions.before = newBeforeInstructionsText;
    instructions.lastChange = new Date().getTime();
  }
  if (newDuringInstructionsText !== undefined) {
    instructions.during = newDuringInstructionsText;
    instructions.lastChange = new Date().getTime();
  }
  res.json(instructions);
});

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'exam-timer', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on ${ip}:${port}`);
});