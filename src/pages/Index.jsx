import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setSpaces, setSearchQuery, setFilters } from '../store/slices/spacesSlice';
import { mockSpaces } from '../data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  MapPin, 
  Users, 
  Star, 
  Filter,
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
  Heart
} from 'lucide-react';
import heroImage from '../assets/hero-community.jpg';

const Index = () => {
  const dispatch = useDispatch();
  const { spaces, searchQuery, filters } = useSelector((state: RootState) => state.spaces);
  const [filteredSpaces, setFilteredSpaces] = useState(spaces);

  useEffect(() => {
    dispatch(setSpaces(mockSpaces));
  }, [dispatch]);

  useEffect(() => {
    let filtered = spaces;

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(space => 
        space.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(space => space.category === filters.category);
    }

    // Price range filter
    filtered = filtered.filter(space => 
      space.hourlyRate >= filters.priceRange[0] && 
      space.hourlyRate <= filters.priceRange[1]
    );

    setFilteredSpaces(filtered);
  }, [spaces, searchQuery, filters]);

  const SpaceCard = ({ space }: { space: any }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={space.images[0]} 
            alt={space.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-background/90 text-foreground">
              {space.category.replace('-', ' ').toUpperCase()}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Button variant="ghost" size="icon" className="bg-background/90 h-8 w-8">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {space.title}
            </h3>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">
                ${space.hourlyRate}
                <span className="text-sm font-normal text-muted-foreground">/hr</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{space.location.split(',')[0]}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{space.capacity}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span>{space.rating}</span>
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {space.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {space.amenities.slice(0, 2).map((amenity) => (
                <Badge key={amenity} variant="outline" className="text-xs">
                  {amenity}
                </Badge>
              ))}
              {space.amenities.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{space.amenities.length - 2}
                </Badge>
              )}
            </div>
            
            <Button asChild size="sm">
              <Link to={`/space/${space.id}`}>
                View Details
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-95"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm scale-105"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Find Your Perfect
              <span className="bg-gradient-accent bg-clip-text text-transparent"> Space </span>
              to Connect
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
              Discover unique venues for meetings, collaboration, and celebrations. 
              Connect with like-minded people in inspiring spaces.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-background/95 backdrop-blur p-6 rounded-2xl shadow-xl">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search spaces, locations, or activities..."
                    value={searchQuery}
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                    className="pl-10 h-12"
                  />
                </div>
                <Select
                  value={filters.category}
                  onValueChange={(value) => dispatch(setFilters({ category: value }))}
                >
                  <SelectTrigger className="md:w-48 h-12">
                    <SelectValue placeholder="Any Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meeting-room">Meeting Room</SelectItem>
                    <SelectItem value="creative-studio">Creative Studio</SelectItem>
                    <SelectItem value="event-hall">Event Hall</SelectItem>
                    <SelectItem value="coworking">Coworking</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="lg" className="h-12 px-8">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Oakyard?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We make it easy to find, book, and enjoy amazing spaces for every occasion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Unique Spaces</h3>
              <p className="text-muted-foreground">
                Discover one-of-a-kind venues that inspire creativity and collaboration.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-secondary mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Booking</h3>
              <p className="text-muted-foreground">
                Book by the hour or day with our simple, secure booking system.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-accent mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
              <p className="text-muted-foreground">
                All spaces are verified, and payments are processed securely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spaces Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Spaces</h2>
              <p className="text-muted-foreground">
                {filteredSpaces.length} space{filteredSpaces.length !== 1 ? 's' : ''} available
              </p>
            </div>
            
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
          
          {filteredSpaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSpaces.map((space) => (
                <SpaceCard key={space.id} space={space} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="h-24 w-24 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <Search className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No spaces found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or browse all spaces.
              </p>
              <Button onClick={() => {
                dispatch(setSearchQuery(''));
                dispatch(setFilters({ category: '', priceRange: [0, 1000], location: '' }));
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Have a Space to Share?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join our community of space owners and start earning by sharing your unique venue.
          </p>
          <Button variant="secondary" size="lg">
            List Your Space
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
