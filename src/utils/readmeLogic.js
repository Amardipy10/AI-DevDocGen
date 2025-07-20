// src/utils/readmeLogic.js

export const generateBasicReadme = (formData) => {
    // Shuruaat Project Name se karte hain
    let content = `# ${formData.projectName || 'My Awesome Project'}\n\n`;
  
    // --- Badges ---
    if (formData.includeBadges && formData.license) {
      // License ke '-' ko '--' se replace karna zaroori hai shields.io URL ke liye
      const licenseForBadge = formData.license.replace(/-/g, '--');
      content += `![License](https://img.shields.io/badge/License-${licenseForBadge}-blue.svg)\n`;
      content += `\n`; // Ek line ka gap
    }
  
    // --- Description ---
    content += `${formData.description || 'A cutting-edge solution built with modern technologies.'}\n\n`;
  
    // --- Live Demo ---
    if (formData.demoUrl) {
      content += `## 🚀 Live Demo\n\n`;
      content += `[Check out the live project here!](${formData.demoUrl})\n\n`;
    }
  
    // --- Table of Contents ---
    if (formData.includeTableOfContents) {
      content += `## 📋 Table of Contents\n\n`;
      content += `- [Features](#-features)\n`;
      content += `- [Technology Stack](#-technology-stack)\n`;
      content += `- [Installation](#-installation)\n`;
      content += `- [Usage](#-usage)\n`;
      if (formData.includeContributing) {
        content += `- [Contributing](#-contributing)\n`;
      }
      if (formData.includeLicense) {
        content += `- [License](#-license)\n`;
      }
      content += `- [Contact](#-contact)\n\n`;
    }
  
    // --- Features ---
    if (formData.features) {
      content += `## ✨ Features\n\n`;
      const featuresList = formData.features.split(',').map(f => `- ${f.trim()}`);
      content += featuresList.join('\n') + '\n\n';
    }
  
    // --- Technology Stack ---
    if (formData.techStack) {
      content += `## 💻 Technology Stack\n\n`;
      const techList = formData.techStack.split(',').map(t => `- ${t.trim()}`);
      content += techList.join('\n') + '\n\n';
    }
  
    // --- Installation ---
    content += `## 🔧 Installation\n\nFollow these steps to set up the project locally:\n\n`;
    content += `\`\`\`bash\n`;
    content += `# 1. Clone the repository\n`;
    content += `git clone ${formData.githubUrl || 'https://github.com/your-username/your-repo.git'}\n\n`;
    content += `# 2. Navigate to the project directory\n`;
    content += `cd ${formData.projectName.toLowerCase().replace(/\s+/g, '-')}\n\n`;
    content += `# 3. Install dependencies\n`;
    content += `npm install\n`;
    content += `\`\`\`\n\n`;
  
    // --- Usage ---
    content += `## 🏃‍ Usage\n\nTo run the project in a development environment, use the following command:\n\n`;
    content += `\`\`\`bash\n`;
    content += `npm run dev\n`;
    content += `\`\`\`\n\n`;
  
    // --- Contributing ---
    if (formData.includeContributing) {
      content += `## 🤝 Contributing\n\n`;
      content += `Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.\n\n`;
      content += `1. Fork the Project\n`;
      content += `2. Create your Feature Branch (\`git checkout -b feature/AmazingFeature\`)\n`;
      content += `3. Commit your Changes (\`git commit -m 'Add some AmazingFeature'\`)\n`;
      content += `4. Push to the Branch (\`git push origin feature/AmazingFeature\`)\n`;
      content += `5. Open a Pull Request\n\n`;
    }
  
    // --- License ---
    if (formData.includeLicense) {
      content += `## 📄 License\n\n`;
      content += `This project is distributed under the ${formData.license} License. See the \`LICENSE\` file for more information.\n\n`;
    }
  
    // --- Contact ---
    content += `## 📬 Contact\n\n`;
    content += `${formData.author || 'Your Name'} - `;
    if (formData.email) {
      content += `[${formData.email}](mailto:${formData.email})`;
    }
    content += `\n`;
    if (formData.githubUrl) {
      content += `Project Link: [${formData.githubUrl}](${formData.githubUrl})\n`;
    }
  
    return content;
  };
