const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/api/gpt", async (req, res) => {
  try {
    const userMessage = req.body.message;
    const prompt = `
        You are the best summarizing helper in the world. You should summarize the text delimited by triple brackets into 3 sentences.
        The summarized text's language should be Korean.

        The summarized text's format is as follows and you must answer with this format. Each sentence must be one sentence.
        1 - <first sentence>
        2 - <second sentence>
        3 - <third sentence>
        '''${userMessage}'''
    `;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const result = response.data.choices[0].message.content;
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use(express.static(path.join(__dirname)));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
