import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "5mb" }));

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 1. AI NEC Code & Technical Instructor API
app.post("/api/ai/nec-consultant", async (req, res) => {
  try {
    const { query, topic, context } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured. Please set GEMINI_API_KEY in environment or secrets.",
      });
    }

    const systemInstruction = `You are Master Inspector & Educator Electrical AI, a top-tier NEC (National Electrical Code) master electrician, NFPA 70E safety specialist, and master instructor.
Your goal is to guide new apprentices, journeymen, and aspiring contractors in simple, clear, actionable terms.
When answering:
1. Cite specific NEC Articles and Sections (e.g., NEC 210.8 for GFCI, NEC 250 for Grounding, NEC 310.16 for Ampacity, NEC 220 for Calculations).
2. Highlight Safety Protocols (OSHA, NFPA 70E Arc Flash, Lockout/Tagout).
3. Provide practical field tips ("Master Electrician Tip").
4. Keep tone encouraging, professional, and clear. Use bullet points and code block formatting where helpful.`;

    const prompt = `Topic/Context: ${topic || "General NEC & Electrical Engineering"}
Question/Scenario: ${query}
${context ? `Additional Info: ${JSON.stringify(context)}` : ""}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.3,
      },
    });

    return res.json({ response: response.text });
  } catch (err: any) {
    console.error("Error in NEC Consultant API:", err);
    return res.status(500).json({ error: err.message || "Failed to query NEC AI Consultant" });
  }
});

// 2. AI Sales & Client Roleplay Engine API
app.post("/api/ai/sales-roleplay", async (req, res) => {
  try {
    const { scenario, customerPersona, history, userResponse } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured.",
      });
    }

    const systemInstruction = `You are playing two roles in an electrical business sales roleplay simulation:
1. The Customer Persona: (${customerPersona.name} - ${customerPersona.personality}). They have a specific electrical need (${scenario.title}: ${scenario.description}) and objections (e.g., price, permit necessity, timing, trust).
2. The AI Sales Coach (Evaluator): Observes the electrician's response.

Return a JSON object with this EXACT structure:
{
  "customerReply": "The dialogue spoken by the customer in character responding to the user's latest statement.",
  "dealStatus": "interested" | "hesitant" | "objecting" | "closed_won" | "walked_away",
  "score": 85, // Integer 1-100 indicating professionalism, value pitch, and closing effectiveness
  "feedback": {
    "strengths": ["Clear explanation of 200A service upgrade benefits", "Polite tone"],
    "improvements": ["Mention local permit safety requirement to justify $3,500 cost", "Offer financing option"],
    "necSafetyTip": "Reference NEC 230.79 for main disconnect rating requirements when discussing service upgrades."
  }
}`;

    const prompt = `Scenario: ${scenario.title} - ${scenario.description}
Customer Name: ${customerPersona.name}, Personality: ${customerPersona.personality}
Conversation History so far: ${JSON.stringify(history || [])}
Electrician's Latest Pitch/Reply: "${userResponse}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.5,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (err: any) {
    console.error("Error in Sales Roleplay API:", err);
    return res.status(500).json({ error: err.message || "Failed to simulate sales roleplay" });
  }
});

// 3. "Volt Books AI" Live Accountant & Bookkeeper Assistant API
app.post("/api/ai/accountant", async (req, res) => {
  try {
    const { action, metrics, query } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured.",
      });
    }

    const systemInstruction = `You are "Volt Books AI", the dedicated Chief Financial Officer, CPA, and Trade Bookkeeper for electrical contractors.
You know trade pricing, overhead multipliers, hourly break-even calculations, tax deductions for electricians (trucks, tools, licensing, uniforms, travel), legal contract disclaimers, and privacy laws for customer estimates.

Always format your response with clean Markdown, numbers, breakdown bullet points, and actionable business advice.
If generating a Contract Disclaimer or Quote Terms, include standard protective clauses for electrical contractors (e.g., hidden wall hazards, owner supply disclaimer, permit fee conditions, change order terms).`;

    const prompt = `Action: ${action}
Contractor Business Metrics: ${JSON.stringify(metrics || {})}
User Question/Request: ${query}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.4,
      },
    });

    return res.json({ advice: response.text });
  } catch (err: any) {
    console.error("Error in Accountant API:", err);
    return res.status(500).json({ error: err.message || "Failed to compute financial advice" });
  }
});

// 4. AI Slide Deck & Lesson Creator API
app.post("/api/ai/generate-lesson", async (req, res) => {
  try {
    const { topic, tierLevel } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured.",
      });
    }

    const systemInstruction = `You are a master electrical curriculum developer. Generate an interactive 4-slide training deck with embedded knowledge checks for electrical contractors and apprentices.
