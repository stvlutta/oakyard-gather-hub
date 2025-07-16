import { useState } from 'react';
import { Search, Book, Users, CreditCard, Settings, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      icon: Book,
      title: 'Booking Spaces',
      description: 'Learn how to search, book, and manage your space reservations',
      articles: [
        'How to search for spaces',
        'Making a booking',
        'Cancelling a booking',
        'Booking confirmation'
      ]
    },
    {
      icon: Users,
      title: 'Account Management',
      description: 'Manage your profile, settings, and account preferences',
      articles: [
        'Creating an account',
        'Profile settings',
        'Password reset',
        'Account verification'
      ]
    },
    {
      icon: CreditCard,
      title: 'Payments & Billing',
      description: 'Understanding payments, refunds, and billing information',
      articles: [
        'Payment methods',
        'Refund policy',
        'Billing issues',
        'Invoice download'
      ]
    },
    {
      icon: Settings,
      title: 'Space Owners',
      description: 'Guide for listing and managing your spaces',
      articles: [
        'Listing your space',
        'Managing bookings',
        'Space verification',
        'Pricing strategies'
      ]
    }
  ];

  const faqItems = [
    {
      question: 'How do I book a space?',
      answer: 'To book a space, browse our listings, select your preferred space, choose your dates and times, and complete the booking process with payment.'
    },
    {
      question: 'Can I cancel my booking?',
      answer: 'Yes, you can cancel your booking according to the cancellation policy set by the space owner. Check the specific policy for each space.'
    },
    {
      question: 'How do I list my space?',
      answer: 'Create an account, upgrade to an owner account, and follow our listing process to add photos, descriptions, and pricing for your space.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept major credit cards, PayPal, and bank transfers. All payments are processed securely through our platform.'
    },
    {
      question: 'How do I contact support?',
      answer: 'You can contact our support team through the contact form, email at hello@oakyard.com, or phone at +254 711 110 707.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            How can we 
            <span className="bg-gradient-accent bg-clip-text text-transparent"> help </span>
            you?
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Find answers to common questions and get the support you need.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find help articles organized by topic to quickly get the information you need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="h-12 w-12 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.articles.map((article, articleIndex) => (
                        <li key={articleIndex}>
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-sm text-muted-foreground hover:text-primary"
                          >
                            {article}
                          </Button>
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

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Quick answers to the most common questions we receive.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Start Live Chat
              </Button>
              <Button variant="outline" size="lg">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;