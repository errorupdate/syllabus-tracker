import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();

// Allow requests from frontend
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Initialize the Google Gen AI client from the environment variable
const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

app.post('/api/generate', async (req, res) => {
  if (!ai) {
    return res.status(500).json({ error: "Backend API key is missing. Check your .env file." });
  }

  try {
    const { model, contents, systemInstruction } = req.body;
    
    // Convert to structure expected by @google/genai SDK
    const response = await ai.models.generateContent({
      model: model || 'gemini-1.5-flash',
      contents: contents, // Should be array of messages, or string
      config: {
        systemInstruction: systemInstruction 
          ? { parts: [{ text: systemInstruction }] } 
          : undefined
      }
    });

    res.json({ text: response.text });
  } catch (error) {
    console.error("Error communicating with Gemini (Backend):", error);
    res.status(500).json({ error: error.message || "Failed to generate AI content" });
  }
});

// Vercel serverless functions automatically recognize the exported app
export default app;

// For local testing alongside Vite via concurrently
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Backend server running locally on http://localhost:${PORT}`);
  });
} 
