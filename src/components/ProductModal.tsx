import { useState } from 'react';
import { Product } from '@/types/product';
import { Tape, TapeVariant } from '@/components/Tape';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus, Minus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductModalProps) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90%] md:w-full max-w-2xl bg-transparent border-none shadow-none p-0 !overflow-visible">
        {/* Rough background */}
        <div className="absolute inset-0 bg-paper-white paper-texture border-2 border-border rough-edges rounded-sm" />

        {/* Decorative washi tape */}
        <Tape variant={(Math.floor(Math.random() * 8) + 1) as TapeVariant} className="-top-3 left-4 md:left-8 -rotate-2 opacity-90 z-20" />
        <Tape variant={(Math.floor(Math.random() * 8) + 1) as TapeVariant} className="-top-3 right-4 md:right-8 rotate-3 opacity-90 z-20" />

        <div className="relative p-4 md:p-6 pt-10 md:pt-8 z-10">
          <DialogHeader className="mb-4">
            <DialogTitle className="font-handwritten text-3xl md:text-4xl text-ink-brown">
              {product.name}
            </DialogTitle>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {/* Image */}
            <div className="bg-paper-cream p-2 shadow-polaroid relative">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                className={cn(
                  "w-full aspect-square object-cover",
                  product.soldOut && "opacity-60 grayscale-[0.5]"
                )}
              />
              {product.soldOut && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <span className="bg-red-500/90 text-white font-handwritten px-6 py-2 text-3xl rotate-[-15deg] shadow-lg border-4 border-white/50">
                    SOLD OUT
                  </span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-4">
              <p className="text-ink-gray font-body leading-relaxed">
                {product.description}
              </p>

              {/* Specs in scrapbook style */}
              <div className="bg-paper-cream p-4 rounded-sm shadow-paper space-y-2">
                <div className="flex justify-between border-b border-dashed border-border pb-2">
                  <span className="font-handwritten text-lg text-ink-gray">Height</span>
                  <span className="font-body text-ink-brown">{product.height}</span>
                </div>
                <div className="flex justify-between border-b border-dashed border-border pb-2">
                  <span className="font-handwritten text-lg text-ink-gray">Width</span>
                  <span className="font-body text-ink-brown">{product.width}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-handwritten text-lg text-ink-gray">Material</span>
                  <span className="font-body text-ink-brown">{product.material}</span>
                </div>
              </div>

              {/* Price tag */}
              <div className="inline-block px-4 py-2 rounded-full bg-washi-yellow font-handwritten text-xl md:text-2xl text-ink-brown">
                ${product.price.toFixed(2)}
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-3 pt-2">
                <div className={cn(
                  "flex items-center border-2 border-border rounded-lg overflow-hidden bg-paper-cream",
                  product.soldOut && "opacity-50 pointer-events-none"
                )}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={product.soldOut}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    disabled={product.soldOut}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-14 h-10 text-center border-0 p-0 bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={product.soldOut}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  disabled={product.soldOut}
                  className={cn(
                    "flex-1 font-body text-primary-foreground",
                    product.soldOut 
                      ? "bg-muted text-muted-foreground hover:bg-muted cursor-not-allowed" 
                      : "bg-primary hover:bg-primary/90"
                  )}
                  size="lg"
                >
                  {product.soldOut ? "Sold Out" : "Add to Cart"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
