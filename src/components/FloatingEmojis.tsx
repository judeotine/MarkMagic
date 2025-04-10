
import React, { useEffect, useState } from 'react';

interface FloatingEmojisProps {
  emojis?: string[];
  count?: number;
  duration?: number;
  active?: boolean;
}

const FloatingEmojis: React.FC<FloatingEmojisProps> = ({ 
  emojis = ["✨", "🚀", "⭐", "🎉", "🔥", "💡", "🌟"], 
  count = 15,
  duration = 4000,
  active = false
}) => {
  const [floatingEmojis, setFloatingEmojis] = useState<JSX.Element[]>([]);
  
  useEffect(() => {
    if (!active) return;
    
    const elements: JSX.Element[] = [];
    
    for (let i = 0; i < count; i++) {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      const delay = `${Math.random() * 2}s`;
      const initialPosition = `${Math.random() * 100}%`;
      const size = `${Math.random() * 1 + 1}rem`;
      const duration = `${Math.random() * 3 + 3}s`;
      const rotation = `${Math.random() * 360}deg`;
      
      elements.push(
        <div
          key={i}
          className="absolute animate-emoji-float pointer-events-none select-none"
          style={{
            bottom: "-20px",
            left: initialPosition,
            fontSize: size,
            animationDuration: duration,
            animationDelay: delay,
            transform: `rotate(${rotation})`,
          }}
        >
          {emoji}
        </div>
      );
    }
    
    setFloatingEmojis(elements);
    
    if (duration > 0) {
      const timer = setTimeout(() => {
        setFloatingEmojis([]);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [active, emojis, count, duration]);
  
  if (!active && floatingEmojis.length === 0) return null;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingEmojis}
    </div>
  );
};

export default FloatingEmojis;
