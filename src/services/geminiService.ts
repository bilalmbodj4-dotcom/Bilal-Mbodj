import { GoogleGenAI, Type } from "@google/genai";
import { Word } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function searchWord(term: string): Promise<Word | null> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a dictionary entry for the French or English word "${term}". 
      If it's French, provide English translation. If it's English, provide French translation.
      Return the result in JSON format matching this structure:
      {
        "term": "string",
        "phonetic": "string",
        "type": "string (e.g. n.f., adj., v.)",
        "definition": "string (in the source language)",
        "translation": "string (in the target language)",
        "exampleFr": "string (French example sentence)",
        "exampleEn": "string (English translation of the example)"
      }`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            term: { type: Type.STRING },
            phonetic: { type: Type.STRING },
            type: { type: Type.STRING },
            definition: { type: Type.STRING },
            translation: { type: Type.STRING },
            exampleFr: { type: Type.STRING },
            exampleEn: { type: Type.STRING },
          },
          required: ["term", "phonetic", "type", "definition", "translation", "exampleFr", "exampleEn"]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...data
    };
  } catch (error) {
    console.error("Error searching word with Gemini:", error);
    return null;
  }
}

export async function generateQuiz(words: Word[]): Promise<any[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 5 quiz questions based on these words: ${words.map(w => w.term).join(", ")}.
      Include a mix of multiple choice, fill in the blanks, and translation questions.
      Return as a JSON array of objects:
      {
        "type": "multiple-choice" | "fill-blanks" | "translation",
        "question": "string",
        "answer": "string",
        "options": ["string"] (only for multiple-choice),
        "hint": "string"
      }`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING, enum: ["multiple-choice", "fill-blanks", "translation"] },
              question: { type: Type.STRING },
              answer: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              hint: { type: Type.STRING },
            },
            required: ["type", "question", "answer", "hint"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Error generating quiz with Gemini:", error);
    return [];
  }
}
