import { initialMessage } from "../../../data/data";

export const runtime = "edge";

export async function POST(request: Request) {
    try {
        const { messages } = await request.json();
        const lastMessage = messages[messages.length - 1].content;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${process.env.GOOGLE_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `${initialMessage.content}\n\nUser: ${lastMessage}`
                        }]
                    }]
                })
            }
        );

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;

        return new Response(
            JSON.stringify({
                role: "assistant",
                content: text
            }),
            { headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error("Gemini API Error:", error);
        return new Response(
            JSON.stringify({
                error: "Failed to process request",
                details: error instanceof Error ? error.message : String(error)
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}