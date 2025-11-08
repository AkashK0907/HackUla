
# 🏥 Raksha - AI-Powered Elderly Healthcare App

![Raksha Logo](https://img.shields.io/badge/Raksha-Healthcare-blue?style=for-the-badge)
![AI Powered](https://img.shields.io/badge/AI-Powered-green?style=for-the-badge)
![RunAnywhere SDK](https://img.shields.io/badge/RunAnywhere-SDK-purple?style=for-the-badge)

**Raksha** is a comprehensive healthcare management application designed specifically for elderly users, powered by on-device AI using the **RunAnywhere SDK**. The app consolidates health information, provides intelligent reminders, and offers AI-powered medical assistance—all while prioritizing user privacy with on-device processing.

---

## 📱 Features

### 🤖 AI-Powered Features (RunAnywhere SDK)

- **AI Medical Assistant**: Ask any medical question and get intelligent, context-aware responses in multiple languages
- **AI Health Analyzer**: Comprehensive health profile analysis with personalized recommendations
- **AI Voice Assistant**: Natural language voice commands for hands-free interaction
- **Multi-language Support**: AI responses in English, Hindi, and Kannada

### 💊 Core Healthcare Features

- **Smart Medicine Reminders**: Time-based medication reminders with photo identification and dose tracking
- **Health Records Management**: Securely store and organize medical documents, prescriptions, and reports
- **Caretaker Integration**: Link family members for emergency contacts and health monitoring
- **Nearby Healthcare Services**: Find hospitals, pharmacies, and medical stores with appointment booking
- **Find Verified Nurses**: Browse and contact certified home healthcare nurses
- **Health Status Tracking**: Monitor vital statistics, blood group, chronic conditions
- **Emergency SOS**: Quick access emergency button with automatic caretaker notification

---

## 🤖 RunAnywhere SDK Integration

### What is RunAnywhere SDK?

RunAnywhere SDK is an on-device AI framework that enables powerful Large Language Model (LLM) capabilities directly on mobile devices without requiring cloud connectivity. This ensures:

- ✅ **Privacy**: All AI processing happens locally on the device
- ✅ **Speed**: Instant responses without network latency
- ✅ **Offline**: Works even without internet connection (after model download)
- ✅ **Cost-effective**: No API costs for AI inference

### How We Used RunAnywhere SDK

#### 1. **SDK Installation & Setup**

We integrated the RunAnywhere SDK into our Android/Capacitor hybrid app:

**Dependencies Added** (`android/app/build.gradle`):
```gradle
dependencies {
    // RunAnywhere SDK - Local AARs
    implementation files('libs/RunAnywhereKotlinSDK-release.aar')
    implementation files('libs/runanywhere-llm-llamacpp-release.aar')
    
    // Required SDK dependencies
    implementation "org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3"
    implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3"
    implementation "org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.0"
    implementation "io.ktor:ktor-client-core:2.3.5"
    implementation "io.ktor:ktor-client-okhttp:2.3.5"
}
```

#### 2. **Native Bridge Plugin**

Created a Capacitor plugin (`RakshaAIPlugin.java`) to bridge JavaScript and native Android code:

```java
@CapacitorPlugin(name = "RakshaAI")
public class RakshaAIPlugin extends Plugin {
    
    @PluginMethod
    public void initializeAI(PluginCall call) {
        // Initialize RunAnywhere SDK
        RunAnywhere.initialize(getContext(), "dev", SDKEnvironment.DEVELOPMENT);
    }
    
    @PluginMethod
    public void askMedicalQuestion(PluginCall call) {
        String question = call.getString("question");
        // Process with RunAnywhere SDK and return AI response
    }
}
```

#### 3. **JavaScript Integration**

Integrated AI capabilities into the web layer:

```javascript
// Initialize AI system
async function initializeRakshaAI() {
    if (window.Capacitor) {
        const { RakshaAI } = window.Capacitor.Plugins;
        await RakshaAI.initializeAI();
    }
}

// Ask medical questions
async function askAIMedicalQuestion(question, language) {
    const result = await RakshaAI.askMedicalQuestion({ question });
    return result.response;
}
```

#### 4. **Multi-language AI Responses**

Implemented language-aware prompting for localized healthcare guidance:

```javascript
function createLocalizedPrompt(question, language) {
    if (language === 'HI') {
        return `आप एक चिकित्सा सहायक हैं। सरल हिंदी में उत्तर दें: ${question}`;
    } else if (language === 'KN') {
        return `ನೀವು ವೈದ್ಯಕೀಯ ಸಹಾಯಕರು. ಸರಳ ಕನ್ನಡದಲ್ಲಿ ಉತ್ತರಿಸಿ: ${question}`;
    } else {
        return `You are a medical assistant for elderly patients. Answer in simple terms: ${question}`;
    }
}
```

#### 5. **AI Features Implementation**

**Medical Q&A Assistant:**
- User asks: "What should I do for fever?"
- AI provides: Detailed advice considering user's age, health conditions
- Response delivered in user's preferred language

**Health Profile Analysis:**
- Analyzes: Age, gender, blood group, weight, height, chronic conditions
- Generates: Personalized health insights and recommendations
- Example: "Your BMI is 26.5 (slightly overweight). Consider light exercise and reducing salt intake."

**Voice Command Integration:**
- Voice input → Speech-to-text (browser API)
- Text → RunAnywhere AI processing
- AI response → Text-to-speech output
- Supports medical queries, app navigation, health information requests

---

## 🏗️ Architecture

### Technology Stack

**Frontend:**
- HTML5, CSS3, JavaScript (Vanilla)
- Tailwind CSS for styling
- Font Awesome for icons

**Backend:**
- Node.js with Express.js
- MongoDB Atlas (Cloud Database)
- JWT Authentication

**Mobile:**
- Capacitor (Hybrid App Framework)
- Android Native Layer (Kotlin/Java)
- RunAnywhere SDK for AI

**AI/ML:**
- RunAnywhere SDK (LLM inference)
- Annyang.js (Voice recognition)
- Web Speech API (Text-to-speech)

### Project Structure

```
Raksha/
├── android/                    # Native Android project
│   ├── app/
│   │   ├── libs/              # RunAnywhere SDK AAR files
│   │   └── src/
│   │       └── main/java/com/raksha/app/
│   │           ├── MainActivity.java
│   │           └── RakshaAIPlugin.java  # AI bridge plugin
│   └── build.gradle
├── public/                     # Web assets
│   ├── index.html             # Main app UI
│   ├── script.js              # Core app logic + AI integration
│   ├── style.css              # Styles
│   └── test-ai.html          # AI testing interface
├── controllers/               # Backend controllers
├── models/                    # Database models
├── routes/                    # API routes
├── middleware/                # Auth middleware
├── capacitor.config.json      # Capacitor configuration
├── package.json               # Dependencies
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Android Studio (for mobile build)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AkashK0907/HackUla.git
   cd HackUla
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

4. **Run the backend server**
   ```bash
   node index.js
   ```

5. **Sync Capacitor**
   ```bash
   npx cap sync
   ```

6. **Open in Android Studio**
   ```bash
   npx cap open android
   ```

7. **Build and Run**
   - Click the Run button (▶️) in Android Studio
   - Select your device or emulator

---

## 📖 Usage Guide

### For Patients:

1. **Register/Login**: Use phone number + OTP authentication
2. **Complete Profile Setup**: Add health information, blood group, conditions
3. **Add Caretakers**: Link family members for emergency support
4. **Set Medicine Reminders**: Add medicines with photos and schedules
5. **Ask AI Assistant**: Tap the AI button or use voice commands for medical guidance
6. **Upload Health Records**: Store prescriptions and reports securely
7. **Find Healthcare Services**: Locate nearby hospitals, pharmacies, nurses

### For Caretakers:

1. **Login as Caretaker**: Access linked patient accounts
2. **Monitor Medicine Intake**: Receive notifications for missed doses
3. **View Health Status**: Check patient's health information
4. **Emergency Alerts**: Get instant notifications for emergency SOS

---

## 🔐 Security & Privacy

- 🔒 **JWT Authentication**: Secure token-based auth
- 🔐 **On-device AI**: All AI processing happens locally (no data sent to cloud)
- 🛡️ **Encrypted Storage**: Health records stored securely
- 👤 **Role-based Access**: Patients and caretakers have different permissions
- 📱 **Secure Communication**: HTTPS for all API calls

---

## 🌐 Multi-language Support

| Language | Code | Coverage |
|----------|------|----------|
| English | EN | 100% |
| Hindi | HI | 100% |
| Kannada | KN | 100% |

All UI elements and AI responses support these languages.

---

## 🎯 Future Enhancements

- [ ] AI Symptom Checker with urgency detection
- [ ] Medicine Interaction Checker
- [ ] OCR for Prescription Reading
- [ ] IoT Device Integration (BP monitors, glucometers)
- [ ] Video Consultation with Doctors
- [ ] AI Health Trend Analysis
- [ ] More regional languages

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Akash K** - [@AkashK0907](https://github.com/AkashK0907)
- **Disha K** - [@di5hak](https://github.com/di5hak)
- **Anusha** - [@devezen](https://github.com/devezen)

---

## 🙏 Acknowledgments

- **RunAnywhere SDK** - For providing powerful on-device AI capabilities
- **RVU Hackathon** - For the opportunity to build this solution
- **Healthcare Professionals** - For guidance on medical features
- **Capacitor Community** - For excellent hybrid app framework

---

## 📧 Contact

For questions or support, please reach out:
- **Email**: akashk79026@gmail.com
- **GitHub**: [@AkashK0907](https://github.com/AkashK0907)

---


