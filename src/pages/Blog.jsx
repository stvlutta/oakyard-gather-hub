import { useState } from 'react';
import { Calendar, User, Clock, Tag, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Workspace Sharing: Trends to Watch in 2025',
      excerpt: 'Discover the emerging trends shaping the future of workspace sharing and how they impact businesses and individuals.',
      author: 'Sarah Johnson',
      date: 'January 15, 2025',
      readTime: '5 min read',
      category: 'Industry Insights',
      image: '/api/placeholder/400/250',
      tags: ['workspace', 'trends', 'future', 'business']
    },
    {
      id: 2,
      title: 'How to Optimize Your Space Listing for Maximum Bookings',
      excerpt: 'Learn the best practices for creating compelling space listings that attract more bookings and higher rates.',
      author: 'Mike Chen',
      date: 'January 12, 2025',
      readTime: '7 min read',
      category: 'Tips & Guides',
      image: '/api/placeholder/400/250',
      tags: ['listing', 'optimization', 'bookings', 'tips']
    },
    {
      id: 3,
      title: 'Building Community Through Shared Spaces',
      excerpt: 'Explore how shared workspaces are fostering stronger communities and creating meaningful connections.',
      author: 'Emily Rodriguez',
      date: 'January 10, 2025',
      readTime: '6 min read',
      category: 'Community',
      image: '/api/placeholder/400/250',
      tags: ['community', 'networking', 'collaboration', 'spaces']
    },
    {
      id: 4,
      title: 'Security Best Practices for Space Owners',
      excerpt: 'Essential security measures every space owner should implement to protect their property and guests.',
      author: 'David Kim',
      date: 'January 8, 2025',
      readTime: '8 min read',
      category: 'Security',
      image: '/api/placeholder/400/250',
      tags: ['security', 'safety', 'owners', 'protection']
    },
    {
      id: 5,
      title: 'The Economics of Space Sharing: A Deep Dive',
      excerpt: 'Understanding the economic impact and benefits of the space sharing economy for all participants.',
      author: 'Lisa Wang',
      date: 'January 5, 2025',
      readTime: '10 min read',
      category: 'Economics',
      image: '/api/placeholder/400/250',
      tags: ['economics', 'sharing economy', 'analysis', 'impact']
    },
    {
      id: 6,
      title: 'Creating Instagram-Worthy Spaces: Design Tips',
      excerpt: 'Transform your space into a visually appealing environment that attracts social media savvy users.',
      author: 'Alex Thompson',
      date: 'January 3, 2025',
      readTime: '5 min read',
      category: 'Design',
      image: '/api/placeholder/400/250',
      tags: ['design', 'instagram', 'aesthetics', 'social media']
    }
  ];

  const categories = [
    'All Posts',
    'Industry Insights', 
    'Tips & Guides',
    'Community',
    'Security',
    'Economics',
    'Design'
  ];

  const [selectedCategory, setSelectedCategory] = useState('All Posts');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Posts' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            The Oakyard 
            <span className="bg-gradient-accent bg-clip-text text-transparent"> Blog</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Insights, tips, and stories from the world of workspace sharing and community building.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12"
            />
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Featured Article</Badge>
            <h2 className="text-3xl font-bold mb-4">Latest Insights</h2>
          </div>
          
          <Card className="max-w-4xl mx-auto overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <Badge variant="outline" className="mb-4">
                  {featuredPost.category}
                </Badge>
                <h3 className="text-2xl font-bold mb-4">{featuredPost.title}</h3>
                <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                
                <Button>
                  Read More
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="mb-2"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="p-0">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline">{post.category}</Badge>
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  </div>
                  
                  <CardTitle className="text-lg mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  
                  <CardDescription className="mb-4 line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No posts found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to get the latest insights and updates from the Oakyard community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input 
              placeholder="Enter your email" 
              className="bg-background text-foreground"
            />
            <Button variant="secondary">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;