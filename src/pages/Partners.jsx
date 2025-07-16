import { Handshake, Building, Users, Globe, Star, ArrowRight, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Partners = () => {
  const partners = [
    {
      id: 1,
      name: 'WeWork',
      type: 'Strategic Partner',
      description: 'Global workspace provider offering flexible office solutions.',
      logo: '/api/placeholder/150/80',
      website: 'https://wework.com',
      industry: 'Coworking',
      partnership: 'Space Integration',
      since: '2024'
    },
    {
      id: 2,
      name: 'Stripe',
      type: 'Payment Partner',
      description: 'Secure payment processing for all transactions.',
      logo: '/api/placeholder/150/80',
      website: 'https://stripe.com',
      industry: 'Fintech',
      partnership: 'Payment Processing',
      since: '2023'
    },
    {
      id: 3,
      name: 'Zoom',
      type: 'Technology Partner',
      description: 'Video conferencing integration for virtual meetings.',
      logo: '/api/placeholder/150/80',
      website: 'https://zoom.us',
      industry: 'Video Communication',
      partnership: 'Video Integration',
      since: '2024'
    },
    {
      id: 4,
      name: 'Airbnb',
      type: 'Platform Partner',
      description: 'Collaboration on space sharing best practices.',
      logo: '/api/placeholder/150/80',
      website: 'https://airbnb.com',
      industry: 'Hospitality',
      partnership: 'Knowledge Sharing',
      since: '2024'
    },
    {
      id: 5,
      name: 'Google Cloud',
      type: 'Infrastructure Partner',
      description: 'Cloud infrastructure and AI services.',
      logo: '/api/placeholder/150/80',
      website: 'https://cloud.google.com',
      industry: 'Cloud Computing',
      partnership: 'Cloud Services',
      since: '2023'
    },
    {
      id: 6,
      name: 'Slack',
      type: 'Integration Partner',
      description: 'Team communication and collaboration tools.',
      logo: '/api/placeholder/150/80',
      website: 'https://slack.com',
      industry: 'Communication',
      partnership: 'Team Collaboration',
      since: '2024'
    }
  ];

  const partnerTypes = [
    {
      icon: Building,
      title: 'Space Partners',
      description: 'Premium workspace providers and property managers',
      benefits: [
        'Increased bookings and revenue',
        'Access to our user base',
        'Marketing and promotional support',
        'Analytics and insights'
      ]
    },
    {
      icon: Globe,
      title: 'Technology Partners',
      description: 'SaaS platforms and technology service providers',
      benefits: [
        'API integration opportunities',
        'Co-marketing initiatives',
        'Technical collaboration',
        'Joint product development'
      ]
    },
    {
      icon: Users,
      title: 'Community Partners',
      description: 'Organizations and communities aligned with our mission',
      benefits: [
        'Event collaboration',
        'Knowledge sharing',
        'Network expansion',
        'Joint initiatives'
      ]
    },
    {
      icon: Handshake,
      title: 'Strategic Partners',
      description: 'Long-term partnerships for mutual growth',
      benefits: [
        'Strategic planning alignment',
        'Resource sharing',
        'Joint ventures',
        'Market expansion'
      ]
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      title: 'VP of Partnerships, WeWork',
      content: 'Our partnership with Oakyard has opened new opportunities for both our communities. The integration has been seamless and beneficial.',
      rating: 5
    },
    {
      name: 'Mike Chen',
      title: 'Director of Business Development, Stripe',
      content: 'Oakyard\'s commitment to security and user experience aligns perfectly with our values. Great team to work with.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      title: 'Partnership Manager, Zoom',
      content: 'The collaboration on video integration has enhanced both our platforms. Looking forward to future innovations together.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our 
            <span className="bg-gradient-accent bg-clip-text text-transparent"> Partners</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            We collaborate with amazing companies and organizations to create better experiences for our community.
          </p>
          <Button size="lg">
            <Handshake className="h-5 w-5 mr-2" />
            Become a Partner
          </Button>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Our Partners</Badge>
            <h2 className="text-3xl font-bold mb-4">Trusted by Leading Companies</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We work with industry leaders to provide the best possible experience for our users.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <Card key={partner.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="h-16 w-auto mx-auto mb-4"
                  />
                  <CardTitle className="text-xl">{partner.name}</CardTitle>
                  <CardDescription>{partner.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Type:</span>
                      <Badge variant="outline">{partner.type}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Industry:</span>
                      <span>{partner.industry}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Partnership:</span>
                      <span>{partner.partnership}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Since:</span>
                      <span>{partner.since}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4">
                    Visit Website
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Partnership Opportunities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer various partnership models to create mutually beneficial relationships.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnerTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <Card key={index} className="h-full">
                  <CardHeader className="text-center">
                    <div className="h-12 w-12 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg">{type.title}</CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {type.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start space-x-2">
                          <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-muted-foreground">{benefit}</span>
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

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Partners Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from our partners about their experience working with Oakyard.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Form */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Interested in Partnering?</h2>
              <p className="text-muted-foreground">
                Let's discuss how we can work together to create amazing experiences for our communities.
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Partnership Inquiry
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Company Name</label>
                    <Input placeholder="Your company name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Industry</label>
                    <Input placeholder="Your industry" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Name</label>
                    <Input placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Partnership Type</label>
                  <Input placeholder="e.g., Technology Integration, Strategic Partnership" />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea 
                    placeholder="Tell us about your company and how you'd like to partner with us..."
                    rows={4}
                  />
                </div>
                
                <Button className="w-full">
                  Submit Partnership Inquiry
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Let's Build Something Amazing Together</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join our partner ecosystem and help shape the future of workspace sharing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Partnership Opportunities
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Contact Partnership Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;