
import React from 'react';
import { HeartIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 bg-background border-t border-border mt-10">
      <div className="container flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Made with</span>
          <HeartIcon size={16} className="text-destructive animate-pulse" />
          <span>by <a href="https://judeotine.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Jude Otine</a></span>
        </div>
        
        <div className="text-xs text-muted-foreground">
          MarkMagic © {new Date().getFullYear()} — All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
