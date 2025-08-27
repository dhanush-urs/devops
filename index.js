const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.get('/', (req, res) => res.send('Hello from DevOps Project 🚀'));

if (require.main === module) {
  app.listen(port, () => console.log(`Listening on ${port}`));
}

module.exports = app;
