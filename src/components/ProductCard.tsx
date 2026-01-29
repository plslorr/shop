import { useState } from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tape, TapeVariant } from '@/components/Tape';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onClick: () => void;
  rotation?: string;
  tapeVariant: TapeVariant;
}

export const ProductCard = ({
  product,
  onAddToCart,
  onClick,
  rotation = 'rotate-0',
  tapeVariant,
}: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  // Generate random tilt between -5 and 5 degrees on mount
  const [tapeRotation] = useState(() => Math.random() * 10 - 5);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:rotate-0 mt-6',
        rotation
      )}
    >
      {/* Washi tape decoration */}
      <Tape 
        variant={tapeVariant}
        className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 z-10"
        style={{ transform: `translateX(-50%) rotate(${tapeRotation}deg)` }}
      />

      {/* Card Background with rough edges */}
      <div className="absolute inset-0 bg-paper-white shadow-paper rounded-sm paper-texture rough-edges" />

      {/* Card Content */}
      <div className="relative p-3 pb-4">
        {/* Image container - polaroid style */}
        <div className="aspect-square overflow-hidden bg-paper-cream mb-3 relative">
          <img
            src={product.image}
            alt={product.name}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              product.soldOut && "opacity-60 grayscale-[0.5]"
            )}
          />
          {product.soldOut && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-red-500/90 text-white font-handwritten px-3 py-1 text-lg rotate-[-15deg] shadow-lg border-2 border-white/50">
                SOLD OUT
              </span>
            </div>
          )}
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
            <div className={cn(
              "flex items-center border border-border rounded-md overflow-hidden bg-paper-cream",
              product.soldOut && "opacity-50 pointer-events-none"
            )}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantity(Math.max(1, quantity - 1));
                }}
                disabled={product.soldOut}
                className="p-1.5 hover:bg-muted transition-colors"
              >
                <Minus className="h-3 w-3" />
              </button>
              <Input
                type="number"
                min="1"
                value={quantity}
                disabled={product.soldOut}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-10 h-8 text-center border-0 p-0 text-sm bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantity(quantity + 1);
                }}
                disabled={product.soldOut}
                className="p-1.5 hover:bg-muted transition-colors"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
            <Button
              onClick={handleAddToCart}
              disabled={product.soldOut}
              size="sm"
              className={cn(
                "flex-1 font-body text-sm",
                product.soldOut 
                  ? "bg-muted text-muted-foreground hover:bg-muted cursor-not-allowed" 
                  : "bg-primary hover:bg-primary/90"
              )}
            >
              {product.soldOut ? "Sold Out" : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
