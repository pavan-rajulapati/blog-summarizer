import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/',(req, res) => {
    res.send("From backend")   
})

app.post("/api/summarize", async (req, res) => {
    console.log("API called");
  const { inputs } = req.body;

  try {
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/tuner007/pegasus_summarizer",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs }),
      }
    );

    const result = await response.json();

    if (Array.isArray(result) && result[0]?.summary_text) {
      return res.status(200).json({ summary_text: result[0].summary_text });
    }

    if (result?.summary_text) {
      return res.status(200).json({ summary_text: result.summary_text });
    }

    if (result?.error) {
      console.error("Hugging Face API error:", result.error);
      return res.status(500).json({ error: result.error });
    }

    return res.status(200).json({ summary_text: null });
  } catch (err) {
    console.error("Request failed:", err);
    res.status(500).json({ error: "Failed to summarize text." });
  }
});



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
