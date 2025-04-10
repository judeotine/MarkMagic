/**
 * Utility functions for markdown formatting and manipulation
 */

interface ProfileData {
  name: string;
  title: string;
  bio: string;
  location?: string;
  website?: string;
  github: string;
  skills: string[];
  learning: string[];
  projects: string[];
  funFact?: string;
  languages?: string[];
}

// Convert profile data to a fully featured markdown README
export const generateProfileReadme = (data: ProfileData): string => {
  const {
    name,
    title,
    bio,
    location,
    website,
    github,
    skills,
    learning,
    projects,
    funFact,
    languages,
  } = data;

  // Generate ASCII art for the name (simple version)
  const asciiArt = generateSimpleAsciiArt(name);
  
  // Create a language flags section if languages are provided
  const languageFlags = languages && languages.length > 0
    ? generateLanguageFlags(languages)
    : '';

  // Generate the markdown with various sections
  return `# Hi there, I'm ${name} 👋

${asciiArt}

## ${title}

<div align="center">
  <img src="https://komarev.com/ghpvc/?username=${github}&style=flat-square&color=blueviolet" alt="Profile Views" />
</div>

${generateTypingAnimation(`${bio}`)}

${languageFlags}

## 🚀 About Me

${location ? `- 🌍 I'm based in **${location}**\n` : ''}
${website ? `- 🔭 Check out my portfolio: [${website.replace(/^https?:\/\//, '')}](${website})\n` : ''}
- 💬 Ask me about **${skills.slice(0, 3).join(', ')}**
${funFact ? `- ⚡ Fun fact: **${funFact}**\n` : ''}

## 🛠️ Skills and Technologies

${generateSkillBadges(skills)}

## 📚 Currently Learning

${generateLearningSection(learning)}

## 🔥 Featured Projects

${generateProjectsSection(projects, github)}

## 📊 GitHub Stats

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${github}&theme=radical&hide_border=false&include_all_commits=true&count_private=true" alt="GitHub Stats" /><br/>
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${github}&theme=radical&hide_border=false" alt="GitHub Streak Stats" /><br/>
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${github}&theme=radical&hide_border=false&include_all_commits=true&count_private=true&layout=compact" alt="Top Languages" />
</div>

## 🏆 GitHub Trophies
<div align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=${github}&theme=radical&no-frame=false&no-bg=true&margin-w=4" alt="GitHub Trophies" />
</div>

## 📫 How to reach me

<div align="center">
  
  [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/${github})
  ${website ? `[![Website](https://img.shields.io/badge/website-%233867D6.svg?style=for-the-badge&logo=safari&logoColor=white)](${website})` : ''}
  
</div>

<details>
  <summary>✨ More About Me</summary>
  <br>
  <p align="center">
    <img src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=radical" alt="Random Dev Quote" />
  </p>
  
  <h3>💻 My Workspace</h3>
  <p>
    <img src="https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white" alt="Windows" />
    <img src="https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" alt="VSCode" />
    <img src="https://img.shields.io/badge/Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white" alt="Chrome" />
  </p>
  
  <p align="center">This README was generated with ❤️ by MarkMagic</p>
</details>

<!-- This README took 3 coffees ☕ and 1 existential crisis to make! -->
`;
};

// Convert plain text to markdown with common GitHub profile patterns
export const generateBasicMarkdown = (name: string, title: string, bio: string): string => {
  return `# Hi there, I'm ${name} 👋

## ${title}

${bio}

## 🔭 I'm currently working on...

## 🌱 I'm currently learning...

## 👯 I'm looking to collaborate on...

## 💬 Ask me about...

## 📫 How to reach me:

## ⚡ Fun fact:
`;
};

// Add animated effect to text
export const addAnimatedText = (text: string, animationType: 'typing' | 'glitch' | 'gradient'): string => {
  switch (animationType) {
    case 'typing':
      return `<div class="typing-container"><span class="typing-text">${text}</span></div>`;
    case 'glitch':
      return `<span class="glitch" data-text="${text}">${text}</span>`;
    case 'gradient':
      return `<span class="gradient-text">${text}</span>`;
    default:
      return text;
  }
};

// Generate GitHub stats markdown
export const generateGitHubStats = (username: string): string => {
  return `
## 📊 GitHub Stats:
![](https://github-readme-stats.vercel.app/api?username=${username}&theme=radical&hide_border=false&include_all_commits=true&count_private=true)
![](https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=radical&hide_border=false)
![](https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&theme=radical&hide_border=false&include_all_commits=true&count_private=true&layout=compact)
`;
};

// Generate skills section with icons
export const generateSkillsSection = (skills: string[]): string => {
  const skillIcons = skills.map(skill => {
    const formatted = skill.toLowerCase().replace(/\s+/g, '-');
    return `<img src="https://img.shields.io/badge/${skill}-1a1b27?style=for-the-badge&logo=${formatted}&logoColor=white" alt="${skill}" />`;
  }).join(' ');
  
  return `
## 🛠️ Skills and Technologies

${skillIcons}
`;
};

// Generate social links section
export const generateSocialLinks = (socials: Record<string, string>): string => {
  const socialIcons = Object.entries(socials).map(([platform, url]) => {
    if (!url) return '';
    return `<a href="${url}"><img src="https://img.shields.io/badge/${platform}-1a1b27?style=for-the-badge&logo=${platform.toLowerCase()}&logoColor=white" alt="${platform}" /></a>`;
  }).filter(Boolean).join(' ');
  
  return `
## 🔗 Connect With Me

${socialIcons}
`;
};

// Generate ASCII art header
export const generateAsciiArt = (text: string): string => {
  // Simple ASCII conversion (in a real app this would be more sophisticated)
  const bannerLines = [
    "```",
    " _____   _____   _____   _____   _____   _____   _____  ",
    "|  ___| |  _  | |  _  | |  ___| |  _  | |  ___| |  ___| ",
    "| |___  | |_| | | |_| | | |___  | |_| | | |___  | |___  ",
    "|___  | |  _  | |  _  | |___  | |  _  | |___  | |___  | ",
    " ___| | | | | | | | | |  ___| | | | | |  ___| |  ___| | ",
    "|_____| |_| |_| |_| |_| |_____| |_| |_| |_____| |_____| ",
    "```"
  ];
  
  return bannerLines.join('\n');
};

