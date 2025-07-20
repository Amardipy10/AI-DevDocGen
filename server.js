// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/generate-readme', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).send('Prompt is required.');
    }

    // This is the corrected line with the new model name
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ readme: text });
  } catch (error) {
    console.error('Error generating README:', error);
    res.status(500).send('Failed to generate README.');
  }
});

app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});