import { GoogleGenerativeAI } from "@google/generative-ai";

// console.log(process.env.GOOGLE_API_KEY);

const AI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export const model = AI.getGenerativeModel({ model: "gemini-pro" });

export const chat = model.startChat({
  history: [],
  generationConfig: {
    maxOutputTokens: 1000,
  },
});
