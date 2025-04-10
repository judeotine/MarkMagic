
export interface Theme {
  id: string;
  name: string;
  description: string;
  preview: string; // URL to preview image
  markdownTemplate: string;
  cssClasses: string;
}

export const themes: Theme[] = [
  {
    id: 'modern',
    name: 'Modern Clean',
    description: 'A sleek, minimalist design with a professional feel',
    preview: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format',
    markdownTemplate: `# Hi there 👋 

<div align="center">
  <!-- Profile Metrics -->
  <div style="display: flex; justify-content: center; gap: 15px; margin-bottom: 10px;">
    <img src="https://komarev.com/ghpvc/?username=yourusername&label=Profile+Views&color=0e75b6&style=flat" alt="Profile Views">
    <img src="https://img.shields.io/github/followers/yourusername?label=Followers&style=social" alt="GitHub Followers">
    <img src="https://img.shields.io/github/stars/yourusername?label=Stars+Earned&color=yellow" alt="Stars Earned">
  </div>
</div>

## Full-Stack Developer | Open Source Enthusiast

I build things for the web and contribute to open source projects.

<img align="right" alt="Coding" width="300" src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/programmer.gif">

### 🛠️ Tech Stack
- Frontend: React, TypeScript, Next.js
- Backend: Node.js, Express, PostgreSQL
- Tools: Git, Docker, AWS

### 📊 GitHub Stats
![GitHub Stats](https://github-readme-stats.vercel.app/api?username=yourusername&show_icons=true&theme=tokyonight)
`,
    cssClasses: 'bg-white text-gray-900 font-sans',
  },
  {
    id: 'retro',
    name: 'Retro 80s',
    description: 'A nostalgic 80s-inspired theme with neon colors',
    preview: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&auto=format',
    markdownTemplate: `# <span style="color:#ff00ff;">╔═══════════════════╗</span>
# <span style="color:#ff00ff;">║</span>   WELCOME TO MY PROFILE   <span style="color:#ff00ff;">║</span>
# <span style="color:#ff00ff;">╚═══════════════════╝</span>

## <span style="color:#00ffff;">/** I'm a Retro Coder **/</span>

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/213910845-af37a709-8995-40d6-be59-724526e3c3d7.gif" width="500">
</div>

<div align="center">
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.demolab.com?align=center&font=Fira+Code&size=22&pause=1000&duration=2000&color=FF00FF&width=435&lines=Building+awesome+things+with+code;Open-Source+Enthusiast;Full-Stack+Developer" alt="Typing SVG" />
  </a>
</div>

### <span style="color:#ffff00;">LOADING SKILLS.SYS...</span>
\`\`\`
JAVASCRIPT......OK
REACT...........OK
NODE.JS.........OK
\`\`\`

### <span style="color:#00ff00;">// MY TOP LANGUAGES</span>
![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=yourusername&layout=compact&theme=radical&hide_border=true)
`,
    cssClasses: 'bg-black text-pink-500 font-mono',
  },
  {
    id: 'terminal',
    name: 'Terminal Hacker',
    description: 'A command-line inspired theme for the coding wizard',
    preview: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format',
    markdownTemplate: `\`\`\`bash
# ----------------------------------------
# USER PROFILE: Developer
# SYSTEM: GitHub.com
# LAST LOGIN: $(date)
# ----------------------------------------
\`\`\`

## 🔥 Current Focus

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px; margin-bottom: 20px;">
  <div style="background: rgba(30, 40, 50, 0.7); padding: 15px; border-radius: 10px; border-top: 3px solid #FF6B6B;">
    <h3>🚧 Current Project</h3>
    <p>Building a next-gen developer tool with AI integration.</p>
    <img src="https://img.shields.io/badge/Status-In%20Development-yellow" alt="Project Status">
  </div>
  
  <div style="background: rgba(30, 40, 50, 0.7); padding: 15px; border-radius: 10px; border-top: 3px solid #4ECDC4;">
    <h3>🌱 Learning</h3>
    <p>Exploring WebAssembly and Rust</p>
  </div>
</div>

\`\`\`
> whoami
Software Engineer

> cat skills.txt
- JavaScript/TypeScript
- React/Vue/Angular
- Node.js/Python/Go
- Docker/Kubernetes

> stats --github
Contributions: XX,XXX+
Repositories: XX+
Stars: XXX+
\`\`\`

## 🛠 Tech Stack

### Frontend
<div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
</div>

### Backend
<div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
</div>
`,
    cssClasses: 'bg-gray-900 text-green-500 font-mono',
  },
  {
    id: 'minimal',
    name: 'Minimal Zen',
    description: 'A clean, minimalist theme with a zen aesthetic',
    preview: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&auto=format',
    markdownTemplate: `# Developer

> _Simplicity is the ultimate sophistication._

Frontend Engineer creating thoughtful user experiences through clean code.

<div align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=yourusername&theme=nord&no-frame=true&margin-w=15&rank=SECRET,SSS,SS,S,AAA,AA,A,B" alt="GitHub Trophies">
</div>

---

**Currently working with:** React, TypeScript, GraphQL

**Learning:** Rust, WebAssembly

---

## 📊 GitHub Analytics

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px; margin-bottom: 20px;">
  <img src="https://github-readme-stats.vercel.app/api?username=yourusername&show_icons=true&theme=nord&hide_border=true&include_all_commits=true" alt="GitHub Stats">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=yourusername&theme=nord&hide_border=true" alt="GitHub Streak">
</div>

<div align="center">
  <a href="mailto:you@example.com">Email</a> •
  <a href="https://twitter.com/yourusername">Twitter</a> •
  <a href="https://linkedin.com/in/yourusername">LinkedIn</a>
</div>
`,
    cssClasses: 'bg-gray-50 text-gray-800 font-sans',
  },
  {
    id: 'futuristic',
    name: 'Futuristic Grid',
    description: 'A modern, futuristic theme with a grid layout',
    preview: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=600&auto=format',
    markdownTemplate: `<div align="center">
  <h1>[ DEVELOPER PROFILE ]</h1>
  <h3>/// SOFTWARE ENGINEER ///</h3>
  
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=120&section=header" width="100%"/>
</div>

<table>
  <tr>
    <td width="50%">
      <h3 align="center">PROJECTS</h3>
      <p align="center">
        <a href="https://github.com/yourusername/project1">Project Alpha</a><br>
        <a href="https://github.com/yourusername/project2">Project Beta</a><br>
        <a href="https://github.com/yourusername/project3">Project Gamma</a>
      </p>
    </td>
    <td width="50%">
      <h3 align="center">SKILLS</h3>
      <p align="center">
        TypeScript · React · Node.js<br>
        AWS · Docker · PostgreSQL<br>
        CI/CD · System Design
      </p>
    </td>
  </tr>
</table>

## 🎨 Design & Tools

<div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;">
  <img src="https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white" alt="Figma">
  <img src="https://img.shields.io/badge/Adobe%20XD-470137?style=for-the-badge&logo=Adobe%20XD&logoColor=#FF61F6" alt="Adobe XD">
  <img src="https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" alt="VS Code">
</div>

<!-- GitHub Activity Graph -->
<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=yourusername&theme=react-dark&bg_color=0D1117&hide_border=true&area=true" alt="GitHub Activity Graph" width="100%">
</div>

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=120&section=footer" width="100%"/>
</div>
`,
    cssClasses: 'bg-slate-900 text-sky-400 font-sans',
  }
];

export const getThemeById = (id: string): Theme | undefined => {
  return themes.find(theme => theme.id === id);
};

export default themes;
