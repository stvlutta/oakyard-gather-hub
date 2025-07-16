import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Users, 
  Video, 
  Clock, 
  Calendar,
  ArrowRight,
  Search,
  Filter
} from 'lucide-react';

const VirtualMeetings = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [joinRoomId, setJoinRoomId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual API calls
  const [rooms, setRooms] = useState([
    {
      id: 'room-123',
      name: 'Weekly Team Standup',
      description: 'Our regular Monday morning sync-up meeting',
      host: 'Sarah Johnson',
      participants: 5,
      maxParticipants: 10,
      isActive: true,
      createdAt: new Date(Date.now() - 1800000),
      scheduledFor: new Date(Date.now() + 300000)
    },
    {
      id: 'room-456',
      name: 'Product Planning Session',
      description: 'Quarterly product roadmap discussion',
      host: 'Mike Chen',
      participants: 3,
      maxParticipants: 8,
      isActive: true,
      createdAt: new Date(Date.now() - 3600000)
    },
    {
      id: 'room-789',
      name: 'Client Presentation Prep',
      description: 'Preparing for the big client presentation tomorrow',
      host: 'You',
      participants: 2,
      maxParticipants: 5,
      isActive: false,
      createdAt: new Date(Date.now() - 7200000),
      scheduledFor: new Date(Date.now() + 86400000)
    }
  ]);

  const createRoom = () => {
    if (!roomName.trim() || !isAuthenticated) return;

    const newRoom = {
      id: `room-${Date.now()}`,
      name: roomName.trim(),
      description: roomDescription.trim(),
      host: user?.name || 'You',
      participants: 1,
      maxParticipants: 10,
      isActive: true,
      createdAt: new Date()
    };

    setRooms(prev => [newRoom, ...prev]);
    setRoomName('');
    setRoomDescription('');

    // Navigate to the new room
    navigate(`/chat-room/${newRoom.id}`);
  };

  const joinRoom = (roomId) => {
    const targetRoomId = roomId || joinRoomId;
    if (!targetRoomId.trim()) return;

    // TODO: Check if room exists via API
    navigate(`/chat-room/${targetRoomId}`);
  };

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.host.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p className="text-muted-foreground mb-6">Please log in to access virtual meetings.</p>
            <Button asChild>
              <a href="/login">Sign In</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Virtual Meetings</h1>
          <p className="text-muted-foreground">
            Host or join video meetings and collaborate with your team in real-time.
          </p>
        </div>

        <Tabs defaultValue="rooms" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rooms">Browse Rooms</TabsTrigger>
            <TabsTrigger value="create">Create Room</TabsTrigger>
            <TabsTrigger value="join">Join Room</TabsTrigger>
          </TabsList>

          {/* Browse Rooms Tab */}
          <TabsContent value="rooms" className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search rooms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map((room) => (
                <Card key={room.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{room.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Hosted by {room.host}
                        </p>
                      </div>
                      <Badge variant={room.isActive ? "default" : "secondary"}>
                        {room.isActive ? "Active" : "Scheduled"}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {room.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{room.participants}/{room.maxParticipants}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {room.scheduledFor 
                            ? `${formatDate(room.scheduledFor)} ${formatTime(room.scheduledFor)}`
                            : `Started ${formatTime(room.createdAt)}`
                          }
                        </span>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => joinRoom(room.id)} 
                      className="w-full"
                      variant={room.isActive ? "default" : "outline"}
                    >
                      {room.isActive ? (
                        <>
                          <Video className="h-4 w-4 mr-2" />
                          Join Now
                        </>
                      ) : (
                        <>
                          <Calendar className="h-4 w-4 mr-2" />
                          View Details
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredRooms.length === 0 && (
              <div className="text-center py-12">
                <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No rooms found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or create a new room.
                </p>
                <Button onClick={() => setSearchTerm('')}>
                  Clear Search
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Create Room Tab */}
          <TabsContent value="create">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Create New Meeting Room
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="room-name">Room Name</Label>
                  <Input
                    id="room-name"
                    placeholder="Enter room name..."
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="room-description">Description (Optional)</Label>
                  <Textarea
                    id="room-description"
                    placeholder="Describe the purpose of this meeting..."
                    value={roomDescription}
                    onChange={(e) => setRoomDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Features Included</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• HD Video & Audio</li>
                      <li>• Real-time Chat</li>
                      <li>• Screen Sharing</li>
                      <li>• Recording (Coming Soon)</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Room Settings</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Max 10 participants</li>
                      <li>• Public room</li>
                      <li>• Instant access</li>
                      <li>• 4 hour duration</li>
                    </ul>
                  </div>
                </div>
                
                <Button 
                  onClick={createRoom} 
                  disabled={!roomName.trim()} 
                  size="lg" 
                  className="w-full"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create Room & Start Meeting
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Join Room Tab */}
          <TabsContent value="join">
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Join Existing Room</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="room-id">Room ID</Label>
                  <Input
                    id="room-id"
                    placeholder="Enter room ID..."
                    value={joinRoomId}
                    onChange={(e) => setJoinRoomId(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Ask the meeting host for the room ID
                  </p>
                </div>
                
                <Button 
                  onClick={() => joinRoom()} 
                  disabled={!joinRoomId.trim()} 
                  size="lg" 
                  className="w-full"
                >
                  <ArrowRight className="h-5 w-5 mr-2" />
                  Join Room
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VirtualMeetings;