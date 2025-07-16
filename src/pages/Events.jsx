import { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Tag, Filter, Plus, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const events = [
    {
      id: 1,
      title: 'Workspace Design Workshop',
      description: 'Learn how to create Instagram-worthy spaces that attract more bookings and higher rates.',
      date: '2025-01-25',
      time: '10:00 AM - 12:00 PM',
      location: 'Virtual Event',
      type: 'workshop',
      category: 'Education',
      attendees: 45,
      maxAttendees: 100,
      image: '/api/placeholder/400/250',
      organizer: 'Sarah Johnson',
      price: 'Free',
      tags: ['design', 'workshop', 'tips']
    },
    {
      id: 2,
      title: 'Oakyard Community Meetup - Nairobi',
      description: 'Connect with local space owners and renters in our monthly networking event.',
      date: '2025-01-28',
      time: '6:00 PM - 9:00 PM',
      location: 'Creative Hub, Nairobi',
      type: 'meetup',
      category: 'Networking',
      attendees: 23,
      maxAttendees: 50,
      image: '/api/placeholder/400/250',
      organizer: 'Mike Chen',
      price: 'Free',
      tags: ['networking', 'meetup', 'nairobi']
    },
    {
      id: 3,
      title: 'Space Photography Masterclass',
      description: 'Professional photographer shares secrets for capturing stunning space photos.',
      date: '2025-02-02',
      time: '2:00 PM - 4:00 PM',
      location: 'Virtual Event',
      type: 'masterclass',
      category: 'Education',
      attendees: 78,
      maxAttendees: 150,
      image: '/api/placeholder/400/250',
      organizer: 'Emily Rodriguez',
      price: '$29',
      tags: ['photography', 'masterclass', 'skills']
    },
    {
      id: 4,
      title: 'Future of Workspace Sharing Summit',
      description: 'Industry leaders discuss trends and innovations in the workspace sharing economy.',
      date: '2025-02-15',
      time: '9:00 AM - 5:00 PM',
      location: 'Conference Center, Nairobi',
      type: 'conference',
      category: 'Conference',
      attendees: 156,
      maxAttendees: 300,
      image: '/api/placeholder/400/250',
      organizer: 'David Kim',
      price: '$99',
      tags: ['conference', 'industry', 'trends']
    },
    {
      id: 5,
      title: 'Space Owner Success Stories',
      description: 'Hear from successful space owners about their journey and lessons learned.',
      date: '2025-02-20',
      time: '7:00 PM - 8:30 PM',
      location: 'Virtual Event',
      type: 'webinar',
      category: 'Success Stories',
      attendees: 34,
      maxAttendees: 200,
      image: '/api/placeholder/400/250',
      organizer: 'Lisa Wang',
      price: 'Free',
      tags: ['success', 'stories', 'inspiration']
    },
    {
      id: 6,
      title: 'Community Volunteer Day',
      description: 'Join us in giving back to the community by helping local organizations set up their spaces.',
      date: '2025-02-25',
      time: '9:00 AM - 3:00 PM',
      location: 'Various Locations, Nairobi',
      type: 'volunteer',
      category: 'Community Service',
      attendees: 28,
      maxAttendees: 40,
      image: '/api/placeholder/400/250',
      organizer: 'Alex Thompson',
      price: 'Free',
      tags: ['volunteer', 'community', 'service']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Events', count: events.length },
    { id: 'education', name: 'Education', count: events.filter(e => e.category === 'Education').length },
    { id: 'networking', name: 'Networking', count: events.filter(e => e.category === 'Networking').length },
    { id: 'conference', name: 'Conferences', count: events.filter(e => e.category === 'Conference').length },
    { id: 'community', name: 'Community', count: events.filter(e => e.category === 'Community Service').length }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           event.category.toLowerCase().includes(selectedCategory) ||
                           (selectedCategory === 'community' && event.category === 'Community Service');
    return matchesSearch && matchesCategory;
  });

  const upcomingEvents = filteredEvents.filter(event => new Date(event.date) > new Date());
  const pastEvents = filteredEvents.filter(event => new Date(event.date) <= new Date());

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'workshop': return 'bg-blue-500';
      case 'meetup': return 'bg-green-500';
      case 'masterclass': return 'bg-purple-500';
      case 'conference': return 'bg-red-500';
      case 'webinar': return 'bg-yellow-500';
      case 'volunteer': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const EventCard = ({ event }) => (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardHeader className="p-0">
        <div className="relative">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-4 left-4">
            <Badge className={`${getEventTypeColor(event.type)} text-white`}>
              {event.type}
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-background/90">
              {event.price}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
            {event.title}
          </h3>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>{event.attendees}/{event.maxAttendees} attendees</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {event.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            by {event.organizer}
          </span>
          <Button size="sm">
            {event.price === 'Free' ? 'Register' : 'Buy Ticket'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Community 
            <span className="bg-gradient-accent bg-clip-text text-transparent"> Events</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join workshops, meetups, and conferences to connect with the Oakyard community and grow your knowledge.
          </p>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button variant="outline" size="lg">
              <Filter className="h-5 w-5 mr-2" />
              Filter
            </Button>
          </div>
          
          <Button size="lg">
            <Plus className="h-5 w-5 mr-2" />
            Host an Event
          </Button>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="mb-2"
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              
              {upcomingEvents.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No upcoming events found.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              
              {pastEvents.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No past events found.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Event Hosting CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Host an Event?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Share your expertise with the community and help others learn and grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Host an Event
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Event Guidelines
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;