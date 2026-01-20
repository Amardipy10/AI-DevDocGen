const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());

// Fail fast
if (!process.env.GEMINI_API_KEY) {
  throw new Error("❌ GEMINI_API_KEY missing in env");
}

// ✅ v1 client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/generate-readme", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Prompt required" });
    }

    // ✅ THIS MODEL WORKS
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return res.status(200).json({ readme: text });
  } catch (err) {
    console.error("🔥 Gemini failure:", err);

    return res.status(500).json({
      error: "Gemini generation failed",
      details: err.message,
    });
  }
});

module.exports = app;
