// src/ReadmeGenerator.js

import React, { useState } from 'react';
import Header from './components/Header';
import ConfigurationForm from './components/ConfigurationForm';
import PreviewDisplay from './components/PreviewDisplay';
import Footer from './components/Footer';
// Ensure this import path is correct
import {generateBasicReadme } from './utils/readmeLogic';

const ReadmeGenerator = () => {
  // --- STATE MANAGEMENT ---
  const [formData, setFormData] = useState({
    projectName: 'My Awesome Project', // Added default values for a better initial preview
    description: 'A cutting-edge solution built with modern technologies.',
    techStack: 'React, Node.js, Next.js',
    features: 'Feature A, Feature B, Feature C',
    installation: '',
    usage: '',
    contributing: '',
    license: 'MIT',
    author: 'Your Name',
    email: 'your.email@example.com',
    githubUrl: 'https://github.com/your-username/my-awesome-project',
    demoUrl: '',
    apiKey: 'AIzaSyBqJ8K9mLnOpQrStUvXyZ3C4D5E6F7G8H9', // Demo key
    tone: 'professional',
    includeTableOfContents: true,
    includeBadges: true,
    includeContributing: true,
    includeLicense: true,
  });
  const [generatedReadme, setGeneratedReadme] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  const generateReadmePrompt = () => {
    // ... (This is the same prompt generation logic from your original code)
    return `Create a comprehensive, professional README.md file for a software project with the following details:

    Project Name: ${formData.projectName}
    Description: ${formData.description}
    Technology Stack: ${formData.techStack}
    Key Features: ${formData.features}
    ... and so on`;
  };

  const handleGenerateAI = async () => {
    if (!formData.projectName || !formData.description) {
      setError('Please fill in at least the project name and description.');
      return;
    }
    setIsGenerating(true);
    setError('');

    // The new logic starts here
    try {
      const prompt = generateReadmePrompt(); // Create the prompt

      const response = await fetch('http://localhost:3001/generate-readme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from server.');
      }

      const data = await response.json();
      setGeneratedReadme(data.readme);

    } catch (err) {
      console.error(err);
      setError(`Error: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateBasic = () => {
    setError('');
    const readme = generateBasicReadme(formData);
    setGeneratedReadme(readme);
  };

  const handleDownload = () => {
    const contentToDownload = generatedReadme || generateBasicReadme(formData);
    const blob = new Blob([contentToDownload], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    const contentToCopy = generatedReadme || generateBasicReadme(formData);
    try {
      await navigator.clipboard.writeText(contentToCopy);
      alert('README content copied to clipboard!');
    } catch (err) {
      alert('Failed to copy to clipboard.');
    }
  };

  // --- THIS IS THE CORRECTED LINE ---
  // If a README hasn't been generated yet, create a basic one for the initial preview.
  const previewContent = generatedReadme || generateBasicReadme(formData);

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ConfigurationForm
            formData={formData}
            onInputChange={handleInputChange}
            onGenerateAI={handleGenerateAI}
            onGenerateBasic={handleGenerateBasic}
            isGenerating={isGenerating}
            error={error}
          />
          <PreviewDisplay
            content={previewContent}
            onCopy={handleCopy}
            onDownload={handleDownload}
          />
        </div>
        <br></br>
        <br></br>
        <Footer />
        
      </div>
    </div>
  );
};

export default ReadmeGenerator;