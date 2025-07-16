import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { spacesAPI, handleAPIError } from '../services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Upload, DollarSign, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const ListSpace = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    hourly_rate: '',
    capacity: '',
    address: '',
    latitude: '',
    longitude: '',
    amenities: []
  });

  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const categories = [
    { value: 'meeting_room', label: 'Meeting Room' },
    { value: 'creative_studio', label: 'Creative Studio' },
    { value: 'event_hall', label: 'Event Hall' },
    { value: 'coworking_space', label: 'Coworking Space' },
    { value: 'conference_room', label: 'Conference Room' },
    { value: 'office_space', label: 'Office Space' },
    { value: 'workshop_space', label: 'Workshop Space' },
    { value: 'studio_space', label: 'Studio Space' },
    { value: 'retail_space', label: 'Retail Space' },
    { value: 'exhibition_space', label: 'Exhibition Space' },
    { value: 'training_room', label: 'Training Room' },
    { value: 'other', label: 'Other' }
  ];

  const availableAmenities = [
    'wifi', 'projector', 'whiteboard', 'coffee', 'parking', 'air_conditioning',
    'kitchen', 'phone_booth', 'natural_light', 'sound_system', 'video_conferencing',
    'catering', 'reception', 'storage', 'elevator', 'wheelchair_accessible'
  ];

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              Please log in to list your space
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full" 
              onClick={() => navigate('/login')}
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if user has owner role
  if (user?.role !== 'owner' && user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Owner Account Required</CardTitle>
            <CardDescription>
              You need an owner account to list spaces. Please contact support to upgrade your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full" 
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (value) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev => {
      if (prev.includes(amenity)) {
        return prev.filter(a => a !== amenity);
      } else {
        return [...prev, amenity];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const spaceData = {
        ...formData,
        hourly_rate: parseFloat(formData.hourly_rate),
        capacity: parseInt(formData.capacity),
        amenities: selectedAmenities,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null
      };

      const response = await spacesAPI.createSpace(spaceData);
      
      setSuccess(true);
      toast.success('Space listed successfully! It will be available after admin approval.');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        hourly_rate: '',
        capacity: '',
        address: '',
        latitude: '',
        longitude: '',
        amenities: []
      });
      setSelectedAmenities([]);
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      const message = handleAPIError(error);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <CardTitle>Space Listed Successfully!</CardTitle>
            <CardDescription>
              Your space has been submitted for approval. You'll be notified once it's approved and live.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full" 
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">List Your Space</h1>
          <p className="text-xl text-muted-foreground">
            Share your unique venue with our community and start earning
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Space Information
            </CardTitle>
            <CardDescription>
              Tell us about your space so guests can find exactly what they're looking for
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Space Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Modern Downtown Meeting Room"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your space, its features, and what makes it special..."
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={handleCategoryChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="capacity">Capacity (people) *</Label>
                    <Input
                      id="capacity"
                      name="capacity"
                      type="number"
                      placeholder="e.g., 10"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      required
                      min="1"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Pricing */}
              <div>
                <Label htmlFor="hourly_rate" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Hourly Rate (USD) *
                </Label>
                <Input
                  id="hourly_rate"
                  name="hourly_rate"
                  type="number"
                  placeholder="e.g., 50"
                  value={formData.hourly_rate}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <Separator />

              {/* Location */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location
                </h3>
                
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Full address including city, state, zip"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="latitude">Latitude (optional)</Label>
                    <Input
                      id="latitude"
                      name="latitude"
                      type="number"
                      placeholder="e.g., 40.7128"
                      value={formData.latitude}
                      onChange={handleInputChange}
                      step="any"
                    />
                  </div>

                  <div>
                    <Label htmlFor="longitude">Longitude (optional)</Label>
                    <Input
                      id="longitude"
                      name="longitude"
                      type="number"
                      placeholder="e.g., -74.0060"
                      value={formData.longitude}
                      onChange={handleInputChange}
                      step="any"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Amenities */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Amenities</h3>
                <p className="text-sm text-muted-foreground">
                  Select the amenities available in your space
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {availableAmenities.map(amenity => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Badge 
                        variant={selectedAmenities.includes(amenity) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleAmenity(amenity)}
                      >
                        {amenity.replace('_', ' ')}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Submit */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? 'Submitting...' : 'List My Space'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ListSpace;