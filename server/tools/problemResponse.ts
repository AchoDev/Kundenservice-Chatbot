import Problem from "./problem";
import { BuglandProduct } from "./product";

export default function genericProblemResponse(problem: Problem, product: BuglandProduct) {



    switch (problem) {
        case "configuration":
            return `Configuring our ${product.defaultName} may seem daunting, but it's easier than you think! Please follow these steps to get started:
            <ol>
                <li>Open the BugLand app on your phone</li>
                <li>Navigate to your ${product.defaultName}</li>
                <li>Click on "Configuration"</li>
                <li>Follow the on-screen instructions to set up your ${product.defaultName}.</li>
            </ol>

            Please let us know if you encounter any issues during the setup process. We're here to help!`;
        case "programming":
            return `It seems like you're facing a programming issue with our ${product.defaultName}. 
            <ul>
                
            </ul>

            Once we have this information, we'll be able to help you troubleshoot the issue more effectively.`;

        case "functionality":
            return `It seems like you're experiencing a functionality issue with our ${product.defaultName}. 
            <ul>
                
            </ul>

            Once we have this information, we'll be able to help you troubleshoot the issue more effectively.`;
        case "support":
            return `It seems like you're looking for support with our ${product.defaultName}. 
            <ul>
                
            </ul>

            Once we have this information, we'll be able to help you troubleshoot the issue more effectively.`;
        case "employee":
            return `It seems like you're having an issue with one of our employees. 
            <ul>
                
            </ul>

            Once we have this information, we'll be able to help you troubleshoot the issue more effectively.`;

        case "other":
            return "Could you please describe your problem in more detail?";
    }
}