const express = require('express');
const app = express();
app.use((req, res, next) => {
  console.log('Got request:', req.method, req.url);
  next();
});
app.get('/ping', (req, res) => res.send('pong'));
app.listen(5006, () => console.log('Test server on 5006'));
