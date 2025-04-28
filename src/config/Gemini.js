

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyDleawULpkWDSHmnE9baAKpA6OFeZveDyE" });

async function main(prompt) {
  const chat = ai.chats.create({
    model: "gemini-2.0-flash",
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
  });

  const response1 = await chat.sendMessage({
    message: prompt,
  });

  console.log(response1.text);
  return response1.text;

//   const response2 = await chat.sendMessage({
//     message: "prompt",
//   });

//   console.log("Chat response 2:", response2.text);

}

export default main;