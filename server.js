// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();

// Vercel will handle the port, so we don't need to define it here.
// const port = 3001; 

app.use(cors());
app.use(express.json());

// Initialize the Google Generative AI client with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define the API route. Vercel will direct requests starting with /api to this file.
// In your vercel.json, you will route something like /api/generate-readme to this server.
app.post('/api/generate-readme', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).send('Prompt is required.');
    }

    // Use the specified Gemini model
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

// This part is removed as Vercel handles the server listening.
/*
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
*/

// Export the app instance for Vercel's serverless environment
module.exports = app;

app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
