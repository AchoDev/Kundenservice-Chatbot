import evaluateMood from "../tools/evaluateMood";
import evaluateProblem from "../tools/evaluateProblem";
import genericMoodResponse from "../tools/moodResponse";
import genericProblemResponse from "../tools/problemResponse";
import { findProduct } from "../tools/product";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { conversationID, customerMessage } = body;

    console.log("body:" + JSON.stringify(body))

    // Call the evaluateMood and evaluateProblem functions
    const mood = evaluateMood(customerMessage);
    const problem = evaluateProblem(customerMessage);

    const moodResponse = genericMoodResponse(mood);
    const product = findProduct(customerMessage) ?? {
        defaultName: "Product",
        aliases: [],
    };
    const problemResponse = genericProblemResponse(problem, product);

    const response = `
    ${moodResponse}
    \n
    ${problemResponse}
    `

    // Wait for 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));


    // Return the results
    return {
        response: response
    };
})