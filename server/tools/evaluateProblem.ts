import Problem from "./problem";

export default function evaluateProblem(userMessage: string): Problem {
    // Define problem categories and their associated keywords
    const problems = {
      configuration: ["configuration", "setup", "settings", "not working", "issue"],
      programming: ["programming", "code", "logic", "bug"],
      functionality: ["functionality", "crash", "break", "stuck", "problem", "not working", "working"],
      support: ["support", "help", "service", "complaint", "unhelpful"],
      employee: ["employee", "staff", "unhappy", "frustrated", "angry"],
    };
  
    // Normalize the user message to lowercase for case-insensitive matching
    const normalizedMessage = userMessage.toLowerCase();

    const hits: {[key: string]: number} = {}

    // Check for keywords in the message and return the matching problem category
    for (const [category, keywords] of Object.entries(problems)) {
      if (keywords.some((keyword) => normalizedMessage.includes(keyword))) {
        if (hits[category]) {
            hits[category] += 1
        } else {
            hits[category] = 1
        }
      }
    }

    // Sort the hits by the number of matches
    const sortedHits = Object.entries(hits).sort((a, b) => b[1] - a[1]);
    console.log(sortedHits)

    if (sortedHits.length > 0) {
      return sortedHits[0][0] as Problem;
    }

  
    // If no keywords match, return a default response
    return "other"
}