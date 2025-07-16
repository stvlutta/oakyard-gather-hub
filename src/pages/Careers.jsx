import { MapPin, Clock, Users, Briefcase, Heart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Careers = () => {
  const openPositions = [
    {
      title: 'Senior Full Stack Developer',
      location: 'Remote / Nairobi',
      type: 'Full-time',
      department: 'Engineering',
      description: 'Join our engineering team to build scalable web applications and APIs.',
      requirements: ['5+ years experience', 'React/Node.js', 'TypeScript', 'AWS'],
      posted: '2 days ago'
    },
    {
      title: 'Product Manager',
      location: 'Nairobi',
      type: 'Full-time',
      department: 'Product',
      description: 'Lead product strategy and roadmap for our space-sharing platform.',
      requirements: ['3+ years PM experience', 'Agile methodology', 'Data analysis', 'User research'],
      posted: '1 week ago'
    },
    {
      title: 'UX/UI Designer',
      location: 'Remote',
      type: 'Full-time',
      department: 'Design',
      description: 'Create intuitive and beautiful user experiences for our platform.',
      requirements: ['3+ years design experience', 'Figma/Sketch', 'User research', 'Prototyping'],
      posted: '3 days ago'
    },
    {
      title: 'Marketing Manager',
      location: 'Nairobi',
      type: 'Full-time',
      department: 'Marketing',
      description: 'Drive growth through digital marketing strategies and campaigns.',
      requirements: ['3+ years marketing experience', 'Digital marketing', 'Analytics', 'Content creation'],
      posted: '5 days ago'
    },
    {
      title: 'Customer Success Manager',
      location: 'Remote',
      type: 'Full-time',
      department: 'Customer Success',
      description: 'Ensure our users have the best possible experience on our platform.',
      requirements: ['2+ years customer success', 'Communication skills', 'Problem-solving', 'CRM tools'],
      posted: '1 week ago'
    },
    {
      title: 'DevOps Engineer',
      location: 'Remote / Nairobi',
      type: 'Full-time',
      department: 'Engineering',
      description: 'Manage our cloud infrastructure and deployment processes.',
      requirements: ['3+ years DevOps experience', 'AWS/GCP', 'Docker/Kubernetes', 'CI/CD'],
      posted: '4 days ago'
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance and wellness programs'
    },
    {
      icon: Clock,
      title: 'Flexible Hours',
      description: 'Work-life balance with flexible working hours'
    },
    {
      icon: MapPin,
      title: 'Remote Work',
      description: 'Work from anywhere with our remote-first culture'
    },
    {
      icon: Users,
      title: 'Team Building',
      description: 'Regular team events and professional development'
    },
    {
      icon: Briefcase,
      title: 'Career Growth',
      description: 'Clear career paths and learning opportunities'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Work on cutting-edge technology and projects'
    }
  ];

  const values = [
    {
      title: 'Innovation First',
      description: 'We encourage creative thinking and embrace new technologies to solve complex problems.'
    },
    {
      title: 'User-Centric',
      description: 'Every decision we make is driven by what\'s best for our users and community.'
    },
    {
      title: 'Transparency',
      description: 'We believe in open communication and honest feedback at all levels.'
    },
    {
      title: 'Collaboration',
      description: 'We work together as a team to achieve our common goals and support each other.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Join Our 
            <span className="bg-gradient-accent bg-clip-text text-transparent"> Team</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Help us build the future of space sharing and create meaningful connections between people and places.
          </p>
          <Button size="lg" className="mr-4">
            View Open Positions
          </Button>
          <Button variant="outline" size="lg">
            Learn About Our Culture
          </Button>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Open Positions</Badge>
            <h2 className="text-3xl font-bold mb-4">Current Opportunities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're looking for talented individuals to join our growing team.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {openPositions.map((position, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline">{position.department}</Badge>
                    <span className="text-sm text-muted-foreground">{position.posted}</span>
                  </div>
                  <CardTitle className="text-lg">{position.title}</CardTitle>
                  <CardDescription>{position.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{position.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{position.type}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Requirements:</h4>
                    <ul className="space-y-1">
                      {position.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-center space-x-2">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                          <span className="text-sm text-muted-foreground">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="w-full">Apply Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Work With Us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We believe in taking care of our team and providing an environment where everyone can thrive.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These values guide everything we do and shape our company culture.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Don't see a position that fits? We're always looking for talented people to join our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Submit Resume
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Contact HR
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;