// src/components/ConfigurationForm.js

import React, { useState } from 'react';
import { Settings, Sparkles, FileText} from 'lucide-react';

const ConfigurationForm = ({ formData, onInputChange, onGenerateAI, onGenerateBasic, isGenerating, error }) => {
  // UI-specific state stays within the component
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <div className="flex items-center mb-6">
        <Settings className="w-6 h-6 text-purple-300 mr-3" />
        <h2 className="text-2xl font-semibold text-white">Project Configuration</h2>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
          <p className="text-red-200">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        {/* Gemini API Key */}
        <div>
          <label className="block text-purple-200 font-medium mb-2">
            <Sparkles className="w-4 h-4 inline mr-2" />
            Gemini API Key (Configured ✅)
          </label>

        </div>

        {/* --- Basic Info (Restored) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-purple-200 font-medium mb-2">Project Name *</label>
            <input
              type="text" name="projectName" value={formData.projectName} onChange={onInputChange}
              placeholder="My Awesome Project"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="block text-purple-200 font-medium mb-2">License</label>
            <select
              name="license" value={formData.license} onChange={onInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="MIT">MIT</option>
              <option value="Apache-2.0">Apache 2.0</option>
              <option value="GPL-3.0">GPL 3.0</option>
              <option value="BSD-3-Clause">BSD 3-Clause</option>
              <option value="ISC">ISC</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-purple-200 font-medium mb-2">Description *</label>
          <textarea
            name="description" value={formData.description} onChange={onInputChange}
            placeholder="A brief description of what your project does..."
            rows={3}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
          />
        </div>

        <div>
          <label className="block text-purple-200 font-medium mb-2">Technology Stack</label>
          <input
            type="text" name="techStack" value={formData.techStack} onChange={onInputChange}
            placeholder="React, Node.js, MongoDB, Express"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div>
          <label className="block text-purple-200 font-medium mb-2">Key Features</label>
          <textarea
            name="features" value={formData.features} onChange={onInputChange}
            placeholder="User authentication, Real-time messaging, Responsive design"
            rows={3}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
          />
        </div>

        {/* --- Advanced Options (Restored) --- */}
        <div>
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center text-purple-200 hover:text-white transition-colors"
          >
            <Settings className="w-4 h-4 mr-2" />
            Advanced Options
            <span className="ml-2 text-xs">{showAdvanced ? '▼' : '▶'}</span>
          </button>

          {showAdvanced && (
            <div className="mt-4 space-y-4 pl-6 border-l-2 border-purple-400/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-purple-200 font-medium mb-2">Author Name</label>
                  <input
                    type="text" name="author" value={formData.author} onChange={onInputChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-purple-200 font-medium mb-2">Email</label>
                  <input
                    type="email" name="email" value={formData.email} onChange={onInputChange}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-purple-200 font-medium mb-2">GitHub URL</label>
                <input
                  type="url" name="githubUrl" value={formData.githubUrl} onChange={onInputChange}
                  placeholder="https://github.com/username/project"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="block text-purple-200 font-medium mb-2">Demo URL</label>
                <input
                  type="url" name="demoUrl" value={formData.demoUrl} onChange={onInputChange}
                  placeholder="https://your-demo.com"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="block text-purple-200 font-medium mb-2">Tone</label>
                <select
                  name="tone" value={formData.tone} onChange={onInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="technical">Technical</option>
                  <option value="friendly">Friendly</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center text-purple-200">
                  <input type="checkbox" name="includeTableOfContents" checked={formData.includeTableOfContents} onChange={onInputChange} className="mr-2 rounded" />
                  Table of Contents
                </label>
                <label className="flex items-center text-purple-200">
                  <input type="checkbox" name="includeBadges" checked={formData.includeBadges} onChange={onInputChange} className="mr-2 rounded" />
                  Badges
                </label>
                <label className="flex items-center text-purple-200">
                  <input type="checkbox" name="includeContributing" checked={formData.includeContributing} onChange={onInputChange} className="mr-2 rounded" />
                  Contributing Guide
                </label>
                <label className="flex items-center text-purple-200">
                  <input type="checkbox" name="includeLicense" checked={formData.includeLicense} onChange={onInputChange} className="mr-2 rounded" />
                  License Section
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-8">
        <button
          onClick={onGenerateAI} disabled={isGenerating}
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center justify-center"
        >
          {isGenerating ? (
            <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div> Generating with AI...</>
          ) : (
            <><Sparkles className="w-4 h-4 mr-2" /> Generate with AI</>
          )}
        </button>
        <button
          onClick={onGenerateBasic} disabled={isGenerating}
          className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 flex items-center justify-center"
        >
          <FileText className="w-4 h-4 mr-2" /> Generate Basic
        </button>
      </div>
    </div>
  );
};

export default ConfigurationForm;