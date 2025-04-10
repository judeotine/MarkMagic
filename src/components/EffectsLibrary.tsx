
import React, { useState } from 'react';
import { animations, Animation } from '@/utils/animations';
import { Button } from "@/components/ui/button";
import { AlertCircle, Sparkles, Search, Filter } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import AnimationPreview from './AnimationPreview';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Confetti from './Confetti';

interface EffectsLibraryProps {
  onSelectEffect: (animation: Animation) => void;
}

const EffectsLibrary: React.FC<EffectsLibraryProps> = ({ onSelectEffect }) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<"all" | "compatible">("all");
  const [sampleText, setSampleText] = useState("Sample Text");
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Filter animations based on search query and selected tab
  const filteredAnimations = animations.filter(animation => {
    const matchesQuery = animation.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         animation.description.toLowerCase().includes(searchQuery.toLowerCase());
                         
    const matchesCompatibility = selectedTab === "all" || 
                              (selectedTab === "compatible" && animation.compatible);
                              
    return matchesQuery && matchesCompatibility;
  });
  
  // Handle text input for Easter egg
  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setSampleText(newText);
    
    // Easter egg: typing /party triggers confetti
    if (newText === '/party') {
      setShowConfetti(true);
      toast({
        title: "🎉 Party time!",
        description: "You found a hidden feature.",
      });
      
      // Reset after 5 seconds
      setTimeout(() => {
        setShowConfetti(false);
        setSampleText("Sample Text");
      }, 5000);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <Confetti active={showConfetti} />
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="Search effects..." 
            className="pl-9" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Try sample:</span>
          <Input
            type="text"
            value={sampleText}
            onChange={handleTextInput}
            className="max-w-[180px]"
            placeholder="Enter text or /party"
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <Tabs 
          value={selectedTab} 
          onValueChange={(value) => setSelectedTab(value as "all" | "compatible")}
        >
          <TabsList>
            <TabsTrigger value="all">All Effects</TabsTrigger>
            <TabsTrigger value="compatible">GitHub Compatible</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Badge variant="outline" className="ml-auto">
          <Filter className="h-3 w-3 mr-1" />
          {filteredAnimations.length} effects
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredAnimations.map((animation) => (
          <div 
            key={animation.id}
            className="relative border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
          >
            <div className="p-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm">{animation.name}</h3>
                {!animation.compatible && (
                  <div className="flex items-center text-amber-500 text-xs gap-1">
                    <AlertCircle size={12} />
                    <span>Preview only</span>
                  </div>
                )}
              </div>
              
              <p className="text-xs text-muted-foreground mb-3">{animation.description}</p>
              
              <div className="h-12 flex items-center justify-center border border-border rounded bg-muted p-2">
                <div dangerouslySetInnerHTML={{ 
                  __html: animation.htmlWrapper(sampleText) 
                }} />
              </div>
              
              <div className="mt-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs"
                  onClick={() => onSelectEffect(animation)}
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  Apply to Selection
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredAnimations.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No animations found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default EffectsLibrary;
