import Mood from "./mood";



export default function evaluateMood(customerMessage: string): Mood {
    const moodKeywords: Record<Mood, string[]> = {
        neutral: ["okay", "fine", "neutral", "average"],
        angry: ["bad", "angry", "annoyed", "dissatisfied"],
        "know-it-all": ["actually", "correct", "wrong", "know"],
        disappointed: ["disappointed", "expected", "pity", "sad"],
        inexperienced: ["new", "inexperienced", "beginner", "unknown"],
        talkative: ["much", "talk", "tell", "conversation"],
        knowledgeable: ["experienced", "know", "knowledge", "expert"],
        rude: ["bad", "insult", "rude", "disrespectful"],
        patient: ["wait", "patient", "no problem", "time"],
        impatient: ["quick", "impatient", "waiting time", "immediately"],
    };

    const lowerCaseMessage = customerMessage.toLowerCase();

    for (const [mood, keywords] of Object.entries(moodKeywords)) {
        
        console.log(lowerCaseMessage)

        if (keywords.some((keyword) => lowerCaseMessage.includes(keyword))) {
            return mood as Mood;
        }
    }

    return "neutral"; // Return null if no mood matches
}
