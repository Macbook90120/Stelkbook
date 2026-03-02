export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Update to a current model
const MODEL_NAME = "gemini-2.5-flash"; // or "gemini-2.5-flash-lite" or "gemini-2.5-pro"

const MAX_INPUT_LENGTH = 100000;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userPrompt, pdfContext } = body;

    if (!userPrompt) {
      return NextResponse.json(
        { error: "userPrompt is required" },
        { status: 400 }
      );
    }

    const totalLength =
      (userPrompt?.length || 0) + (pdfContext?.length || 0);

    if (totalLength > MAX_INPUT_LENGTH) {
      return NextResponse.json(
        { error: "Input too large." },
        { status: 413 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const fullPrompt = pdfContext
      ? `CONTEXT:\n${pdfContext}\n\nQUESTION:\n${userPrompt}`
      : userPrompt;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: fullPrompt,
    });

    return NextResponse.json({
      response: response.text || "No response generated.",
      model: MODEL_NAME,
    });

  } catch (error: any) {
    console.error("AI Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return NextResponse.json(
      { 
        error: "Failed to generate AI response", 
        details: error.message 
      },
      { status: 500 }
    );
  }
}