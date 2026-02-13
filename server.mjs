import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("./"));

// 🔎 startup debug (temporary – baad me hata dena)
console.log("API KEY FOUND:", process.env.API_KEY ? "YES" : "NO");

app.post("/chat", async (req, res) => {
  const msg = req.body?.message;

  if (!msg) {
    return res.json({ reply: "Message missing" });
  }

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: "Give detailed answers in simple Hindi" },
            { role: "user", content: msg }
          ]
        })
      }
    );

    const data = await response.json();

    // 🔎 error debug
    if (!response.ok) {
      console.log("GROQ ERROR:", data);
      return res.json({ reply: "AI Error – check API / credits" });
    }

    res.json({
      reply: data.choices?.[0]?.message?.content || "No reply"
    });

  } catch (err) {
    console.log("SERVER ERROR:", err);
    res.json({ reply: "Server Error" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
