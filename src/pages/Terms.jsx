import { FileText, AlertCircle, Scale, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  const lastUpdated = "January 15, 2025";
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Terms of 
            <span className="bg-gradient-accent bg-clip-text text-transparent"> Service</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
          <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Acceptance of Terms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  By accessing or using the Oakyard platform, you agree to be bound by these Terms of Service 
                  and all applicable laws and regulations. If you do not agree with any of these terms, 
                  you are prohibited from using or accessing this service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Accounts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Account Creation</h3>
                  <p className="text-muted-foreground">
                    To use certain features of our service, you must create an account. You are responsible 
                    for maintaining the confidentiality of your account information and for all activities 
                    that occur under your account.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Account Responsibilities</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">Provide accurate and complete information</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">Maintain the security of your password</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">Notify us immediately of any unauthorized use</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Permitted Use</h3>
                  <p className="text-muted-foreground">
                    You may use our service only for lawful purposes and in accordance with these Terms. 
                    You agree not to use the service in any way that could damage, disable, or impair the service.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Prohibited Activities</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <div className="h-2 w-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">Violating any applicable laws or regulations</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="h-2 w-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">Impersonating another person or entity</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="h-2 w-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">Transmitting malicious code or viruses</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="h-2 w-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">Attempting to gain unauthorized access</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bookings and Payments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Booking Terms</h3>
                  <p className="text-muted-foreground">
                    When you make a booking, you enter into a contract with the space owner. We act as a 
                    platform to facilitate these transactions but are not a party to the agreement between 
                    you and the space owner.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Payment Processing</h3>
                  <p className="text-muted-foreground">
                    All payments are processed through our secure payment system. You agree to pay all 
                    charges incurred by you or on your behalf through the service.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Cancellation Policy</h3>
                  <p className="text-muted-foreground">
                    Cancellation policies are set by individual space owners. Please review the specific 
                    cancellation policy for each space before booking.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Liability and Disclaimers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Service Availability</h3>
                  <p className="text-muted-foreground">
                    We strive to provide uninterrupted service but cannot guarantee that the service will 
                    be available at all times. We reserve the right to suspend or terminate the service 
                    for maintenance or other reasons.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Limitation of Liability</h3>
                  <p className="text-muted-foreground">
                    To the fullest extent permitted by law, Oakyard shall not be liable for any indirect, 
                    incidental, special, consequential, or punitive damages arising out of or relating to 
                    your use of the service.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Termination
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We may terminate or suspend your account and access to the service immediately, without 
                  prior notice or liability, for any reason whatsoever, including without limitation if 
                  you breach the Terms.
                </p>
                <p className="text-muted-foreground">
                  Upon termination, your right to use the service will cease immediately. All provisions 
                  of the Terms which by their nature should survive termination shall survive termination.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We reserve the right to modify or replace these Terms at any time. If a revision is 
                  material, we will provide at least 30 days notice prior to any new terms taking effect. 
                  What constitutes a material change will be determined at our sole discretion.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-4 space-y-2">
                  <p className="text-sm"><strong>Email:</strong> legal@oakyard.com</p>
                  <p className="text-sm"><strong>Address:</strong> 123 Business Street, Nairobi, Kenya</p>
                  <p className="text-sm"><strong>Phone:</strong> +254 711 110 707</p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;