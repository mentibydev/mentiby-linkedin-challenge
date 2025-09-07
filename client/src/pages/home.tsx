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
  Award, 
  Search, 
  Copy, 
  Plus, 
  UserPlus,
  CheckCircle,
  Rocket,
  Play,
  Check,
  ThumbsUp,
  Bug,
  Lightbulb,
  Mountain,
  Repeat2,
  Gift
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
  },
  {
    id: 9,
    title: "Before & After Understanding",
    category: "learning",
    template: "Before: I thought [concept] was just [initial understanding]. After: I now realize [deeper understanding]. This shift in perspective happened when [what triggered the realization]. It's amazing how learning changes our perspective! #learning #growth #perspectives",
    description: "Share how your understanding of a concept evolved."
  },
  {
    id: 10,
    title: "Mistake & Lesson Learned",
    category: "coding",
    template: "Made a classic mistake today: [describe mistake]. Spent [time] wondering why my code wasn't working, only to realize [what the issue was]. Lesson learned: [key takeaway]. Sometimes the smallest mistakes teach the biggest lessons! #mistakes #learning #coding",
    description: "Share a coding mistake and the lesson you learned from it."
  },
  {
    id: 11,
    title: "Peer Learning",
    category: "learning",
    template: "Shoutout to my amazing batchmate [name] who helped me understand [concept] today! Their explanation of [specific point] made everything click. This is why I love learning in a community - we all bring different perspectives. Who has been your biggest learning support? #peerlearning #community #grateful",
    description: "Mention how you learned something from a classmate or discussion."
  },
  {
    id: 12,
    title: "Daily Reflection",
    category: "motivation",
    template: "End of day reflection: Today I struggled with [challenge] but I learned [key insight]. What I'll do differently tomorrow: [improvement plan]. The journey isn't always smooth, but every struggle teaches us something valuable. #reflection #growth #learningjourne",
    description: "Share your end-of-day thoughts and plans for improvement."
  },
  {
    id: 13,
    title: "Mini Projects / Practice Updates",
    category: "project",
    template: "Just finished building [project name]! Key features: [2-3 features]. Technologies used: [tech stack]. Biggest challenge: [challenge faced]. Most proud of: [achievement]. Next step: [what's next]. Excited to keep building! #project #coding #building",
    description: "Share updates about your practice projects."
  },
  {
    id: 14,
    title: "Question to Audience",
    category: "learning",
    template: "Quick question for the developer community: [your question about a concept, best practice, or problem you're facing]. I've been thinking about [context/why you're asking]. Would love to hear different perspectives! #question #community #learning",
    description: "Ask a question to encourage engagement and learn from others."
  },
  {
    id: 15,
    title: "Journey Check-in",
    category: "motivation",
    template: "It's been [time period] since I started [journey/challenge]. Progress so far: [key improvements/achievements]. Biggest lesson learned: [main takeaway]. What I'm looking forward to next: [future goals]. The journey continues! #journey #progress #goals",
    description: "Share a milestone update about your learning journey."
  },
  {
    id: 16,
    title: "Analogy Learning",
    category: "learning",
    template: "Finally understood [concept] through this analogy: [your analogy]. Just like [real-life example], [technical concept] works by [explanation]. Sometimes the best way to grasp complex ideas is through simple comparisons! #analogies #learning #understanding",
    description: "Share a real-life analogy that helped you understand a concept."
  },
  {
    id: 17,
    title: "Favorite Concept of the Week",
    category: "learning",
    template: "This week's favorite discovery: [concept/technology]. What makes it awesome: [2-3 reasons]. How I'm planning to use it: [application ideas]. It's concepts like these that make me love programming even more! #weeklylearning #favorites #programming",
    description: "Highlight the most interesting thing you learned this week."
  },
  {
    id: 18,
    title: "Study Routine / Productivity Hacks",
    category: "motivation",
    template: "My current study routine that's working well: [describe your routine]. Key productivity hack: [specific tip]. What I've learned about effective learning: [insight]. Everyone's different, but this is what works for me! What's your go-to productivity tip? #productivity #studytips #routine",
    description: "Share your learning routine or productivity tips."
  },
  {
    id: 19,
    title: "Celebrating MentiBY Sessions",
    category: "learning",
    template: "Huge thanks to [instructor name] for today's session on [topic]! The way they explained [specific concept] made everything so clear. Key takeaways: [2-3 points]. Already excited to apply this in my practice. Grateful to be part of this learning community! #mentiby #grateful #learning",
    description: "Appreciate and share insights from your learning sessions."
  },
  {
    id: 20,
    title: "Did you know? Post",
    category: "learning",
    template: "Did you know? [interesting fact about programming/technology]. I discovered this while [context of discovery]. This changes how I think about [related concept]. What's the most surprising tech fact you've learned recently? #didyouknow #techfacts #learning",
    description: "Share an interesting fact or shortcut you discovered."
  },
  {
    id: 21,
    title: "Struggle Story",
    category: "motivation",
    template: "Honest confession: I've been struggling with [concept/problem] for [time period]. Today I tried [approach] and finally had a breakthrough! What made the difference: [key insight]. Sometimes persistence really does pay off. To anyone struggling with something similar - keep going! #struggle #breakthrough #persistence",
    description: "Share something challenging that you kept working on."
  },
  {
    id: 22,
    title: "Collaboration Wins",
    category: "motivation",
    template: "Collaboration win! Worked with [teammate/classmate] today on [task/problem]. Their perspective on [specific aspect] combined with my approach to [another aspect] led to a much better solution. Two minds really are better than one! #collaboration #teamwork #learning",
    description: "Share a positive collaborative experience."
  },
  {
    id: 23,
    title: "Mini-Notes / Tips",
    category: "coding",
    template: "Quick tip: [your programming tip]. This small change can [benefit/improvement]. I wish I had known this when I started! What's your favorite programming tip that you'd share with beginners? #tips #programming #bestpractices",
    description: "Share a useful programming tip or code snippet."
  },
  {
    id: 24,
    title: "Reflection on Past Mistakes",
    category: "learning",
    template: "Looking back at my early code, I used to [bad practice/mistake]. Now I understand why [correct approach] is better because [explanation]. It's amazing how much perspective changes with experience! What past mistake taught you the most? #reflection #growth #experience",
    description: "Reflect on how your understanding has improved over time."
  },
  {
    id: 25,
    title: "Motivational Post",
    category: "motivation",
    template: "Remember when [coding/learning] felt impossible? I do. But here I am [current achievement/progress]. The journey isn't always linear, but every small step counts. To everyone starting their coding journey - you've got this! #motivation #journey #coding",
    description: "Share an encouraging message for fellow learners."
  },
  {
    id: 26,
    title: "Appreciation Post",
    category: "motivation",
    template: "Huge appreciation for [mentor/peer/instructor] who [specific help they provided]. Their [guidance/explanation/support] made all the difference in understanding [concept/solving problem]. Grateful for mentors who take time to help others grow! #appreciation #mentorship #grateful",
    description: "Thank someone who helped you learn or grow."
  },
  {
    id: 27,
    title: "First-Time Experiences",
    category: "project",
    template: "First time [achievement - e.g., deploying an API, using a framework, solving a complex problem]! The feeling of [describe the emotion] when it finally worked was incredible. What made this possible: [key learnings/tools]. Can't wait for the next first! #firsttime #milestone #achievement",
    description: "Celebrate a significant first-time achievement."
  }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredPosts, setFilteredPosts] = useState(samplePosts);
  const [streak, setStreak] = useState(0);
  const [connections, setConnections] = useState(0);
  const [engagement, setEngagement] = useState(0);
  const [dailyConnectionGoal, setDailyConnectionGoal] = useState(0);
  const [dailyEngagementGoal, setDailyEngagementGoal] = useState(0);
  const [hasPostedToday, setHasPostedToday] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let filtered = samplePosts;
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.template.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory]);

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

  const incrementStreak = () => {
    setStreak(prev => prev + 1);
    setHasPostedToday(true);
    toast({
      title: "Great job! 🎉",
      description: "Your posting streak has been updated!",
    });
  };

  const incrementConnections = () => {
    setConnections(prev => prev + 1);
    setDailyConnectionGoal(prev => prev + 1);
    toast({
      title: "Connection added!",
      description: "Keep building your professional network!",
    });
  };

  const incrementEngagement = () => {
    setEngagement(prev => prev + 1);
    setDailyEngagementGoal(prev => prev + 1);
    toast({
      title: "Engagement tracked!",
      description: "Great job staying active in the community!",
    });
  };

  const categories = [
    { id: "all", label: "All" },
    { id: "learning", label: "Learning" },
    { id: "coding", label: "Coding" },
    { id: "motivation", label: "Motivation" },
    { id: "project", label: "Project" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="bg-card shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">Li</span>
              </div>
              <span className="text-xl font-bold text-foreground">LinkedIn Challenge</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#rules" className="text-muted-foreground hover:text-primary transition-colors">Rules</a>
              <a href="#samples" className="text-muted-foreground hover:text-primary transition-colors">Sample Posts</a>
              <a href="#progress" className="text-muted-foreground hover:text-primary transition-colors">Progress</a>
              <Button data-testid="button-get-started">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gradient-bg py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Transform Your Professional Presence
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Join the daily LinkedIn challenge and build a strong professional network. Share your learning journey, connect with industry professionals, and unlock career opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-card hover:bg-secondary text-foreground shadow-lg" data-testid="button-start-challenge">
                <Rocket className="mr-2 h-4 w-4" />
                Start Challenge
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" data-testid="button-learn-more">
                <Play className="mr-2 h-4 w-4" />
                Learn More
              </Button>
            </div>
            <div className="mt-12 text-primary-foreground/80">
              <p className="text-sm">Challenge starts: <span className="font-semibold">September 7, 2025</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Overview */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Challenge Overview</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive program designed to help students build their professional presence on LinkedIn through consistent posting and networking.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Daily Commitment</h3>
              <p className="text-muted-foreground">Post one meaningful update every day to maintain your learning streak</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Network Building</h3>
              <p className="text-muted-foreground">Connect with 5+ professionals daily to expand your network</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Recognition</h3>
              <p className="text-muted-foreground">Best posts get featured on MentiBY's page for extra visibility</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section id="rules" className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Challenge Rules</h2>
            <p className="text-muted-foreground">Follow these simple rules to maximize your success</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Rule 1: Daily Posting */}
            <Card className="p-8 card-hover">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Edit className="text-primary h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-3">1️⃣ Daily Posting Rule</h3>
                    <p className="text-muted-foreground mb-4">Every student must post 1 update daily on LinkedIn.</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Check className="text-primary h-4 w-4" />
                        <span className="text-sm text-foreground">What you learned in class/session/project</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="text-primary h-4 w-4" />
                        <span className="text-sm text-foreground">A coding problem you solved</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="text-primary h-4 w-4" />
                        <span className="text-sm text-foreground">An error/bug you faced and solved</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Check className="text-primary h-4 w-4" />
                        <span className="text-sm text-foreground">Motivational/consistency updates</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                      <p className="text-sm text-primary font-medium">💡 Consistency is key. Even a short post is fine!</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rule 2: Engagement */}
            <Card className="p-8 card-hover">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="text-primary h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-3">2️⃣ Engagement Rule</h3>
                    <p className="text-muted-foreground mb-4">Connect with at least 5 seniors or industry professionals daily.</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <ThumbsUp className="text-primary h-4 w-4" />
                        <span className="text-sm text-foreground">Like and comment on seniors' posts</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <UserPlus className="text-primary h-4 w-4" />
                        <span className="text-sm text-foreground">Send personalized connection requests</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-secondary rounded-lg">
                      <p className="text-sm text-secondary-foreground font-medium">Example message:</p>
                      <p className="text-sm text-secondary-foreground italic">"Hi, I'm currently learning at MentiBY. Would love to connect and learn from your journey."</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rule 3: Sample Posts */}
            <Card className="p-8 card-hover">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="text-primary h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-3">3️⃣ Sample Posts Document</h3>
                    <p className="text-muted-foreground mb-4">Access ready-made ideas for your daily posts when you're stuck.</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Bug className="text-primary h-4 w-4" />
                        <span className="text-sm text-foreground">"Error faced & solved" posts</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Lightbulb className="text-primary h-4 w-4" />
                        <span className="text-sm text-foreground">"Today I learned..." updates</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mountain className="text-primary h-4 w-4" />
                        <span className="text-sm text-foreground">"I thought I couldn't solve it" stories</span>
                      </div>
                    </div>
                    <Button className="mt-4" size="sm" data-testid="button-browse-samples">
                      Browse Sample Ideas
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rule 4: Rewards */}
            <Card className="p-8 card-hover">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="text-primary h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-3">4️⃣ Rewards & Recognition</h3>
                    <p className="text-muted-foreground mb-4">Outstanding contributions get extra visibility and rewards.</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Repeat2 className="text-primary h-4 w-4" />
                        <span className="text-sm text-foreground">Best posts reposted from MentiBY's page</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Gift className="text-primary h-4 w-4" />
                        <span className="text-sm text-foreground">Special rewards for consistent contributors</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-green-700 font-medium">🌟 Your posts could reach thousands of professionals!</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Posts Section */}
      <section id="samples" className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">27 Sample Post Ideas</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Never run out of content ideas! Browse our curated collection of post templates and copy them to your clipboard.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="max-w-md mx-auto relative mb-4">
              <Input
                type="text"
                placeholder="Search post ideas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12"
                data-testid="input-search-posts"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
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

          {/* Sample Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="p-6 card-hover" data-testid={`card-post-${post.id}`}>
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
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-foreground font-mono leading-relaxed">{post.template}</p>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(post.template)}
                    className="mt-4 w-full"
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

      {/* Progress Tracking Section */}
      <section id="progress" className="py-16 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Track Your Progress</h2>
            <p className="text-muted-foreground">Monitor your daily posting streak and networking activities</p>
          </div>

          <Card className="p-8">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600" data-testid="text-streak-counter">{streak}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Current Streak</h3>
                  <p className="text-muted-foreground text-sm">Days of consistent posting</p>
                  <Button
                    onClick={incrementStreak}
                    className="mt-3 bg-green-600 hover:bg-green-700"
                    size="sm"
                    data-testid="button-mark-post"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Mark Today's Post
                  </Button>
                </div>

                <div className="text-center">
                  <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600" data-testid="text-connections-counter">{connections}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">New Connections</h3>
                  <p className="text-muted-foreground text-sm">Total connections made</p>
                  <Button
                    onClick={incrementConnections}
                    className="mt-3 bg-blue-600 hover:bg-blue-700"
                    size="sm"
                    data-testid="button-add-connection"
                  >
                    <UserPlus className="mr-1 h-4 w-4" />
                    Add Connection
                  </Button>
                </div>

                <div className="text-center">
                  <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600" data-testid="text-engagement-counter">{engagement}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Engagements</h3>
                  <p className="text-muted-foreground text-sm">Likes & comments given</p>
                  <Button
                    onClick={incrementEngagement}
                    className="mt-3 bg-purple-600 hover:bg-purple-700"
                    size="sm"
                    data-testid="button-add-engagement"
                  >
                    <Heart className="mr-1 h-4 w-4" />
                    Add Engagement
                  </Button>
                </div>
              </div>

              <div className="mt-8 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Today's Goal</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Daily Post</span>
                    <span className={`text-sm ${hasPostedToday ? 'text-green-600' : 'text-muted-foreground'}`} data-testid="status-post">
                      {hasPostedToday ? 'Completed ✓' : 'Pending'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">5 New Connections</span>
                    <span className={`text-sm ${dailyConnectionGoal >= 5 ? 'text-green-600' : 'text-muted-foreground'}`} data-testid="progress-connections">
                      {dailyConnectionGoal}/5
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Engage with 5 Posts</span>
                    <span className={`text-sm ${dailyEngagementGoal >= 5 ? 'text-green-600' : 'text-muted-foreground'}`} data-testid="progress-engagement">
                      {dailyEngagementGoal}/5
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">Ready to Transform Your Career?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Join thousands of students who are building their professional presence on LinkedIn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-card hover:bg-secondary text-foreground shadow-lg" data-testid="button-start-today">
              <Rocket className="mr-2 h-4 w-4" />
              Start Your Challenge Today
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" data-testid="button-connect-mentiby">
              Connect with MentiBY
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Li</span>
                </div>
                <span className="text-lg font-bold text-foreground">LinkedIn Challenge</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Empowering students to build strong professional networks and advance their careers through consistent LinkedIn engagement.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Sample Posts</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">LinkedIn Tips</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Networking Guide</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">MentiBY</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Courses</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Mentorship</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              © 2025 MentiBY LinkedIn Challenge. All rights reserved. Transform your professional presence today.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
