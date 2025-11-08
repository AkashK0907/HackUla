// Raksha AI Assistant - JavaScript Bridge
import { Capacitor } from '@capacitor/core';
import { registerPlugin } from '@capacitor/core';

// Register our native AI plugin
const RakshaAI = registerPlugin('RakshaAI');

class RakshaAIAssistant {
    constructor() {
        this.isInitialized = false;
        this.isNative = Capacitor.isNativePlatform();
    }

    // Initialize the AI system
    async initialize() {
        try {
            if (this.isNative) {
                const result = await RakshaAI.initializeAI();
                console.log('AI initialized:', result);
                this.isInitialized = true;
                return result;
            } else {
                // Web fallback
                console.log('AI running in web mode');
                this.isInitialized = true;
                return { status: 'success', message: 'Web AI ready' };
            }
        } catch (error) {
            console.error('AI initialization failed:', error);
            throw error;
        }
    }

    // Ask medical questions
    async askMedicalQuestion(question) {
        if (!this.isInitialized) {
            await this.initialize();
        }

        try {
            if (this.isNative) {
                const result = await RakshaAI.askMedicalQuestion({ question });
                return result;
            } else {
                // Web fallback response
                return {
                    response: `This is a web demo response to: "${question}". In the mobile app, this would use AI!`,
                    isComplete: true
                };
            }
        } catch (error) {
            console.error('Medical question failed:', error);
            throw error;
        }
    }

    // Voice assistant for health queries
    async processVoiceCommand(command) {
        const medicalContext = `As a health assistant for elderly patients, help with: ${command}`;
        return await this.askMedicalQuestion(medicalContext);
    }

    // Analyze health records (future feature)
    async analyzeHealthRecord(recordText) {
        const analysisPrompt = `Analyze this health record and provide key insights: ${recordText}`;
        return await this.askMedicalQuestion(analysisPrompt);
    }
}

// Create global instance
window.rakshaAI = new RakshaAIAssistant();

// Export for module usage
export default RakshaAIAssistant;
