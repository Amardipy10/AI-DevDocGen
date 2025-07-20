// server.js
// The dotenv package is not needed on Vercel, so this line is removed.
// require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();

app.use(cors());
app.use(express.json());

// Initialize the Google Generative AI client with the API key from Vercel's environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define the API route.
app.post('/api/generate-readme', async (req, res) => {
  // Check if the API key is available. If not, the function will crash.
  if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not configured.');
    return res.status(500).send('Server configuration error.');
  }

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

// Export the app instance for Vercel's serverless environment
module.exports = app;
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
