/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { CustomizeModal } from './components/CustomizeModal';
import { TasteProfiler } from './components/TasteProfiler';
import { BrewGuideCalculator } from './components/BrewGuideCalculator';
import { SlowBarReservation } from './components/SlowBarReservation';
import { RoasteryStory } from './components/RoasteryStory';
import { CartDrawer } from './components/CartDrawer';
import { LocationHours } from './components/LocationHours';
import { Footer } from './components/Footer';
import { MenuItem, CartItem } from './types/coffee';
import { Check, ShoppingBag } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('komorebi_coffee_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('komorebi_coffee_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not persist cart:', e);
    }
  }, [cart]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (newCartItem: CartItem) => {
    setCart((prev) => {
      // Check if identical item already in cart
      const existingIndex = prev.findIndex(
        (ci) =>
          ci.item.id === newCartItem.item.id &&
          ci.selectedMilk === newCartItem.selectedMilk &&
          ci.selectedGrind === newCartItem.selectedGrind &&
          ci.selectedTemp === newCartItem.selectedTemp
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + newCartItem.quantity,
        };
        return updated;
      }
      return [...prev, newCartItem];
    });

    showToast(`Added ${newCartItem.quantity}x ${newCartItem.item.name} to order bag`);
  };

  const handleUpdateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(cartId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#231F1C] flex flex-col font-sans selection:bg-[#d6c4ae]/40 selection:text-[#231F1C]">
      {/* Top Navbar */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationModalOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Banner */}
        <Hero
          onExploreMenu={() => handleScrollToSection('menu')}
          onOpenQuiz={() => handleScrollToSection('taste-profiler')}
          onBookCounter={() => setIsReservationModalOpen(true)}
        />

        {/* Curated Menu & Offerings */}
        <MenuSection
          onOpenCustomize={(item) => setCustomizingItem(item)}
          onQuickAdd={handleAddToCart}
        />

        {/* Interactive Roaster Taste Profiler Quiz */}
        <TasteProfiler
          onAddToCart={handleAddToCart}
          onOpenCustomize={(item) => setCustomizingItem(item)}
        />

        {/* Barista Ratio Calculator & Stopwatch */}
        <BrewGuideCalculator />

        {/* Story, Origins & Loring Convection Roasting */}
        <RoasteryStory />

        {/* Slow Bar Counter & Table Reservation System */}
        <SlowBarReservation
          isOpenModal={false}
        />

        {/* Hours, Amenities & Direct Barista Visit */}
        <LocationHours />
      </main>

      {/* Global Editorial Footer */}
      <Footer
        onScrollToSection={handleScrollToSection}
        onOpenReservation={() => setIsReservationModalOpen(true)}
      />

      {/* Slide-Over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Item Customizer Modal (Milk, Grind, Temp, Special Notes) */}
      <CustomizeModal
        item={customizingItem}
        isOpen={!!customizingItem}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Table & Slow Bar Reservation Modal (When triggered from Navbar or Buttons) */}
      {isReservationModalOpen && (
        <SlowBarReservation
          isOpenModal={true}
          onCloseModal={() => setIsReservationModalOpen(false)}
        />
      )}

      {/* Floating Cart Trigger on Mobile (When cart has items and drawer is closed) */}
      {cart.length > 0 && !isCartOpen && (
        <aside
          aria-label="Order bag notification"
          className="fixed bottom-5 right-5 z-30 lg:hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 bg-[#251910] text-[#FAF7F2] rounded-full shadow-lg border border-[#d6c4ae]/30 cursor-pointer active:scale-95 transition-transform"
          >
            <ShoppingBag className="w-4 h-4 text-[#d6c4ae]" />
            <span className="text-xs font-semibold uppercase tracking-wider">View Bag</span>
            <span className="font-mono tabular-nums bg-[#7f5e3e] text-white text-xs px-2 py-0.5 rounded-full font-bold">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          </button>
        </aside>
      )}

      {/* Subtle Toast Feedback */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#251910] text-[#FAF7F2] px-4 py-2.5 rounded-xs border border-[#d6c4ae]/20 shadow-xl flex items-center gap-2 text-xs font-medium animate-in fade-in slide-in-from-bottom-2 duration-150"
        >
          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
