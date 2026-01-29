import { CartItem } from '@/types/product';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CheckCircle, Sparkles } from 'lucide-react';
import { format } from 'date-fns';

interface ReceiptProps {
  items: CartItem[];
  total: number;
  isOpen: boolean;
  onClose: () => void;
}

export const Receipt = ({ items, total, isOpen, onClose }: ReceiptProps) => {
  const receiptNumber = `STK-${Date.now().toString().slice(-8)}`;
  const date = format(new Date(), 'MMMM d, yyyy');
  const time = format(new Date(), 'h:mm a');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-paper-white paper-texture border-2 border-dashed border-border p-0 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 h-8 w-28 bg-washi-mint opacity-80" style={{ transform: 'translateX(-50%) rotate(1deg)' }} />
        
        <div className="p-6 pt-10">
          {/* Header with success icon */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-accent/30 rounded-full flex items-center justify-center mx-auto mb-3 animate-pop-in">
              <CheckCircle className="h-10 w-10 text-accent-foreground" />
            </div>
            <DialogHeader>
              <DialogTitle className="font-handwritten text-4xl text-ink-brown">
                Thank You!
              </DialogTitle>
            </DialogHeader>
            <p className="font-body text-muted-foreground mt-1">Your order has been placed</p>
          </div>

          {/* Receipt details */}
          <div className="bg-paper-cream p-4 rounded-sm shadow-paper space-y-4">
            {/* Store info */}
            <div className="text-center border-b border-dashed border-border pb-3">
              <h3 className="font-handwritten text-2xl text-ink-brown flex items-center justify-center gap-1">
                <Sparkles className="h-5 w-5" />
                Sticker Shop
                <Sparkles className="h-5 w-5" />
              </h3>
              <p className="font-body text-sm text-muted-foreground">{date} at {time}</p>
              <p className="font-body text-xs text-muted-foreground">Order #{receiptNumber}</p>
            </div>

            {/* Items */}
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="font-body text-ink-gray">
                    {item.product.name} x{item.quantity}
                  </span>
                  <span className="font-body text-ink-brown">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-dashed border-border" />

            {/* Subtotal, Tax, Total */}
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-body text-muted-foreground">Subtotal</span>
                <span className="font-body text-ink-gray">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-body text-muted-foreground">Shipping</span>
                <span className="font-body text-ink-gray">$0.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-body text-muted-foreground">Tax</span>
                <span className="font-body text-ink-gray">${(total * 0.08).toFixed(2)}</span>
              </div>
            </div>

            {/* Grand Total */}
            <div className="border-t-2 border-border pt-2">
              <div className="flex justify-between items-center">
                <span className="font-handwritten text-xl text-ink-gray">Grand Total</span>
                <span className="font-handwritten text-2xl text-ink-brown px-3 py-1 rounded-full bg-washi-yellow">
                  ${(total * 1.08).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Footer message */}
          <div className="text-center mt-6">
            <p className="font-handwritten text-lg text-ink-gray mb-4">
              ✨ Thanks for shopping with us! ✨
            </p>
            <Button
              onClick={onClose}
              className="font-body bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
