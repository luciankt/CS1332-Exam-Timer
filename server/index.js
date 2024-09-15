const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Initialize two string messages
const configPath = path.join(__dirname, './config.json');
const defaultInstructions = JSON.parse(fs.readFileSync(configPath, 'utf8'));
let instructions = {
  before: defaultInstructions.Before_Exam,
  during: defaultInstructions.During_Exam,
  after: defaultInstructions.After_Exam,
}

console.log('Started')

// GET endpoint to retrieve the messages
app.get('/messages', (req, res) => {
  console.log('received smth');
  res.json(instructions);
});

// POST endpoint to modify the messages
app.post('/messages', (req, res) => {
  const { newBeforeInstructionsText, newDuringInstructionsText } = req.body;
  if (newBeforeInstructionsText !== undefined) instructions.before = newBeforeInstructionsText;
  if (newDuringInstructionsText !== undefined) instructions.during = newDuringInstructionsText;
  res.json(instructions);
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});