Return JSON with structure:
{
  "title": "Title of the Lesson",
  "category": "NEC Code" | "Safety & OSHA" | "Sales & Pitching" | "Business Mastery" | "Future Tech",
  "summary": "Brief summary",
  "slides": [
    {
      "slideNumber": 1,
      "title": "Slide Title",
      "bullets": ["Bullet 1", "Bullet 2", "Bullet 3"],
      "keyTakeaway": "Main takeaway point",
      "speakerNotes": "What the instructor should say to the crew"
    }
  ],
  "quiz": [
    {
      "question": "Question text?",
      "options": ["A) Opt 1", "B) Opt 2", "C) Opt 3", "D) Opt 4"],
      "correctIndex": 0,
      "explanation": "Why this is correct citing NEC or safety rule."
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Create a comprehensive lesson for Tier ${tierLevel || 1} on topic: "${topic}"`,
      config: {
        systemInstruction,
        temperature: 0.5,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (err: any) {
    console.error("Error in Lesson Generator API:", err);
    return res.status(500).json({ error: err.message || "Failed to generate lesson" });
  }
});

// 5. AI Electrician Joke & Christian Principles Generator API
app.post("/api/ai/jokes-quotes", async (req, res) => {
  try {
    const { mode, includeChristianPrinciples } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured.",
      });
    }

    const systemInstruction = `You are an AI generator of electrician humor, trade quotes, and biblical business principles for contractors.
Mode: ${mode || "joke"} (Values: "joke" | "quote" | "christian")
Include Christian Principles: ${includeChristianPrinciples ? "YES" : "NO"}

Return JSON object:
{
  "category": "${mode === "christian" || includeChristianPrinciples ? "Christian Principle" : mode === "quote" ? "Motivational Quote" : "Joke"}",
  "title": "Short Catchy Title",
  "content": "The funny joke text OR motivational quote OR biblical principle for tradesmen.",
  "sourceOrScripture": "e.g., Proverbs 11:1 or Electrical Humor 101",
  "practicalApplication": "Why this matters on the job site or in business."
}`;

    const prompt = mode === "christian" 
      ? "Generate a powerful Christian principle for an electrical contractor based on Proverbs or the New Testament regarding integrity, fair pricing, hard work, or customer trust."
      : mode === "quote"
      ? "Generate an inspiring craftsmanship and trade motivation quote for electricians."
      : "Generate a witty, clean, hilarious electrician trade joke or apprentice humor.";

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (err: any) {
    console.error("Error in Jokes/Quotes API:", err);
    return res.status(500).json({ error: err.message || "Failed to generate trade joke or quote" });
  }
});

// 6. AI Hands-Free Podcast Audio Interaction API
app.post("/api/ai/podcast-handsfree", async (req, res) => {
  try {
    const { episodeTitle, userVoiceTranscript, questionPrompt } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured.",
      });
    }

    const systemInstruction = `You are the AI Podcast Host of "VoltPro Drive-Time Radio". 
The electrician is listening to a hands-free podcast while driving or working in the field and answered your voice pop-quiz question.

Evaluate their spoken voice transcript concisely.
Return JSON:
{
  "isCorrect": true,
  "spokenFeedback": "Short 2-3 sentence verbal voice feedback spoken as the podcast host (e.g. 'Spot on, brother! Article 210.8 requires GFCI in all kitchens and basements. You earned 25 Volt Coins!')",
  "necCitation": "NEC Article 210.8",
  "coinsEarned": 25,
  "xpEarned": 50
}`;

    const prompt = `Episode: ${episodeTitle}
Podcast Host Question: "${questionPrompt}"
User Spoken Voice Response: "${userVoiceTranscript}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.4,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (err: any) {
    console.error("Error in Podcast Handsfree API:", err);
    return res.status(500).json({ error: err.message || "Failed to process hands-free response" });
  }
});

// 7. AI Interactive Code Teacher API (Admin Only)
app.post("/api/ai/code-teacher", async (req, res) => {
  try {
    const { question, currentTopic, userCodeSnippet } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured.",
      });
    }

    const systemInstruction = `You are an expert AI Interactive Code Teacher & Software Engineering Mentor specifically tailored for Master Electricians, Electrical Contractors, and Trade Educators.
Your mission is to teach the admin basic software engineering (TypeScript, React, Node.js, functions, logic, APIs) using intuitive electrical trade analogies!

ANALOGY EXAMPLES:
- Variables = Wire Gauges / Conduit pipes storing specific electrical values.
- Functions = Electrical Relays or Switches that receive input current and trigger output load.
- If/Else Statements = Circuit Breakers or Thermostats evaluating threshold conditions.
- APIs / Routes = Transformers stepping down high voltage data into clean usable endpoints.
- React State = Live Electrical Panel Voltage state that automatically updates connected fixtures (UI).

Respond in JSON format:
{
  "explanation": "Clear, encouraging, step-by-step explanation using electrical/trade metaphors.",
  "codeSnippet": "TypeScript/React/JS code snippet illustrating the concept.",
  "electricalAnalogy": "Brief 1-2 sentence electrical trade analogy.",
  "practiceChallenge": "A short exercise or challenge question for the admin to try.",
  "suggestedFollowUp": "A recommended next question or topic to explore."
}`;

    const prompt = `Topic: ${currentTopic || "General Web & Trade App Coding"}
Admin Question / Prompt: "${question}"
Admin Code Snippet (if provided): "${userCodeSnippet || "None"}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.5,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (err: any) {
    console.error("Error in AI Code Teacher API:", err);
    return res.status(500).json({ error: err.message || "Failed to generate AI code teacher response" });
  }
});

// Serve Vite in development / static build in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`VoltPro AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
