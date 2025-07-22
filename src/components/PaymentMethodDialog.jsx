
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, Smartphone } from 'lucide-react';

const PaymentMethodDialog = ({ isOpen, onClose, onSelectMethod, totalAmount }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleConfirm = () => {
    if (selectedMethod) {
      onSelectMethod(selectedMethod);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Payment Method</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Total Amount: <span className="font-bold">KSH {totalAmount.toFixed(2)}</span>
          </p>
          
          <div className="space-y-3">
            <Card 
              className={`cursor-pointer transition-colors ${
                selectedMethod === 'mpesa' ? 'ring-2 ring-primary' : 'hover:bg-muted/50'
              }`}
              onClick={() => setSelectedMethod('mpesa')}
            >
              <CardContent className="flex items-center space-x-3 p-4">
                <Smartphone className="h-6 w-6 text-green-600" />
                <div className="flex-1">
                  <h3 className="font-medium">M-Pesa</h3>
                  <p className="text-sm text-muted-foreground">Pay with your mobile money</p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedMethod === 'mpesa' ? 'bg-primary border-primary' : 'border-muted-foreground'
                }`} />
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-colors ${
                selectedMethod === 'card' ? 'ring-2 ring-primary' : 'hover:bg-muted/50'
              }`}
              onClick={() => setSelectedMethod('card')}
            >
              <CardContent className="flex items-center space-x-3 p-4">
                <CreditCard className="h-6 w-6 text-blue-600" />
                <div className="flex-1">
                  <h3 className="font-medium">Credit/Debit Card</h3>
                  <p className="text-sm text-muted-foreground">Pay with Visa, Mastercard, etc.</p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedMethod === 'card' ? 'bg-primary border-primary' : 'border-muted-foreground'
                }`} />
              </CardContent>
            </Card>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleConfirm} 
              disabled={!selectedMethod}
              className="flex-1"
            >
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethodDialog;
