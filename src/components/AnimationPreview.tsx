
import React from 'react';
import { Card } from "@/components/ui/card";
import { animations, Animation } from '@/utils/animations';

interface AnimationPreviewProps {
  animationId?: string;
  sampleText?: string;
}

const AnimationPreview: React.FC<AnimationPreviewProps> = ({ 
  animationId, 
  sampleText = "Sample Animation Text" 
}) => {
  // If no specific animation is selected, display all animations
  const displayAllAnimations = !animationId;
  
  // Filter animations to show just the selected one or all
  const animationsToShow: Animation[] = displayAllAnimations 
    ? animations 
    : animations.filter(a => a.id === animationId);

  // For cases where an invalid ID is provided
  if (!displayAllAnimations && animationsToShow.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-muted-foreground">Animation not found</p>
      </div>
    );
  }

  return (
    <div className={`grid ${displayAllAnimations ? 'grid-cols-1 md:grid-cols-2 gap-4' : 'grid-cols-1'}`}>
      {animationsToShow.map((animation) => (
        <Card key={animation.id} className="overflow-hidden">
          <div className="p-4">
            <h3 className="font-medium text-base mb-2">{animation.name}</h3>
            <div className="h-16 flex items-center justify-center border border-border rounded bg-muted p-4">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: animation.htmlWrapper(sampleText) 
                }} 
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {animation.compatible 
                ? "✅ GitHub compatible" 
                : "⚠️ Preview only (not for GitHub)"
              }
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AnimationPreview;
