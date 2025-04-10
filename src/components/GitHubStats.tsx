
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateGitHubStats, parseGitHubUsername } from '@/utils/markdownHelpers';
import { useToast } from "@/hooks/use-toast";
import { GithubIcon, RefreshCw } from 'lucide-react';

interface GitHubStatsProps {
  onAddStats: (statsMarkdown: string) => void;
}

const GitHubStats: React.FC<GitHubStatsProps> = ({ onAddStats }) => {
  const [username, setUsername] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateStats = () => {
    if (!username && !githubUrl) {
      toast({
        title: "Username required",
        description: "Please enter a GitHub username or profile URL",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // If URL is provided, extract username
      const extractedUsername = githubUrl ? parseGitHubUsername(githubUrl) : username;
      const finalUsername = extractedUsername || username;
      
      if (!finalUsername) {
        throw new Error("Could not determine GitHub username");
      }
      
      // Generate the stats markdown
      const statsMarkdown = generateGitHubStats(finalUsername);
      
      // Add to the editor
      onAddStats(statsMarkdown);
      
      toast({
        title: "Stats added!",
        description: `GitHub stats for ${finalUsername} added to your README`,
      });
    } catch (error) {
      toast({
        title: "Error generating stats",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            GitHub Username
          </label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. octocat"
            className="w-full"
          />
        </div>
        
        <div>
          <label htmlFor="github-url" className="block text-sm font-medium mb-1">
            Or GitHub Profile URL
          </label>
          <Input
            id="github-url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="e.g. https://github.com/octocat"
            className="w-full"
          />
        </div>
        
        <Button 
          className="w-full gap-2" 
          onClick={handleGenerateStats}
          disabled={loading}
        >
          {loading ? (
            <RefreshCw size={16} className="animate-spin" />
          ) : (
            <GithubIcon size={16} />
          )}
          <span>Generate GitHub Stats</span>
        </Button>
        
        <div className="text-xs text-muted-foreground mt-4">
          This will add GitHub stats cards to your README showing your contribution stats, streak, and top languages.
        </div>
      </div>
    </div>
  );
};

export default GitHubStats;
