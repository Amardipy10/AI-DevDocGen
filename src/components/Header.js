// src/components/Header.js

import React from 'react';
import { Sparkles, Zap, Code, Users, Shield } from 'lucide-react';

const Header = () => (
  <div className="text-center mb-8">
    <div className="flex items-center justify-center mb-4">
      <Sparkles className="w-10 h-10 text-yellow-300 mr-4" />
      <h1 className="text-4xl font-bold text-white">AI DevDocGen</h1>
    </div>
    <p className="text-xl text-purple-100 mb-6">Generate professional README.md files with Gemini AI</p>
    
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-white flex items-center">
        <Zap className="w-4 h-4 mr-2 text-yellow-400" />
        AI-Powered
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-white flex items-center">
        <Code className="w-4 h-4 mr-2 text-green-400" />
        Markdown Ready
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-white flex items-center">
        <Users className="w-4 h-4 mr-2 text-blue-400" />
        Professional
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-white flex items-center">
        <Shield className="w-4 h-4 mr-2 text-red-400" />
        Secure
      </div>
    </div>
  </div>
);

export default Header;