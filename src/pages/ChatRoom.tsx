import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Send, 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff,
  Users,
  Settings,
  Share,
  MoreVertical,
  MessageSquare,
  Camera,
  Monitor
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Message {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'system';
}

interface Participant {
  id: string;
  name: string;
  avatar?: string;
  isHost: boolean;
  isMuted: boolean;
  isVideoOn: boolean;
  isOnline: boolean;
}

const ChatRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Mock room data - replace with actual API calls
    const mockMessages: Message[] = [
      {
        id: '1',
        userId: 'system',
        userName: 'System',
        message: 'Welcome to the meeting room!',
        timestamp: new Date(Date.now() - 300000),
        type: 'system'
      },
      {
        id: '2',
        userId: 'user1',
        userName: 'Sarah Johnson',
        message: 'Hi everyone! Ready for the meeting?',
        timestamp: new Date(Date.now() - 180000),
        type: 'text'
      },
      {
        id: '3',
        userId: 'user2',
        userName: 'Mike Chen',
        message: 'Yes, looking forward to it!',
        timestamp: new Date(Date.now() - 120000),
        type: 'text'
      }
    ];

    const mockParticipants: Participant[] = [
      {
        id: user?.id || 'current-user',
        name: user?.name || 'You',
        avatar: user?.avatar,
        isHost: true,
        isMuted: false,
        isVideoOn: false,
        isOnline: true
      },
      {
        id: 'user1',
        name: 'Sarah Johnson',
        isHost: false,
        isMuted: false,
        isVideoOn: true,
        isOnline: true
      },
      {
        id: 'user2',
        name: 'Mike Chen',
        isHost: false,
        isMuted: true,
        isVideoOn: false,
        isOnline: true
      }
    ];

    setMessages(mockMessages);
    setParticipants(mockParticipants);
  }, [isAuthenticated, navigate, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim() || !user) return;

    const message: Message = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      message: newMessage.trim(),
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // TODO: Send to backend
    console.log('Sending message:', message);
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    // TODO: Update backend
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // TODO: Update backend
  };

  const joinCall = () => {
    setIsInCall(true);
    // TODO: Initialize video call
  };

  const leaveCall = () => {
    setIsInCall(false);
    setIsVideoOn(false);
    setIsMuted(false);
    // TODO: Leave video call
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-background border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Meeting Room #{roomId}</h1>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {participants.length} participants
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Room Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Users className="h-4 w-4 mr-2" />
                    Manage Participants
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Video Call Section */}
        <div className="bg-black/90 p-6 border-b">
          {isInCall ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[300px]">
              {/* Your Video */}
              <Card className="relative bg-muted overflow-hidden">
                <CardContent className="p-0 h-48 flex items-center justify-center">
                  {isVideoOn ? (
                    <div className="bg-gradient-to-br from-primary/20 to-secondary/20 w-full h-full flex items-center justify-center">
                      <Camera className="h-12 w-12 text-muted-foreground" />
                      <span className="ml-2 text-muted-foreground">Your Video</span>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Avatar className="h-16 w-16 mx-auto mb-2">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <p className="text-sm text-muted-foreground">You</p>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 flex space-x-1">
                    {isMuted && <Badge variant="destructive" className="h-6 w-6 p-0 flex items-center justify-center"><MicOff className="h-3 w-3" /></Badge>}
                  </div>
                </CardContent>
              </Card>

              {/* Other Participants */}
              {participants.filter(p => p.id !== user?.id).map((participant) => (
                <Card key={participant.id} className="relative bg-muted overflow-hidden">
                  <CardContent className="p-0 h-48 flex items-center justify-center">
                    {participant.isVideoOn ? (
                      <div className="bg-gradient-to-br from-accent/20 to-primary/20 w-full h-full flex items-center justify-center">
                        <Camera className="h-12 w-12 text-muted-foreground" />
                      </div>
                    ) : (
                      <div className="text-center">
                        <Avatar className="h-16 w-16 mx-auto mb-2">
                          <AvatarImage src={participant.avatar} />
                          <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className="text-sm text-muted-foreground">{participant.name}</p>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 flex space-x-1">
                      {participant.isMuted && <Badge variant="destructive" className="h-6 w-6 p-0 flex items-center justify-center"><MicOff className="h-3 w-3" /></Badge>}
                      {participant.isHost && <Badge variant="secondary" className="text-xs">Host</Badge>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-white">
              <Monitor className="h-16 w-16 mx-auto mb-4 text-white/60" />
              <h3 className="text-xl font-semibold mb-2">Ready to join the video call?</h3>
              <p className="text-white/80 mb-6">Connect with other participants face-to-face</p>
              <Button onClick={joinCall} size="lg" className="bg-green-600 hover:bg-green-700">
                <Video className="h-5 w-5 mr-2" />
                Join Video Call
              </Button>
            </div>
          )}

          {/* Call Controls */}
          {isInCall && (
            <div className="flex justify-center space-x-4 mt-6">
              <Button
                onClick={toggleMute}
                variant={isMuted ? "destructive" : "secondary"}
                size="lg"
                className="rounded-full h-12 w-12 p-0"
              >
                {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              
              <Button
                onClick={toggleVideo}
                variant={isVideoOn ? "secondary" : "outline"}
                size="lg"
                className="rounded-full h-12 w-12 p-0"
              >
                {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </Button>
              
              <Button
                onClick={leaveCall}
                variant="destructive"
                size="lg"
                className="rounded-full h-12 w-12 p-0"
              >
                <PhoneOff className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>

        {/* Chat Section */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b">
            <h2 className="font-semibold flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Chat
            </h2>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id}>
                  {message.type === 'system' ? (
                    <div className="text-center">
                      <Badge variant="outline" className="text-xs">
                        {message.message}
                      </Badge>
                    </div>
                  ) : (
                    <div className={`flex ${message.userId === user?.id ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md ${message.userId === user?.id ? 'order-2' : ''}`}>
                        <div className={`flex items-center space-x-2 mb-1 ${message.userId === user?.id ? 'justify-end' : ''}`}>
                          {message.userId !== user?.id && (
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">{message.userName.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {message.userName} • {formatTime(message.timestamp)}
                          </span>
                        </div>
                        <div className={`rounded-lg p-3 ${
                          message.userId === user?.id 
                            ? 'bg-primary text-primary-foreground ml-auto' 
                            : 'bg-muted'
                        }`}>
                          <p className="text-sm">{message.message}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1"
              />
              <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Participants Sidebar */}
      <div className="w-80 border-l bg-background">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Participants ({participants.length})</h3>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-3">
            {participants.map((participant) => (
              <div key={participant.id} className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {participant.isOnline && (
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium truncate">{participant.name}</p>
                    {participant.isHost && (
                      <Badge variant="secondary" className="text-xs">Host</Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    {participant.isMuted ? (
                      <MicOff className="h-3 w-3 text-muted-foreground" />
                    ) : (
                      <Mic className="h-3 w-3 text-green-500" />
                    )}
                    {participant.isVideoOn ? (
                      <Video className="h-3 w-3 text-green-500" />
                    ) : (
                      <VideoOff className="h-3 w-3 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ChatRoom;
