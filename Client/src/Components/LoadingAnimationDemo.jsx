import React from 'react';
import { Bot, CheckCircle, AlertCircle, Info } from 'lucide-react';

const LoadingAnimationDemo = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f] p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
        
        {/* Header */}
        <div className="text-center py-6 md:py-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
            🎨 Image Loading Animation Demo
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
            Your new Pollinations.ai loading experience with maximum quality
          </p>
        </div>

        {/* Loading State Demo */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl p-4 md:p-6 shadow-lg border border-gray-200 dark:border-[#252525]">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">🔄</span> Loading State
          </h2>
          
          <div className="flex items-start gap-3 md:gap-4">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            
            <div className="flex-1">
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-3 md:mb-4">AI Assistant</p>
              
              {/* Loading Animation */}
              <div className="bg-gray-50 dark:bg-[#0f0f0f] rounded-lg p-6 md:p-8 border border-gray-200 dark:border-[#252525]">
                <div className="flex flex-col items-center justify-center gap-3 md:gap-4">
                  {/* Spinner */}
                  <div className="relative">
                    <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-gray-200 dark:border-gray-700 border-t-purple-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* Status Text */}
                  <div className="text-center">
                    <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium">
                      Generating high-quality image...
                    </p>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-500 mt-1">
                      2048x2048 • 4.2 MP • flux-pro
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 md:mt-3">Just now</p>
            </div>
          </div>
        </div>

        {/* Success State Demo */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl p-4 md:p-6 shadow-lg border border-gray-200 dark:border-[#252525]">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">✅</span> Success State
          </h2>
          
          <div className="flex items-start gap-3 md:gap-4">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            
            <div className="flex-1">
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-3 md:mb-4">AI Assistant</p>
              
              {/* Success Animation */}
              <div className="bg-gray-50 dark:bg-[#0f0f0f] rounded-lg p-4 md:p-6 border border-gray-200 dark:border-[#252525]">
                <div className="flex items-center justify-center bg-gradient-to-br from-purple-600/10 to-pink-600/10 dark:from-purple-600/20 dark:to-pink-600/20 rounded-lg p-8 md:p-12">
                  <div className="text-center">
                    <CheckCircle className="w-16 h-16 md:w-24 md:h-24 text-green-500 mx-auto mb-3 md:mb-4" strokeWidth={1.5} />
                    <p className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                      Image Loaded! ✨
                    </p>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Smooth 300ms fade-in transition complete
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 md:mt-3">A few seconds ago</p>
            </div>
          </div>
        </div>

        {/* Error State Demo */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-xl p-4 md:p-6 shadow-lg border border-gray-200 dark:border-[#252525]">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">❌</span> Error State
          </h2>
          
          <div className="flex items-start gap-3 md:gap-4">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            
            <div className="flex-1">
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-3 md:mb-4">AI Assistant</p>
              
              {/* Error Display */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 md:p-6 border border-red-200 dark:border-red-800">
                <div className="flex flex-col items-center justify-center gap-3">
                  <AlertCircle className="w-10 h-10 md:w-12 md:h-12 text-red-500" strokeWidth={1.5} />
                  <p className="text-sm md:text-base text-red-600 dark:text-red-400 font-medium">
                    Failed to load image
                  </p>
                  <button className="text-xs md:text-sm text-red-600 dark:text-red-400 underline hover:no-underline hover:text-red-700 dark:hover:text-red-300 transition-colors">
                    Try again
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 md:mt-3">A moment ago</p>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 md:p-6">
          <h3 className="text-base md:text-lg text-blue-700 dark:text-blue-400 font-semibold mb-3 md:mb-4 flex items-center gap-2">
            <Info className="w-5 h-5" />
            How It Works
          </h3>
          <ul className="text-sm md:text-base text-gray-700 dark:text-gray-400 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✅</span>
              <span><strong>Instant Feedback:</strong> Loading animation shows immediately</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✅</span>
              <span><strong>Background Loading:</strong> Image loads while animation plays</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✅</span>
              <span><strong>Smooth Transition:</strong> 300ms fade-in when ready</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✅</span>
              <span><strong>Error Handling:</strong> Clear message with retry option</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✅</span>
              <span><strong>Smart Detection:</strong> Only shows for new images (&lt;10s old)</span>
            </li>
          </ul>
        </div>

        {/* Quality Info */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4 md:p-6">
          <h3 className="text-base md:text-lg text-purple-700 dark:text-purple-400 font-semibold mb-3 md:mb-4 flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            Maximum Quality Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 text-sm md:text-base">
            <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3 md:p-4">
              <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">Resolution</p>
              <p className="text-gray-900 dark:text-white font-bold text-base md:text-lg">2048 x 2048</p>
              <p className="text-gray-600 dark:text-gray-400 text-xs">4.2 Megapixels</p>
            </div>
            <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3 md:p-4">
              <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">Model</p>
              <p className="text-gray-900 dark:text-white font-bold text-base md:text-lg">flux-pro</p>
              <p className="text-gray-600 dark:text-gray-400 text-xs">Best Available</p>
            </div>
            <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3 md:p-4">
              <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">Quality</p>
              <p className="text-gray-900 dark:text-white font-bold text-base md:text-lg">Professional</p>
              <p className="text-gray-600 dark:text-gray-400 text-xs">Print Ready</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-6 md:py-8 text-xs md:text-sm text-gray-500 dark:text-gray-500 space-y-2">
          <p className="font-medium">🎨 Powered by Pollinations.ai • Implemented in QuickGPT</p>
          <p>Unlimited • Free Forever • 4.2 MP Professional Quality</p>
        </div>

      </div>
    </div>
  );
};

export default LoadingAnimationDemo;
