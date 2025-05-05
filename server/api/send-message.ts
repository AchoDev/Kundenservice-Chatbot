import evaluateTestAI from "../tools/evaluateTextAI";
import { Prompt, promptTree } from "../tools/promptTree";

interface RequestBody {
    conversationID: string;
    customerMessages: {
        text: string;
        type: string;
        id: string;
        role: string;
    }[]
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
    const { conversationID, customerMessages } = body;

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


    const latestMessage = customerMessages[customerMessages.length - 1]
    let prompt = getPromptById(latestMessage.id, promptTree);

    if (latestMessage.type === "text") {
        const aiResponse = await await evaluateTestAI(customerMessages.map(m => ({
            content: m.text,
            role: m.role
        })))

        const idInformation = getPromptById(aiResponse.id, promptTree)

        prompt = {
            answer: aiResponse.text,
            id: aiResponse.id,
            prompt: "",
            children: idInformation?.children
        }
    }

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