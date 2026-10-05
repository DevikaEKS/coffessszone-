import React, { useState, useEffect } from 'react';
import { ShoppingBag, Calendar, Menu as MenuIcon, X, Clock, MapPin } from 'lucide-react';
import { CartItem } from '../types/coffee';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  onOpenReservation,
  onScrollToSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  // Check store open status based on local time
  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const hour = now.getHours();
      // Open 6:30am to 7:00pm (6 to 19)
      setIsOpenNow(hour >= 6 && hour < 19);
    };
    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onScrollToSection(sectionId);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-xs py-3 border-b border-[#231F1C]/10'
            : 'bg-[#FAF7F2]/80 backdrop-blur-xs py-5 border-b border-[#231F1C]/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('hero')}
            className="text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#886241]"
          >
            <span className="font-serif-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#231F1C] transition-colors group-hover:text-[#7f5e3e]">
              Komorebi Roasters
            </span>
          </button>

          {/* Zone 2: 4-6 clean text navigation links with subtle hover underlines */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#4a3424]">
            <button
              onClick={() => handleNavClick('menu')}
              className="hover:text-[#231F1C] transition-colors cursor-pointer relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#7f5e3e] hover:after:w-full after:transition-all"
            >
              Curated Menu
            </button>
            <button
              onClick={() => handleNavClick('beans')}
              className="hover:text-[#231F1C] transition-colors cursor-pointer relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#7f5e3e] hover:after:w-full after:transition-all"
            >
              Origin Beans
            </button>
            <button
              onClick={() => handleNavClick('taste-profiler')}
              className="hover:text-[#231F1C] transition-colors cursor-pointer relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#7f5e3e] hover:after:w-full after:transition-all"
            >
              Taste Profiler
            </button>
            <button
              onClick={() => handleNavClick('brew-guide')}
              className="hover:text-[#231F1C] transition-colors cursor-pointer relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#7f5e3e] hover:after:w-full after:transition-all"
            >
              Brew Calculator
            </button>
            <button
              onClick={() => handleNavClick('roastery')}
              className="hover:text-[#231F1C] transition-colors cursor-pointer relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#7f5e3e] hover:after:w-full after:transition-all"
            >
              The Roastery
            </button>
            <button
              onClick={() => handleNavClick('visit')}
              className="hover:text-[#231F1C] transition-colors cursor-pointer relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#7f5e3e] hover:after:w-full after:transition-all"
            >
              Visit & Hours
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {/* Live Open / Closed indicator (quiet desktop tag) */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#63472e] pr-2">
              <span className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-emerald-600' : 'bg-amber-600'}`} />
              <span>{isOpenNow ? 'Bar Open · 7pm' : 'Roasting · Opens 6:30am'}</span>
            </div>

            {/* Table / Slow Bar Booking Button */}
            <button
              onClick={onOpenReservation}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold tracking-wide uppercase text-[#231F1C] bg-[#FAF7F2] border border-[#231F1C]/20 hover:border-[#231F1C]/60 hover:bg-[#e9decf]/40 transition-colors rounded-sm cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 text-[#7f5e3e]" />
              <span>Book Counter</span>
            </button>

            {/* Order / Cart trigger */}
            <button
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold tracking-wide uppercase text-white bg-[#251910] hover:bg-[#422f1f] transition-colors rounded-sm cursor-pointer whitespace-nowrap shadow-xs"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#d6c4ae]" />
              <span className="hidden xs:inline">Order Bag</span>
              <span className="font-mono tabular-nums bg-[#7f5e3e] text-white text-[11px] px-1.5 py-0.2 rounded-xs font-medium">
                {totalItems}
              </span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#231F1C] hover:bg-[#e9decf]/50 rounded-sm cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-35 bg-black/40 backdrop-blur-xs lg:hidden">
          <div className="fixed top-16 right-0 w-full max-w-xs bg-[#FAF7F2] h-[calc(100vh-4rem)] p-6 shadow-xl border-l border-[#231F1C]/10 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div className="pb-3 border-b border-[#231F1C]/10">
                <span className="font-serif-display text-lg font-semibold text-[#231F1C] block">
                  Komorebi Roasters
                </span>
                <span className="text-xs text-[#7f5e3e]">Arts District Slow Bar & Micro-Roastery</span>
              </div>

              <div className="flex flex-col space-y-3 pt-2 text-base font-medium text-[#231F1C]">
                <button
                  onClick={() => handleNavClick('menu')}
                  className="text-left py-2 hover:text-[#7f5e3e] transition-colors"
                >
                  Curated Menu
                </button>
                <button
                  onClick={() => handleNavClick('beans')}
                  className="text-left py-2 hover:text-[#7f5e3e] transition-colors"
                >
                  Origin Beans
                </button>
                <button
                  onClick={() => handleNavClick('taste-profiler')}
                  className="text-left py-2 hover:text-[#7f5e3e] transition-colors"
                >
                  Taste Profiler Quiz
                </button>
                <button
                  onClick={() => handleNavClick('brew-guide')}
                  className="text-left py-2 hover:text-[#7f5e3e] transition-colors"
                >
                  Barista Brew Calculator
                </button>
                <button
                  onClick={() => handleNavClick('roastery')}
                  className="text-left py-2 hover:text-[#7f5e3e] transition-colors"
                >
                  Our Philosophy
                </button>
                <button
                  onClick={() => handleNavClick('visit')}
                  className="text-left py-2 hover:text-[#7f5e3e] transition-colors"
                >
                  Hours & Location
                </button>
              </div>

              <div className="pt-4 border-t border-[#231F1C]/10 space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenReservation();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold tracking-wide uppercase text-[#231F1C] bg-[#e9decf]/50 border border-[#231F1C]/20 rounded-sm"
                >
                  <Calendar className="w-4 h-4 text-[#7f5e3e]" />
                  Reserve Slow Bar Counter
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-[#231F1C]/10 text-xs text-[#63472e] space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#7f5e3e]" />
                <span>Daily: 6:30 AM – 7:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#7f5e3e]" />
                <span>428 Pine Street, Historic Arts District</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