// Parse GitHub username from URL
export const parseGitHubUsername = (url: string): string => {
  const regex = /github\.com\/([^\/]+)/;
  const match = url.match(regex);
  return match ? match[1] : '';
};

// NEW FUNCTIONS FOR ENHANCED PROFILE GENERATION

// Generate a simple ASCII art banner
const generateSimpleAsciiArt = (name: string): string => {
  return `<div align="center">
  <pre>
  ██╗  ██╗███████╗██╗     ██╗      ██████╗     ██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗ 
  ██║  ██║██╔════╝██║     ██║     ██╔═══██╗    ██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
  ███████║█████╗  ██║     ██║     ██║   ██║    ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
  ██╔══██║██╔══╝  ██║     ██║     ██║   ██║    ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
  ██║  ██║███████╗███████╗███████╗╚██████╔╝    ╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
  ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝      ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝ 
  </pre>
</div>`;
};

// Generate typing animation for bio
const generateTypingAnimation = (text: string): string => {
  // Use HTML comments to simulate a typing animation in GitHub markdown
  return `<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=24&duration=3000&pause=1000&color=F745B5&center=true&vCenter=true&width=435&lines=${encodeURIComponent(text)}" alt="Typing SVG" />
</div>`;
};

// Generate language flags based on provided languages
const generateLanguageFlags = (languages: string[]): string => {
  // Map common language names to emoji flags
  const languageToFlag: Record<string, string> = {
    'english': '🇺🇸',
    'spanish': '🇪🇸',
    'french': '🇫🇷',
    'german': '🇩🇪',
    'italian': '🇮🇹',
    'portuguese': '🇵🇹',
    'russian': '🇷🇺',
    'japanese': '🇯🇵',
    'chinese': '🇨🇳',
    'korean': '🇰🇷',
    'arabic': '🇸🇦',
    'hindi': '🇮🇳',
    'bengali': '🇧🇩',
    'dutch': '🇳🇱',
    'swedish': '🇸🇪',
    'norwegian': '🇳🇴',
    'finnish': '🇫🇮',
    'danish': '🇩🇰',
    'polish': '🇵🇱',
    'turkish': '🇹🇷',
    'greek': '🇬🇷',
  };
  
  const languageFlags = languages.map(lang => {
    const normalizedLang = lang.toLowerCase().trim();
    return `${languageToFlag[normalizedLang] || '🌍'} ${lang}`;
  }).join(' | ');
  
  return `<p align="center">${languageFlags}</p>`;
};

// Generate skill badges
const generateSkillBadges = (skills: string[]): string => {
  const badges = skills.map(skill => {
    const formattedSkill = skill.trim();
    // Format the skill name for the badge URL (common technologies are recognized automatically)
    return `![${formattedSkill}](https://img.shields.io/badge/${encodeURIComponent(formattedSkill)}-007ACC?style=for-the-badge&logo=${encodeURIComponent(formattedSkill.toLowerCase())}&logoColor=white)`;
  }).join(' ');
  
  return `<p align="center">${badges}</p>`;
};

// Generate learning section with progress bars
const generateLearningSection = (learningItems: string[]): string => {
  return learningItems.map(item => {
    return `- 📖 ${item}`;
  }).join('\n');
};

// Generate projects section with GitHub links
const generateProjectsSection = (projects: string[], githubUsername: string): string => {
  return projects.map((project, index) => {
    return `### ${index + 1}. ${project}\n\n` +
      `<div align="center">\n` +
      `  <a href="https://github.com/${githubUsername}/${project.replace(/\s+/g, '-').toLowerCase()}">\n` +
      `    <img src="https://github-readme-stats.vercel.app/api/pin/?username=${githubUsername}&repo=${project.replace(/\s+/g, '-').toLowerCase()}&theme=radical" alt="${project}" />\n` +
      `  </a>\n` +
      `</div>\n`;
  }).join('\n');
};
