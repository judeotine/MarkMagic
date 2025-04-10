
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BrainCog, FileCode, Eye, Download, Copy, Check, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileForm from '@/components/ProfileForm';
import MarkdownEditor from '@/components/MarkdownEditor';
import Preview from '@/components/Preview';

const Create: React.FC = () => {
  const [markdown, setMarkdown] = useState('# Hello!\n\nStart by filling out the form to generate your README.');
  const [darkMode, setDarkMode] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const handleGenerateMarkdown = (generatedMarkdown: string) => {
    setMarkdown(generatedMarkdown);
    toast({
      title: "README Generated!",
      description: "Your custom README is ready for preview.",
    });
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdown);
    setIsCopied(true);
    toast({
      title: "Copied to clipboard!",
      description: "Your README markdown has been copied.",
    });
    
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "README Downloaded!",
      description: "Your markdown file has been downloaded.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Create Your GitHub Profile
            </h1>
            <p className="text-muted-foreground mt-1">
              Design a stunning README that showcases your skills and projects.
            </p>
          </div>
          
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm" onClick={handleCopyMarkdown} className="gap-2">
              {isCopied ? <Check size={16} /> : <Copy size={16} />}
              {isCopied ? "Copied" : "Copy Markdown"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2">
              <Download size={16} />
              <span>Download</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 size={16} />
              <span>Share</span>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="form" className="space-y-4">
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="form" className="gap-2">
              <BrainCog size={16} />
              <span className="hidden md:inline">Profile Details</span>
              <span className="md:hidden">Details</span>
            </TabsTrigger>
            <TabsTrigger value="editor" className="gap-2">
              <FileCode size={16} />
              <span className="hidden md:inline">Markdown Editor</span>
              <span className="md:hidden">Editor</span>
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-2">
              <Eye size={16} />
              <span>Preview</span>
            </TabsTrigger>
          </TabsList>
          
          <Card>
            <TabsContent value="form" className="p-0 m-0">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Fill in your details to generate a personalized README
                </CardDescription>
              </CardHeader>
              <ScrollArea className="h-[70vh] px-6">
                <ProfileForm onGenerateMarkdown={handleGenerateMarkdown} />
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="editor" className="p-0 m-0">
              <CardHeader>
                <CardTitle>Edit Your README</CardTitle>
                <CardDescription>
                  Customize the markdown to make it uniquely yours
                </CardDescription>
              </CardHeader>
              <div className="h-[70vh] border-t">
                <MarkdownEditor 
                  value={markdown} 
                  onChange={setMarkdown}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="p-0 m-0">
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>
                  See how your README will appear on GitHub
                </CardDescription>
              </CardHeader>
              <div className="h-[70vh] border-t">
                <Preview 
                  markdown={markdown} 
                  darkMode={darkMode}
                  onToggleDarkMode={() => setDarkMode(!darkMode)}
                />
              </div>
            </TabsContent>
          </Card>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Create;
