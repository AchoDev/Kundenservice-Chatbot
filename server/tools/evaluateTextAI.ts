
import OpenAI from "openai";
import { promptTree } from "./promptTree";
import { ResponseInput } from "openai/resources/responses/responses.mjs";

interface AIResponse {
    id: string;
    text: string
}

async function evaluateTestAI(text: {role: string, content: string}[]): Promise<AIResponse> {
    const client = new OpenAI({
        apiKey: process.env.CHATGPT_API_KEY
    })

    const startMessage = `
        This is the given tree: ${promptTree}

        Evaluate which id the current chat falls into and return a structured JSON response with the following interface.
        {
            id: string
            text: string
        }

        The text is the best response based on the id.
    `

    text.unshift({
        role: "developer",
        content: startMessage
    })

    console.log(text)

    const response = await client.responses.create({
        model: "gpt-4.1-nano",
        input: text as ResponseInput,
    })

    return JSON.parse(response.output_text) as AIResponse
}

export default evaluateTestAI