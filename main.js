// node --version # Should be >= 18
// npm install @google/generative-ai

// git diff HEAD^ -- . ":(exclude)package-lock.json" ":(exclude)node_modules/*/**"

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-pro";
const API_KEY = "AIzaSyDmYW1nUWxKpGDmBfyPdtWQRRoI0PTDlhQ";

async function run() {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.7,
    topK: 1,
    topP: 1,
    maxOutputTokens: 100,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const val = `
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    console.log(chunkText);
    text += chunkText;
  }
        
  `;

  const prompt = `
    ${val}

    Generate a concise commit message for code changes. Provide a one-line summary with prefix (fix, feature, refactor, docs, feat, style, etc.) based on the given diff of previous and new code, including added lines marked with '+' sign. Ensure the message is no more than 30 words and no less than 10 words. Make sure not to include many symbols or other special characters.
  `;

  const { totalTokens } = await model.countTokens(prompt);

  if (totalTokens > 20000) {
    console.log("The prompt is too long.");
    return;
  }

  // const result = await model.generateContent(
  //   prompt,
  //   generationConfig,
  //   safetySettings
  // );

  const result = await model.generateContentStream(
    prompt,
    generationConfig,
    safetySettings
  );

  await simulateTypingEffect(result);
  // const response = result.response;
  // console.log(response.text());

  // let text = "";
  // for await (const chunk of result.stream) {
  //   const chunkText = chunk.text();
  //   text += chunkText;
  // }
}

async function simulateTypingEffect(result) {
  // Convert the asynchronous iterable to an array
  const chunks = [];
  for await (const chunk of result.stream) {
    chunks.push(chunk);
  }

  // Use Promise.all to wait for all promises to be resolved
  await Promise.all(
    chunks.map(async (chunk) => {
      const chunkText = chunk.text();
      await typeWithDelay(chunkText, 50);
    })
  );
}

async function typeWithDelay(text, delay) {
  for (const char of text) {
    process.stdout.write(char);
    await sleep(delay);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

run();
