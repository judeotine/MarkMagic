import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Github, 
  Menu, 
  X, 
  Moon, 
  Sun 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from '@/hooks/use-theme';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  
  return (
    <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-magic-primary to-magic-secondary opacity-70 blur-sm group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-magic-primary to-magic-secondary rounded-full p-2 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold">MarkMagic</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-4 ml-6">
            <Link 
              to="/" 
              className={`text-sm font-medium hover:text-primary transition-colors ${
                location.pathname === "/" ? "text-primary" : ""
              }`}
            >
              Home
            </Link>
            <Link 
              to="/create" 
              className={`text-sm font-medium hover:text-primary transition-colors ${
                location.pathname === "/create" ? "text-primary" : ""
              }`}
            >
              Create
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                <span>Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                <span>Dark</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="hidden md:block">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onClick={() => window.open('https://github.com/judeotine/MarkMagic', '_blank')}
            >
              <Github size={16} />
              <span>Star on GitHub</span>
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="container py-4">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  location.pathname === "/" 
                    ? "bg-accent text-accent-foreground" 
                    : "hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/create" 
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  location.pathname === "/create" 
                    ? "bg-accent text-accent-foreground" 
                    : "hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Create
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1 mt-2"
                onClick={() => window.open('https://github.com/judeotine/MarkMagic', '_blank')}
              >
                <Github size={16} />
                <span>Star on GitHub</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-1 justify-start" 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun size={16} />
                    <span>Light mode</span>
                  </>
                ) : (
                  <>
                    <Moon size={16} />
                    <span>Dark mode</span>
                  </>
                )}
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
