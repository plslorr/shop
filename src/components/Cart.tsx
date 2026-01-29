import { CartItem as CartItemType } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CartProps {
  items: CartItemType[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onCheckout: () => void;
  total: number;
}

export const Cart = ({
  items,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  total,
}: CartProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-paper-white paper-texture border-l-4 border-washi-mint w-full sm:max-w-md flex flex-col">
        {/* Decorative tape */}
        <div className="absolute top-4 -left-2 h-24 w-8 bg-washi-pink opacity-80" style={{ transform: 'rotate(-2deg)' }} />
        
        <SheetHeader className="border-b border-dashed border-border pb-4">
          <SheetTitle className="font-handwritten text-3xl text-ink-brown flex items-center gap-2">
            <ShoppingBag className="h-7 w-7" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <div className="w-20 h-20 bg-paper-cream rounded-full flex items-center justify-center mb-4 shadow-paper">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <p className="font-handwritten text-2xl text-ink-gray mb-2">Your cart is empty!</p>
            <p className="font-body text-muted-foreground text-sm">Add some cute stickers to get started</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-paper-cream p-3 rounded-sm shadow-paper flex gap-3"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-sm shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-handwritten text-xl text-ink-brown truncate">
                        {item.product.name}
                      </h4>
                      <p className="font-body text-sm text-muted-foreground">
                        ${item.product.price.toFixed(2)} each
                      </p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-border rounded overflow-hidden bg-paper-white">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-muted transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              onUpdateQuantity(item.product.id, parseInt(e.target.value) || 1)
                            }
                            className="w-10 h-6 text-center border-0 p-0 text-xs bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-muted transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => onRemove(item.product.id)}
                          className="p-1 text-destructive hover:bg-destructive/10 rounded transition-colors ml-auto"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="font-handwritten text-lg text-ink-brown">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <SheetFooter className="border-t border-dashed border-border pt-4 flex-col gap-4">
              <div className="flex justify-between items-center w-full">
                <span className="font-handwritten text-2xl text-ink-gray">Total</span>
                <span className="font-handwritten text-3xl text-ink-brown px-4 py-1 rounded-full bg-washi-yellow">
                  ${total.toFixed(2)}
                </span>
              </div>
              <Button
                onClick={onCheckout}
                className="w-full font-body bg-primary hover:bg-primary/90 text-primary-foreground"
                size="lg"
              >
                Buy Now
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
