import { CheckCircle, AlertCircle, Clock, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Status = () => {
  const services = [
    {
      name: 'Website & App',
      status: 'operational',
      uptime: '99.98%',
      responseTime: '245ms'
    },
    {
      name: 'Booking System',
      status: 'operational',
      uptime: '99.95%',
      responseTime: '180ms'
    },
    {
      name: 'Payment Processing',
      status: 'operational',
      uptime: '99.99%',
      responseTime: '320ms'
    },
    {
      name: 'Real-time Chat',
      status: 'maintenance',
      uptime: '99.92%',
      responseTime: '150ms'
    },
    {
      name: 'Search & Discovery',
      status: 'operational',
      uptime: '99.97%',
      responseTime: '95ms'
    },
    {
      name: 'Email Notifications',
      status: 'operational',
      uptime: '99.94%',
      responseTime: '2.1s'
    }
  ];

  const incidents = [
    {
      title: 'Scheduled Maintenance - Real-time Chat',
      status: 'maintenance',
      time: '2 hours ago',
      description: 'Performing routine maintenance on chat services. Expected completion in 1 hour.'
    },
    {
      title: 'Payment Processing - Resolved',
      status: 'resolved',
      time: '1 day ago',
      description: 'Brief intermittent issues with payment processing have been fully resolved.'
    },
    {
      title: 'Search Performance - Resolved',
      status: 'resolved',
      time: '3 days ago',
      description: 'Improved search response times after infrastructure optimization.'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'bg-green-500';
      case 'maintenance': return 'bg-yellow-500';
      case 'degraded': return 'bg-orange-500';
      case 'outage': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'maintenance': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'degraded': return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case 'outage': return <AlertCircle className="h-5 w-5 text-red-500" />;
      default: return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'operational': return 'Operational';
      case 'maintenance': return 'Maintenance';
      case 'degraded': return 'Degraded';
      case 'outage': return 'Outage';
      case 'resolved': return 'Resolved';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Service 
            <span className="bg-gradient-accent bg-clip-text text-transparent"> Status</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Monitor the current status and performance of all Oakyard services.
          </p>
          
          {/* Overall Status */}
          <div className="max-w-md mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-lg font-semibold">All Systems Operational</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Last updated: {new Date().toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Status */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Service Status</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real-time status of all our services and infrastructure components.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {services.map((service, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(service.status)}
                      <div>
                        <h3 className="font-semibold">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {getStatusText(service.status)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-semibold">{service.uptime}</div>
                        <div className="text-muted-foreground">Uptime</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{service.responseTime}</div>
                        <div className="text-muted-foreground">Response</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-green-500" />
                        <Badge variant="outline" className="text-xs">
                          {getStatusText(service.status)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Incidents */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recent Incidents</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Latest updates on service incidents and maintenance windows.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {incidents.map((incident, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{incident.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant={incident.status === 'resolved' ? 'default' : 'secondary'}>
                        {getStatusText(incident.status)}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{incident.time}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{incident.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Performance Metrics</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Key performance indicators for the last 30 days.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-500 mb-2">99.97%</div>
                <h3 className="font-semibold mb-2">Overall Uptime</h3>
                <p className="text-sm text-muted-foreground">
                  Average uptime across all services
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-500 mb-2">185ms</div>
                <h3 className="font-semibold mb-2">Avg Response Time</h3>
                <p className="text-sm text-muted-foreground">
                  Average API response time
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-500 mb-2">3</div>
                <h3 className="font-semibold mb-2">Total Incidents</h3>
                <p className="text-sm text-muted-foreground">
                  Resolved incidents this month
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Status;