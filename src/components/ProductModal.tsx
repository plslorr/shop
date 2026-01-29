import { useState } from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus, Minus, X } from 'lucide-react';

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
      <DialogContent className="max-w-2xl bg-paper-white paper-texture border-2 border-border p-0 overflow-hidden">
        {/* Decorative washi tape */}
        <div className="absolute -top-1 left-8 h-8 w-24 bg-washi-mint opacity-80 shadow-tape" style={{ transform: 'rotate(-3deg)' }} />
        <div className="absolute -top-1 right-8 h-8 w-20 bg-washi-pink opacity-80 shadow-tape" style={{ transform: 'rotate(4deg)' }} />

        <div className="p-6 pt-8">
          <DialogHeader className="mb-4">
            <DialogTitle className="font-handwritten text-4xl text-ink-brown">
              {product.name}
            </DialogTitle>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Image */}
            <div className="bg-paper-cream p-2 shadow-polaroid">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
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
              <div className="inline-block px-4 py-2 rounded-full bg-washi-yellow font-handwritten text-2xl text-ink-brown">
                ${product.price.toFixed(2)}
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center border-2 border-border rounded-lg overflow-hidden bg-paper-cream">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-14 h-10 text-center border-0 p-0 bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 font-body bg-primary hover:bg-primary/90 text-primary-foreground"
                  size="lg"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
