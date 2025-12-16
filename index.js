const express = require('express');
const app = express();

// Render environment variable से पोर्ट नंबर प्राप्त करें, या डिफ़ॉल्ट रूप से 10000 का उपयोग करें
const port = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('Hello from Render! Your Node.js app is running.');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
