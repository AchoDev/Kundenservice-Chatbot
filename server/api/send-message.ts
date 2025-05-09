import createDBConnection from "../tools/createDBConnection";
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

    if (id === "0") {
        return {
            id: "0",
            prompt: "Wie kann ich Ihnen helfen?",
            answer: "Ich bin hier, um Ihnen zu helfen!",
            children: prompts,
        }
    }


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
        const aiResponse = await evaluateTestAI(customerMessages.map(m => ({
            content: m.text,
            role: m.role
        })))

        const idInformation = getPromptById(aiResponse.id, promptTree)

        prompt = {
            answer: aiResponse.generatedResponse,
            id: aiResponse.id,
            prompt: "",
            children: idInformation?.children
        }
        
        if(prompt.id === "-1") {
            const { data, error } = await createDBConnection()    
                .from("failures")
                .insert({
                    id: Math.floor(Math.random() * 1000000),
                    conversation: customerMessages
                })
    
            if (error) {
                console.error("Error inserting data:", error);
            }
        }
    }

    console.log("prompt:" + JSON.stringify(prompt))

    const response = {
        message: prompt?.answer,
        id: prompt?.id,
        prompts: prompt?.children,
    }

    // Wait for 2 seconds
    // await new Promise((resolve) => setTimeout(resolve, 500));


    // Return the results
    return response;
})