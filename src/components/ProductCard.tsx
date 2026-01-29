import { useState } from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onClick: () => void;
  rotation?: string;
  tapeColor?: 'pink' | 'mint' | 'yellow' | 'blue' | 'lavender';
}

const tapeColors = {
  pink: 'bg-washi-pink',
  mint: 'bg-washi-mint',
  yellow: 'bg-washi-yellow',
  blue: 'bg-washi-blue',
  lavender: 'bg-washi-lavender',
};

export const ProductCard = ({
  product,
  onAddToCart,
  onClick,
  rotation = 'rotate-0',
  tapeColor = 'pink',
}: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:rotate-0',
        rotation
      )}
    >
      {/* Washi tape decoration */}
      <div
        className={cn(
          'absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-16 opacity-80 shadow-tape z-10',
          tapeColors[tapeColor]
        )}
        style={{ transform: 'translateX(-50%) rotate(-2deg)' }}
      />

      {/* Card */}
      <div className="bg-paper-white p-3 pb-4 shadow-paper rounded-sm paper-texture">
        {/* Image container - polaroid style */}
        <div className="aspect-square overflow-hidden bg-paper-cream mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product info */}
        <div className="space-y-2">
          <h3 className="font-handwritten text-2xl text-ink-brown leading-tight">
            {product.name}
          </h3>
          
          <div className="inline-block px-3 py-1 rounded-full bg-washi-yellow font-handwritten text-xl text-ink-brown">
            ${product.price.toFixed(2)}
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center border border-border rounded-md overflow-hidden bg-paper-cream">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantity(Math.max(1, quantity - 1));
                }}
                className="p-1.5 hover:bg-muted transition-colors"
              >
                <Minus className="h-3 w-3" />
              </button>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-10 h-8 text-center border-0 p-0 text-sm bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantity(quantity + 1);
                }}
                className="p-1.5 hover:bg-muted transition-colors"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
            <Button
              onClick={handleAddToCart}
              size="sm"
              className="flex-1 font-body text-sm bg-primary hover:bg-primary/90"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
