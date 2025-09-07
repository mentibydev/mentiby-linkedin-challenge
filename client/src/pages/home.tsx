import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Users, 
  Trophy, 
  Edit, 
  Heart, 
  FileText, 
  Copy, 
  Check,
  ArrowRight,
  BookOpen,
  Target,
  Star,
  ThumbsUp,
  UserPlus,
  Award,
  Lightbulb
} from "lucide-react";

interface SamplePost {
  id: number;
  title: string;
  category: string;
  template: string;
  description: string;
}

const samplePosts: SamplePost[] = [
  {
    id: 1,
    title: "Error Faced & Solved",
    category: "coding",
    template: "Today I encountered a frustrating [error type] while working on [project/task]. After [time spent] of debugging, I discovered the issue was [root cause]. Here's how I solved it: [solution]. Key takeaway: [lesson learned]. #coding #debugging #learning",
    description: "Share a bug or error you faced, how you debugged it, and the final solution."
  },
  {
    id: 2,
    title: "I thought I couldn't solve it, but I did",
    category: "motivation",
    template: "This morning I looked at [problem/challenge] and honestly thought it was beyond my current skill level. But I decided to break it down step by step: [approach]. After [time/effort], I finally cracked it! The solution was [brief explanation]. Sometimes the best growth happens when we push beyond our comfort zone. #perseverance #problemsolving #growth",
    description: "Share a tough coding challenge you managed to crack after multiple attempts."
  },
  {
    id: 3,
    title: "Today I learned",
    category: "learning",
    template: "Today I learned about [concept/technology] and it completely changed how I think about [related area]. Key insights: [2-3 bullet points]. I'm excited to apply this in my next [project/assignment]. What's the most mind-blowing concept you've learned recently? #todayilearned #[technology] #continuouslearning",
    description: "Share any new concept you learned in Java, DSA, or projects."
  },
  {
    id: 4,
    title: "Coding Problem of the Day",
    category: "coding",
    template: "Solved today's [LeetCode/GFG] problem: [problem name]. My approach: [brief explanation of solution]. Time complexity: O([complexity]). The key insight was [main learning point]. This problem taught me [lesson learned]. #algorithms #datastructures #problemsolving",
    description: "Post the LeetCode/GFG problem you solved, your approach, and what you learned."
  },
  {
    id: 5,
    title: "Small Wins",
    category: "motivation",
    template: "Small wins deserve celebration! Today I [achievement - e.g., completed first project module, fixed a persistent bug, understood a complex concept]. It might seem small, but every step forward counts in this learning journey. What small win are you celebrating today? #smallwins #progress #motivation",
    description: "Share small achievements like completing a project module or fixing a bug."
  },
  {
    id: 6,
    title: "Learning from Sessions",
    category: "learning",
    template: "Today's MentiBY session on [topic] by [instructor name] was incredibly insightful! Key takeaways: [2-3 main points]. I especially loved the explanation of [specific concept]. Already planning to implement [what you'll apply] in my practice. Grateful for such quality education! #mentiby #learning #grateful",
    description: "Write about what you understood from today's session."
  },
  {
    id: 7,
    title: "Motivation / Consistency Updates",
    category: "motivation",
    template: "Day [number] of my LinkedIn learning challenge. Some days are harder than others, but showing up consistently is what makes the difference. Today I focused on [what you worked on] and I can already see [progress/improvement]. Consistency > perfection. #consistency #learninginpublic #motivation",
    description: "Share updates about maintaining consistency in your learning journey."
  },
  {
    id: 8,
    title: "Sharing Resources",
    category: "learning",
    template: "Found an amazing resource today: [resource name/link]. It helped me understand [concept] much better. Key points that clicked for me: [2-3 insights]. If you're struggling with [topic], definitely check this out! What resources have been game-changers in your learning? #resources #learning #sharing",
    description: "Share a helpful tutorial, blog, or documentation you used."
  }
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredPosts, setFilteredPosts] = useState(samplePosts);
  const { toast } = useToast();

  useEffect(() => {
    let filtered = samplePosts;
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    setFilteredPosts(filtered);
  }, [selectedCategory]);

  const copyToClipboard = async (template: string) => {
    try {
      await navigator.clipboard.writeText(template);
      toast({
        title: "Copied to clipboard!",
        description: "The post template has been copied successfully.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please try again or copy manually.",
        variant: "destructive",
      });
    }
  };

  const categories = [
    { id: "all", label: "All" },
    { id: "learning", label: "Learning" },
    { id: "coding", label: "Coding" },
    { id: "motivation", label: "Motivation" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-background/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LC</span>
              </div>
              <span className="text-xl font-bold text-foreground">LinkedIn Challenge</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#rules" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Rules</a>
              <a href="#templates" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Templates</a>
              <Button size="sm" data-testid="button-get-started">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight">
              LinkedIn Challenge
            </h1>
            <p className="text-2xl sm:text-3xl text-muted-foreground mb-6 font-light">
              Build your LinkedIn presence and get noticed by employers
            </p>
            <p className="text-lg text-muted-foreground/80 mb-12 max-w-2xl mx-auto">
              Daily posting challenge for CS students at MentiBY
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="h-14 px-8 text-lg" data-testid="button-start-challenge">
                Start Challenge
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg" data-testid="button-view-templates">
                View Templates
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* Rules Section */}
      <section id="rules" className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Challenge Rules</h2>
            <p className="text-muted-foreground">Simple guidelines to maximize your success</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Rule 1: Daily Posting */}
            <Card className="p-6 border-l-4 border-l-primary">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Edit className="text-primary h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-3">1️⃣ Daily Posting</h3>
                    <p className="text-muted-foreground mb-4">Post 1 update daily on LinkedIn</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Check className="text-primary h-4 w-4" />
                        <span className="text-sm text-foreground">What you learned in class/project</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="text-primary h-4 w-4" />
                        <span className="text-sm text-foreground">A coding problem you solved</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="text-primary h-4 w-4" />
                        <span className="text-sm text-foreground">An error/bug you faced and solved</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rule 2: Engagement */}
            <Card className="p-6 border-l-4 border-l-primary">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="text-primary h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-3">2️⃣ Engagement</h3>
                    <p className="text-muted-foreground mb-4">Connect with 5+ professionals daily</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <ThumbsUp className="text-primary h-4 w-4" />
                        <span className="text-sm text-foreground">Like and comment on posts</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <UserPlus className="text-primary h-4 w-4" />
                        <span className="text-sm text-foreground">Send personalized connection requests</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rule 3: Sample Posts */}
            <Card className="p-6 border-l-4 border-l-primary">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="text-primary h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-3">3️⃣ Sample Posts</h3>
                    <p className="text-muted-foreground mb-4">Use ready-made templates when stuck</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Lightbulb className="text-primary h-4 w-4" />
                        <span className="text-sm text-foreground">"Today I learned..." updates</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="text-primary h-4 w-4" />
                        <span className="text-sm text-foreground">"Error faced & solved" posts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rule 4: Rewards */}
            <Card className="p-6 border-l-4 border-l-primary">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="text-primary h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-3">4️⃣ Rewards</h3>
                    <p className="text-muted-foreground mb-4">Outstanding posts get recognition</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Star className="text-primary h-4 w-4" />
                        <span className="text-sm text-foreground">Featured on MentiBY's page</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Trophy className="text-primary h-4 w-4" />
                        <span className="text-sm text-foreground">Special rewards for consistency</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Post Templates</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Never run out of content ideas! Browse our curated collection and copy templates to your clipboard.
            </p>
          </div>

          {/* Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="rounded-full"
                  data-testid={`filter-${category.id}`}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow" data-testid={`card-post-${post.id}`}>
                <CardContent className="p-0">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{post.title}</h3>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {post.category}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(post.template)}
                      className="text-muted-foreground hover:text-primary"
                      data-testid={`button-copy-${post.id}`}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{post.description}</p>
                  <div className="bg-muted p-4 rounded-lg mb-4">
                    <p className="text-sm text-foreground font-mono leading-relaxed">{post.template}</p>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(post.template)}
                    className="w-full"
                    size="sm"
                    data-testid={`button-copy-template-${post.id}`}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join students who are building their professional presence on LinkedIn
          </p>
          <Button size="lg" variant="secondary" className="h-14 px-8 text-lg" data-testid="button-start-today">
            Start Your Challenge Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LC</span>
              </div>
              <span className="text-lg font-bold text-foreground">LinkedIn Challenge</span>
            </div>
            <p className="text-muted-foreground text-sm text-center md:text-right">
              © 2025 MentiBY LinkedIn Challenge. Empowering students to build professional networks.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}