
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { User, Code, Briefcase, GraduationCap, Languages, Github, Globe, MapPin } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { generateProfileReadme } from '@/utils/markdownHelpers';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  location: z.string().optional(),
  website: z.string().url('Please enter a valid URL').or(z.string().length(0)),
  github: z.string(),
  skills: z.string(),
  learning: z.string(),
  projects: z.string(),
  funFact: z.string().optional(),
  languages: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ProfileFormProps {
  onGenerateMarkdown: (markdown: string) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onGenerateMarkdown }) => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      title: '',
      bio: '',
      location: '',
      website: '',
      github: '',
      skills: '',
      learning: '',
      projects: '',
      funFact: '',
      languages: '',
    },
  });
  
  const onSubmit = (data: FormValues) => {
    try {
      // Format skills, learning, and projects as arrays
      const skillsArray = data.skills.split(',').map(skill => skill.trim());
      const learningArray = data.learning.split(',').map(item => item.trim());
      const projectsArray = data.projects.split(',').map(project => project.trim());
      const languagesArray = data.languages ? data.languages.split(',').map(lang => lang.trim()) : [];
      
      // Generate the markdown
      const markdown = generateProfileReadme({
        name: data.name,
        title: data.title,
        bio: data.bio,
        location: data.location,
        website: data.website,
        github: data.github,
        skills: skillsArray,
        learning: learningArray,
        projects: projectsArray,
        funFact: data.funFact,
        languages: languagesArray,
      });
      
      // Pass the markdown to the parent component
      onGenerateMarkdown(markdown);
      
      toast({
        title: "README generated!",
        description: "Your profile markdown has been created.",
      });
    } catch (error) {
      toast({
        title: "Error generating README",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      console.error("Error generating README:", error);
    }
  };

  return (
    <div className="p-6 border border-border rounded-lg bg-card">
      <h2 className="text-xl font-bold mb-4">Create Your GitHub Profile</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Fill in the details below to generate your personalized GitHub profile README.
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <User size={18} className="text-primary" />
              <h3 className="font-medium">Basic Information</h3>
            </div>
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jude Otine" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Full-Stack Developer | Open Source Enthusiast" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="A passionate developer who loves to build things with code..."
                      className="min-h-24"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <MapPin size={16} className="text-muted-foreground mr-2" />
                        <Input placeholder="Uganda" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="languages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Languages Spoken</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Languages size={16} className="text-muted-foreground mr-2" />
                        <Input placeholder="English, Swahili (comma-separated)" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Links & Social */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Globe size={18} className="text-primary" />
              <h3 className="font-medium">Links & Social</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://judeotine.vercel.app" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub Username</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Github size={16} className="text-muted-foreground mr-2" />
                        <Input placeholder="judeotine" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Skills & Experience */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Code size={18} className="text-primary" />
              <h3 className="font-medium">Skills & Experience</h3>
            </div>
            
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills & Technologies</FormLabel>
                  <FormControl>
                    <Input placeholder="JavaScript, React, Node.js (comma-separated)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="learning"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currently Learning</FormLabel>
                  <FormControl>
                    <Input placeholder="TypeScript, GraphQL (comma-separated)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Projects & Fun Facts */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase size={18} className="text-primary" />
              <h3 className="font-medium">Projects & Personal</h3>
            </div>
            
            <FormField
              control={form.control}
              name="projects"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured Projects</FormLabel>
                  <FormControl>
                    <Input placeholder="MarkMagic, Project2 (comma-separated)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="funFact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fun Fact About You</FormLabel>
                  <FormControl>
                    <Input placeholder="I can solve a Rubik's cube in under a minute!" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Button type="submit" className="bg-magic-primary hover:bg-magic-primary/90 w-full">
            Generate GitHub Profile README
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
