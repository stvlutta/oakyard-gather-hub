import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { setSpaces, addSpace, updateSpace, deleteSpace } from '../../store/slices/spacesSlice';
import { setBookings } from '../../store/slices/bookingsSlice';
import { mockSpaces, mockBookings, mockUsers } from '../../data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Users, 
  MapPin, 
  Calendar, 
  Plus, 
  Edit, 
  Trash2,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AdminPanel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { spaces } = useSelector((state: RootState) => state.spaces);
  const { bookings } = useSelector((state: RootState) => state.bookings);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSpace, setEditingSpace] = useState<any>(null);
  const [newSpace, setNewSpace] = useState({
    title: '',
    description: '',
    location: '',
    hourlyRate: 0,
    capacity: 1,
    category: 'meeting-room' as const,
    amenities: '',
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/');
      return;
    }

    // Load all data for admin
    dispatch(setSpaces(mockSpaces));
    dispatch(setBookings(mockBookings));
  }, [isAuthenticated, user, navigate, dispatch]);

  const handleAddSpace = () => {
    if (!newSpace.title || !newSpace.description || !newSpace.location) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    const space = {
      id: `space-${Date.now()}`,
      ...newSpace,
      images: ['/api/placeholder/800/600'],
      amenities: newSpace.amenities.split(',').map(a => a.trim()).filter(Boolean),
      ownerId: user?.id || '',
      ownerName: user?.name || '',
      rating: 5.0,
      reviews: 0,
      availability: {},
    };

    dispatch(addSpace(space));
    setIsAddDialogOpen(false);
    setNewSpace({
      title: '',
      description: '',
      location: '',
      hourlyRate: 0,
      capacity: 1,
      category: 'meeting-room',
      amenities: '',
    });

    toast({
      title: "Space added successfully!",
    });
  };

  const handleDeleteSpace = (spaceId: string) => {
    dispatch(deleteSpace(spaceId));
    toast({
      title: "Space deleted successfully!",
    });
  };

  const stats = {
    totalSpaces: spaces.length,
    totalBookings: bookings.length,
    totalRevenue: bookings.reduce((sum, booking) => sum + booking.totalCost, 0),
    totalUsers: mockUsers.length,
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">Manage spaces, bookings, and users</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Space
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Space</DialogTitle>
                <DialogDescription>
                  Create a new space listing for the platform.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={newSpace.title}
                    onChange={(e) => setNewSpace({ ...newSpace, title: e.target.value })}
                    placeholder="Enter space title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={newSpace.category} 
                    onValueChange={(value: any) => setNewSpace({ ...newSpace, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meeting-room">Meeting Room</SelectItem>
                      <SelectItem value="creative-studio">Creative Studio</SelectItem>
                      <SelectItem value="event-hall">Event Hall</SelectItem>
                      <SelectItem value="coworking">Coworking</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={newSpace.description}
                    onChange={(e) => setNewSpace({ ...newSpace, description: e.target.value })}
                    placeholder="Describe the space"
                    rows={3}
                  />
                </div>
                
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={newSpace.location}
                    onChange={(e) => setNewSpace({ ...newSpace, location: e.target.value })}
                    placeholder="Enter location address"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={newSpace.hourlyRate}
                    onChange={(e) => setNewSpace({ ...newSpace, hourlyRate: Number(e.target.value) })}
                    placeholder="50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={newSpace.capacity}
                    onChange={(e) => setNewSpace({ ...newSpace, capacity: Number(e.target.value) })}
                    placeholder="10"
                  />
                </div>
                
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="amenities">Amenities (comma-separated)</Label>
                  <Input
                    id="amenities"
                    value={newSpace.amenities}
                    onChange={(e) => setNewSpace({ ...newSpace, amenities: e.target.value })}
                    placeholder="WiFi, Projector, Coffee Machine"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddSpace}>
                  Add Space
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalSpaces}</p>
                  <p className="text-sm text-muted-foreground">Total Spaces</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalBookings}</p>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">${stats.totalRevenue.toFixed(0)}</p>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="spaces" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="spaces">Spaces ({spaces.length})</TabsTrigger>
            <TabsTrigger value="bookings">Bookings ({bookings.length})</TabsTrigger>
            <TabsTrigger value="users">Users ({mockUsers.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="spaces">
            <Card>
              <CardHeader>
                <CardTitle>Manage Spaces</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Space</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Rate/Hour</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {spaces.map((space) => (
                      <TableRow key={space.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <img 
                              src={space.images[0]} 
                              alt={space.title}
                              className="w-10 h-10 rounded object-cover"
                            />
                            <div>
                              <p className="font-medium">{space.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {space.rating} ⭐ ({space.reviews} reviews)
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {space.category.replace('-', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {space.location}
                        </TableCell>
                        <TableCell>${space.hourlyRate}</TableCell>
                        <TableCell>{space.capacity} people</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDeleteSpace(space.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Manage Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Space</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-mono text-sm">
                          {booking.id}
                        </TableCell>
                        <TableCell>{booking.userName}</TableCell>
                        <TableCell>{booking.spaceName}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{new Date(booking.startTime).toLocaleDateString()}</p>
                            <p className="text-muted-foreground">
                              {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                              {new Date(booking.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                          >
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>${booking.totalCost}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Manage Users</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Bookings</TableHead>
                      <TableHead>Join Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <img 
                              src={user.avatar} 
                              alt={user.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={user.role === 'admin' ? 'default' : 'secondary'}
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {bookings.filter(b => b.userId === user.id).length}
                        </TableCell>
                        <TableCell>Jan 2024</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;