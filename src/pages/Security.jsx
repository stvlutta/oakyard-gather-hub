import { Shield, Lock, Eye, Key, Server, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Security = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: 'Data Encryption',
      description: 'All sensitive data is encrypted using industry-standard AES-256 encryption both in transit and at rest.',
      details: [
        'SSL/TLS encryption for all data transmission',
        'AES-256 encryption for stored data',
        'End-to-end encryption for messages',
        'Encrypted backups and storage'
      ]
    },
    {
      icon: Lock,
      title: 'Secure Authentication',
      description: 'Multi-factor authentication and secure login protocols protect your account.',
      details: [
        'Two-factor authentication (2FA)',
        'Password strength requirements',
        'Session management and timeout',
        'Account lockout protection'
      ]
    },
    {
      icon: Eye,
      title: 'Privacy Protection',
      description: 'Your personal information is protected with strict privacy controls and policies.',
      details: [
        'GDPR compliance',
        'Data minimization practices',
        'User consent management',
        'Right to data deletion'
      ]
    },
    {
      icon: Key,
      title: 'Access Control',
      description: 'Role-based access control ensures only authorized users can access sensitive information.',
      details: [
        'Role-based permissions',
        'API key management',
        'OAuth 2.0 integration',
        'Regular access reviews'
      ]
    },
    {
      icon: Server,
      title: 'Infrastructure Security',
      description: 'Our infrastructure is secured with enterprise-grade security measures.',
      details: [
        'SOC 2 Type II compliance',
        'Regular security audits',
        'Intrusion detection systems',
        'DDoS protection'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Incident Response',
      description: 'We have comprehensive incident response procedures to handle security events.',
      details: [
        '24/7 security monitoring',
        'Automated threat detection',
        'Incident response team',
        'Regular security training'
      ]
    }
  ];

  const certifications = [
    {
      name: 'SOC 2 Type II',
      description: 'Security, availability, and confidentiality compliance'
    },
    {
      name: 'ISO 27001',
      description: 'Information security management system certification'
    },
    {
      name: 'GDPR Compliant',
      description: 'European data protection regulation compliance'
    },
    {
      name: 'PCI DSS',
      description: 'Payment card industry data security standard'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your 
            <span className="bg-gradient-accent bg-clip-text text-transparent"> Security </span>
            is Our Priority
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            We implement industry-leading security measures to protect your data and ensure your privacy.
          </p>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Security Measures</Badge>
            <h2 className="text-3xl font-bold mb-4">Comprehensive Protection</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our multi-layered security approach ensures your data and privacy are protected at every level.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start space-x-2">
                          <div className="h-2 w-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-muted-foreground">{detail}</span>
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

      {/* Certifications */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Security Certifications</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We maintain industry-standard certifications to ensure the highest level of security and compliance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="h-16 w-16 rounded-full bg-gradient-secondary mx-auto mb-4 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Security Practices</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Data Protection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    We implement strict data protection measures including encryption, access controls, and regular audits to ensure your information remains secure.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span className="text-sm">Regular security assessments</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span className="text-sm">Automated backup systems</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span className="text-sm">Data retention policies</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Continuous Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Our security team monitors our systems 24/7 to detect and respond to potential threats in real-time.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span className="text-sm">Real-time threat detection</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span className="text-sm">Vulnerability scanning</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span className="text-sm">Incident response procedures</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Security Team */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Security Questions?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            If you have any security concerns or questions, our security team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors">
              Contact Security Team
            </button>
            <button className="border border-primary-foreground text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground hover:text-primary transition-colors">
              Report Security Issue
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Security;