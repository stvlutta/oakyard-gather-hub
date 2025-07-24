import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Smartphone, MessageCircle, Copy } from 'lucide-react';
import { toast } from 'sonner';

const MpesaPaymentDialog = ({ isOpen, onClose, totalAmount }) => {
  const mpesaNumber = "254711110707";
  const whatsappNumber = "254711110707";

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5 text-green-600" />
            <span>M-Pesa Payment Instructions</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="text-center">
                  <p className="text-lg font-bold text-green-800">
                    Amount to Pay: KSH {totalAmount.toFixed(2)}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-800">Step 1: Send Payment</h4>
                  <p className="text-sm text-green-700">
                    Send exactly <strong>KSH {totalAmount.toFixed(2)}</strong> to M-Pesa Number:
                  </p>
                  <div className="flex items-center space-x-2 bg-white p-2 rounded border">
                    <span className="font-mono font-bold">{mpesaNumber}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyToClipboard(mpesaNumber)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-green-800 flex items-center space-x-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>Step 2: Confirm Payment</span>
                  </h4>
                  <p className="text-sm text-green-700">
                    After payment, send your M-Pesa confirmation message to WhatsApp:
                  </p>
                  <div className="flex items-center space-x-2 bg-white p-2 rounded border">
                    <span className="font-mono font-bold">{whatsappNumber}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyToClipboard(whatsappNumber)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-green-100 p-3 rounded mt-3">
                  <p className="text-xs text-green-700">
                    <strong>Important:</strong> Your booking will be confirmed once we receive your M-Pesa confirmation message on WhatsApp.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              I'll Pay Later
            </Button>
            <Button 
              onClick={() => {
                toast.success("Payment instructions noted. Please complete payment and send confirmation to WhatsApp.");
                onClose();
              }}
              className="flex-1"
            >
              I Understand
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MpesaPaymentDialog;