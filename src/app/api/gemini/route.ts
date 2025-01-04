import {streamText, Message} from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { initialMessage } from "@/data/data";

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY || "",
});

export const runtime = "edge";
const generateId = () => Math.random().toString(36).slice(2, 15);

const buildGoogleGenAiPrompt = (messages: Message[]): Message[] => [
    {
        id: generateId(),
        role: "user",
        content: initialMessage.content
        //importing it from the lib/data.ts
    },
    ...messages.map((message) => ({
        id: message.id || generateId(),
        role: message.role,
        content: message.content,
    })),
];

export async function POST(request: Request) {
    try {
        const { messages } = await request.json();
        const stream = await streamText({
            model: google("gemini-pro"),
            messages: buildGoogleGenAiPrompt(messages),
            temperature: 0.7
        });
        const response = await stream?.toDataStreamResponse();
        if (!response) {
            throw new Error("No response from streamText");
        }
        return new Response(response.body, {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("Error in POST /api/gemini:", error);
        return new Response(JSON.stringify({ error: error }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}