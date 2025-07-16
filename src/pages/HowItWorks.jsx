import { Search, Calendar, MapPin, CreditCard, Shield, Users, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            How 
            <span className="bg-gradient-accent bg-clip-text text-transparent"> Oakyard </span>
            Works
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover, book, and enjoy amazing spaces in just a few simple steps. 
            We've made it incredibly easy to find your perfect venue.
          </p>
        </div>
      </section>

      {/* For Users Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">For Space Seekers</Badge>
            <h2 className="text-3xl font-bold mb-4">Find & Book Your Perfect Space</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you need a meeting room, creative studio, or event venue, we make it simple to find and book.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="h-16 w-16 rounded-full bg-gradient-primary mx-auto mb-6 flex items-center justify-center">
                  <Search className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4">1. Search</h3>
                <p className="text-muted-foreground">
                  Browse our curated collection of unique spaces using our smart search and filters.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="h-16 w-16 rounded-full bg-gradient-secondary mx-auto mb-6 flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4">2. Compare</h3>
                <p className="text-muted-foreground">
                  View detailed photos, amenities, reviews, and pricing to find the perfect match.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="h-16 w-16 rounded-full bg-gradient-accent mx-auto mb-6 flex items-center justify-center">
                  <CreditCard className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4">3. Book</h3>
                <p className="text-muted-foreground">
                  Select your dates and times, make secure payment, and receive instant confirmation.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="h-16 w-16 rounded-full bg-gradient-primary mx-auto mb-6 flex items-center justify-center">
                  <Star className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4">4. Enjoy</h3>
                <p className="text-muted-foreground">
                  Access your space with ease and enjoy your event. Rate and review afterwards.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* For Hosts Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">For Space Owners</Badge>
            <h2 className="text-3xl font-bold mb-4">Share Your Space & Earn Income</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Turn your unique space into a source of income by joining our community of space owners.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="h-16 w-16 rounded-full bg-gradient-secondary mx-auto mb-6 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4">List Your Space</h3>
                <p className="text-muted-foreground mb-4">
                  Create a compelling listing with photos, descriptions, and pricing. Our team helps optimize your listing.
                </p>
                <ul className="text-sm text-muted-foreground text-left space-y-1">
                  <li>• Professional photography tips</li>
                  <li>• Pricing recommendations</li>
                  <li>• Marketing support</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="h-16 w-16 rounded-full bg-gradient-accent mx-auto mb-6 flex items-center justify-center">
                  <Users className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Manage Bookings</h3>
                <p className="text-muted-foreground mb-4">
                  Use our intuitive dashboard to manage availability, communicate with guests, and track earnings.
                </p>
                <ul className="text-sm text-muted-foreground text-left space-y-1">
                  <li>• Real-time booking management</li>
                  <li>• Guest communication tools</li>
                  <li>• Revenue analytics</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="h-16 w-16 rounded-full bg-gradient-primary mx-auto mb-6 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Get Paid Safely</h3>
                <p className="text-muted-foreground mb-4">
                  Receive secure payments with our built-in protection policies and 24/7 support.
                </p>
                <ul className="text-sm text-muted-foreground text-left space-y-1">
                  <li>• Secure payment processing</li>
                  <li>• Host protection insurance</li>
                  <li>• 24/7 customer support</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Oakyard?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've built our platform with both space seekers and owners in mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified Spaces</h3>
              <p className="text-muted-foreground text-sm">
                All spaces are personally verified by our team for quality and safety.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-gradient-secondary mx-auto mb-4 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
              <p className="text-muted-foreground text-sm">
                Bank-level security with fraud protection and encrypted transactions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-gradient-accent mx-auto mb-4 flex items-center justify-center">
                <Users className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Community Support</h3>
              <p className="text-muted-foreground text-sm">
                Join a community of passionate space owners and users with 24/7 support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of happy users who have found their perfect spaces through Oakyard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Explore Spaces
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/list-space">
                List Your Space
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;