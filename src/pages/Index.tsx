
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Wand2, 
  Code, 
  Eye, 
  Palette, 
  Sparkles, 
  Github, 
  DownloadCloud,
  Rocket
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MarkdownEditor from '@/components/MarkdownEditor';
import Preview from '@/components/Preview';
import ThemeSelector from '@/components/ThemeSelector';
import EffectsLibrary from '@/components/EffectsLibrary';
import GitHubStats from '@/components/GitHubStats';
import FloatingEmojis from '@/components/FloatingEmojis';

// Add the missing imports for shadcn components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

import { generateBasicMarkdown, addAnimatedText } from '@/utils/markdownHelpers';
import { themes, getThemeById, Theme } from '@/utils/themes';
import { animations, Animation } from '@/utils/animations';

const Index = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [markdown, setMarkdown] = useState('');
  const [selectedThemeId, setSelectedThemeId] = useState('modern');
  const [darkMode, setDarkMode] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  
  useEffect(() => {
    const defaultTheme = getThemeById('modern');
    if (defaultTheme) {
      setMarkdown(defaultTheme.markdownTemplate);
    } else {
      setMarkdown(generateBasicMarkdown('Your Name', 'Developer & Open Source Enthusiast', 'A passionate developer who loves to build things with code.'));
    }
  }, []);

  const handleSelectTheme = (theme: Theme) => {
    setSelectedThemeId(theme.id);
    setMarkdown(theme.markdownTemplate);
    
    setShowEmojis(true);
    setTimeout(() => setShowEmojis(false), 3000);
    
    toast({
      title: "Theme applied!",
      description: `The ${theme.name} theme has been applied.`
    });
  };

  const handleSelectEffect = (animation: Animation) => {
    toast({
      title: "Select text first",
      description: "Select some text in the editor to apply this effect"
    });
  };

  const applyAnimationToSelection = (selectedText: string, animationId: string) => {
    const animation = animations.find(a => a.id === animationId);
    
    if (!animation) return;
    
    const animatedText = animation.htmlWrapper(selectedText);
    const newMarkdown = markdown.replace(selectedText, animatedText);
    
    setMarkdown(newMarkdown);
    
    toast({
      title: "Effect applied!",
      description: `${animation.name} effect has been applied.`
    });
  };

  const addGitHubStats = (statsMarkdown: string) => {
    setMarkdown(prevMarkdown => `${prevMarkdown}\n\n${statsMarkdown}`);
  };

  const triggerConfetti = () => {
    toast({
      title: "🎉 Fun feature!",
      description: "You found a hidden feature. Confetti!"
    });
    
    // This would trigger a confetti animation in a full implementation
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container px-4 py-8">
        <div className="text-center mb-8 md:mb-12 relative">
          <FloatingEmojis active={showEmojis} />
          
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="bg-gradient-to-r from-magic-primary to-magic-secondary w-16 h-16 rounded-xl rotate-3 absolute -top-1 -left-1 blur-sm opacity-70" />
              <div className="bg-gradient-to-r from-magic-primary to-magic-secondary w-16 h-16 rounded-xl flex items-center justify-center relative">
                <Sparkles className="text-white" size={32} />
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-magic-primary to-magic-secondary bg-clip-text text-transparent">Mark</span>Magic
          </h1>
          
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Transform your GitHub profile into a stunning, interactive showcase with
            customizable README templates and animations.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="gap-2 bg-magic-primary hover:bg-magic-primary/90 w-full sm:w-auto"
              asChild
            >
              <Link to="/create">
                <Wand2 size={18} />
                <span>Get Started</span>
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2 w-full sm:w-auto"
              onClick={() => window.open('https://github.com/judeotine/MarkMagic', '_blank')}
            >
              <Github size={18} />
              <span>Star on GitHub</span>
            </Button>
          </div>
        </div>
        
        <Card className="mb-8 md:mb-12 border-border shadow-sm">
          <div className="grid md:grid-cols-2 min-h-[400px] md:min-h-[600px]">
            <div className="border-b md:border-b-0 md:border-r border-border">
              <MarkdownEditor 
                value={markdown} 
                onChange={setMarkdown}
                onApplyAnimation={applyAnimationToSelection}
              />
            </div>
            <div>
              <Preview 
                markdown={markdown} 
                darkMode={darkMode}
                onToggleDarkMode={() => setDarkMode(!darkMode)}
              />
            </div>
          </div>
        </Card>
        
        <Tabs defaultValue="themes">
          <TabsList className="mb-4 w-full overflow-x-auto flex-nowrap">
            <TabsTrigger value="themes" className="gap-1">
              <Palette size={16} />
              <span>{!isMobile && "Themes"}</span>
            </TabsTrigger>
            <TabsTrigger value="effects" className="gap-1">
              <Sparkles size={16} />
              <span>{!isMobile && "Effects"}</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="gap-1">
              <Github size={16} />
              <span>{!isMobile && "GitHub Stats"}</span>
            </TabsTrigger>
          </TabsList>
          
          <Card>
            <TabsContent value="themes">
              <ThemeSelector 
                selectedThemeId={selectedThemeId} 
                onSelectTheme={handleSelectTheme} 
              />
            </TabsContent>
            
            <TabsContent value="effects">
              <EffectsLibrary 
                onSelectEffect={handleSelectEffect} 
              />
            </TabsContent>
            
            <TabsContent value="stats">
              <GitHubStats onAddStats={addGitHubStats} />
            </TabsContent>
          </Card>
        </Tabs>
        
        <div className="mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Customize Your README</h2>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Wand2 className="text-primary" size={24} />
                  </div>
                  <h3 className="text-lg font-medium mb-2">AI-Powered Wizard</h3>
                  <p className="text-sm text-muted-foreground">
                    Answer a few questions and our AI will generate a personalized README just for you.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Sparkles className="text-primary" size={24} />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Animations & Effects</h3>
                  <p className="text-sm text-muted-foreground">
                    Add eye-catching animations that work right in GitHub's markdown viewer.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="sm:col-span-2 md:col-span-1">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <DownloadCloud className="text-primary" size={24} />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Export Anywhere</h3>
                  <p className="text-sm text-muted-foreground">
                    One-click export as markdown, PNG, or PDF for use beyond just GitHub.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="text-center">
          <Card className="bg-gradient-to-r from-magic-primary/10 to-magic-secondary/10 border-none p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Ready to make your GitHub profile stand out?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Start creating your stunning README now and show the world your skills, projects and personality.
            </p>
            <Button 
              size="lg" 
              className="gap-2 bg-magic-primary hover:bg-magic-primary/90"
              asChild
            >
              <Link to="/create">
                <Rocket size={18} />
                <span>Create Your Magic README</span>
              </Link>
            </Button>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
