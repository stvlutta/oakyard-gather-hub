import { useState } from 'react';
import { MessageSquare, Users, Pin, ThumbsUp, Eye, Clock, Plus, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Forum = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    {
      id: 'general',
      name: 'General Discussion',
      description: 'General topics about workspace sharing and community',
      posts: 234,
      members: 1250,
      color: 'bg-blue-500'
    },
    {
      id: 'space-owners',
      name: 'Space Owners',
      description: 'Tips and discussions for space owners',
      posts: 189,
      members: 567,
      color: 'bg-green-500'
    },
    {
      id: 'booking-help',
      name: 'Booking Help',
      description: 'Get help with bookings and reservations',
      posts: 156,
      members: 890,
      color: 'bg-yellow-500'
    },
    {
      id: 'feature-requests',
      name: 'Feature Requests',
      description: 'Suggest new features and improvements',
      posts: 78,
      members: 432,
      color: 'bg-purple-500'
    },
    {
      id: 'success-stories',
      name: 'Success Stories',
      description: 'Share your positive experiences',
      posts: 92,
      members: 678,
      color: 'bg-pink-500'
    }
  ];

  const topics = [
    {
      id: 1,
      title: 'Best practices for photographing your space',
      category: 'Space Owners',
      author: 'Sarah Johnson',
      avatar: 'SJ',
      replies: 24,
      views: 456,
      likes: 18,
      lastActivity: '2 hours ago',
      isPinned: true,
      isHot: true
    },
    {
      id: 2,
      title: 'How to handle difficult guests?',
      category: 'Space Owners',
      author: 'Mike Chen',
      avatar: 'MC',
      replies: 31,
      views: 678,
      likes: 22,
      lastActivity: '4 hours ago',
      isPinned: false,
      isHot: true
    },
    {
      id: 3,
      title: 'Payment processing delays - anyone else experiencing this?',
      category: 'Booking Help',
      author: 'Emily Rodriguez',
      avatar: 'ER',
      replies: 15,
      views: 234,
      likes: 8,
      lastActivity: '6 hours ago',
      isPinned: false,
      isHot: false
    },
    {
      id: 4,
      title: 'Request: Dark mode for the app',
      category: 'Feature Requests',
      author: 'David Kim',
      avatar: 'DK',
      replies: 45,
      views: 890,
      likes: 67,
      lastActivity: '1 day ago',
      isPinned: false,
      isHot: true
    },
    {
      id: 5,
      title: 'Amazing experience at Creative Studio downtown!',
      category: 'Success Stories',
      author: 'Lisa Wang',
      avatar: 'LW',
      replies: 12,
      views: 345,
      likes: 28,
      lastActivity: '1 day ago',
      isPinned: false,
      isHot: false
    },
    {
      id: 6,
      title: 'Tips for new users - Getting started guide',
      category: 'General Discussion',
      author: 'Alex Thompson',
      avatar: 'AT',
      replies: 89,
      views: 1234,
      likes: 156,
      lastActivity: '2 days ago',
      isPinned: true,
      isHot: false
    }
  ];

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalPosts: 749,
    totalMembers: 3817,
    activeToday: 234,
    onlineNow: 89
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Community 
            <span className="bg-gradient-accent bg-clip-text text-transparent"> Forum</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Connect with the Oakyard community, share experiences, and get help from fellow users.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>
          
          <Button size="lg">
            <Plus className="h-5 w-5 mr-2" />
            Start New Topic
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{stats.totalPosts}</div>
              <div className="text-sm text-muted-foreground">Total Posts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{stats.totalMembers}</div>
              <div className="text-sm text-muted-foreground">Members</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{stats.activeToday}</div>
              <div className="text-sm text-muted-foreground">Active Today</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{stats.onlineNow}</div>
              <div className="text-sm text-muted-foreground">Online Now</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="discussions" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="discussions">Recent Discussions</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
            </TabsList>
            
            <TabsContent value="discussions" className="mt-6">
              <div className="space-y-4">
                {filteredTopics.map((topic) => (
                  <Card key={topic.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                          {topic.avatar}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {topic.isPinned && (
                              <Badge variant="secondary">
                                <Pin className="h-3 w-3 mr-1" />
                                Pinned
                              </Badge>
                            )}
                            {topic.isHot && (
                              <Badge variant="destructive">Hot</Badge>
                            )}
                            <Badge variant="outline">{topic.category}</Badge>
                          </div>
                          
                          <h3 className="text-lg font-semibold mb-2 hover:text-primary cursor-pointer">
                            {topic.title}
                          </h3>
                          
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>by {topic.author}</span>
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{topic.replies}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                              <span>{topic.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <ThumbsUp className="h-4 w-4" />
                              <span>{topic.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{topic.lastActivity}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="categories" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className={`h-10 w-10 rounded-lg ${category.color} flex items-center justify-center`}>
                          <MessageSquare className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{category.name}</CardTitle>
                          <CardDescription>{category.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{category.posts} posts</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{category.members} members</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Community Guidelines</h2>
            <p className="text-muted-foreground mb-8">
              Please follow these guidelines to keep our community friendly and helpful.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Be Respectful</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Treat all community members with respect and courtesy. No harassment or discrimination.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Stay On Topic</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Keep discussions relevant to the category and avoid spam or off-topic content.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Help Others</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Share your knowledge and help fellow community members with their questions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Forum;