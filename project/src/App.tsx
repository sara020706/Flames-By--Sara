import React, { useState } from 'react';
import { Heart, Sparkles, Users, ArrowRight, RotateCcw } from 'lucide-react';
import EmailSender from './components/EmailSender';

function App() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({ status: 'Love', percentage: 85 });

  const handleCalculate = () => {
    if (name1.trim() && name2.trim()) {
      setIsCalculating(true);
  
      setTimeout(() => {
        setIsCalculating(false);

          // Step 1: Clean names
        let n1 = name1.toLowerCase().replace(/\s+/g, '');
        let n2 = name2.toLowerCase().replace(/\s+/g, '');
  
        // Step 2: Remove common letters
        for (let char of n1) {
          if (n2.includes(char)) {
            n1 = n1.replace(char, '');
            n2 = n2.replace(char, '');
          }
        }
  
        // Step 3: Count remaining letters
        const count = n1.length + n2.length;
  
        // Step 4: FLAMES calculation
        let flames = ['F', 'L', 'A', 'M', 'E', 'S'];
        let idx = 0;
        while (flames.length > 1) {
          idx = (idx + count - 1) % flames.length;
          flames.splice(idx, 1);
        }
  
        const mapping = {
          F: 'Friends',
          L: 'Love',
          A: 'Affection',
          M: 'Marriage',
          E: 'Enemy',
          S: 'Sister'
        };
  
        const resultStatus = mapping[flames[0]];

        // Just for fun, add percentage
        const randomPercentage = Math.floor(Math.random() * 100) + 1;

        setResult({ status: resultStatus, percentage: randomPercentage });
        // Show result after we computed it so downstream effects (email send)
        // receive the correct values.
        setShowResult(true);
      }, 2000);
    }
  };
  

  const handleReset = () => {
    setName1('');
    setName2('');
    setShowResult(false);
    setIsCalculating(false);
  };

  const getResultColor = (status: string) => {
    const colors = {
      'Love': 'text-red-500',
      'Marriage': 'text-purple-500',
      'Affection': 'text-pink-500',
      'Friends': 'text-blue-500',
      'Sister': 'text-green-500',
      'Enemy': 'text-gray-500'
    };
    return colors[status as keyof typeof colors] || 'text-gray-500';
  };

  const getResultIcon = (status: string) => {
    switch (status) {
      case 'Love':
      case 'Marriage':
      case 'Affection':
        return <Heart className="w-8 h-8 text-red-500" />;
      case 'Friends':
        return <Users className="w-8 h-8 text-blue-500" />;
      default:
        return <Sparkles className="w-8 h-8 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-700 to-pink-500 p-4 flex items-center justify-center">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            FLAMES
          </h1>
          <p className="text-white text-lg">Discover Your Relationship Compatibility</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          {!showResult ? (
            <>
              {/* Input Section */}
              <div className="space-y-6">
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Person's Name
                  </label>
                  <input
                    type="text"
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    placeholder="Enter first name..."
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:bg-white focus:outline-none transition-all duration-300 text-lg font-medium placeholder-gray-400"
                  />
                </div>

                <div className="flex items-center justify-center py-2">
                  <div className="bg-gradient-to-r from-pink-400 to-purple-500 p-2 rounded-full">
                    <Heart className="w-5 h-5 text-white animate-pulse" />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Second Person's Name
                  </label>
                  <input
                    type="text"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    placeholder="Enter second name..."
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:bg-white focus:outline-none transition-all duration-300 text-lg font-medium placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Calculate Button */}
              <div className="mt-8">
                <button
                  onClick={handleCalculate}
                  disabled={!name1.trim() || !name2.trim() || isCalculating}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-lg"
                >
                  {isCalculating ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>Calculating...</span>
                    </>
                  ) : (
                    <>
                      <span>Calculate Compatibility</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              {/* FLAMES Legend */}
              <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                <h3 className="text-sm font-bold text-gray-700 mb-3 text-center">What FLAMES Means</h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-pink-600">F</span>
                    <span className="text-gray-600">Friends</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-red-600">L</span>
                    <span className="text-gray-600">Love</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-purple-600">A</span>
                    <span className="text-gray-600">Affection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-indigo-600">M</span>
                    <span className="text-gray-600">Marriage</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-600">E</span>
                    <span className="text-gray-600">Enemy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-green-600">S</span>
                    <span className="text-gray-600">Sister</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Result Section */
            <div className="text-center space-y-6">
              <div className="relative">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl opacity-50 animate-pulse"></div>
                
                {/* Result Content */}
                <div className="relative p-8">
                  <div className="flex items-center justify-center mb-4">
                    {getResultIcon(result.status)}
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {name1} & {name2}
                  </h2>
                  
                  <div className="mb-6">
                    <div className={`text-4xl font-bold ${getResultColor(result.status)} mb-2`}>
                      {result.status.toUpperCase()}
                    </div>
                    <div className="text-lg text-gray-600">
                      {result.percentage}% Compatible
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${result.percentage}%` }}
                    ></div>
                  </div>

                  {/* Result Message */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 mb-6">
                    <p className="text-gray-700 font-medium">
                      {result.status === 'Love' && "💕 Love is in the air! You two are meant for each other."}
                      {result.status === 'Marriage' && "💒 Wedding bells are ringing! Perfect match for marriage."}
                      {result.status === 'Affection' && "🥰 There's deep affection between you both."}
                      {result.status === 'Friends' && "👫 You make the best of friends! Friendship goals."}
                      {result.status === 'Sister' && "👭 You're like siblings - family bond forever."}
                      {result.status === 'Enemy' && "⚔️ Opposites attract... or maybe not this time!"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Try Again Button */}
              <button
                onClick={handleReset}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Try Again</span>
              </button>

              {/* Email Results (uses EmailJS) */}
              <div className="mt-4">
                <EmailSender name1={name1} name2={name2} result={result} />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p className="text-white text-lg">Just for fun! Results are not scientifically accurate 😉</p>
        </div>
      </div>
    </div>
  );
}

export default App;