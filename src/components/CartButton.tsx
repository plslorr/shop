import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CartButtonProps {
  itemCount: number;
  onClick: () => void;
}

export const CartButton = ({ itemCount, onClick }: CartButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className={cn(
        'fixed top-4 right-4 z-50 shadow-lg font-body',
        'bg-paper-white hover:bg-paper-cream text-ink-brown border-2 border-border',
        'flex items-center gap-2 rounded-full px-5 transition-all duration-300',
        itemCount > 0 && 'animate-pop-in'
      )}
    >
      <ShoppingCart className="h-5 w-5" />
      <span className="font-handwritten text-xl">Cart</span>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 w-6 h-6 bg-washi-pink text-ink-brown rounded-full flex items-center justify-center font-handwritten text-lg shadow-sm">
          {itemCount}
        </span>
      )}
    </Button>
  );
};
