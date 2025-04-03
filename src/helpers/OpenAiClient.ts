import { OpenAI } from 'openai';

const client = new OpenAI(
    { apiKey: process.env.OPENAI_API_KEY }
);

export async function chat(prompt: string): Promise<string | null | never> {
    const completion = await client.chat.completions.create(
        {
            model: 'gpt-4o',
            messages: [
                {
                    role: 'user',
                    content: prompt
                },
            ],
        }
    );

    const answer = completion.choices[0].message.content
    return answer
}
