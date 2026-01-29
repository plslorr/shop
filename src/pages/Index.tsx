import { useState } from 'react';
import { Product } from '@/types/product';
import { products } from '@/data/products';
import { useCart } from '@/hooks/use-cart';
import { ProductCard } from '@/components/ProductCard';
import { ProductModal } from '@/components/ProductModal';
import { Cart } from '@/components/Cart';
import { CartButton } from '@/components/CartButton';
import { Receipt } from '@/components/Receipt';
import backgroundImage from '@/assets/background-hills.jpg';
import { Sparkles } from 'lucide-react';

const rotations = [
  '-rotate-2',
  'rotate-1',
  '-rotate-1',
  'rotate-2',
  'rotate-0',
  '-rotate-3',
  'rotate-3',
  '-rotate-1',
];

const tapeColors: ('pink' | 'mint' | 'yellow' | 'blue' | 'lavender')[] = [
  'pink',
  'mint',
  'yellow',
  'blue',
  'lavender',
  'pink',
  'mint',
  'yellow',
];

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptItems, setReceiptItems] = useState<typeof cart.items>([]);
  const [receiptTotal, setReceiptTotal] = useState(0);

  const cart = useCart();

  const handleCheckout = () => {
    setReceiptItems([...cart.items]);
    setReceiptTotal(cart.total);
    cart.clearCart();
    cart.setIsOpen(false);
    setShowReceipt(true);
  };

  return (
    <div className="min-h-screen relative">
      {/* Fixed Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* Overlay for readability */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-paper-white/30" />

      {/* Cart Button */}
      <CartButton itemCount={cart.itemCount} onClick={() => cart.setIsOpen(true)} />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="pt-8 pb-6 text-center">
          <div className="inline-block bg-paper-white/95 px-8 py-4 rounded-sm shadow-polaroid backdrop-blur-sm">
            {/* Decorative tape */}
            <div className="absolute -top-3 left-4 h-6 w-16 bg-washi-pink opacity-80" style={{ transform: 'rotate(-5deg)' }} />
            <div className="absolute -top-3 right-4 h-6 w-14 bg-washi-mint opacity-80" style={{ transform: 'rotate(3deg)' }} />
            
            <h1 className="font-handwritten text-5xl md:text-6xl text-ink-brown flex items-center justify-center gap-2">
              <Sparkles className="h-8 w-8 text-washi-yellow" />
              Sticker Shop
              <Sparkles className="h-8 w-8 text-washi-yellow" />
            </h1>
            <p className="font-body text-ink-gray mt-2">handmade with love ♥</p>
          </div>
        </header>

        {/* Product Grid */}
        <main className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={cart.addToCart}
                onClick={() => setSelectedProduct(product)}
                rotation={rotations[index % rotations.length]}
                tapeColor={tapeColors[index % tapeColors.length]}
              />
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-6">
          <div className="inline-block bg-paper-white/90 px-6 py-3 rounded-sm shadow-paper backdrop-blur-sm">
            <p className="font-handwritten text-lg text-ink-gray">
              Made with ✨ and lots of stickers
            </p>
          </div>
        </footer>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={cart.addToCart}
      />

      {/* Cart Sheet */}
      <Cart
        items={cart.items}
        isOpen={cart.isOpen}
        onClose={() => cart.setIsOpen(false)}
        onUpdateQuantity={cart.updateQuantity}
        onRemove={cart.removeFromCart}
        onCheckout={handleCheckout}
        total={cart.total}
      />

      {/* Receipt Modal */}
      <Receipt
        items={receiptItems}
        total={receiptTotal}
        isOpen={showReceipt}
        onClose={() => setShowReceipt(false)}
      />
    </div>
  );
};

export default Index;
