// src/utils/readmeLogic.js

// NOTE: I've only included the AI-enhanced function for brevity.
// You would also move generateBasicReadme here.

export const generateAIEnhancedReadme = (formData) => {
    const badges = formData.includeBadges ? `
![License](https://img.shields.io/badge/license-${formData.license}-blue.svg)
![GitHub stars](https://img.shields.io/github/stars/${formData.author || 'your-user'}/${formData.projectName.toLowerCase().replace(/\s+/g, '-')})` : '';

    const tableOfContents = formData.includeTableOfContents ? `
## 📋 Table of Contents
- [🚀 Features](#features)
- [🛠️ Technology Stack](#technology-stack)
- [⚡ Quick Start](#quick-start)
- [🤝 Contributing](#contributing)` : '';

    // ... (rest of the generation logic from your original file)

    return `# ${formData.projectName} 🚀
<div align="center">
${badges}
**${formData.description || 'A cutting-edge solution built with modern technologies'}**
</div>

---
${tableOfContents}

## ✨ Features
- Feature A
- Feature B
`; // ... complete the template generation
};

export const generateBasicReadme = (formData) => {
  // ... (logic for the basic readme)
  return `# ${formData.projectName}\n\n${formData.description}`;
};