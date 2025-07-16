import { ArrowRight, Users, MapPin, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About 
            <span className="bg-gradient-accent bg-clip-text text-transparent"> Oakyard</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            We're transforming how people discover and connect through shared spaces. 
            Our platform bridges communities by making unique venues accessible to everyone.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                At Oakyard, we believe that great things happen when people come together in inspiring spaces. 
                Our mission is to democratize access to unique venues, making it easy for individuals, 
                businesses, and communities to find the perfect space for their needs.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you're hosting a workshop, organizing a meeting, celebrating a milestone, 
                or simply looking for a change of scenery, we connect you with spaces that spark creativity 
                and foster meaningful connections.
              </p>
              <Button size="lg">
                Explore Spaces
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">1000+</h3>
                  <p className="text-sm text-muted-foreground">Happy Members</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-secondary mx-auto mb-4 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">50+</h3>
                  <p className="text-sm text-muted-foreground">Unique Spaces</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-accent mx-auto mb-4 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">5000+</h3>
                  <p className="text-sm text-muted-foreground">Hours Booked</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                    <Star className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">4.9</h3>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do at Oakyard.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">Community First</h3>
                <p className="text-muted-foreground">
                  We prioritize building genuine connections and fostering a sense of belonging 
                  within our community of space owners and users.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">Quality & Safety</h3>
                <p className="text-muted-foreground">
                  Every space on our platform is carefully vetted to ensure high standards 
                  of quality, cleanliness, and safety for all our users.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously evolve our platform to make discovering and booking 
                  spaces more seamless and enjoyable for everyone.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Whether you're looking to book a space or share your own, we'd love to have you as part of the Oakyard family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Find a Space
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/list-space">
                List Your Space
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;