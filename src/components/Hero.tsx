import React from 'react';
import { HERO_IMAGE } from '../data/coffeeData';
import { ArrowDownRight, Sparkles, Compass, Coffee } from 'lucide-react';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenQuiz: () => void;
  onBookCounter: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onOpenQuiz,
  onBookCounter,
}) => {
  return (
    <section id="hero" className="relative min-h-[90vh] lg:min-h-screen flex items-end pt-28 pb-16 lg:pb-24 overflow-hidden">
      {/* Background Image with Fallback and Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Atmospheric sunlit interior of Komorebi Coffee Roastery with barista brewing pour-over coffee at terrazzo counter"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-102 transition-transform duration-1000 ease-out"
        />
        {/* Measured Scrim for WCAG AA Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#140d08] via-[#140d08]/70 to-[#140d08]/35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(190,158,127,0.15),transparent_60%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Clean Unboxed Metadata Kicker (Anti-Pill discipline) */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wider uppercase text-[#d6c4ae] mb-4">
            <span>Specialty Micro-Roastery</span>
            <span aria-hidden="true" className="text-[#a7805b]">·</span>
            <span>Slow Bar Experience</span>
            <span aria-hidden="true" className="text-[#a7805b]">·</span>
            <span>Historic Arts District</span>
          </div>

          {/* High-character Serif Display Headline with balanced text wrap */}
          <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[#faf7f2] leading-[1.08] tracking-tight mb-6 [text-wrap:balance]">
            Purity in every extraction. Quietude in every cup.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#e9decf]/90 leading-relaxed max-w-2xl mb-8 font-light">
            We source small-batch micro-lots directly from ancestral coffee producers in Yirgacheffe, Huila, and Boquete, roasting on our zero-emission convection hearth to unveil terroir in its rawest clarity.
          </p>

          {/* Primary & Secondary Action Buttons (Single line controls) */}
          <div className="flex flex-wrap items-center gap-3.5 mb-12">
            <button
              onClick={onExploreMenu}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#140d08] bg-[#FAF7F2] hover:bg-[#e9decf] active:scale-[0.98] transition-all rounded-xs cursor-pointer shadow-md whitespace-nowrap"
            >
              <span>Explore Menu & Order</span>
              <ArrowDownRight className="w-4 h-4 text-[#886241]" />
            </button>

            <button
              onClick={onOpenQuiz}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#FAF7F2] bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 backdrop-blur-sm border border-[#FAF7F2]/25 active:scale-[0.98] transition-all rounded-xs cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d6c4ae]" />
              <span>Taste Profiler Quiz</span>
            </button>

            <button
              onClick={onBookCounter}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#d6c4ae] hover:text-[#FAF7F2] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Reserve Tasting Flight</span>
            </button>
          </div>

          {/* Adjacent Quantitative Proof Metrics (Claim-to-Proof Adjacency) */}
          <div className="pt-6 border-t border-[#FAF7F2]/15 grid grid-cols-2 sm:grid-cols-3 gap-6 text-[#FAF7F2]">
            <div>
              <div className="font-mono tabular-nums text-xl sm:text-2xl font-medium text-[#FAF7F2]">
                100%
              </div>
              <div className="text-xs text-[#d6c4ae]/80 font-normal mt-0.5">
                Direct-Trade Farm Gate
              </div>
            </div>

            <div>
              <div className="font-mono tabular-nums text-xl sm:text-2xl font-medium text-[#FAF7F2]">
                88–94
              </div>
              <div className="text-xs text-[#d6c4ae]/80 font-normal mt-0.5">
                SCA Cupping Scores
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <div className="font-mono tabular-nums text-xl sm:text-2xl font-medium text-[#FAF7F2]">
                5:00 AM
              </div>
              <div className="text-xs text-[#d6c4ae]/80 font-normal mt-0.5">
                Daily Dawn Baking
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
