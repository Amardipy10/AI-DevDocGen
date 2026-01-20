// server.js
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());

// ❗ Fail fast if API key is missing (VERY IMPORTANT on Vercel)
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is missing");
  throw new Error("GEMINI_API_KEY not set in environment variables");
}

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// API route
app.post("/api/generate-readme", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        error: "Prompt is required and must be a string",
      });
    }

    // ✅ v1beta-safe model
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
    });

    const result = await model.generateContent(prompt);

    if (!result?.response) {
      throw new Error("Empty response from Gemini");
    }

    const text = result.response.text();

    return res.status(200).json({
      readme: text,
    });
  } catch (error) {
    console.error("🔥 Gemini Error:", error);

    return res.status(500).json({
      error: "Failed to generate README",
      details: error.message,
    });
  }
});

// Export for Vercel
module.exports = app;
