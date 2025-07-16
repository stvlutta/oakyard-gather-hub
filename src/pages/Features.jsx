import { Search, Calendar, Shield, Users, MessageSquare, Star, MapPin, CreditCard, Clock, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Features = () => {
  const mainFeatures = [
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find the perfect space with our intelligent search filters and recommendations.',
      features: ['Advanced filters', 'Location-based search', 'Category sorting', 'Price range filters']
    },
    {
      icon: Calendar,
      title: 'Instant Booking',
      description: 'Book spaces instantly with our streamlined booking system.',
      features: ['Real-time availability', 'Flexible scheduling', 'Booking confirmations', 'Calendar integration']
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Safe and secure payment processing with multiple payment options.',
      features: ['Encrypted transactions', 'Multiple payment methods', 'Refund protection', 'Invoice generation']
    },
    {
      icon: Users,
      title: 'Community Hub',
      description: 'Connect with other space users and build meaningful relationships.',
      features: ['User profiles', 'Reviews and ratings', 'Community chat', 'Event networking']
    },
    {
      icon: MessageSquare,
      title: 'Real-time Chat',
      description: 'Communicate instantly with space owners and other users.',
      features: ['Direct messaging', 'Group chats', 'File sharing', 'Video calls']
    },
    {
      icon: Star,
      title: 'Quality Assurance',
      description: 'All spaces are verified and reviewed to ensure quality standards.',
      features: ['Space verification', 'User reviews', 'Quality ratings', 'Photo verification']
    }
  ];

  const additionalFeatures = [
    {
      icon: MapPin,
      title: 'Location Services',
      description: 'Find spaces near you with GPS integration'
    },
    {
      icon: CreditCard,
      title: 'Flexible Pricing',
      description: 'Hourly, daily, and monthly booking options'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support'
    },
    {
      icon: Zap,
      title: 'Fast Performance',
      description: 'Lightning-fast loading and booking'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Powerful 
            <span className="bg-gradient-accent bg-clip-text text-transparent"> Features </span>
            for Everyone
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover the tools and features that make Oakyard the best platform for finding and booking unique spaces.
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Core Features</Badge>
            <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform is designed with both space seekers and owners in mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.features.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center space-x-2">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">And Much More</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Additional features that make your experience even better.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-full bg-gradient-secondary mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already discovering amazing spaces through Oakyard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors">
              Start Free Trial
            </button>
            <button className="border border-primary-foreground text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground hover:text-primary transition-colors">
              View Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;