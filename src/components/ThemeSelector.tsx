
import React from 'react';
import { themes, Theme } from '@/utils/themes';
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';

interface ThemeSelectorProps {
  selectedThemeId: string;
  onSelectTheme: (theme: Theme) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ 
  selectedThemeId, 
  onSelectTheme 
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {themes.map((theme) => (
        <div 
          key={theme.id}
          className={`relative rounded-lg overflow-hidden cursor-pointer transition-all border-2 hover:shadow-lg ${
            selectedThemeId === theme.id ? 'border-primary' : 'border-border'
          }`}
          onClick={() => onSelectTheme(theme)}
        >
          <div className="aspect-video bg-muted relative">
            <img 
              src={theme.preview} 
              alt={theme.name} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {selectedThemeId === theme.id && (
              <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                <div className="bg-primary h-8 w-8 rounded-full flex items-center justify-center">
                  <Check className="text-white" size={16} />
                </div>
              </div>
            )}
          </div>
          <div className="p-3">
            <h3 className="font-medium text-sm">{theme.name}</h3>
            <p className="text-xs text-muted-foreground">{theme.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThemeSelector;
