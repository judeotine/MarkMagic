
import React, { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ConfettiProps {
  active?: boolean;
  duration?: number;
  count?: number;
}

const Confetti: React.FC<ConfettiProps> = ({ 
  active = false, 
  duration = 5000, 
  count = 100 
}) => {
  const [confettiPieces, setConfettiPieces] = useState<JSX.Element[]>([]);
  const isMobile = useIsMobile();
  const mobileCount = isMobile ? Math.floor(count / 2) : count;

  // Create confetti when activated
  useEffect(() => {
    if (!active) return;
    
    const colors = ['#8B5CF6', '#D946EF', '#F97316', '#C084FC', '#FBCFE8'];
    const pieces: JSX.Element[] = [];
    
    for (let i = 0; i < mobileCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = `${Math.random() * 100}%`;
      const top = `${Math.random() * 50}%`;
      const size = `${Math.random() * 0.5 + 0.5}rem`;
      const animDuration = `${Math.random() * 3 + 2}s`;
      const animDelay = `${Math.random() * 0.5}s`;
      
      pieces.push(
        <div 
          key={i}
          className="confetti absolute"
          style={{
            backgroundColor: color,
            left,
            top,
            width: size,
            height: size,
            animationDuration: animDuration,
            animationDelay: animDelay,
          }}
        />
      );
    }
    
    setConfettiPieces(pieces);
    
    // Clean up confetti after duration
    const timer = setTimeout(() => {
      setConfettiPieces([]);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [active, mobileCount, duration]);

  if (!active && confettiPieces.length === 0) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces}
    </div>
  );
};

export default Confetti;
