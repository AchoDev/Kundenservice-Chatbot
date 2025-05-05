import evaluateMood from "../tools/evaluateMood";
import evaluateProblem from "../tools/evaluateProblem";
import genericMoodResponse from "../tools/moodResponse";
import genericProblemResponse from "../tools/problemResponse";
import { findProduct } from "../tools/product";
import { Prompt, promptTree } from "../tools/promptTree";

interface RequestBody {
    conversationID: string;
    customerMessage: {
        text: string;
        type: string;
        id: string;
    }
}

function getPromptById(id: string, prompts: Prompt[]): Prompt | null {
    for (const prompt of prompts) {
        console.log("comparing id: " + prompt.id + " with " + id)   
        if (prompt.id === id) {


            return prompt;
        }
        if (prompt.children) {
            const childPrompt = getPromptById(id, prompt.children);
            if (childPrompt) {
                return childPrompt;
            }
        }
    }
    return null;
}

export default defineEventHandler(async (event) => {
    const body: RequestBody = await readBody(event);
    const { conversationID, customerMessage } = body;

    console.log("body:" + JSON.stringify(body))

    // Call the evaluateMood and evaluateProblem functions
    // const mood = evaluateMood(customerMessage);
    // const problem = evaluateProblem(customerMessage);

    // const moodResponse = genericMoodResponse(mood);
    // const product = findProduct(customerMessage) ?? {
    //     defaultName: "Product",
    //     aliases: [],
    // };
    // const problemResponse = genericProblemResponse(problem, product);

    // const response = `
    // ${moodResponse}
    // \n
    // ${problemResponse}
    // `

    const prompt = getPromptById(customerMessage.id, promptTree);

    console.log("prompt:" + JSON.stringify(prompt))

    const response = {
        message: prompt?.answer,
        id: prompt?.id,
        prompts: prompt?.children,
    }

    // Wait for 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 500));


    // Return the results
    return response;
})