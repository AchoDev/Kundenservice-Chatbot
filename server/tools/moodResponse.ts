import Mood from "./mood";

export default function genericMoodResponse(mood: Mood) {
    switch (mood) {
        case "angry":
            return "I can understand that you're feeling angry or upset. We always strive to improve our service."
        case "know-it-all":
            return "I see that you have a lot of knowledge about this topic. I appreciate your insights!"
        case "disappointed":
            return "I'm sorry to hear that you're disappointed. Your feedback is important to us, and we will work on it. We always strive to create a better experience for you."
        case "inexperienced":
            return "I understand that you might be new to this. Don't worry, we're here to help you every step of the way!"
        case "talkative":
            return "I appreciate your enthusiasm! I'm here to listen and help you with whatever you need."
        case "knowledgeable":
            return "It's great to see that you're knowledgeable about this topic! Your expertise is valuable."
        case "rude":
            return "I understand that you might be feeling frustrated. Let's work together to find a solution. I appreciate your patience."
        case "patient":
            return "Thank you for your patience! I appreciate your understanding as we work through this. I can understand that these problems can be frustrating, but your cooperation makes a difference."
        case "impatient":
            return "I understand that you're feeling impatient. We appreciate your understanding as we work to resolve this issue quickly."
        case "neutral":
            return "Thank you for your message. I'm here to assist you with any questions or concerns you may have."
        case "happy":
            return "I'm glad to hear that you're feeling happy! Your positive energy is contagious."
    
    }
}