
import OpenAI from "openai";
import { promptTree } from "./promptTree";
import { ResponseInput } from "openai/resources/responses/responses.mjs";

interface AIResponse {
    id: string;
    generatedResponse: string
}

async function evaluateTestAI(text: {role: string, content: string}[]): Promise<AIResponse> {
    const client = new OpenAI({
        apiKey: process.env.CHATGPT_API_KEY
    })

    const startMessage = `
        This is the given tree: ${JSON.stringify(promptTree)}

        Evaluate which id the current chat falls into and return ONLY a structured JSON response with the following interface:
        {
            "id": "string",
            "generatedResponse": "string"
        }

        Ensure the response is valid JSON and does not include any additional text or explanation.
        Generate a good response based on the client's mood, energy, and the problem for the "generatedResponse" field.

        If the problem falls into no category, the id should be "-1" along with an aplogy and a referal to this website: <a href="https://cleanbug.com/faq" target="_blank">www.cleanbug.com/faq</a>. This only applies if the customer specifically ASKS for help with a problem that is not in the tree. If the customer is not asking anything, the id remains "0".

        Do not invent new ways to solve the problems. Do not hallucinate or make up information. Do not assume anything about the problem or it's solutions.

        YOU are a support bot, do not say tell the customer to contact support.
    `

    text.unshift({
        role: "developer",
        content: startMessage
    })

    
    const response = await client.responses.create({
        model: "gpt-4.1",
        input: text as ResponseInput,
    })

    console.log(response.output_text)

    return JSON.parse(response.output_text) as AIResponse
}

export default evaluateTestAI