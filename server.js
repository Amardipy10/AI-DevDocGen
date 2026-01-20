// server.js
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());

// Safety check
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing");
  throw new Error("GEMINI_API_KEY not set");
}

// Init Gemini (Node runtime only)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/generate-readme", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // ✅ WORKING MODEL (v1)
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const result = await model.generateContent(prompt);

    if (!result?.response) {
      throw new Error("Empty response from Gemini");
    }

    const text = result.response.text();

    return res.status(200).json({ readme: text });
  } catch (err) {
    console.error("🔥 Gemini Error:", err);

    return res.status(500).json({
      error: "Failed to generate README",
      details: err.message
    });
  }
});

module.exports = app;
