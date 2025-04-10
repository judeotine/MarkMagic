
export interface Animation {
  id: string;
  name: string;
  description: string;
  cssClass: string;
  htmlWrapper: (content: string) => string;
  compatible: boolean; // If compatible with GitHub flavored markdown
}

export const animations: Animation[] = [
  {
    id: 'typing',
    name: 'Typing Effect',
    description: 'Simulates typing text character by character',
    cssClass: 'typing-effect',
    htmlWrapper: (content: string) => `<div class="typing-container"><span class="typing-text">${content}</span></div>`,
    compatible: true
  },
  {
    id: 'bounce',
    name: 'Bounce',
    description: 'Text or elements that bounce up and down',
    cssClass: 'animate-bounce',
    htmlWrapper: (content: string) => `<span class="animate-bounce inline-block">${content}</span>`,
    compatible: true
  },
  {
    id: 'pulse',
    name: 'Pulse',
    description: 'Elements that pulse with opacity changes',
    cssClass: 'animate-pulse-soft',
    htmlWrapper: (content: string) => `<span class="animate-pulse-soft inline-block">${content}</span>`,
    compatible: true
  },
  {
    id: 'float',
    name: 'Floating',
    description: 'Elements that gently float up and down',
    cssClass: 'animate-float',
    htmlWrapper: (content: string) => `<span class="animate-float inline-block">${content}</span>`,
    compatible: true
  },
  {
    id: 'gradient',
    name: 'Gradient Text',
    description: 'Text with a colorful gradient effect',
    cssClass: 'bg-gradient-to-r from-magic-primary to-magic-secondary bg-clip-text text-transparent',
    htmlWrapper: (content: string) => `<span class="bg-gradient-to-r from-magic-primary to-magic-secondary bg-clip-text text-transparent">${content}</span>`,
    compatible: true
  },
  {
    id: 'glitch',
    name: 'Glitch Text',
    description: 'Text with a glitch effect (note: complex CSS, preview only)',
    cssClass: 'glitch',
    htmlWrapper: (content: string) => `<span class="glitch" data-text="${content}">${content}</span>`,
    compatible: false
  },
  {
    id: 'neon',
    name: 'Neon Glow',
    description: 'Text with a neon-like glow effect',
    cssClass: 'text-magic-primary drop-shadow-[0_0_5px_rgba(139,92,246,0.8)]',
    htmlWrapper: (content: string) => `<span class="text-magic-primary drop-shadow-[0_0_5px_rgba(139,92,246,0.8)]">${content}</span>`,
    compatible: true
  },
  {
    id: 'emoji-rain',
    name: 'Emoji Rain',
    description: 'Animated emojis dropping from the top (preview only)',
    cssClass: 'emoji-rain',
    htmlWrapper: (content: string) => `<div class="emoji-rain">${content}</div>`,
    compatible: false
  },
  // New animations added
  {
    id: 'shake',
    name: 'Shake Effect',
    description: 'Text that shakes for attention',
    cssClass: 'shake-animation',
    htmlWrapper: (content: string) => `<span class="shake-animation inline-block">${content}</span>`,
    compatible: true
  },
  {
    id: 'flip',
    name: 'Flip Animation',
    description: 'Text that flips on hover',
    cssClass: 'flip-animation',
    htmlWrapper: (content: string) => `<span class="flip-animation inline-block">${content}</span>`,
    compatible: true
  },
  {
    id: 'rainbow',
    name: 'Rainbow Text',
    description: 'Text with animated rainbow colors',
    cssClass: 'rainbow-text',
    htmlWrapper: (content: string) => `<span class="rainbow-text">${content}</span>`,
    compatible: true
  },
  {
    id: 'particles',
    name: 'Particle Background',
    description: 'Text with animated particle effects behind it',
    cssClass: 'particle-text',
    htmlWrapper: (content: string) => `<span class="particle-text">${content}</span>`,
    compatible: false
  },
  {
    id: 'spotlight',
    name: 'Spotlight Effect',
    description: 'Text with a moving spotlight effect',
    cssClass: 'spotlight-text',
    htmlWrapper: (content: string) => `<span class="spotlight-text">${content}</span>`,
    compatible: false
  }
];

export const getAnimationById = (id: string): Animation | undefined => {
  return animations.find(animation => animation.id === id);
};

// New utilities for applying animations
export const applyAnimationToText = (text: string, animationId: string): string => {
  const animation = getAnimationById(animationId);
  if (!animation) return text;
  return animation.htmlWrapper(text);
};

// Generate a sample with all animations
export const generateAnimationShowcase = (): string => {
  return animations
    .map(animation => `### ${animation.name}\n${animation.htmlWrapper("This is sample text")}`)
    .join("\n\n");
};

export default animations;
