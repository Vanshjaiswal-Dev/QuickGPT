# QuickGPT

QuickGPT is a modern, full-stack AI chat application allowing users to interact with multiple AI models in real-time. It features voice input, image generation, streaming text responses, chat management (pinning, renaming, exporting), and an analytics dashboard.

![QuickGPT Screenshot](./Client/src/assets/logo_full.png)

## Features

- **Google OAuth Authentication**: Secure and fast login using Google accounts or email/password.
- **Streaming AI Responses (SSE)**: Real-time, typewriter-effect text generation using Google Gemini.
- **Voice Input**: Web Speech API integration to directly speak prompts into the chat box.
- **Image Generation**: Seamless image generation capability directly in the chat using Pollinations.ai.
- **Chat Management**: Organize conversations with pinning, renaming, and exporting as `.txt`.
- **Smart Prompts**: Quick start empty chats with intelligent template suggestions.
- **Analytics Dashboard**: Visual overview of your interaction stats (chats vs messages, user vs AI usage).
- **Dark/Light Mode**: Smooth transitions with a sleek UI featuring `lucide-react` iconography.

## Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Zustand, React Router, Lucide React, Day.js
- **Backend**: Node.js, Express, MongoDB (Mongoose), Passport.js (Google OAuth), Vitest (Testing)
- **APIs**: Google Gemini SDK, Pollinations.ai, Web Speech API

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB instance (local or Atlas)
- Google Cloud Console account (for OAuth)
- Gemini API key (optional if utilizing free tiers or fallbacks)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Vanshjaiswal-Dev/QuickGPT.git
   cd QuickGPT
   ```

2. **Install dependencies:**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../Client
   npm install
   ```

3. **Configure Environment Variables:**
   - Copy `server/.env.example` to `server/.env` and update the keys (MongoDB URI, JWT Secret, Google Client ID/Secret).
   - Copy `Client/.env.example` to `Client/.env` and ensure the server URL is correct.

4. **Run the Application:**
   From the root or `server` directory (using concurrently):
   ```bash
   npm run dev
   ```
   This will start both the backend server (port 8000) and the frontend Vite server (port 5173).

## Testing

The backend includes unit tests using Vitest.
```bash
cd server
npm run test
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the ISC License.
