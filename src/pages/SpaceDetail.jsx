import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../contexts/AuthContext';
import { setCurrentSpace } from '../store/slices/spacesSlice';
import { mockSpaces } from '../data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Users, 
  Star, 
  Wifi, 
  Coffee, 
  Monitor, 
  Car,
  Calendar,
  MessageSquare,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';

const SpaceDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentSpace = useSelector((state) => state.spaces.currentSpace);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (id) {
      const space = mockSpaces.find(s => s.id === id);
      dispatch(setCurrentSpace(space || null));
    }
  }, [id]);

  if (!currentSpace) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Space not found</h1>
          <Button asChild>
            <Link to="/">Back to Spaces</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    if (!isAuthenticated) {
      toast.error("You need to be signed in to book a space.");
      return;
    }
  };

  const amenityIcons = {
    'WiFi': Wifi,
    'Coffee Machine': Coffee,
    'Projector': Monitor,
    'Parking': Car,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Spaces
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <div className="relative">
            <img 
              src={currentSpace.images[0]} 
              alt={currentSpace.title}
              className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
            />
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                {currentSpace.category.replace('-', ' ').toUpperCase()}
              </Badge>
            </div>
          </div>

          {/* Title and Rating */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{currentSpace.title}</h1>
            <div className="flex items-center space-x-4 text-muted-foreground mb-4">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{currentSpace.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span>{currentSpace.rating}</span>
                <span>({currentSpace.reviews} reviews)</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>Up to {currentSpace.capacity} people</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-3">About this space</h2>
            <p className="text-muted-foreground leading-relaxed">{currentSpace.description}</p>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {currentSpace.amenities.map((amenity) => {
                const IconComponent = amenityIcons[amenity] || Coffee;
                return (
                  <div key={amenity} className="flex items-center space-x-2 p-3 rounded-lg bg-muted">
                    <IconComponent className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">{amenity}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Owner Info */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3">Hosted by {currentSpace.ownerName}</h3>
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-gradient-secondary flex items-center justify-center">
                  <span className="text-secondary-foreground font-semibold">
                    {currentSpace.ownerName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{currentSpace.ownerName}</p>
                  <p className="text-sm text-muted-foreground">Space owner since 2022</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Booking Card */}
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-primary mb-1">
                  ${currentSpace.hourlyRate}
                  <span className="text-base font-normal text-muted-foreground">/hour</span>
                </div>
                <p className="text-sm text-muted-foreground">Flexible hourly booking</p>
              </div>

              <div className="space-y-4">
                <Button 
                  className="w-full" 
                  size="lg"
                  asChild={isAuthenticated}
                  onClick={!isAuthenticated ? handleBookNow : undefined}
                >
                  {isAuthenticated ? (
                    <Link to={`/booking/${currentSpace.id}`}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Now
                    </Link>
                  ) : (
                    <>
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Now
                    </>
                  )}
                </Button>

                <Separator />

                <Button variant="outline" className="w-full" asChild>
                  <Link to={`/chat-room/${currentSpace.id}`}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Join Community Chat
                  </Link>
                </Button>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Quick Facts</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Capacity:</span>
                    <span>{currentSpace.capacity} people</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="capitalize">{currentSpace.category.replace('-', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Instant Book:</span>
                    <span className="text-success">Available</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SpaceDetail;