import Problem from "./problem";

export default function evaluateProblem(userMessage: string): Problem {
    // Define problem categories and their associated keywords
    const problems = {
      configuration: ["configuration", "setup", "settings", "not working", "issue"],
      programming: ["programming", "code", "logic", "doesn't work", "bug"],
      functionality: ["functionality", "crash", "break", "stuck", "problem"],
      support: ["support", "help", "service", "complaint", "unhelpful"],
      employee: ["employee", "staff", "unhappy", "frustrated", "angry"],
    };
  
    // Normalize the user message to lowercase for case-insensitive matching
    const normalizedMessage = userMessage.toLowerCase();
  
    // Check for keywords in the message and return the matching problem category
    for (const [category, keywords] of Object.entries(problems)) {
      if (keywords.some((keyword) => normalizedMessage.includes(keyword))) {
        return category as Problem;
      }
    }
  
    // If no keywords match, return a default response
    return "other"
}