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
    projectName: 'My Awesome Project', 
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
    apiKey: 'AIzaSyBqJ8K9mLnOpQrStUvXyZ3C4D5E6F7G8H9', 
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
  
    let prompt = `
Generate a high-quality, professional, and well-structured README.md file for the following software project.
The final output must be a single, complete markdown file.

--- PROJECT DETAILS ---
- **Project Name:** ${formData.projectName}
- **One-Line Description:** ${formData.description}
- **Technology Stack:** ${formData.techStack}
- **Key Features:** ${formData.features}
`;


    if (formData.author) {
      prompt += `\n- **Author:** ${formData.author}`;
    }
    if (formData.email) {
      prompt += `\n- **Contact Email:** ${formData.email}`;
    }
    if (formData.githubUrl) {
      prompt += `\n- **GitHub Repository URL:** ${formData.githubUrl}`;
    }
    if (formData.demoUrl) {
      prompt += `\n- **Live Demo URL:** ${formData.demoUrl}`;
    }

 
    prompt += `

--- README REQUIREMENTS ---
- **Tone of Voice:** The README should be written in a **${formData.tone}** tone.
- **Table of Contents:** ${formData.includeTableOfContents ? 'Yes, please include a detailed Table of Contents at the beginning.' : 'No, do not include a Table of Contents.'}
- **Badges:** ${formData.includeBadges ? `Yes, include relevant markdown badges for the license (${formData.license}) and the main technologies used. Place them right after the main title.` : 'No, do not include any badges.'}
- **Contributing Guide:** ${formData.includeContributing ? 'Yes, include a clear "Contributing" section explaining how others can contribute.' : 'No, do not include a "Contributing" section.'}
- **License Section:** ${formData.includeLicense ? `Yes, include a "License" section at the end, mentioning the project is under the ${formData.license} license.` : 'No, do not include a "License" section.'}
`;
    

    if (formData.installation) {
        prompt += `\n\n--- PRE-FILLED SECTIONS ---\nHere is the content for the Installation section. Use it as is:\n${formData.installation}`;
    }
     if (formData.usage) {
        prompt += `\n\nHere is the content for the Usage section. Use it as is:\n${formData.usage}`;
    }

    return prompt;
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

      const response = await fetch('/api/generate-readme', {
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
