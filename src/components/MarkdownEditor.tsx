
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Clipboard, Sparkles, Download, Wand2, Layout } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { animations, Animation, applyAnimationToText } from '@/utils/animations';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Confetti from './Confetti';
import { useIsMobile } from '@/hooks/use-mobile';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  onThemeChange?: (themeId: string) => void;
  onApplyAnimation?: (selection: string, animationId: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ 
  value, 
  onChange,
  onThemeChange,
  onApplyAnimation
}) => {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showQuickEffects, setShowQuickEffects] = useState(false);
  const [secretCode, setSecretCode] = useState("");
  const konamiCode = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba";
  const isMobile = useIsMobile();

  // Simple text selection tracking
  const [selection, setSelection] = useState<{ start: number; end: number; text: string } | null>(null);

  // Handle textarea selection change
  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    if (target.selectionStart !== target.selectionEnd) {
      setSelection({
        start: target.selectionStart,
        end: target.selectionEnd,
        text: value.substring(target.selectionStart, target.selectionEnd)
      });
    } else {
      setSelection(null);
    }
  };

  // Track input for easter eggs
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Track Konami code
    const newCode = secretCode + e.key;
    if (konamiCode.includes(newCode)) {
      setSecretCode(newCode);
      if (newCode === konamiCode) {
        setShowConfetti(true);
        toast({
          title: "🎮 Konami Code Activated!",
          description: "You found the hidden easter egg!",
        });
        setSecretCode("");
        
        // Add a special message to the markdown
        const specialText = "\n\n<!-- Konami code activated! This README was created with ❤️ using MarkMagic -->";
        onChange(value + specialText);
        
        setTimeout(() => setShowConfetti(false), 5000);
      }
    } else {
      setSecretCode("");
    }
    
    // Check for /party command
    if (e.key === "Enter" && (e.target as HTMLTextAreaElement).value.trim().endsWith('/party')) {
      setShowConfetti(true);
      toast({
        title: "🎉 Party Mode Activated!",
        description: "You found a hidden feature!",
      });
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  // Apply animation to selected text
  const applyAnimationToSelection = (animationId: string) => {
    if (selection && animationId) {
      const animation = animations.find(a => a.id === animationId);
      if (!animation) return;
      
      // Apply the animation to the selected text
      const before = value.substring(0, selection.start);
      const after = value.substring(selection.end);
      const animatedText = applyAnimationToText(selection.text, animationId);
      
      // Update the markdown
      const newValue = before + animatedText + after;
      onChange(newValue);
      
      toast({
        title: `${animation.name} Applied!`,
        description: `Effect has been added to your selected text.`,
      });
      
      // Reset selection
      setSelection(null);
    } else {
      toast({
        title: "No text selected",
        description: "Please select some text to apply an animation",
        variant: "destructive"
      });
    }
  };

  // Handle copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      
      // Create confetti effect
      setShowConfetti(true);
      
      toast({
        title: "Copied!",
        description: "Markdown copied to clipboard",
      });
      
      setTimeout(() => {
        setIsCopied(false);
        setShowConfetti(false);
      }, 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually",
        variant: "destructive"
      });
    }
  };

  // Handle download markdown
  const downloadMarkdown = () => {
    const blob = new Blob([value], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "README.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Your README.md file has been downloaded",
    });
  };

  return (
    <div className="relative flex flex-col h-full">
      <Confetti active={showConfetti} />
      
      <div className="flex flex-wrap items-center justify-between p-2 border-b border-border bg-muted rounded-t-md">
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <span className="text-sm font-medium">Markdown Editor</span>
          <span className="text-xs bg-background px-2 py-0.5 rounded-md text-muted-foreground">
            {value.length} chars
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* Quick effect buttons */}
          <Popover open={showQuickEffects} onOpenChange={setShowQuickEffects}>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-xs" 
                disabled={!selection}
              >
                <Sparkles size={14} className="mr-1" />
                {!isMobile && "Quick Effects"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60">
              <div className="grid gap-2">
                <h4 className="font-medium text-sm">Apply animation</h4>
                <div className="grid grid-cols-2 gap-2">
                  {animations.filter(a => a.compatible).slice(0, 6).map(animation => (
                    <Button 
                      key={animation.id}
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        applyAnimationToSelection(animation.id);
                        setShowQuickEffects(false);
                      }}
                      className="h-8 text-xs justify-start px-2"
                    >
                      {animation.name}
                    </Button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="text-xs" 
            onClick={downloadMarkdown}
          >
            <Download size={14} className="mr-1" />
            {!isMobile && "Download"}
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="text-xs" 
            onClick={copyToClipboard}
          >
            <Clipboard size={14} className="mr-1" />
            {isCopied ? 'Copied!' : isMobile ? '' : 'Copy'}
          </Button>
        </div>
      </div>
      
      <div className="relative flex-grow">
        <textarea
          className="w-full h-full p-4 font-mono text-sm bg-card resize-none focus:outline-none focus:ring-1 focus:ring-primary rounded-b-md"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onSelect={handleSelect}
          onKeyDown={handleKeyDown}
          placeholder="# Start typing your Markdown here..."
          spellCheck="false"
        />
        <div id="confetti-container" className="absolute inset-0 pointer-events-none overflow-hidden" />
      </div>
      
      {/* Floating animation buttons that appear when text is selected */}
      {selection && (
        <div className="absolute bottom-4 right-4 bg-popover border border-border rounded-lg shadow-lg p-2 flex gap-2 animate-fade-in">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => applyAnimationToSelection('neon')}
            className="h-8"
          >
            <span className="text-xs text-magic-primary drop-shadow-[0_0_3px_rgba(139,92,246,0.8)]">Neon</span>
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => applyAnimationToSelection('gradient')}
            className="h-8"
          >
            <span className="text-xs bg-gradient-to-r from-magic-primary to-magic-secondary bg-clip-text text-transparent">Gradient</span>
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => applyAnimationToSelection('typing')}
            className="h-8"
          >
            <span className="text-xs">Typing</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default MarkdownEditor;
