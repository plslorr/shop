import { useState, useCallback } from 'react';
import { CartItem, Product } from '@/types/product';
import discountsData from '@/data/discounts.json';

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = useCallback((product: Product, quantity: number) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const calculateDiscount = useCallback((currentItems: CartItem[]) => {
    const groupQuantities = currentItems.reduce((acc, item) => {
      if (item.product.discountGroup && item.product.discountGroup !== -1) {
        acc[item.product.discountGroup] = (acc[item.product.discountGroup] || 0) + item.quantity;
      }
      return acc;
    }, {} as Record<number, number>);

    return Object.entries(groupQuantities).reduce((totalDiscount, [groupId, quantity]) => {
      const discountRule = discountsData.find(d => d.id === Number(groupId));
      if (discountRule && quantity >= discountRule.minimumItems) {
        // Apply discount for every set of minimumItems
        const multiplier = Math.floor(quantity / discountRule.minimumItems);
        return totalDiscount + (multiplier * discountRule.discountPrice);
      }
      return totalDiscount;
    }, 0);
  }, []);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discount = calculateDiscount(items);
  const total = Math.max(0, subtotal + discount);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items,
    isOpen,
    setIsOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discount,
    total,
    itemCount,
  };
};
