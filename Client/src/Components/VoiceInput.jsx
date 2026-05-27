import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';
import toast from 'react-hot-toast';

const VoiceInput = ({ prompt, setPrompt, disabled }) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const basePromptRef = useRef("");

  useEffect(() => {
    // Initialize SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false; // Stop after a pause
      recognitionRef.current.interimResults = true; // Send results while speaking
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        
        const currentTranscript = finalTranscript || interimTranscript;
        // Append current recognized text to the base prompt
        const space = basePromptRef.current ? " " : "";
        setPrompt(basePromptRef.current + space + currentTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        if (event.error !== 'no-speech') {
          toast.error(`Microphone error: ${event.error}`);
        }
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.warn("Speech Recognition API is not supported in this browser.");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [setPrompt]);

  const toggleListen = (e) => {
    e.preventDefault();
    if (disabled) return;

    if (!recognitionRef.current) {
      toast.error('Voice input is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        basePromptRef.current = prompt; // Snapshot current prompt
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error("Could not start speech recognition", err);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={toggleListen}
      disabled={disabled}
      className={`flex-shrink-0 p-2 md:p-2 rounded-full transition-all cursor-pointer ${
        isListening
          ? 'bg-red-500 text-white animate-pulse'
          : 'bg-transparent text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      title={isListening ? "Stop listening" : "Start voice input"}
    >
      {isListening ? (
        <MicOff className="w-5 h-5 md:w-5 md:h-5" />
      ) : (
        <Mic className="w-5 h-5 md:w-5 md:h-5" />
      )}
    </button>
  );
};

export default VoiceInput;
