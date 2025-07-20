// src/components/PreviewDisplay.js

import React from 'react';
import { Eye, Copy, Download } from 'lucide-react';

const PreviewDisplay = ({ content, onCopy, onDownload }) => (
  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold text-white flex items-center">
        <Eye className="w-6 h-6 mr-3 text-purple-300" />
        Preview
      </h2>
      <div className="flex gap-2">
        <button
          onClick={onCopy}
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"
          title="Copy to clipboard"
        >
          <Copy className="w-4 h-4" />
        </button>
        <button
          onClick={onDownload}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
          title="Download README.md"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
    </div>

    <div className="bg-gray-900 rounded-lg p-4 h-[625px] overflow-y-auto">
      <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
        {content}
      </pre>
    </div>
  </div>
);

export default PreviewDisplay;