
import React from 'react';
import { Button } from "@/components/ui/button";
import { Eye, Moon, Sun } from 'lucide-react';
import DOMPurify from 'dompurify';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface PreviewProps {
  markdown: string;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

const Preview: React.FC<PreviewProps> = ({ 
  markdown, 
  darkMode = false,
  onToggleDarkMode 
}) => {
  const isMobile = useIsMobile();
  
  // Enhanced markdown to HTML conversion
  const createMarkup = () => {
    // Process code blocks with language support first (```)
    let html = markdown.replace(/```(\w*)([\s\S]*?)```/g, (match, lang, code) => {
      return `<pre class="language-${lang || 'plaintext'}"><code>${DOMPurify.sanitize(code.trim())}</code></pre>`;
    });
    
    // Handle inline code before other formatting
    html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
    
    // Headers
    html = html
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold my-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold my-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold my-2">$1</h3>')
      .replace(/^#### (.*$)/gm, '<h4 class="text-base font-bold my-2">$1</h4>')
      .replace(/^##### (.*$)/gm, '<h5 class="text-sm font-bold my-1">$1</h5>')
      .replace(/^###### (.*$)/gm, '<h6 class="text-xs font-bold my-1">$1</h6>')
      
    // Text formatting
    html = html
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/~~(.*?)~~/g, '<del>$1</del>')
      
    // Lists - group them properly
    html = html
      .replace(/^\s*\*\s+(.*$)/gm, '<li>$1</li>')
      .replace(/^\s*-\s+(.*$)/gm, '<li>$1</li>')
      .replace(/^\s*\d+\.\s+(.*$)/gm, '<li>$1</li>')
    
    // Wrap adjacent list items in <ul> or <ol>
    let inList = false;
    const lines = html.split('\n');
    html = lines.map((line, index) => {
      if (line.startsWith('<li>')) {
        if (!inList) {
          inList = true;
          // Check if it's a numbered list
          const nextLine = lines[index + 1];
          if (nextLine && /^\d+\./.test(nextLine)) {
            return '<ol>' + line;
          }
          return '<ul>' + line;
        }
        return line;
      } else if (inList) {
        inList = false;
        // Check the previous line to determine list type
        if (lines[index - 1].startsWith('<li>')) {
          if (/^\d+\./.test(lines[index - 1])) {
            return '</ol>' + line;
          }
          return '</ul>' + line;
        }
      }
      return line;
    }).join('\n');
    
    // If we're still in a list at the end
    if (inList) {
      html += '</ul>';
    }
      
    // Links and images
    html = html
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">$1</a>')
      .replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto my-2 rounded" />')
      
    // Blockquotes
    html = html.replace(/^>\s+(.*$)/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 italic my-2">$1</blockquote>')
      
    // Horizontal rules
    html = html.replace(/^---+$/gm, '<hr class="my-4 border-t border-gray-300" />')
      
    // Tables - basic support
    // Table regex matching
    const tableRegex = /^\|(.+)\|(\r?\n)\|( *:?-+:? *\|)+((\r?\n)\|(.+)\|)+/gm;
    
    html = html.replace(tableRegex, (match) => {
      const rows = match.split('\n').filter(row => row.trim() !== '');
      
      // Start table
      let table = '<table class="min-w-full border-collapse my-4"><thead>';
      
      // Process header (first row)
      const headers = rows[0].split('|').filter(cell => cell.trim() !== '');
      table += '<tr>';
      headers.forEach(header => {
        table += `<th class="border border-gray-300 px-4 py-2">${header.trim()}</th>`;
      });
      table += '</tr></thead><tbody>';
      
      // Skip the separator row (second row)
      // Process data rows (third row and beyond)
      for (let i = 2; i < rows.length; i++) {
        const cells = rows[i].split('|').filter(cell => cell.trim() !== '');
        table += '<tr>';
        cells.forEach(cell => {
          table += `<td class="border border-gray-300 px-4 py-2">${cell.trim()}</td>`;
        });
        table += '</tr>';
      }
      
      return table + '</tbody></table>';
    });
      
    // Line breaks
    html = html
      .replace(/\n\n/g, '</p><p class="my-2">')
      .replace(/\n/g, '<br />');

    // Wrap in paragraphs if not already wrapped
    html = '<p class="my-2">' + html + '</p>';
    
    // Fix any doubled paragraph tags
    html = html
      .replace(/<\/p><p class="my-2"><\/p><p class="my-2">/g, '</p><p class="my-2">')
      .replace(/<p class="my-2"><br \/><\/p>/g, '<br />');

    // Handle HTML tags that might be in the markdown
    // Allow some safe HTML tags but sanitize to prevent XSS
    const clean = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'a', 'ul', 'ol', 'li', 
                     'strong', 'em', 'del', 'img', 'code', 'pre', 'blockquote', 'hr', 
                     'table', 'thead', 'tbody', 'tr', 'th', 'td', 'div', 'span'],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'target', 'rel']
    });
      
    return { __html: clean };
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-2 border-b border-border bg-muted rounded-t-md">
        <span className="text-sm font-medium">Preview</span>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onToggleDarkMode}>
            {darkMode ? <Sun size={14} /> : <Moon size={14} />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Eye size={14} />
          </Button>
        </div>
      </div>
      <div className={cn(
        "flex-grow p-2 sm:p-6 overflow-auto bg-card rounded-b-md",
        darkMode ? "dark" : ""
      )}>
        <div className="max-w-3xl mx-auto">
          <div 
            className={cn(
              "markdown-body prose prose-sm sm:prose max-w-none",
              darkMode ? "prose-invert" : "",
              "prose-headings:font-bold prose-headings:text-foreground",
              "prose-p:text-muted-foreground prose-p:leading-relaxed",
              "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
              "prose-code:bg-muted prose-code:text-foreground prose-code:rounded prose-code:px-1",
              "prose-pre:bg-muted prose-pre:text-foreground prose-pre:rounded-md prose-pre:p-4",
              "prose-img:rounded-md prose-img:mx-auto",
              "prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground",
              "prose-ul:text-muted-foreground prose-ol:text-muted-foreground",
              "prose-li:my-0"
            )}
            dangerouslySetInnerHTML={createMarkup()} 
          />
        </div>
      </div>
    </div>
  );
};

export default Preview;
