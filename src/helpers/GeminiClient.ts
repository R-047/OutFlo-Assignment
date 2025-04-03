
import fetch from 'node-fetch';

const API_KEY = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;


export async function chat(prompt: string): Promise<string | null | never | undefined> {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                contents: [{
                    parts: [{ text: prompt }]
                }]
            }
        )
    });

    const result = await response.json();
    return result as string
}

