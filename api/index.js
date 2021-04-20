const express = require('express');
const cors = require('cors');
const app = express();

const port = 4000;

const fs = require('fs');
const todos = JSON.parse(fs.readFileSync('./data/todos.json', 'utf8'));
const messages = JSON.parse(fs.readFileSync('./data/messages.json', 'utf8'));

app.use(cors());

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.get('/message', (req, res) => {
  const messagesRandomNumber = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
  const message = messages.filter((message) => message.id === messagesRandomNumber);
  res.json(message);
});

app.get('/', (req, res) => {
  res.send('The server is up!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
