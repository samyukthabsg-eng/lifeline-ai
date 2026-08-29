import { NextResponse } from "next/server";
import OpenAI from "openai";
import prisma from "@/lib/prisma";

// Initialize OpenAI client
// Note: In production, ensure OPENAI_API_KEY is set in your environment variables (.env.local)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy_key_for_build",
});

export async function POST(req: Request) {
  try {
    const { description } = await req.json();

    if (!description || typeof description !== "string") {
      return NextResponse.json(
        { error: "A valid description is required." },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are LifeLine AI, an emergency response assistant. Your job is to analyze the user's emergency description and provide an immediate, structured response. " +
            "Categorize the emergency, assess its urgency, and provide a checklist of 3-5 critical, immediate actions the user should take to stay safe or stabilize the situation until help arrives. " +
            "Prioritize human safety above all else. Keep instructions short and clear. Always return valid JSON matching the schema.",
        },
        {
          role: "user",
          content: description,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.1, // Low temperature for consistent, factual outputs
    });

    // Parse the json response back into our type
    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error("Received empty response from OpenAI");
    }
    
    let analysis: any;
    try {
      analysis = JSON.parse(responseContent);
    } catch (e) {
      throw new Error("Failed to parse JSON response");
    }

    // Save to History Dashboard Database asynchronously (doesn't block the response)
    prisma.emergencyLog.create({
      data: {
        description: description,
        category: analysis.category || "Unknown",
        urgency: analysis.urgency || "Unknown",
        checklist: JSON.stringify(analysis.checklist || []),
      },
    }).catch((dbError) => {
      console.error("Failed to log to database:", dbError);
    });

    // Save to History Dashboard Database asynchronously (doesn't block the response)
    prisma.emergencyLog.create({
      data: {
        description: description,
        category: analysis.category || "Unknown",
        urgency: analysis.urgency || "Unknown",
        checklist: JSON.stringify(analysis.checklist || []),
      },
    }).catch((dbError) => {
      console.error("Failed to log to database:", dbError);
    });

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Error analyzing emergency:", error);
    return NextResponse.json(
      { error: "Failed to analyze the emergency. Please try again or call emergency services immediately." },
      { status: 500 }
    );
  }
}

