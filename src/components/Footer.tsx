import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollToSection,
  onOpenReservation,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#140d08] text-[#FAF7F2] pt-16 pb-12 border-t border-[#FAF7F2]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tier: Wordmark & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-[#FAF7F2]/15">
          <div className="lg:col-span-6 space-y-4">
            <span className="font-serif-display text-3xl font-semibold tracking-tight block">
              Komorebi Coffee Roastery
            </span>
            <p className="text-xs text-[#d6c4ae] max-w-md font-light leading-relaxed">
              木漏れ日 — Sunlight filtering through trees. Sourcing single-origin micro-lots directly from ancestral growers and roasting on closed-loop convection air.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#bc9c79]">
              <span>Arts District, California</span>
              <span aria-hidden="true">·</span>
              <span>Est. 2019</span>
              <span aria-hidden="true">·</span>
              <span>Loring S15 Hearth</span>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-6 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#d6c4ae]">
              The Roaster Journal
            </div>
            <p className="text-xs text-[#d6c4ae]/80">
              Receive notifications when small-batch Gesha reserve micro-lots drop and invitations to monthly Saturday cupping flights.
            </p>

            {subscribed ? (
              <div className="inline-flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 px-3 py-2 rounded-xs border border-emerald-800">
                <Check className="w-3.5 h-3.5" />
                <span>You are subscribed to the weekly roast dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 text-xs px-3 py-2.5 rounded-xs bg-[#FAF7F2]/10 border border-[#FAF7F2]/20 text-[#FAF7F2] placeholder-[#FAF7F2]/40 focus:outline-hidden focus:border-[#d6c4ae]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#FAF7F2] text-[#140d08] hover:bg-[#e9decf] rounded-xs cursor-pointer transition-colors shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Tier: Navigation Links */}
        <div className="py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-[#d6c4ae]">
          <div>
            <div className="font-semibold uppercase tracking-wider text-[#FAF7F2] mb-3">
              Offerings
            </div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onScrollToSection('menu')} className="hover:text-white transition-colors cursor-pointer">
                  Espresso & Milk Bar
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('menu')} className="hover:text-white transition-colors cursor-pointer">
                  Single Origin Pour-Overs
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('menu')} className="hover:text-white transition-colors cursor-pointer">
                  House Signature Tonics
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('menu')} className="hover:text-white transition-colors cursor-pointer">
                  Dawn Sourdough Bakery
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-semibold uppercase tracking-wider text-[#FAF7F2] mb-3">
              Craft & Origin
            </div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onScrollToSection('taste-profiler')} className="hover:text-white transition-colors cursor-pointer">
                  Taste Profiler Quiz
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('brew-guide')} className="hover:text-white transition-colors cursor-pointer">
                  Barista Ratio Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('roastery')} className="hover:text-white transition-colors cursor-pointer">
                  Direct Trade Sourcing
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('roastery')} className="hover:text-white transition-colors cursor-pointer">
                  Loring Air Roasting
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-semibold uppercase tracking-wider text-[#FAF7F2] mb-3">
              Slow Bar & Counter
            </div>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenReservation} className="hover:text-white transition-colors cursor-pointer">
                  Table Reservations
                </button>
              </li>
              <li>
                <button onClick={onOpenReservation} className="hover:text-white transition-colors cursor-pointer">
                  African Terroir Flight
                </button>
              </li>
              <li>
                <button onClick={onOpenReservation} className="hover:text-white transition-colors cursor-pointer">
                  Exotic Gesha Cupping
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('visit')} className="hover:text-white transition-colors cursor-pointer">
                  Private Roastery Hire
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-semibold uppercase tracking-wider text-[#FAF7F2] mb-3">
              Visit Sanctuary
            </div>
            <div className="space-y-2 text-[#d6c4ae]">
              <p>428 Pine Street</p>
              <p>Historic Arts District</p>
              <p>Mon–Fri: 6:30 AM – 7:00 PM</p>
              <p>Sat–Sun: 7:00 AM – 7:30 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Quiet Anti-Slop Copyright */}
        <div className="pt-8 border-t border-[#FAF7F2]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#bc9c79]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Komorebi Coffee Roastery.</span>
            <span aria-hidden="true">·</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-[#FAF7F2]/50">
              100% Direct-Trade Verified · Single-Batch Roasted
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
