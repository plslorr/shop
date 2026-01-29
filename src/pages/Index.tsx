import { useState } from 'react';
import { Product } from '@/types/product';
import { products } from '@/data/products';
import { useCart } from '@/hooks/use-cart';
import { ProductCard } from '@/components/ProductCard';
import { ProductModal } from '@/components/ProductModal';
import { Cart } from '@/components/Cart';
import { CartButton } from '@/components/CartButton';
import { Receipt } from '@/components/Receipt';
import { Header } from '@/components/Header';
import { Input } from '@/components/ui/input';
import { TapeVariant } from '@/components/Tape';
import backgroundImage from '@/assets/background/background.png';
import grassImage from '@/assets/background/grass.png';
import { Sparkles, Search } from 'lucide-react';

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

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptItems, setReceiptItems] = useState<typeof cart.items>([]);
  const [receiptTotal, setReceiptTotal] = useState(0);
  const [receiptDiscount, setReceiptDiscount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const cart = useCart();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCheckout = () => {
    setReceiptItems([...cart.items]);
    setReceiptTotal(cart.total);
    setReceiptDiscount(cart.discount);
    cart.clearCart();
    cart.setIsOpen(false);
    setShowReceipt(true);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Overlay for readability */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-paper-white/30" />

      {/* Fixed Grass */}
      <div className="fixed bottom-0 left-0 right-0 z-[5] pointer-events-none translate-y-10 md:translate-y-20 flex justify-center items-end overflow-hidden">
        <img 
          src={grassImage} 
          alt="" 
          className="flex-shrink-0 w-[250%] md:w-full h-auto object-cover max-w-none" 
        />

      </div>

      {/* Cart Button */}
      <CartButton itemCount={cart.itemCount} onClick={() => cart.setIsOpen(true)} />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />

        {/* Search Bar */}
        <div className="container mx-auto px-4 pb-8 flex justify-center sticky top-4 z-40">
           <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Search stickers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-white/90 backdrop-blur-sm border-2 border-primary/20 focus:border-primary/50 text-lg shadow-sm rounded-full font-handwritten"
            />
          </div>
        </div>

        {/* Product Grid */}
        <main className="container mx-auto px-4 pb-16 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={cart.addToCart}
                onClick={() => setSelectedProduct(product)}
                rotation={rotations[index % rotations.length]}
                tapeVariant={(index % 8 + 1) as TapeVariant}
              />
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-6">
          <div className="inline-block bg-paper-white/90 px-6 py-3 rounded-sm shadow-paper backdrop-blur-sm">
            <p className="font-handwritten text-lg text-ink-gray">
              More content on @plslorr
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
        subtotal={cart.subtotal}
        discount={cart.discount}
        total={cart.total}
      />

      {/* Receipt Modal */}
      <Receipt
        items={receiptItems}
        total={receiptTotal}
        discount={receiptDiscount}
        isOpen={showReceipt}
        onClose={() => setShowReceipt(false)}
      />
    </div>
  );
};

export default Index;
