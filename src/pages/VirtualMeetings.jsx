import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { meetingsApi } from '../services/meetingsApi';
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
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMeetings();
  }, []);

  const loadMeetings = async () => {
    try {
      setLoading(true);
      const data = await meetingsApi.getMeetings();
      setMeetings(data);
    } catch (error) {
      console.error('Error loading meetings:', error);
    } finally {
      setLoading(false);
    }
  };

  const createRoom = async () => {
    if (!roomName.trim() || !isAuthenticated) return;

    try {
      const meetingData = {
        title: roomName.trim(),
        description: roomDescription.trim(),
        scheduledAt: new Date().toISOString(),
        duration: 240, // 4 hours
        hostId: user?.id,
        hostName: user?.name || 'Anonymous User',
        maxParticipants: 10
      };

      const newMeeting = await meetingsApi.createMeeting(meetingData);
      setRoomName('');
      setRoomDescription('');
      
      // Navigate to the new room
      navigate(`/chat-room/${newMeeting.id}`);
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  };

  const joinRoom = async (roomId) => {
    const targetRoomId = roomId || joinRoomId;
    if (!targetRoomId.trim()) return;

    try {
      let meeting = null;
      
      // First try to find by ID (UUID)
      try {
        meeting = await meetingsApi.getMeeting(targetRoomId);
      } catch (error) {
        // If not found by ID, try to find by meeting code
        meeting = await meetingsApi.getMeetingByCode(targetRoomId);
      }
      
      if (meeting) {
        navigate(`/chat-room/${meeting.id}`);
      } else {
        alert('Meeting not found. Please check the meeting ID or code.');
      }
    } catch (error) {
      console.error('Error joining meeting:', error);
      alert('Meeting not found. Please check the meeting ID or code.');
    }
  };

  const filteredMeetings = meetings.filter(meeting =>
    meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (meeting.description && meeting.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (meeting.host_name && meeting.host_name.toLowerCase().includes(searchTerm.toLowerCase()))
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

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader className="pb-3">
                      <div className="h-6 bg-muted rounded mb-2"></div>
                      <div className="h-4 bg-muted rounded w-2/3"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="h-4 bg-muted rounded"></div>
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="h-10 bg-muted rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMeetings.map((meeting) => (
                    <Card key={meeting.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-1">{meeting.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              Hosted by {meeting.host_name || 'Unknown Host'}
                            </p>
                          </div>
                          <Badge variant={meeting.is_active ? "default" : "secondary"}>
                            {meeting.is_active ? "Active" : "Scheduled"}
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {meeting.description || 'No description provided'}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>0/{meeting.max_participants}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {formatTime(new Date(meeting.scheduled_at))}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Meeting Code:</span>
                            <code className="bg-muted px-2 py-1 rounded text-foreground font-mono">
                              {meeting.meeting_code}
                            </code>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button 
                              onClick={() => joinRoom(meeting.id)} 
                              className="flex-1"
                              variant="default"
                            >
                              <Video className="h-4 w-4 mr-2" />
                              Join Meeting
                            </Button>
                            <Button 
                              onClick={() => {
                                navigator.clipboard.writeText(`${window.location.origin}/chat-room/${meeting.id}`);
                                alert('Meeting link copied to clipboard!');
                              }}
                              variant="outline"
                              size="sm"
                            >
                              Share
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredMeetings.length === 0 && !loading && (
                  <div className="text-center py-12">
                    <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No meetings found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchTerm ? 'Try adjusting your search or create a new meeting.' : 'Create your first meeting to get started.'}
                    </p>
                    <Button onClick={() => setSearchTerm('')}>
                      {searchTerm ? 'Clear Search' : 'Create Meeting'}
                    </Button>
                  </div>
                )}
              </>
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
                  <Label htmlFor="room-id">Meeting ID or Code</Label>
                  <Input
                    id="room-id"
                    placeholder="Enter meeting ID or code (e.g., ABC123)..."
                    value={joinRoomId}
                    onChange={(e) => setJoinRoomId(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Ask the meeting host for the meeting ID or 6-character code
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